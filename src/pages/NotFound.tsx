
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl font-medium mb-2">Access Restricted</p>
        <p className="text-muted-foreground mb-6">
          This area is classified or does not exist. Please return to authorized zones.
        </p>
        <Button asChild className="animate-slide-in rounded-full">
          <a href="/" className="flex items-center justify-center">
            <ChevronLeft size={18} className="mr-1" />
            Return to Command Center
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
