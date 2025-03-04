
import React, { createContext, useContext, useState, ReactNode } from 'react';

type MainNavigationItem = 'map' | 'units' | 'operations' | 'intelligence' | 'settings';
type SideNavigationItem = 'communications' | 'personnel' | 'analytics' | 'mission' | 'schedule' | 'messages';

interface NavigationContextType {
  activeMainItem: MainNavigationItem;
  activeSideItem: SideNavigationItem;
  setActiveMainItem: (item: MainNavigationItem) => void;
  setActiveSideItem: (item: SideNavigationItem) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeMainItem, setActiveMainItem] = useState<MainNavigationItem>('map');
  const [activeSideItem, setActiveSideItem] = useState<SideNavigationItem>('mission');

  return (
    <NavigationContext.Provider value={{ 
      activeMainItem, 
      activeSideItem, 
      setActiveMainItem, 
      setActiveSideItem 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
