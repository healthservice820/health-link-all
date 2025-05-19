
import React from "react";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import SymptomChecker from "@/components/home/SymptomChecker";
import DoctorFinder from "@/components/home/DoctorFinder";
import LabTestFinder from "@/components/home/LabTestFinder";
import CTA from "@/components/home/CTA";
import {PlanComparison} from "@/components/home/PlanComparison"

const Index = () => {
  return (
    <Layout>
      <Hero />
      <PlanComparison />
      <Features />
      <SymptomChecker />
      <DoctorFinder />
      <LabTestFinder />
      <CTA />
    </Layout>
  );
};

export default Index;
