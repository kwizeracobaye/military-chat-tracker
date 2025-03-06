
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Send, Search, Paperclip, MoreHorizontal, MapPin, Radio } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const Messages = () => {
  const contacts = [
    { id: 1, name: "Alpha Syndicate", status: "active", lastMessage: "Checkpoint 2 reached", unread: 2, location: "Grid 452781" },
    { id: 2, name: "Bravo Syndicate", status: "active", lastMessage: "Navigation issue at river", unread: 0, location: "Grid 441763" },
    { id: 3, name: "Charlie Syndicate", status: "offline", lastMessage: "Exercise completed", unread: 0, location: "Base Camp" },
    { id: 4, name: "Delta Syndicate", status: "active", lastMessage: "ETA to CP3: 15 mins", unread: 1, location: "Grid 463792" },
    { id: 5, name: "Echo Syndicate", status: "active", lastMessage: "Weather update request", unread: 0, location: "Grid 457784" },
    { id: 6, name: "Foxtrot Syndicate", status: "offline", lastMessage: "Equipment malfunction", unread: 0, location: "Grid 449773" },
    { id: 7, name: "Golf Syndicate", status: "active", lastMessage: "Checkpoint 4 reached", unread: 0, location: "Grid 471801" },
  ];
  
  const messages = [
    { id: 1, sender: "Alpha Syndicate", content: "We've reached Checkpoint 2 as scheduled. All cadets accounted for.", time: "09:15", type: "received" },
    { id: 2, sender: "You", content: "Acknowledged Alpha. Proceed to Checkpoint 3. Estimated terrain difficulty is moderate. Keep hydrated.", time: "09:17", type: "sent" },
    { id: 3, sender: "Alpha Syndicate", content: "Roger that. We're checking our map and compass. Setting course for Checkpoint 3.", time: "09:18", type: "received" },
    { id: 4, sender: "Alpha Syndicate", content: "We've identified a stream crossing not marked on the map. Request guidance.", time: "09:20", type: "received" },
    { id: 5, sender: "You", content: "Utilize the temporary bridge at Grid Reference 455789. Mark it on your map for the return journey.", time: "09:22", type: "sent" },
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
                    <Input placeholder="Search syndicates..." className="pl-9" />
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
                            <span className="font-medium text-sm">{contact.name.split(' ')[0][0]}</span>
                          </div>
                          <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                            contact.status === 'active' ? "bg-green-500" : "bg-gray-300"
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                            <span className="text-xs text-muted-foreground">12:30</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin className="h-3 w-3 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground truncate">{contact.location}</span>
                          </div>
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
                      <span className="font-medium text-sm">A</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Alpha Syndicate</h3>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs mr-2 px-1">Grid 452781</Badge>
                        <span className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                          Active • 6 cadets
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Radio className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <MapPin className="h-5 w-5" />
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
                    <Input placeholder="Send navigation instructions..." className="flex-1" />
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
