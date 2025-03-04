
import React, { useState, useEffect } from 'react';
import { Bell, Menu, Search, X, MapPin, Shield, Users, Briefcase, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useNavigation } from '@/contexts/NavigationContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const { activeMainItem, setActiveMainItem } = useNavigation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const showNotification = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up on alerts",
      duration: 3000,
    });
  };

  const mainMenuItems = [
    { id: 'map', label: 'Dashboard', icon: MapPin },
    { id: 'units', label: 'Units', icon: Users },
    { id: 'operations', label: 'Operations', icon: Briefcase },
    { id: 'intelligence', label: 'Intelligence', icon: Brain },
    { id: 'settings', label: 'Settings', icon: Shield }
  ];
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
            
            <div className="font-medium text-lg md:text-xl">
              <span className="font-semibold">Military</span>
              <span className="text-muted-foreground">Track</span>
            </div>
          </div>
          
          <nav className={cn(
            "absolute md:relative top-full left-0 right-0 bg-background/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-0 border-b md:border-0",
            "md:flex items-center space-x-1 transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "block animate-fade-in" : "hidden md:flex"
          )}>
            <ul className="flex flex-col md:flex-row items-start md:items-center px-4 py-2 md:p-0">
              {mainMenuItems.map((item) => (
                <li key={item.id}>
                  <Button 
                    variant={activeMainItem === item.id ? "default" : "ghost"} 
                    className={cn(
                      "text-sm md:text-base whitespace-nowrap",
                      activeMainItem === item.id && "bg-primary/10 text-primary"
                    )}
                    onClick={() => setActiveMainItem(item.id as any)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center space-x-2">
            {searchOpen ? (
              <div className="animate-fade-in flex items-center bg-muted rounded-full pl-3 pr-1 py-1 md:w-64">
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="border-0 bg-transparent h-7 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setSearchOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 rounded-full"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={18} />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full"
              onClick={showNotification}
            >
              <Bell size={18} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-full h-8 w-8 overflow-hidden border"
            >
              <span className="font-medium text-xs">JD</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
