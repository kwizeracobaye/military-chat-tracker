
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Units from "./pages/Units";
import Operations from "./pages/Operations";
import Intelligence from "./pages/Intelligence";
import Settings from "./pages/Settings";
import Communications from "./pages/Communications";
import Personnel from "./pages/Personnel";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import Schedule from "./pages/Schedule";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";
import { NavigationProvider } from "./contexts/NavigationContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NavigationProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/units" element={<Units />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="/personnel" element={<Personnel />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/security" element={<Security />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/messages" element={<Messages />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NavigationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
