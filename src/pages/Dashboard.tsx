import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const metrics = [
    { title: "Total Q&As Processed", value: "25,847", change: "+12.3%", trend: "up", icon: "fas fa-comments" },
    { title: "Model Accuracy", value: "94.2%", change: "+2.1%", trend: "up", icon: "fas fa-bullseye" },
    { title: "Avg Processing Time", value: "1.3s", change: "-0.2s", trend: "down", icon: "fas fa-bolt" },
    { title: "Safety Score", value: "99.8%", change: "+0.1%", trend: "up", icon: "fas fa-shield-check" }
  ];

  const recentActivity = [
    { id: 1, time: "2 minutes ago", action: "New medical Q&A processed", type: "processing", status: "completed" },
    { id: 2, time: "5 minutes ago", action: "PDF document uploaded", type: "upload", status: "completed" },
    { id: 3, time: "12 minutes ago", action: "AI summary generated", type: "ai", status: "completed" },
    { id: 4, time: "15 minutes ago", action: "System health check", type: "system", status: "completed" },
    { id: 5, time: "1 hour ago", action: "Model performance update", type: "ai", status: "completed" }
  ];

  const [modelStatus, setModelStatus] = useState([
    { name: "Custom LLM", status: "loading", accuracy: 0, load: 0 },
  ]);

  // Fetch real-time model status
  useEffect(() => {
    const fetchModelStatus = async () => {
      try {
        const { llmClient } = await import('@/lib/llm-client');
        const status = await llmClient.getModelStatus();
        
        setModelStatus([{
          name: "Custom LLM",
          status: status.status,
          accuracy: status.accuracy,
          load: status.load
        }]);
      } catch (error) {
        console.error('Failed to fetch model status:', error);
        setModelStatus([{
          name: "Custom LLM",
          status: "offline",
          accuracy: 0,
          load: 0
        }]);
      }
    };

    fetchModelStatus();
    const interval = setInterval(fetchModelStatus, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your medical AI summarization system</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
          System Online
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="card-gradient border-0 card-shadow hover:elevated-shadow transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="text-primary">
                <i className={metric.icon}></i>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className={`text-xs flex items-center ${
                metric.trend === 'up' ? 'text-success' : 'text-primary'
              }`}>
                <i className={`fas ${metric.trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Model Status and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Model Status */}
        <Card className="card-gradient border-0 card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-server text-primary mr-2"></i>
              Model Status
            </CardTitle>
            <CardDescription>Real-time AI model performance monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {modelStatus.map((model, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{model.name}</span>
                  <Badge variant={model.status === 'online' ? 'default' : 'destructive'}>
                    {model.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Accuracy: </span>
                    <span className="font-medium text-foreground">{model.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Load: </span>
                    <span className="font-medium text-foreground">{model.load}%</span>
                  </div>
                </div>
                <Progress value={model.load} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-gradient border-0 card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <i className="fas fa-history text-primary mr-2"></i>
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system operations and processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    activity.type === 'processing' ? 'bg-primary/10 text-primary' :
                    activity.type === 'upload' ? 'bg-success/10 text-success' :
                    activity.type === 'ai' ? 'bg-warning/10 text-warning' :
                    activity.type === 'system' ? 'bg-muted text-muted-foreground' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    <i className={`fas ${
                      activity.type === 'processing' ? 'fa-file-medical' :
                      activity.type === 'upload' ? 'fa-file-upload' :
                      activity.type === 'ai' ? 'fa-robot' :
                      activity.type === 'system' ? 'fa-cogs' :
                      'fa-shield-check'
                    }`}></i>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}