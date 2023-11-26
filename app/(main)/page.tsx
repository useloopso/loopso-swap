import React from "react";
// import Hero from "@/components/main/Hero";
import Topbar from "@/components/main/Topbar";
// import HowItWorks from "@/components/main/HowItWorks";
import Integrations from "@/components/main/Integrations";
import Footer from "@/components/main/Footer";
// import Features from '@/components/main/Features'
import CodeBlock from "@/components/main/CodeBlock";

const page = () => {
  return (
    <div className="overflow-hidden circles">
      <div className="gradient-03 z-0" />
      <Topbar />
      <CodeBlock />
      <div className="relative">
        {/* <Hero /> */}
        {/* <Features /> */}
      </div>
      <div className="relative">
        {/* <HowItWorks /> */}
        <div className="gradient-04 z-0" />
      </div>
      <div className="relative">
        <Integrations />
        <div className="gradient-04 z-0" />
      </div>
      <Footer />
    </div>
  );
};

export default page;
