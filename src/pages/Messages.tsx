
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Send, Search, Paperclip, MoreHorizontal, Phone, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const Messages = () => {
  const contacts = [
    { id: 1, name: "Command Center", status: "online", lastMessage: "All units, report status", unread: 2 },
    { id: 2, name: "Intelligence Team", status: "online", lastMessage: "New intel available", unread: 0 },
    { id: 3, name: "Field Ops", status: "offline", lastMessage: "Mission complete", unread: 0 },
    { id: 4, name: "Support Team", status: "online", lastMessage: "Supplies en route", unread: 1 },
    { id: 5, name: "Training Division", status: "online", lastMessage: "Schedule updated", unread: 0 },
    { id: 6, name: "Research & Development", status: "offline", lastMessage: "Equipment testing results", unread: 0 },
    { id: 7, name: "Medical Unit", status: "online", lastMessage: "Health report submitted", unread: 0 },
  ];
  
  const messages = [
    { id: 1, sender: "Command Center", content: "All units, please report status for morning briefing.", time: "09:15", type: "received" },
    { id: 2, sender: "You", content: "Team Alpha reporting. All systems operational.", time: "09:17", type: "sent" },
    { id: 3, sender: "Command Center", content: "Acknowledged. Stand by for mission details.", time: "09:18", type: "received" },
    { id: 4, sender: "Command Center", content: "New coordinates uploaded to your navigation system. Priority mission.", time: "09:20", type: "received" },
    { id: 5, sender: "You", content: "Coordinates received. Moving to position.", time: "09:22", type: "sent" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden h-[calc(100vh-10rem)]">
            <div className="grid lg:grid-cols-[280px_1fr] h-full">
              {/* Contacts sidebar */}
              <div className="border-r">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search contacts..." className="pl-9" />
                  </div>
                </div>
                
                <ScrollArea className="h-[calc(100vh-14rem)]">
                  <div className="p-2">
                    {contacts.map((contact) => (
                      <div 
                        key={contact.id} 
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                          contact.id === 1 ? "bg-accent" : "hover:bg-accent/50"
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-sm">{contact.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            contact.status === 'online' ? "bg-green-500" : "bg-gray-300"
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                            <span className="text-xs text-muted-foreground">12:30</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">{contact.lastMessage}</p>
                        </div>
                        
                        {contact.unread > 0 && (
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-xs font-medium text-primary-foreground">{contact.unread}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              {/* Chat area */}
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-sm">CC</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Command Center</h3>
                      <p className="text-xs text-muted-foreground">Online • 3 members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${
                          message.type === 'sent' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-accent'
                        } rounded-lg p-3`}>
                          {message.type === 'received' && (
                            <p className="text-xs font-medium mb-1">{message.sender}</p>
                          )}
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'sent' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button size="icon" className="rounded-full h-9 w-9">
                      <Send className="h-5 w-5" />
                    </Button>
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

export default Messages;
