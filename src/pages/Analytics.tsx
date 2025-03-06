
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
  const operationalData = [
    { name: 'Jan', units: 4 },
    { name: 'Feb', units: 6 },
    { name: 'Mar', units: 8 },
    { name: 'Apr', units: 7 },
    { name: 'May', units: 9 },
    { name: 'Jun', units: 10 },
  ];
  
  const efficiencyData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 70 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 82 },
    { name: 'May', value: 85 },
    { name: 'Jun', value: 88 },
  ];
  
  const resourceData = [
    { name: 'Personnel', value: 45 },
    { name: 'Equipment', value: 30 },
    { name: 'Logistics', value: 15 },
    { name: 'Communications', value: 10 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="pt-24 lg:pl-64 pb-6 transition-all duration-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Analytics Dashboard</h1>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="text-sm text-muted-foreground">Data updated: </span>
              <span className="text-sm font-medium">Today at 09:42</span>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Operational Units</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10 Units</div>
                <p className="text-xs text-muted-foreground">+25% from last month</p>
                <div className="h-[150px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsBarChart data={operationalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="units" fill="#3b82f6" />
                    </AnalyticsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">88%</div>
                <p className="text-xs text-muted-foreground">+3% from last month</p>
                <div className="h-[150px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsLineChart data={efficiencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </AnalyticsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Resource Allocation</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsPieChart>
                      <Pie
                        data={resourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {resourceData.map((entry, index) => (
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
                <CardTitle>Mission Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsBarChart
                      data={[
                        { name: 'Q1', completed: 18, aborted: 2 },
                        { name: 'Q2', completed: 22, aborted: 1 },
                        { name: 'Q3', completed: 19, aborted: 3 },
                        { name: 'Q4', completed: 25, aborted: 0 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                      <Bar dataKey="aborted" fill="#ef4444" name="Aborted" />
                    </AnalyticsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Equipment Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AnalyticsLineChart
                      data={[
                        { month: 'Jan', vehicles: 92, comms: 88, weapons: 95 },
                        { month: 'Feb', vehicles: 90, comms: 91, weapons: 93 },
                        { month: 'Mar', vehicles: 94, comms: 95, weapons: 98 },
                        { month: 'Apr', vehicles: 95, comms: 93, weapons: 97 },
                        { month: 'May', vehicles: 97, comms: 96, weapons: 99 },
                        { month: 'Jun', vehicles: 98, comms: 97, weapons: 100 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="vehicles" stroke="#3b82f6" name="Vehicles" strokeWidth={2} />
                      <Line type="monotone" dataKey="comms" stroke="#8b5cf6" name="Communications" strokeWidth={2} />
                      <Line type="monotone" dataKey="weapons" stroke="#ef4444" name="Weapons" strokeWidth={2} />
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
