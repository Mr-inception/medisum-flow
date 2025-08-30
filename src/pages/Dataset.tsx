import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dataset() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const datasets = [
    {
      name: "Medical Q&A Primary",
      size: "15,247 pairs",
      quality: 98.2,
      status: "active",
      lastUpdated: "2024-01-15",
      source: "Medical Literature"
    },
    {
      name: "Clinical Guidelines",
      size: "8,932 pairs",
      quality: 96.8,
      status: "active",
      lastUpdated: "2024-01-14",
      source: "Clinical Practice"
    },
    {
      name: "Patient Education",
      size: "12,455 pairs",
      quality: 94.5,
      status: "active",
      lastUpdated: "2024-01-13",
      source: "Educational Materials"
    },
    {
      name: "Specialty Medicine",
      size: "6,789 pairs",
      quality: 97.1,
      status: "validation",
      lastUpdated: "2024-01-12",
      source: "Specialty Journals"
    }
  ];

  const qualityMetrics = [
    { metric: "Data Completeness", value: 98.5, color: "text-success" },
    { metric: "Medical Accuracy", value: 96.8, color: "text-primary" },
    { metric: "Language Quality", value: 94.2, color: "text-warning" },
    { metric: "Consistency Score", value: 97.3, color: "text-success" }
  ];

  const validationResults = [
    { check: "Medical Terminology Validation", status: "passed", details: "15,247/15,247 entries verified" },
    { check: "Duplicate Detection", status: "passed", details: "0 duplicates found" },
    { check: "Language Quality Check", status: "warning", details: "23 entries flagged for review" },
    { check: "Content Safety Screening", status: "passed", details: "All entries safety approved" },
    { check: "Format Consistency", status: "passed", details: "Standard JSON format maintained" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dataset Management</h1>
          <p className="text-muted-foreground">Manage medical data and quality validation for AI processing</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <i className="fas fa-database mr-1"></i>
            43,423 Total Q&As
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Dataset Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="card-gradient border-0 card-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-primary mb-2">
                    <i className="fas fa-database"></i>
                  </div>
                  <div className="text-2xl font-bold text-foreground">43,423</div>
                  <div className="text-sm text-muted-foreground">Total Q&A Pairs</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-success mb-2">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="text-2xl font-bold text-foreground">96.8%</div>
                  <div className="text-sm text-muted-foreground">Quality Score</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-warning mb-2">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="text-2xl font-bold text-foreground">2h</div>
                  <div className="text-sm text-muted-foreground">Last Validation</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl text-primary mb-2">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div className="text-2xl font-bold text-foreground">4</div>
                  <div className="text-sm text-muted-foreground">Active Datasets</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dataset List */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-folder-open text-primary mr-2"></i>
                Active Datasets
              </CardTitle>
                              <CardDescription>Currently available datasets for AI processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {datasets.map((dataset, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-foreground">{dataset.name}</h3>
                        <Badge variant={dataset.status === "active" ? "default" : "secondary"}>
                          {dataset.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{dataset.size}</span>
                        <span>Quality: {dataset.quality}%</span>
                        <span>Updated: {dataset.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <i className="fas fa-eye mr-1"></i>
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-download mr-1"></i>
                        Export
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-cloud-upload-alt text-primary mr-2"></i>
                Upload New Dataset
              </CardTitle>
              <CardDescription>Add new medical Q&A data for AI processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="text-4xl text-muted-foreground mb-4">
                  <i className="fas fa-file-upload"></i>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Upload Dataset File</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your dataset file here, or click to browse
                </p>
                <Input
                  type="file"
                  accept=".json,.csv,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    <i className="fas fa-folder-open mr-2"></i>
                    Choose File
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: JSON, CSV, Excel (.xlsx)
                </p>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-accent/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Data Format Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="space-y-1">
                      <li>• Each entry must have "question" and "answer" fields</li>
                      <li>• Medical accuracy is required for all content</li>
                      <li>• Maximum 10,000 entries per upload</li>
                      <li>• UTF-8 encoding required</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-warning/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Validation Process</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <ul className="space-y-1">
                      <li>• Automatic medical terminology validation</li>
                      <li>• Duplicate detection and removal</li>
                      <li>• Content safety screening</li>
                      <li>• Quality score assessment</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality Metrics Tab */}
        <TabsContent value="quality" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-pie text-primary mr-2"></i>
                  Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{metric.metric}</span>
                      <span className={`font-medium ${metric.color}`}>{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-trending-up text-primary mr-2"></i>
                  Quality Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <i className="fas fa-chart-line text-4xl mb-4 opacity-50"></i>
                  <p>Quality trend visualization</p>
                  <p className="text-sm">Chart showing quality metrics over time</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle>Dataset Quality Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {datasets.map((dataset, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
                    <h3 className="font-medium text-foreground mb-2">{dataset.name}</h3>
                    <div className="text-2xl font-bold text-primary mb-1">{dataset.quality}%</div>
                    <div className="text-xs text-muted-foreground">{dataset.size}</div>
                    <Progress value={dataset.quality} className="h-1 mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Validation Tab */}
        <TabsContent value="validation" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-shield-check text-primary mr-2"></i>
                Data Validation Results
              </CardTitle>
              <CardDescription>Automated validation checks on dataset integrity and quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`text-xl ${
                        result.status === 'passed' ? 'text-success' :
                        result.status === 'warning' ? 'text-warning' :
                        'text-destructive'
                      }`}>
                        <i className={`fas ${
                          result.status === 'passed' ? 'fa-check-circle' :
                          result.status === 'warning' ? 'fa-exclamation-triangle' :
                          'fa-times-circle'
                        }`}></i>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{result.check}</div>
                        <div className="text-sm text-muted-foreground">{result.details}</div>
                      </div>
                    </div>
                    <Badge variant={
                      result.status === 'passed' ? 'default' :
                      result.status === 'warning' ? 'secondary' :
                      'destructive'
                    }>
                      {result.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex space-x-4">
                <Button>
                  <i className="fas fa-play mr-2"></i>
                  Run Full Validation
                </Button>
                <Button variant="outline">
                  <i className="fas fa-download mr-2"></i>
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}