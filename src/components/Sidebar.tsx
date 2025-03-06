
import React from 'react';
import { 
  Map, 
  Compass, 
  Radio, 
  Users, 
  BarChart3, 
  Shield, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  Clock,
  Activity,
  Target,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/contexts/NavigationContext';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasNotification?: boolean;
  to: string;
  onClick?: () => void;
};

const SidebarItem = ({ icon, label, active, hasNotification, to, onClick }: SidebarItemProps) => (
  <Link to={to}>
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-3 w-full px-3 py-2.5 rounded-md transition-all duration-200",
        "hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
        active && "bg-accent text-primary font-medium"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground"
      )}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
      {hasNotification && (
        <span className="ml-auto flex-shrink-0 h-2 w-2 rounded-full bg-destructive" />
      )}
    </button>
  </Link>
);

export function Sidebar() {
  const { activeSideItem, setActiveSideItem } = useNavigation();
  const location = useLocation();
  
  return (
    <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30 border-r bg-card">
      <div className="flex flex-col h-full py-6">
        <div className="px-4 mb-6">
          <div className="h-10 flex items-center">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground mr-3">
              <Compass size={18} />
            </div>
            <div className="font-semibold text-lg">MilitaryTrack</div>
          </div>
        </div>
        
        <div className="px-3 mb-2">
          <div className="text-xs font-medium text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
            Main
          </div>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          <SidebarItem 
            icon={<Map size={18} />} 
            label="Map Overview" 
            active={location.pathname === '/'} 
            to="/"
          />
          <SidebarItem 
            icon={<Radio size={18} />} 
            label="Communications" 
            active={location.pathname === '/communications'} 
            to="/communications"
          />
          <SidebarItem 
            icon={<Users size={18} />} 
            label="Personnel" 
            hasNotification 
            active={location.pathname === '/personnel'} 
            to="/personnel"
          />
          <SidebarItem 
            icon={<BarChart3 size={18} />} 
            label="Analytics" 
            active={location.pathname === '/analytics'} 
            to="/analytics"
          />
          <SidebarItem 
            icon={<Shield size={18} />} 
            label="Security" 
            active={location.pathname === '/security'} 
            to="/security"
          />
        </nav>
        
        <div className="px-3 mb-2 mt-6">
          <div className="text-xs font-medium text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
            Operations
          </div>
        </div>
        
        <nav className="px-2 space-y-1 mb-6">
          <SidebarItem 
            icon={<Activity size={18} />} 
            label="Mission Status" 
            hasNotification 
            active={location.pathname === '/operations'} 
            to="/operations"
          />
          <SidebarItem 
            icon={<Clock size={18} />} 
            label="Schedule" 
            active={location.pathname === '/schedule'} 
            to="/schedule"
          />
          <SidebarItem 
            icon={<MessageSquare size={18} />} 
            label="Messages" 
            active={location.pathname === '/messages'} 
            to="/messages"
          />
        </nav>
        
        <div className="px-3 pt-4 mt-auto border-t">
          <nav className="px-2 space-y-1">
            <SidebarItem 
              icon={<Settings size={18} />} 
              label="Settings"
              active={location.pathname === '/settings'} 
              to="/settings"
            />
            <SidebarItem 
              icon={<HelpCircle size={18} />} 
              label="Help & Support" 
              active={location.pathname === '/help'} 
              to="/help"
            />
          </nav>
        </div>
      </div>
    </aside>
  );
}
