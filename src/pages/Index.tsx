
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { LiveMap } from "@/components/LiveMap";
import { StatusSummary } from "@/components/StatusSummary";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import StoremapperWidget from "@/components/map/StoremapperWidget";
import { 
  Map, 
  Users, 
  Activity, 
  FileText, 
  Settings, 
  Radio, 
  BarChart3, 
  Shield, 
  Clock, 
  MessageSquare 
} from "lucide-react";

const NavigationCard = ({ 
  title, 
  description, 
  icon: Icon, 
  link 
}: { 
  title: string;
  description: string;
  icon: React.ElementType;
  link: string;
}) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <Link to={link} className="block h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Link>
  </Card>
);

const Index = () => {
  const navigationItems = [
    {
      title: "Syndicates",
      description: "View and manage cadet syndicates in the field",
      icon: Users,
      link: "/units"
    },
    {
      title: "Operations",
      description: "Track ongoing and planned navigation exercises",
      icon: Activity,
      link: "/operations"
    },
    {
      title: "Intelligence",
      description: "Access terrain and weather intelligence",
      icon: FileText,
      link: "/intelligence"
    },
    {
      title: "Settings",
      description: "Configure system preferences and settings",
      icon: Settings,
      link: "/settings"
    },
    {
      title: "Command Communications",
      description: "Communication with command structure",
      icon: Radio,
      link: "/communications"
    },
    {
      title: "Personnel",
      description: "View and manage cadet syndicates",
      icon: Users,
      link: "/personnel"
    },
    {
      title: "Navigation Analytics",
      description: "Access real-time exercise analytics",
      icon: BarChart3,
      link: "/analytics"
    },
    {
      title: "Safety & Security",
      description: "Monitor safety protocols and emergencies",
      icon: Shield,
      link: "/security"
    },
    {
      title: "Exercise Schedule",
      description: "View and manage exercise timetables",
      icon: Clock,
      link: "/schedule"
    },
    {
      title: "Field Messages",
      description: "Access communication channels with teams",
      icon: MessageSquare,
      link: "/messages"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Cadet Navigation System</h1>
            <p className="text-muted-foreground">Command and control system for cadet field navigation exercises</p>
          </div>
          
          <div className="grid gap-6 mb-8">
            {/* Map Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-[50vh] w-full rounded-lg border overflow-hidden">
                <LiveMap />
              </div>
              <div className="h-[50vh] w-full rounded-lg border overflow-hidden">
                <StoremapperWidget 
                  storeId="31600-r6O0QN9KVJv8bUHG" 
                  className="h-full"
                />
              </div>
            </div>
            
            <StatusSummary />
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Navigation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {navigationItems.map((item, index) => (
                <NavigationCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  link={item.link}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
