
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Personnel = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Personnel Management</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <Button size="sm" variant="outline">Export</Button>
              <Button size="sm">Add Personnel</Button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">ID</th>
                    <th className="px-4 py-3 text-left font-medium">Unit</th>
                    <th className="px-4 py-3 text-left font-medium">Role</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "John Smith", id: "P-001", unit: "A-1", role: "Commander", status: "Active" },
                    { name: "Sarah Johnson", id: "P-002", unit: "A-1", role: "Communications", status: "Active" },
                    { name: "Michael Brown", id: "P-003", unit: "B-3", role: "Intelligence", status: "On Leave" },
                    { name: "Emily Wilson", id: "P-004", unit: "C-2", role: "Tactical", status: "Active" },
                    { name: "David Lee", id: "P-005", unit: "A-1", role: "Medic", status: "Training" },
                    { name: "Jessica Chen", id: "P-006", unit: "B-3", role: "Logistics", status: "Active" },
                  ].map((person, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3">{person.name}</td>
                      <td className="px-4 py-3">{person.id}</td>
                      <td className="px-4 py-3">{person.unit}</td>
                      <td className="px-4 py-3">{person.role}</td>
                      <td className="px-4 py-3">
                        <Badge variant={
                          person.status === "Active" ? "default" :
                          person.status === "On Leave" ? "secondary" :
                          "outline"
                        }>
                          {person.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Personnel;
