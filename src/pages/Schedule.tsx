
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight, Plus, MapPin, Users, Clock, Flag } from 'lucide-react';

const Schedule = () => {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  // Sample events data
  const events = [
    { date: 5, title: "Navigation Exercise Briefing", time: "09:00", type: "briefing" },
    { date: 8, title: "Hill Navigation Exercise", time: "06:00", type: "exercise" },
    { date: 12, title: "Equipment Check & Prep", time: "14:00", type: "maintenance" },
    { date: 15, title: "Night Navigation Training", time: "19:00", type: "training" },
    { date: 18, title: "Map Reading Workshop", time: "11:30", type: "training" },
    { date: 22, title: "Compass & Navigation Tools", time: "08:00", type: "training" },
    { date: 25, title: "Advanced Navigation Planning", time: "15:00", type: "planning" },
    { date: today.getDate(), title: "Final Navigation Assessment", time: "07:00", type: "assessment" },
  ];
  
  // Function to generate days of the month
  const getDaysArray = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  // Get the days array
  const daysArray = getDaysArray();
  
  // Function to get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];
    return events.filter(event => event.date === day);
  };
  
  // Get month name
  const monthName = today.toLocaleString('default', { month: 'long' });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Exercise Schedule</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <Button size="sm" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Today
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthName} {today.getFullYear()}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {daysArray.map((day, index) => (
                  <div 
                    key={index} 
                    className={`min-h-[120px] border rounded-md p-1 ${
                      day === today.getDate() ? 'bg-primary/10 border-primary' : 'hover:bg-accent'
                    } ${!day ? 'bg-muted/30' : ''}`}
                  >
                    {day && (
                      <>
                        <div className="text-right text-sm font-medium p-1">
                          {day}
                        </div>
                        <div className="space-y-1">
                          {getEventsForDay(day).map((event, eventIndex) => (
                            <div 
                              key={eventIndex} 
                              className={`text-xs p-1 rounded truncate ${
                                event.type === 'briefing' ? 'bg-blue-100 text-blue-800' :
                                event.type === 'exercise' ? 'bg-red-100 text-red-800' :
                                event.type === 'training' ? 'bg-green-100 text-green-800' :
                                event.type === 'maintenance' ? 'bg-amber-100 text-amber-800' :
                                event.type === 'assessment' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {event.time} - {event.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Navigation Exercises</h2>
            <div className="space-y-4">
              {events
                .filter(event => event.date >= today.getDate())
                .sort((a, b) => a.date - b.date)
                .slice(0, 5)
                .map((event, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          {event.type === 'exercise' ? <Flag className="h-5 w-5 text-primary" /> :
                           event.type === 'training' ? <Users className="h-5 w-5 text-primary" /> :
                           event.type === 'assessment' ? <MapPin className="h-5 w-5 text-primary" /> :
                           <Clock className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {monthName} {event.date}, {event.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Schedule;
