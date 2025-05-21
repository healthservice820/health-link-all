import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Layout from './layout/Layout';

// Define form schemas for each step
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

export default function ProviderApplicationForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    // Validate current step before proceeding
    let isValid = false;
    
    if (step === 1) {
      isValid = await form.trigger([
        'provider_type',
        'contact_person',
        'email',
        'phone',
      ]);
    } else if (step === 2) {
      isValid = await form.trigger(['address']);
    } else if (step === 3) {
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
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
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
    values.additional_documents.map((file) => 
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
      
      toast({
        title: 'Application submitted!',
        description: 'Your application has been received and is under review.',
      });
      
    } catch (error) {
      toast({
        title: 'Error submitting application',
        description: 'Please try again or contact support.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for applying. We'll review your application and contact you soon.
        </p>
        <Button onClick={() => {
          setIsSuccess(false);
          setStep(1);
          form.reset();
        }}>
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <Layout>
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Provider Application</h1>
        <Progress value={(step / 4) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>Basic Info</span>
          <span>Address</span>
          <span>Professional Info</span>
          <span>Documents</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="provider_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your provider type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="diagnostic">Diagnostic Center</SelectItem>
                        <SelectItem value="ambulance">Ambulance Service</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {providerType && providerType !== 'doctor' && (
                <FormField
                  control={form.control}
                  name="organization_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {providerType === 'pharmacy' ? 'Pharmacy Name' : 
                         providerType === 'diagnostic' ? 'Diagnostic Center Name' : 
                         'Ambulance Service Name'}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter ${providerType} name`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="contact_person"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name of the contact person" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your professional email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your contact number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Street address, city, state, and postal code"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Step 3: Professional Information */}
          {step === 3 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="license_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your professional license number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {providerType === 'doctor' && (
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input placeholder="Your medical specialization" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {providerType === 'diagnostic' && (
                <FormField
                  control={form.control}
                  name="services_offered"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tests Offered (comma separated)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Blood test, X-ray, MRI"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {providerType === 'ambulance' && (
                <FormField
                  control={form.control}
                  name="coverage_area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coverage Area</FormLabel>
                      <FormControl>
                        <Input placeholder="Cities or regions you serve" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="license_document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Document</FormLabel>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            {field.value?.name || 'Upload your license document (PDF, max 5MB)'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => 
                            field.onChange(e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additional_documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Documents (Optional)</FormLabel>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            {field.value?.length 
                              ? `${field.value.length} file(s) selected` 
                              : 'Upload any additional supporting documents'}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.png"
                          onChange={(e) => 
                            field.onChange(e.target.files ? Array.from(e.target.files) : [])
                          }
                        />
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
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
          </div>

          {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="pt-4">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-gray-500 mt-1 text-center">
                Uploading documents... {Math.round(uploadProgress)}%
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
    </Layout>
  );
}