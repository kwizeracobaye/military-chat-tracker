
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AlertTriangle, CheckCircle, Lock, Shield, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const Security = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Security Dashboard</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <Button size="sm" variant="destructive">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Incident
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 mb-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">System Status</p>
                    <h3 className="font-bold text-2xl mt-1 text-green-500">Secure</h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Threats</p>
                    <h3 className="font-bold text-2xl mt-1">0</h3>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Security Score</p>
                    <h3 className="font-bold text-2xl mt-1">94/100</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Lock className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Scan</p>
                    <h3 className="font-bold text-lg mt-1">Today 08:15</h3>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Search className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Security Compliance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Communications Encryption</span>
                      <span className="text-sm text-muted-foreground">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Access Controls</span>
                      <span className="text-sm text-muted-foreground">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Data Security</span>
                      <span className="text-sm text-muted-foreground">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Physical Security</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Security Events</h3>
                <div className="space-y-3">
                  {[
                    { time: "09:42", description: "System scan completed", type: "info" },
                    { time: "Yesterday", description: "Password policy updated", type: "info" },
                    { time: "Yesterday", description: "Failed login attempt (IP: 192.168.1.45)", type: "warning" },
                    { time: "3 days ago", description: "Security patches applied", type: "success" },
                    { time: "5 days ago", description: "Unusual traffic detected and blocked", type: "error" },
                  ].map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`mt-0.5 h-2 w-2 rounded-full ${
                        event.type === 'info' ? 'bg-blue-500' :
                        event.type === 'warning' ? 'bg-amber-500' :
                        event.type === 'success' ? 'bg-green-500' :
                        'bg-red-500'
                      }`} />
                      <div>
                        <p className="text-sm">{event.description}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Security Audit Log</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Search logs..." className="w-64" />
                  <Button variant="outline" size="sm">Filter</Button>
                  <Button size="sm">Export</Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                      <th className="px-4 py-3 text-left font-medium">User</th>
                      <th className="px-4 py-3 text-left font-medium">Action</th>
                      <th className="px-4 py-3 text-left font-medium">IP Address</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { time: "2023-06-10 09:42:15", user: "admin", action: "System scan", ip: "192.168.1.10", status: "Success" },
                      { time: "2023-06-09 17:30:22", user: "jsmith", action: "Password change", ip: "192.168.1.15", status: "Success" },
                      { time: "2023-06-09 14:15:05", user: "Unknown", action: "Login attempt", ip: "192.168.1.45", status: "Failed" },
                      { time: "2023-06-08 10:22:18", user: "system", action: "Security update", ip: "192.168.1.1", status: "Success" },
                      { time: "2023-06-07 08:10:32", user: "mjones", action: "Document access", ip: "192.168.1.22", status: "Success" },
                    ].map((log, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-3 font-mono text-xs">{log.time}</td>
                        <td className="px-4 py-3">{log.user}</td>
                        <td className="px-4 py-3">{log.action}</td>
                        <td className="px-4 py-3 font-mono text-xs">{log.ip}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            log.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Security;
