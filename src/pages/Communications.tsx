
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { MessageSquare, Phone, Video, Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Communications = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Communications</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Status: </span>
              <span className="text-sm font-medium text-green-500">Online</span>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 bg-card rounded-lg border shadow-sm">
              <div className="p-4 border-b">
                <h2 className="font-medium">Channels</h2>
              </div>
              <div className="p-2">
                {[
                  { name: "Command Center", unread: 3 },
                  { name: "Field Operations", unread: 0 },
                  { name: "Intelligence Sharing", unread: 1 },
                  { name: "Support Team", unread: 0 },
                  { name: "Emergency Channel", unread: 0 }
                ].map((channel, index) => (
                  <div 
                    key={index} 
                    className={`p-2 rounded-md flex items-center justify-between ${
                      index === 0 ? "bg-primary/10" : "hover:bg-accent/50"
                    } cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <MessageSquare size={16} className={index === 0 ? "text-primary" : "text-muted-foreground"} />
                      <span className={`ml-2 ${index === 0 ? "font-medium" : ""}`}>{channel.name}</span>
                    </div>
                    {channel.unread > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {channel.unread}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3 bg-card rounded-lg border shadow-sm flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="font-medium">Command Center</h2>
                  <span className="ml-2 text-xs text-muted-foreground">12 members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Video size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-auto space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">JD</div>
                  <div className="bg-accent rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">All units, please report status for morning briefing.</p>
                    <span className="text-xs text-muted-foreground">09:15</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium">SK</div>
                  <div className="bg-accent rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Unit A-1 reporting. All systems operational.</p>
                    <span className="text-xs text-muted-foreground">09:17</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium">MT</div>
                  <div className="bg-accent rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Unit B-3 on standby. Ready for deployment.</p>
                    <span className="text-xs text-muted-foreground">09:18</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="icon" className="rounded-full h-10 w-10">
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Communications;
