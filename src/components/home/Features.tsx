
import React from "react";
import { 
  Heart, 
  Stethoscope, 
  FilePresentation, 
  Pill, 
  MapPin, 
  CalendarCheck 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Heart className="h-6 w-6 text-healthcare-primary" />,
      title: "AI-Powered Triage",
      description: "Our AI system analyzes your symptoms to determine if you need self-care advice or a referral to a specialist."
    },
    {
      icon: <MapPin className="h-6 w-6 text-healthcare-primary" />,
      title: "GPS Provider Matching",
      description: "Find healthcare professionals near you with our GPS-based matching system."
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-healthcare-primary" />,
      title: "Connect with Doctors",
      description: "Consult with qualified healthcare professionals via video, voice, or text."
    },
    {
      icon: <FilePresentation className="h-6 w-6 text-healthcare-primary" />,
      title: "Diagnostic Tests",
      description: "Find available slots for lab tests like MRIs, X-rays, CT scans, and blood work near you."
    },
    {
      icon: <Pill className="h-6 w-6 text-healthcare-primary" />,
      title: "Pharmacy Integration",
      description: "Get your prescriptions filled at nearby pharmacies and have them delivered to your door."
    },
    {
      icon: <CalendarCheck className="h-6 w-6 text-healthcare-primary" />,
      title: "Appointment Management",
      description: "Schedule, reschedule, or cancel appointments with healthcare providers through the app."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Healthcare <span className="text-healthcare-primary">Features</span>
          </h2>
          <p className="text-muted-foreground">
            HealthLink offers a comprehensive suite of features to ensure you receive the best healthcare experience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="health-card group"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-healthcare-light transition-colors group-hover:bg-healthcare-primary/10">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
