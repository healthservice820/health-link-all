
import React from "react";
import Layout from "@/components/layout/Layout";

const Diagnostics = () => {
  return (
    <Layout>
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Diagnostic Tests</h1>
        <p className="text-muted-foreground">
          This page will allow users to search for and book diagnostic tests like MRIs, X-rays, CT scans, and blood work.
        </p>
      </div>
    </Layout>
  );
};

export default Diagnostics;
