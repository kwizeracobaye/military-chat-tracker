
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Eye, FileText, Map } from 'lucide-react';

const Intelligence = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Intelligence</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Last updated: </span>
              <span className="text-sm font-medium">Today at 09:42</span>
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Latest Intelligence Reports</h2>
              <div className="space-y-4">
                {[
                  { title: "Surveillance Report #42", type: "Surveillance", date: "2023-06-10" },
                  { title: "Terrain Analysis - Northern Region", type: "Analysis", date: "2023-06-08" },
                  { title: "Activity Report - Sector 7", type: "Activity", date: "2023-06-05" }
                ].map((report, index) => (
                  <div key={index} className="p-4 bg-background rounded-md border">
                    <div className="flex items-center">
                      <div className="mr-3 bg-primary/10 p-2 rounded-md">
                        {report.type === "Surveillance" ? (
                          <Eye size={18} className="text-primary" />
                        ) : report.type === "Analysis" ? (
                          <FileText size={18} className="text-primary" />
                        ) : (
                          <Map size={18} className="text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {report.type} • {report.date}
                        </p>
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

export default Intelligence;
