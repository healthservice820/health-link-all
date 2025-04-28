
import React from "react";
import Layout from "@/components/layout/Layout";

const FindDoctor = () => {
  return (
    <Layout>
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Find a Doctor</h1>
        <p className="text-muted-foreground">
          This page will allow users to search for doctors by specialty, location, and availability.
        </p>
      </div>
    </Layout>
  );
};

export default FindDoctor;
