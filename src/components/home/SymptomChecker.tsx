
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Simulated AI responses based on common symptoms
const aiResponses = {
  headache: {
    advice: "Based on your symptoms, you might be experiencing a tension headache. Try resting in a dark, quiet room and staying hydrated. Over-the-counter pain relievers may help.",
    severity: "mild",
    recommendation: "self-care",
  },
  fever: {
    advice: "Your symptoms suggest you may have a fever. Rest, stay hydrated, and take acetaminophen or ibuprofen to reduce fever. Monitor your temperature.",
    severity: "moderate",
    recommendation: "self-care with monitoring",
  },
  "chest pain": {
    advice: "Chest pain can be a sign of several conditions, some of which require immediate medical attention.",
    severity: "high",
    recommendation: "professional care",
  },
  cough: {
    advice: "Your symptoms suggest a common cold or mild respiratory infection. Rest, stay hydrated, and use over-the-counter cough medicine if needed.",
    severity: "mild",
    recommendation: "self-care",
  },
  "shortness of breath": {
    advice: "Difficulty breathing can be a sign of several serious conditions.",
    severity: "high",
    recommendation: "professional care",
  }
};

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<{
    advice: string;
    severity: string;
    recommendation: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Check if any keywords in the symptoms match our predefined responses
      const symptomLower = symptoms.toLowerCase();
      let foundResponse = null;
      
      for (const [key, response] of Object.entries(aiResponses)) {
        if (symptomLower.includes(key)) {
          foundResponse = response;
          break;
        }
      }
      
      // Default response if no specific symptoms are matched
      if (!foundResponse) {
        foundResponse = {
          advice: "Based on the information provided, I recommend consulting with a healthcare professional for a proper diagnosis.",
          severity: "unknown",
          recommendation: "professional care",
        };
      }
      
      setResult(foundResponse);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-healthcare-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="text-healthcare-primary">Symptom Checker</span>
          </h2>
          <p className="text-muted-foreground">
            Describe your symptoms and our AI will help determine if you need self-care advice or a referral to a healthcare professional.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-healthcare-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-healthcare-primary" />
                Symptom Checker
              </CardTitle>
              <CardDescription>
                Describe your symptoms in detail for a more accurate assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Textarea
                  placeholder="Describe your symptoms here... (e.g., I've been having a headache for the past two days, and it gets worse when I move my head)"
                  className="min-h-32 mb-4"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
                  disabled={loading || symptoms.trim().length < 5}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      Analyzing Symptoms...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Check Symptoms
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            {result && (
              <CardFooter className="flex flex-col items-start border-t p-6">
                <div className="mb-2">
                  <span 
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                      {
                        "bg-green-100 text-green-700": result.severity === "mild",
                        "bg-yellow-100 text-yellow-700": result.severity === "moderate",
                        "bg-red-100 text-red-700": result.severity === "high",
                        "bg-gray-100 text-gray-700": result.severity === "unknown",
                      }
                    )}
                  >
                    {result.severity === "mild" && "Mild"}
                    {result.severity === "moderate" && "Moderate"}
                    {result.severity === "high" && "Urgent"}
                    {result.severity === "unknown" && "Consult Doctor"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Assessment:</h3>
                <p className="text-muted-foreground mb-4">{result.advice}</p>
                <div className="w-full">
                  {result.recommendation === "professional care" ? (
                    <Button 
                      className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
                    >
                      Find a Doctor Near You
                    </Button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline"
                        className="flex-1"
                      >
                        View Detailed Advice
                      </Button>
                      <Button 
                        className="flex-1 bg-healthcare-primary hover:bg-healthcare-accent"
                      >
                        Find a Doctor Anyway
                      </Button>
                    </div>
                  )}
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SymptomChecker;
