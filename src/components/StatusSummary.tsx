
import React from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Clock, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type StatusCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
};

const StatusCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue, 
  color = 'default',
  className 
}: StatusCardProps) => {
  return (
    <Card className={cn("overflow-hidden bg-card subtle-ring transition-all duration-300 hover:shadow-md", className)}>
      <CardHeader className="p-4 pb-0 flex justify-between items-start">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription className="mt-1 text-xs">{description}</CardDescription>
        </div>
        <div className={cn(
          "p-2 rounded-lg",
          color === 'success' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          color === 'warning' && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          color === 'danger' && "bg-red-500/10 text-red-600 dark:text-red-400",
          color === 'default' && "bg-primary/10 text-primary",
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-4">
        <div className="text-2xl font-semibold">{value}</div>
        {trend && trendValue && (
          <div className="mt-1 flex items-center text-xs">
            <span className={cn(
              "flex items-center",
              trend === 'up' && "text-emerald-600 dark:text-emerald-400",
              trend === 'down' && "text-red-600 dark:text-red-400",
              trend === 'neutral' && "text-muted-foreground"
            )}>
              {trend === 'up' && <ArrowUpIcon className="w-3 h-3 mr-1" />}
              {trend === 'down' && <ArrowDownIcon className="w-3 h-3 mr-1" />}
              {trend === 'neutral' && <ArrowRightIcon className="w-3 h-3 mr-1" />}
              {trendValue}
            </span>
            <span className="text-muted-foreground ml-1">from previous period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ArrowUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5L12 19M12 5L18 11M12 5L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 19L12 5M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type MissionCardProps = {
  title: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'critical';
  progress?: number;
  time?: string;
  units?: number;
};

const MissionCard = ({ title, status, progress, time, units }: MissionCardProps) => {
  return (
    <div className="flex items-center p-3 border rounded-lg bg-card subtle-ring">
      <div className={cn(
        "flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full",
        status === 'completed' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        status === 'in-progress' && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        status === 'scheduled' && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        status === 'critical' && "bg-red-500/10 text-red-600 dark:text-red-400",
      )}>
        {status === 'completed' && <CheckCircle size={20} />}
        {status === 'in-progress' && <Activity size={20} />}
        {status === 'scheduled' && <Clock size={20} />}
        {status === 'critical' && <AlertCircle size={20} />}
      </div>
      
      <div className="ml-3 flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center justify-between mt-1">
          {progress !== undefined && (
            <div className="w-24 md:w-32">
              <Progress value={progress} className="h-1" />
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {time && <span>{time}</span>}
            {units && <span>{units} units</span>}
            <ArrowRight size={12} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export function StatusSummary() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Active Units"
          value="32"
          description="Total units on active duty"
          icon={<CheckCircle size={18} />}
          trend="up"
          trendValue="+4"
          color="success"
        />
        
        <StatusCard
          title="Alert Status"
          value="DEFCON 4"
          description="Current defense condition"
          icon={<AlertCircle size={18} />}
          color="default"
        />
        
        <StatusCard
          title="Mission Success"
          value="94%"
          description="Last 30 days completion rate"
          icon={<Activity size={18} />}
          trend="up"
          trendValue="+2.5%"
          color="success"
        />
        
        <StatusCard
          title="Critical Events"
          value="2"
          description="Issues requiring immediate attention"
          icon={<AlertCircle size={18} />}
          trend="down"
          trendValue="-1"
          color="danger"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card subtle-ring">
          <CardHeader className="px-4 py-3 border-b">
            <CardTitle className="text-base font-medium">Active Missions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-3">
            <div className="space-y-3">
              <MissionCard
                title="Reconnaissance Alpha"
                status="in-progress"
                progress={68}
                time="4h left"
                units={8}
              />
              <MissionCard
                title="Supply Route Security"
                status="completed"
                progress={100}
                units={12}
              />
              <MissionCard
                title="Mountain Pass Patrol"
                status="critical"
                progress={23}
                time="Critical"
                units={6}
              />
              <MissionCard
                title="Coastal Surveillance"
                status="scheduled"
                time="Starts in 2h"
                units={10}
              />
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t flex justify-center">
            <button className="text-sm font-medium text-primary flex items-center hover:underline">
              View all missions <ArrowRight size={14} className="ml-1" />
            </button>
          </CardFooter>
        </Card>
        
        <Card className="bg-card subtle-ring">
          <CardHeader className="px-4 py-3 border-b">
            <CardTitle className="text-base font-medium">Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {[
                { label: 'Personnel', value: 78 },
                { label: 'Vehicles', value: 65 },
                { label: 'Equipment', value: 82 },
                { label: 'Supplies', value: 45 },
                { label: 'Communication', value: 92 }
              ].map((resource) => (
                <div key={resource.label} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{resource.label}</span>
                    <span className="font-medium">{resource.value}%</span>
                  </div>
                  <Progress value={resource.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
