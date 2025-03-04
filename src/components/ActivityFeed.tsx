
import React from 'react';
import { BarChart2, MessageSquare, Shield, Truck, Users, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActivityItem = {
  id: string;
  type: 'communication' | 'movement' | 'alert' | 'personnel' | 'security' | 'intelligence';
  content: string;
  timestamp: string;
  sender?: string;
  priority?: 'low' | 'medium' | 'high';
};

const activityItems: ActivityItem[] = [
  {
    id: '1',
    type: 'alert',
    content: 'Perimeter breach detected in sector 7. Security teams deployed.',
    timestamp: '2 min ago',
    priority: 'high'
  },
  {
    id: '2',
    type: 'movement',
    content: 'Supply convoy Delta-3 has reached checkpoint Bravo.',
    timestamp: '15 min ago',
    sender: 'Lt. Walker'
  },
  {
    id: '3',
    type: 'communication',
    content: 'New communication protocol established with allied forces.',
    timestamp: '27 min ago',
    sender: 'Comms Officer Chen'
  },
  {
    id: '4',
    type: 'personnel',
    content: 'Squad rotation completed for outpost 12.',
    timestamp: '1 hour ago',
    sender: 'Capt. Rodriguez'
  },
  {
    id: '5',
    type: 'intelligence',
    content: 'Satellite imagery reveals new activity in monitored region.',
    timestamp: '2 hours ago',
    priority: 'medium'
  },
  {
    id: '6',
    type: 'security',
    content: 'Cybersecurity sweep completed. No anomalies detected.',
    timestamp: '3 hours ago',
    sender: 'Security Officer Kim'
  },
  {
    id: '7',
    type: 'movement',
    content: 'Aerial reconnaissance unit returning to base.',
    timestamp: '4 hours ago',
    sender: 'Air Command'
  },
  {
    id: '8',
    type: 'alert',
    content: 'Weather alert: Severe storm approaching eastern operations zone.',
    timestamp: '5 hours ago',
    priority: 'medium'
  }
];

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  switch (type) {
    case 'communication':
      return <MessageSquare size={16} />;
    case 'movement':
      return <Truck size={16} />;
    case 'alert':
      return <AlertTriangle size={16} />;
    case 'personnel':
      return <Users size={16} />;
    case 'security':
      return <Shield size={16} />;
    case 'intelligence':
      return <BarChart2 size={16} />;
    default:
      return <MessageSquare size={16} />;
  }
};

export function ActivityFeed() {
  return (
    <div className="bg-card rounded-xl border subtle-ring w-full h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)] overflow-hidden flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium">Activity Feed</h3>
        <button className="text-xs text-primary hover:underline">
          Filter
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-1">
        <div className="space-y-px">
          {activityItems.map((item) => (
            <div key={item.id} className="p-3 hover:bg-accent/50 rounded-lg transition-colors">
              <div className="flex space-x-3">
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                  item.type === 'alert' && "bg-red-500/10 text-red-600 dark:text-red-400",
                  item.type === 'communication' && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                  item.type === 'movement' && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                  item.type === 'personnel' && "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                  item.type === 'security' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                  item.type === 'intelligence' && "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
                )}>
                  <ActivityIcon type={item.type} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{item.content}</p>
                  <div className="mt-1 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      {item.sender && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{item.sender}</span>
                        </>
                      )}
                    </div>
                    
                    {item.priority && (
                      <span className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full",
                        item.priority === 'high' && "bg-red-500/10 text-red-600 dark:text-red-400",
                        item.priority === 'medium' && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                        item.priority === 'low' && "bg-green-500/10 text-green-600 dark:text-green-400",
                      )}>
                        {item.priority}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
