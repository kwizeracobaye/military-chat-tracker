
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

const Units = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Units Overview</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Last updated: </span>
              <span className="text-sm font-medium">Today at 09:42</span>
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Active Units</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((unit) => (
                  <div key={unit} className="p-4 bg-background rounded-md border">
                    <h3 className="font-medium">Unit A-{unit}</h3>
                    <p className="text-sm text-muted-foreground mt-1">12 personnel • Active</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Operational</span>
                      <button className="text-xs text-primary hover:underline">View details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Units;
