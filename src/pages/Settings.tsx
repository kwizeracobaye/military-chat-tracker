
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Settings</h1>
          </div>
          
          <div className="grid gap-6">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
              
              <div className="space-y-6">
                <div className="grid gap-3">
                  <h3 className="text-md font-medium">Map Settings</h3>
                  
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div>
                      <Label htmlFor="auto-refresh">Auto refresh unit positions</Label>
                      <p className="text-sm text-muted-foreground">Automatically update unit positions on the map</p>
                    </div>
                    <Switch id="auto-refresh" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div>
                      <Label htmlFor="terrain-view">Terrain view</Label>
                      <p className="text-sm text-muted-foreground">Show terrain details on the map</p>
                    </div>
                    <Switch id="terrain-view" defaultChecked />
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <h3 className="text-md font-medium">Notifications</h3>
                  
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div>
                      <Label htmlFor="push-notifications">Push notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications for alerts</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between border p-4 rounded-md">
                    <div>
                      <Label htmlFor="email-alerts">Email alerts</Label>
                      <p className="text-sm text-muted-foreground">Receive critical alerts via email</p>
                    </div>
                    <Switch id="email-alerts" />
                  </div>
                </div>
                
                <div className="grid gap-3">
                  <h3 className="text-md font-medium">API Settings</h3>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="api-key">Google Maps API Key</Label>
                    <Input id="api-key" type="password" value="AIzaSyA-rBUqPj6L4J_acpvwzBi4VRgAVkz-tB8" />
                    <p className="text-xs text-muted-foreground">Your Google Maps API key for map integration</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
