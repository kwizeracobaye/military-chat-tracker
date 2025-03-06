
import React from 'react';
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart as AnalyticsBarChart, 
  Bar, 
  LineChart as AnalyticsLineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as AnalyticsPieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  // Sample data for charts
  const syndicateProgressData = [
    { name: 'Alpha', completed: 4, remaining: 1 },
    { name: 'Bravo', completed: 3, remaining: 2 },
    { name: 'Charlie', completed: 5, remaining: 0 },
    { name: 'Delta', completed: 2, remaining: 3 },
    { name: 'Echo', completed: 3, remaining: 2 },
    { name: 'Foxtrot', completed: 1, remaining: 4 },
  ];
  
  const navigationTimeData = [
    { name: 'CP1', alpha: 65, bravo: 75, charlie: 60 },
    { name: 'CP2', alpha: 70, bravo: 85, charlie: 65 },
    { name: 'CP3', alpha: 78, bravo: 90, charlie: 72 },
    { name: 'CP4', alpha: 82, bravo: 95, charlie: 78 },
    { name: 'CP5', alpha: 85, bravo: 98, charlie: 83 },
  ];
  
  const issueTypeData = [
    { name: 'Navigation Error', value: 45 },
    { name: 'Equipment Issue', value: 30 },
    { name: 'Weather Related', value: 15 },
    { name: 'Medical', value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Navigation Analytics</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Data updated: </span>
              <span className="text-sm font-medium">Today at 09:42</span>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Syndicates in Field</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6 Syndicates</div>
                <p className="text-xs text-muted-foreground">2 completed all checkpoints</p>
                <div className="h-[150px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsBarChart data={syndicateProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#3b82f6" name="Checkpoints Completed" />
                      <Bar dataKey="remaining" fill="#ef4444" name="Checkpoints Remaining" />
                    </AnalyticsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Navigation Efficiency</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-muted-foreground">+5% from previous exercise</p>
                <div className="h-[150px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsLineChart data={navigationTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="alpha" stroke="#3b82f6" strokeWidth={2} name="Alpha" />
                      <Line type="monotone" dataKey="bravo" stroke="#22c55e" strokeWidth={2} name="Bravo" />
                      <Line type="monotone" dataKey="charlie" stroke="#ef4444" strokeWidth={2} name="Charlie" />
                    </AnalyticsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reported Issues</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsPieChart>
                      <Pie
                        data={issueTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {issueTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </AnalyticsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Exercise Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsBarChart
                      data={[
                        { exercise: 'Hill Nav', completed: 18, incomplete: 2 },
                        { exercise: 'Night Nav', completed: 15, incomplete: 5 },
                        { exercise: 'River Nav', completed: 19, incomplete: 1 },
                        { exercise: 'Urban Nav', completed: 16, incomplete: 4 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="exercise" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                      <Bar dataKey="incomplete" fill="#ef4444" name="Incomplete" />
                    </AnalyticsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Checkpoint Timing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsLineChart
                      data={[
                        { checkpoint: 'Start', target: 15, actual: 17 },
                        { checkpoint: 'CP1', target: 45, actual: 52 },
                        { checkpoint: 'CP2', target: 70, actual: 68 },
                        { checkpoint: 'CP3', target: 95, actual: 103 },
                        { checkpoint: 'CP4', target: 120, actual: 125 },
                        { checkpoint: 'Finish', target: 150, actual: 142 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="checkpoint" />
                      <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="target" stroke="#3b82f6" name="Target Time" strokeWidth={2} />
                      <Line type="monotone" dataKey="actual" stroke="#ef4444" name="Actual Time" strokeWidth={2} />
                    </AnalyticsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
