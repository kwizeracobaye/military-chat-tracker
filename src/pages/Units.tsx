
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Clock, Flag, Navigation } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Units = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Checkpoints Overview</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Last updated: </span>
              <span className="text-sm font-medium">Today at 09:42</span>
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Active Checkpoints</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: "CP-1", name: "Ridge Point", terrain: "Highland", difficulty: "Medium", syndicates: 2, status: "Active" },
                  { id: "CP-2", name: "River Crossing", terrain: "Wetland", difficulty: "Hard", syndicates: 1, status: "Active" },
                  { id: "CP-3", name: "Forest Trail", terrain: "Woodland", difficulty: "Easy", syndicates: 3, status: "Active" },
                  { id: "CP-4", name: "Mountain Pass", terrain: "Rocky", difficulty: "Hard", syndicates: 0, status: "Pending" },
                  { id: "CP-5", name: "Valley Overlook", terrain: "Valley", difficulty: "Medium", syndicates: 1, status: "Active" },
                  { id: "CP-6", name: "Final Approach", terrain: "Mixed", difficulty: "Medium", syndicates: 0, status: "Pending" },
                ].map((checkpoint) => (
                  <div key={checkpoint.id} className="p-4 bg-background rounded-md border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{checkpoint.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{checkpoint.id} • {checkpoint.terrain}</p>
                        </div>
                      </div>
                      <Badge variant={
                        checkpoint.status === "Active" ? "default" :
                        checkpoint.status === "Pending" ? "secondary" :
                        "outline"
                      }>
                        {checkpoint.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{checkpoint.syndicates} Syndicates</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Flag className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{checkpoint.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> ~30 min to next
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary">View details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Checkpoint Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background p-4 rounded-md border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Flag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">6/8</h3>
                      <p className="text-sm text-muted-foreground">Checkpoints Activated</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-md border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">7</h3>
                      <p className="text-sm text-muted-foreground">Syndicates in Field</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-md border">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <Navigation className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">12</h3>
                      <p className="text-sm text-muted-foreground">Successful Navigations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Units;
