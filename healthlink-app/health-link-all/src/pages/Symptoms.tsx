
import React from "react";
import Layout from "@/components/layout/Layout";
import SymptomChecker from "@/components/home/SymptomChecker";

const Symptoms = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Symptom Checker</h1>
        <p className="text-muted-foreground mb-8">
          Use our AI-powered symptom checker to assess your health concerns and determine next steps.
        </p>
        <SymptomChecker />
      </div>
    </Layout>
  );
};

export default Symptoms;
