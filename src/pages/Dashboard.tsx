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
    { time: "2 minutes ago", action: "Patient summary generated", type: "patient", status: "completed" },
    { time: "5 minutes ago", action: "Clinician report processed", type: "clinician", status: "completed" },
    { time: "12 minutes ago", action: "Model training iteration #47", type: "training", status: "in-progress" },
    { time: "18 minutes ago", action: "Dataset validation completed", type: "dataset", status: "completed" },
    { time: "25 minutes ago", action: "Safety check performed", type: "safety", status: "completed" }
  ];

  const modelStatus = [
    { name: "Primary Summarization Model", status: "online", accuracy: 94.2, load: 67 },
    { name: "Patient-Friendly Translator", status: "online", accuracy: 92.8, load: 45 },
    { name: "Clinical Terminology Processor", status: "online", accuracy: 96.1, load: 78 },
    { name: "Safety Validation Engine", status: "online", accuracy: 99.8, load: 23 }
  ];

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
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    activity.type === 'patient' ? 'bg-primary/10 text-primary' :
                    activity.type === 'clinician' ? 'bg-success/10 text-success' :
                    activity.type === 'training' ? 'bg-warning/10 text-warning' :
                    activity.type === 'dataset' ? 'bg-muted text-muted-foreground' :
                    'bg-secondary text-secondary-foreground'
                  }`}>
                    <i className={`fas ${
                      activity.type === 'patient' ? 'fa-user' :
                      activity.type === 'clinician' ? 'fa-user-md' :
                      activity.type === 'training' ? 'fa-cogs' :
                      activity.type === 'dataset' ? 'fa-database' :
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

      {/* Training Progress */}
      <Card className="card-gradient border-0 card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-chart-line text-primary mr-2"></i>
            Current Training Session
          </CardTitle>
          <CardDescription>Model training iteration #47 - Advanced medical terminology processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">47/100</div>
                <div className="text-sm text-muted-foreground">Epochs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">0.0042</div>
                <div className="text-sm text-muted-foreground">Current Loss</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">2h 15m</div>
                <div className="text-sm text-muted-foreground">Est. Time Remaining</div>
              </div>
            </div>
            <Progress value={47} className="h-3" />
            <div className="text-sm text-muted-foreground text-center">
              Training with advanced medical dataset (15,000 Q&A pairs)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}