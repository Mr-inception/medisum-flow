import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Analytics() {
  const performanceMetrics = [
    { label: "Overall Accuracy", value: 94.2, change: "+2.1%", trend: "up" },
    { label: "Patient Summary Quality", value: 92.8, change: "+1.8%", trend: "up" },
    { label: "Clinical Summary Quality", value: 96.1, change: "+0.9%", trend: "up" },
    { label: "Processing Speed", value: 87.5, change: "+5.2%", trend: "up" }
  ];

  const usageStats = [
    { period: "Last 24h", summaries: 1247, patients: 834, clinicians: 413 },
    { period: "Last 7d", summaries: 8932, patients: 5891, clinicians: 3041 },
    { period: "Last 30d", summaries: 35467, patients: 23144, clinicians: 12323 },
    { period: "All time", summaries: 125847, patients: 82345, clinicians: 43502 }
  ];

  const accuracyTrends = [
    { date: "Jan 1", patient: 89.2, clinician: 92.1, overall: 90.6 },
    { date: "Jan 5", patient: 90.1, clinician: 93.4, overall: 91.7 },
    { date: "Jan 10", patient: 91.3, clinician: 94.8, overall: 93.0 },
    { date: "Jan 15", patient: 92.8, clinician: 96.1, overall: 94.2 }
  ];

  const modelComparison = [
    { model: "Primary Transformer", accuracy: 94.2, speed: 1.3, quality: 96.8 },
    { model: "BERT Medical", accuracy: 91.7, speed: 0.9, quality: 94.2 },
    { model: "BioBERT Clinical", accuracy: 93.1, speed: 1.1, quality: 95.5 },
    { model: "GPT Fine-tuned", accuracy: 96.4, speed: 2.1, quality: 97.9 }
  ];

  const errorAnalysis = [
    { type: "Medical Terminology", count: 23, percentage: 2.1, severity: "low" },
    { type: "Context Misunderstanding", count: 15, percentage: 1.4, severity: "medium" },
    { type: "Incomplete Information", count: 8, percentage: 0.7, severity: "high" },
    { type: "Safety Violations", count: 2, percentage: 0.2, severity: "critical" }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Model performance insights and usage analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <i className="fas fa-sync-alt mr-1"></i>
            Last updated: 2 min ago
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="usage">Usage Stats</TabsTrigger>
          <TabsTrigger value="models">Model Comparison</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {/* Key Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="card-gradient border-0 card-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">{metric.value}%</div>
                    <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                    <div className={`text-xs flex items-center justify-center ${
                      metric.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      <i className={`fas ${metric.trend === 'up' ? 'fa-arrow-up' : 'fa-arrow-down'} mr-1`}></i>
                      {metric.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Accuracy Trends Chart */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-chart-line text-primary mr-2"></i>
                Accuracy Trends
              </CardTitle>
              <CardDescription>Model accuracy over time by summary type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accuracyTrends.map((trend, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center">
                    <div className="text-sm font-medium text-foreground">{trend.date}</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Patient</span>
                        <span className="text-foreground">{trend.patient}%</span>
                      </div>
                      <Progress value={trend.patient} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Clinician</span>
                        <span className="text-foreground">{trend.clinician}%</span>
                      </div>
                      <Progress value={trend.clinician} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Overall</span>
                        <span className="text-foreground font-medium">{trend.overall}%</span>
                      </div>
                      <Progress value={trend.overall} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle>Response Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Medical Accuracy</span>
                    <span className="font-medium text-foreground">97.8%</span>
                  </div>
                  <Progress value={97.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language Clarity</span>
                    <span className="font-medium text-foreground">94.5%</span>
                  </div>
                  <Progress value={94.5} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completeness</span>
                    <span className="font-medium text-foreground">92.1%</span>
                  </div>
                  <Progress value={92.1} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Safety Compliance</span>
                    <span className="font-medium text-foreground">99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle>Processing Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1.34s</div>
                  <div className="text-sm text-muted-foreground">Average Processing Time</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-foreground">0.87s</div>
                    <div className="text-xs text-muted-foreground">Patient Summaries</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">1.81s</div>
                    <div className="text-xs text-muted-foreground">Clinical Summaries</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">95th Percentile</span>
                    <span className="text-foreground">2.3s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">99th Percentile</span>
                    <span className="text-foreground">4.1s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-chart-bar text-primary mr-2"></i>
                Usage Statistics
              </CardTitle>
              <CardDescription>Summary generation usage across different time periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageStats.map((stat, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center p-4 rounded-lg bg-muted/30">
                    <div className="font-medium text-foreground">{stat.period}</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">{stat.summaries.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{stat.patients.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Patient</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">{stat.clinicians.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Clinical</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle>Peak Usage Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <i className="fas fa-clock text-4xl mb-4 opacity-50"></i>
                  <p>Hourly usage distribution chart</p>
                  <p className="text-sm">Peak hours: 9-11 AM, 2-4 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Healthcare Professionals</span>
                    <span className="font-medium text-foreground">68.4%</span>
                  </div>
                  <Progress value={68.4} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patients/Families</span>
                    <span className="font-medium text-foreground">24.7%</span>
                  </div>
                  <Progress value={24.7} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Researchers</span>
                    <span className="font-medium text-foreground">6.9%</span>
                  </div>
                  <Progress value={6.9} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Models Tab */}
        <TabsContent value="models" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-layer-group text-primary mr-2"></i>
                Model Performance Comparison
              </CardTitle>
              <CardDescription>Comparative analysis of different AI models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {modelComparison.map((model, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-foreground">{model.model}</h3>
                      <Badge variant={index === 0 ? "default" : "outline"}>
                        {index === 0 ? "Active" : "Available"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
                        <div className="text-lg font-bold text-foreground">{model.accuracy}%</div>
                        <Progress value={model.accuracy} className="h-1 mt-1" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Speed</div>
                        <div className="text-lg font-bold text-foreground">{model.speed}s</div>
                        <Progress value={100 - (model.speed * 20)} className="h-1 mt-1" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Quality</div>
                        <div className="text-lg font-bold text-foreground">{model.quality}%</div>
                        <Progress value={model.quality} className="h-1 mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Errors Tab */}
        <TabsContent value="errors" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-exclamation-triangle text-primary mr-2"></i>
                Error Analysis
              </CardTitle>
              <CardDescription>Analysis of model errors and areas for improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {errorAnalysis.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`text-xl ${
                        error.severity === 'critical' ? 'text-destructive' :
                        error.severity === 'high' ? 'text-warning' :
                        error.severity === 'medium' ? 'text-primary' :
                        'text-muted-foreground'
                      }`}>
                        <i className={`fas ${
                          error.severity === 'critical' ? 'fa-times-circle' :
                          error.severity === 'high' ? 'fa-exclamation-circle' :
                          error.severity === 'medium' ? 'fa-info-circle' :
                          'fa-check-circle'
                        }`}></i>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{error.type}</div>
                        <div className="text-sm text-muted-foreground">{error.count} occurrences ({error.percentage}%)</div>
                      </div>
                    </div>
                    <Badge variant={
                      error.severity === 'critical' ? 'destructive' :
                      error.severity === 'high' ? 'secondary' :
                      'outline'
                    }>
                      {error.severity}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-accent/20">
                <h3 className="font-medium text-foreground mb-2">Improvement Recommendations</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enhance medical terminology training data</li>
                  <li>• Implement additional context awareness mechanisms</li>
                  <li>• Strengthen safety validation protocols</li>
                  <li>• Increase clinical expert review processes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}