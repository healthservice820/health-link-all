import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { Heart, ArrowRight, ArrowLeft, UploadCloud, CheckCircle2, BriefcaseMedical, Building, Activity, Ambulance } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "./ui/textarea";

// Define form schemas
const basicInfoSchema = z.object({
  provider_type: z.enum(['doctor', 'pharmacy', 'diagnostic', 'ambulance']),
  organization_name: z.string().optional(),
  contact_person: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

const addressSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
});

const professionalInfoSchema = z.object({
  license_number: z.string().min(5, "License number must be at least 5 characters"),
  specialization: z.string().optional(),
  services_offered: z.string().optional(),
  coverage_area: z.string().optional(),
});

const documentSchema = z.object({
  license_document: z.instanceof(File).refine(
    file => file.size <= 5 * 1024 * 1024, 
    "File size must be less than 5MB"
  ),
  additional_documents: z.instanceof(File).array().optional(),
});

const formSchema = basicInfoSchema
  .merge(addressSchema)
  .merge(professionalInfoSchema)
  .merge(documentSchema);

type FormValues = z.infer<typeof formSchema>;

const ProviderApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider_type: undefined,
      organization_name: '',
      contact_person: '',
      email: '',
      phone: '',
      address: '',
      license_number: '',
      specialization: '',
      services_offered: '',
      coverage_area: '',
      license_document: undefined,
      additional_documents: [],
    },
  });

  const providerType = form.watch('provider_type');

  const nextStep = async () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = await form.trigger([
        'provider_type',
        'contact_person',
        'email',
        'phone',
      ]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(['address']);
    } else if (currentStep === 3) {
      isValid = await form.trigger(['license_number']);
      if (providerType === 'doctor') {
        isValid = isValid && await form.trigger(['specialization']);
      } else if (providerType === 'diagnostic') {
        isValid = isValid && await form.trigger(['services_offered']);
      } else if (providerType === 'ambulance') {
        isValid = isValid && await form.trigger(['coverage_area']);
      }
    }
    
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage
      .from('provider-documents')
      .upload(`${path}/${file.name}-${Date.now()}`, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) throw error;
    return data.path;
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Upload license document
      setUploadProgress(20);
      const licenseDocPath = await uploadFile(
        values.license_document,
        `${values.email}/license`
      );
      
      // Upload additional documents if any
      let additionalDocPaths: string[] = [];
      if (values.additional_documents && values.additional_documents.length > 0) {
        setUploadProgress(40);
        additionalDocPaths = await Promise.all(
          values.additional_documents.map(file => 
            uploadFile(file, `${values.email}/additional`)
          )
        );
      }
      
      setUploadProgress(60);
      
      // Submit application to database
      const { data, error } = await supabase
        .from('provider_applications')
        .insert([{
          provider_type: values.provider_type,
          organization_name: values.organization_name,
          contact_person: values.contact_person,
          email: values.email,
          phone: values.phone,
          address: values.address,
          license_number: values.license_number,
          license_document_url: licenseDocPath,
          other_documents_urls: additionalDocPaths,
          status: 'pending',
          ...(providerType === 'doctor' && { specialization: values.specialization }),
          ...(providerType === 'diagnostic' && { services_offered: values.services_offered?.split(',') }),
          ...(providerType === 'ambulance' && { coverage_area: values.coverage_area }),
        }])
        .select()
        .single();

      if (error) throw error;
      
      setUploadProgress(100);
      setIsSuccess(true);
      
      toast.success('Application submitted! Your application has been received and is under review.');
      
    } catch (error) {
      toast.error('Error submitting application. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  if (isSuccess) {
    return (
      <Layout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-healthcare-light p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <Link to="/" className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-healthcare-primary" />
                  <span className="text-xl font-bold text-healthcare-primary">HealthLink</span>
                </Link>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Application Submitted!
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <p>Thank you for applying. We'll review your application and contact you soon.</p>
              <Button 
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  form.reset();
                }}
                className="w-full"
              >
                Return to Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-healthcare-light p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Link to="/" className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-healthcare-primary" />
                <span className="text-xl font-bold text-healthcare-primary">HealthLink</span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {currentStep === 1 && "Provider Information"}
              {currentStep === 2 && "Address Details"}
              {currentStep === 3 && "Professional Information"}
              {currentStep === 4 && "Document Upload"}
            </CardTitle>
            <CardDescription className="text-center">
              Step {currentStep} of 4
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Provider Type</Label>
                    <RadioGroup 
                      onValueChange={(value) => form.setValue('provider_type', value as any)}
                      value={form.watch('provider_type')}
                      className="grid grid-cols-2 gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="doctor" id="doctor" />
                        <Label htmlFor="doctor" className="flex items-center gap-1">
                          <BriefcaseMedical className="h-4 w-4" /> Doctor
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pharmacy" id="pharmacy" />
                        <Label htmlFor="pharmacy" className="flex items-center gap-1">
                          <Building className="h-4 w-4" /> Pharmacy
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="diagnostic" id="diagnostic" />
                        <Label htmlFor="diagnostic" className="flex items-center gap-1">
                          <Activity className="h-4 w-4" /> Diagnostic
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ambulance" id="ambulance" />
                        <Label htmlFor="ambulance" className="flex items-center gap-1">
                          <Ambulance className="h-4 w-4" /> Ambulance
                        </Label>
                      </div>
                    </RadioGroup>
                    {form.formState.errors.provider_type && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.provider_type.message}
                      </p>
                    )}
                  </div>

                  {providerType && providerType !== 'doctor' && (
                    <div className="space-y-2">
                      <Label>
                        {providerType === 'pharmacy' ? 'Pharmacy Name' : 
                         providerType === 'diagnostic' ? 'Diagnostic Center Name' : 
                         'Ambulance Service Name'}
                      </Label>
                      <Input
                        placeholder={`Enter ${providerType} name`}
                        {...form.register('organization_name')}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Contact Person</Label>
                    <Input
                      placeholder="Full name of the contact person"
                      {...form.register('contact_person')}
                    />
                    {form.formState.errors.contact_person && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.contact_person.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        placeholder="Your professional email"
                        {...form.register('email')}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="Your contact number"
                        {...form.register('phone')}
                      />
                      {form.formState.errors.phone && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Full Address</Label>
                    <Textarea
                      placeholder="Street address, city, state, and postal code"
                      rows={3}
                      {...form.register('address')}
                    />
                    {form.formState.errors.address && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Professional Information */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>License Number</Label>
                    <Input
                      placeholder="Your professional license number"
                      {...form.register('license_number')}
                    />
                    {form.formState.errors.license_number && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.license_number.message}
                      </p>
                    )}
                  </div>

                  {providerType === 'doctor' && (
                    <div className="space-y-2">
                      <Label>Specialization</Label>
                      <Input
                        placeholder="Your medical specialization"
                        {...form.register('specialization')}
                      />
                    </div>
                  )}

                  {providerType === 'diagnostic' && (
                    <div className="space-y-2">
                      <Label>Tests Offered (comma separated)</Label>
                      <Textarea
                        placeholder="e.g., Blood test, X-ray, MRI"
                        rows={3}
                        {...form.register('services_offered')}
                      />
                    </div>
                  )}

                  {providerType === 'ambulance' && (
                    <div className="space-y-2">
                      <Label>Coverage Area</Label>
                      <Input
                        placeholder="Cities or regions you serve"
                        {...form.register('coverage_area')}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Documents */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>License Document</Label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            {form.watch('license_document')?.name || 'Upload your license document (PDF, max 5MB)'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => 
                            form.setValue('license_document', e.target.files ? e.target.files[0] : undefined)
                          }
                        />
                      </label>
                    </div>
                    {form.formState.errors.license_document && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.license_document.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Documents (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            {form.watch('additional_documents')?.length 
                              ? `${form.watch('additional_documents')?.length} file(s) selected` 
                              : 'Upload any additional supporting documents'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={(e) => 
                            form.setValue('additional_documents', e.target.files ? Array.from(e.target.files) : [])
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="pt-4">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-1 text-center">
                    Uploading documents... {Math.round(uploadProgress)}%
                  </p>
                </div>
              )}
            </form>
          </CardContent>
          <CardContent className="flex justify-between pt-0">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 4 ? (
              <Button onClick={nextStep} disabled={isSubmitting}>
                Next <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={form.handleSubmit(onSubmit)} 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProviderApplicationForm;