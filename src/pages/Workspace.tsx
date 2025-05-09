
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComicWorkspace from "@/components/workspace/ComicWorkspace";

const Workspace: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <ComicWorkspace />
      </main>
      <Footer />
    </div>
  );
};

export default Workspace;
