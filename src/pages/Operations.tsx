
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Activity, CheckCircle, Clock, MapPin, Users, AlertTriangle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Operations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Navigation Exercises</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Last updated: </span>
              <span className="text-sm font-medium">Today at 09:42</span>
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Active Exercises</h2>
              <div className="space-y-4">
                {[
                  { name: "Highland Navigation Course", status: "In Progress", completion: 45, syndicates: 3, terrain: "Mountainous", difficulty: "High" },
                  { name: "Night Navigation Exercise", status: "Planning", completion: 20, syndicates: 4, terrain: "Woodland", difficulty: "Medium" },
                  { name: "River Crossing Navigation", status: "Complete", completion: 100, syndicates: 2, terrain: "River Valley", difficulty: "High" }
                ].map((operation, index) => (
                  <div key={index} className="p-4 bg-background rounded-md border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{operation.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users size={12} /> {operation.syndicates} Syndicates
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin size={12} /> {operation.terrain}
                          </Badge>
                          <Badge variant={
                            operation.difficulty === "High" ? "destructive" : 
                            operation.difficulty === "Medium" ? "default" : 
                            "secondary"
                          } className="flex items-center gap-1">
                            <AlertTriangle size={12} /> {operation.difficulty} Difficulty
                          </Badge>
                        </div>
                      </div>
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
            
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Exercise Timeline</h2>
              <div className="relative border-l-2 border-muted ml-4 pl-6 space-y-8">
                {[
                  { time: "06:00", event: "Exercise Briefing", status: "Completed", icon: <CheckCircle size={18} className="text-green-500" /> },
                  { time: "07:30", event: "Equipment Distribution", status: "Completed", icon: <CheckCircle size={18} className="text-green-500" /> },
                  { time: "08:15", event: "Syndicates Deployed", status: "In Progress", icon: <Activity size={18} className="text-blue-500" /> },
                  { time: "12:30", event: "Midpoint Check-in", status: "Upcoming", icon: <Clock size={18} className="text-amber-500" /> },
                  { time: "16:00", event: "Exercise Conclusion", status: "Upcoming", icon: <Clock size={18} className="text-amber-500" /> },
                  { time: "17:00", event: "Debrief and Assessment", status: "Upcoming", icon: <Clock size={18} className="text-amber-500" /> }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[46px] p-1 rounded-full bg-card border">
                      {item.icon}
                    </div>
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.event}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "Completed" ? "bg-green-100 text-green-800" : 
                        item.status === "In Progress" ? "bg-blue-100 text-blue-800" : 
                        "bg-amber-100 text-amber-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
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
