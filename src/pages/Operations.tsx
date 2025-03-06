
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Activity, CheckCircle, Clock } from 'lucide-react';

const Operations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Operations</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Last updated: </span>
              <span className="text-sm font-medium">Today at 09:42</span>
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Active Operations</h2>
              <div className="space-y-4">
                {[
                  { name: "Operation Eagle Eye", status: "In Progress", completion: 45 },
                  { name: "Operation Silent Watch", status: "Planning", completion: 20 },
                  { name: "Operation Mountain Shield", status: "Complete", completion: 100 }
                ].map((operation, index) => (
                  <div key={index} className="p-4 bg-background rounded-md border">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{operation.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        operation.status === "Complete" ? "bg-green-100 text-green-800" : 
                        operation.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {operation.status}
                      </span>
                    </div>
                    <div className="mt-3 relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs inline-block py-1 text-muted-foreground">
                            Completion: {operation.completion}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                        <div style={{ width: `${operation.completion}%` }} 
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                            operation.status === "Complete" ? "bg-green-500" : 
                            operation.status === "In Progress" ? "bg-blue-500" : 
                            "bg-amber-500"
                          }`}>
                        </div>
                      </div>
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

export default Operations;
