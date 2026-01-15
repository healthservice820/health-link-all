
import React from "react";
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-6">About HealthLink</h1>
        <p className="text-muted-foreground">
          HealthLink is a fully integrated healthcare app that brings patients, doctors, health practitioners, diagnostic labs, and pharmacies together on one platform. 
          Our mission is to make healthcare accessible 24/7 through smartphones and conventional SMS.
        </p>
      </div>
    </Layout>
  );
};

export default About;
