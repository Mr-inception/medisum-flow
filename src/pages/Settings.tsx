import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  const [autoSave, setAutoSave] = useState(true);
  const [safetyMode, setSafetyMode] = useState(true);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState([85]);
  const [maxLength, setMaxLength] = useState([500]);
  const [temperature, setTemperature] = useState([0.7]);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your medical AI system preferences</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="models">Model Config</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="export">Export/Import</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-cog text-primary mr-2"></i>
                  Application Settings
                </CardTitle>
                <CardDescription>Basic application preferences and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-save">Auto-save Summaries</Label>
                    <p className="text-sm text-muted-foreground">Automatically save generated summaries</p>
                  </div>
                  <Switch
                    id="auto-save"
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">System Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show training and processing notifications</p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Interface Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="cet">Central European Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-user text-primary mr-2"></i>
                  User Preferences
                </CardTitle>
                <CardDescription>Customize your experience and workflow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-perspective">Default Summary Perspective</Label>
                  <Select defaultValue="patient">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient-Friendly</SelectItem>
                      <SelectItem value="clinician">Clinician-Focused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary-length">Preferred Summary Length</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (100-200 words)</SelectItem>
                      <SelectItem value="medium">Medium (200-400 words)</SelectItem>
                      <SelectItem value="long">Long (400-600 words)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-preference">Preferred AI Model</Label>
                  <Select defaultValue="transformer">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transformer">Primary Transformer</SelectItem>
                      <SelectItem value="bert">BERT Medical</SelectItem>
                      <SelectItem value="biobert">BioBERT Clinical</SelectItem>
                      <SelectItem value="gpt">GPT Fine-tuned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="advanced-mode">Advanced Mode</Label>
                    <p className="text-sm text-muted-foreground">Show detailed model parameters</p>
                  </div>
                  <Switch
                    id="advanced-mode"
                    checked={advancedMode}
                    onCheckedChange={setAdvancedMode}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Model Configuration Tab */}
        <TabsContent value="models" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-brain text-primary mr-2"></i>
                Model Configuration
              </CardTitle>
              <CardDescription>Adjust AI model parameters and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Confidence Threshold: {confidenceThreshold[0]}%</Label>
                    <Slider
                      value={confidenceThreshold}
                      onValueChange={setConfidenceThreshold}
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum confidence required for summary generation
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Maximum Summary Length: {maxLength[0]} words</Label>
                    <Slider
                      value={maxLength}
                      onValueChange={setMaxLength}
                      max={1000}
                      min={100}
                      step={50}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum number of words in generated summaries
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Temperature: {temperature[0]}</Label>
                    <Slider
                      value={temperature}
                      onValueChange={setTemperature}
                      max={2}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Controls randomness in AI output (lower = more focused)
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt-template">Custom Prompt Template</Label>
                    <Textarea
                      id="prompt-template"
                      placeholder="Enter custom prompt template..."
                      defaultValue="Summarize the following medical Q&A for [PERSPECTIVE] audience, ensuring accuracy and clarity..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fallback-model">Fallback Model</Label>
                    <Select defaultValue="bert">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bert">BERT Medical</SelectItem>
                        <SelectItem value="biobert">BioBERT Clinical</SelectItem>
                        <SelectItem value="gpt">GPT Fine-tuned</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Model to use if primary model fails
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety Tab */}
        <TabsContent value="safety" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-shield-alt text-primary mr-2"></i>
                Safety Configuration
              </CardTitle>
              <CardDescription>Medical safety protocols and compliance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="safety-mode">Enhanced Safety Mode</Label>
                      <p className="text-sm text-muted-foreground">Strict medical safety validation</p>
                    </div>
                    <Switch
                      id="safety-mode"
                      checked={safetyMode}
                      onCheckedChange={setSafetyMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disclaimer-level">Disclaimer Level</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="validation-level">Content Validation</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="maximum">Maximum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-exclamation-triangle text-warning mr-2"></i>
                      <span className="font-medium text-foreground">Safety Protocols Active</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Medical terminology validation</li>
                      <li>• Clinical accuracy verification</li>
                      <li>• Safety disclaimer enforcement</li>
                      <li>• Content appropriateness filtering</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <Select defaultValue="full">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Disabled</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="full">Full Audit Trail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export/Import Tab */}
        <TabsContent value="export" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-download text-primary mr-2"></i>
                  Export Data
                </CardTitle>
                <CardDescription>Export your data and configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <i className="fas fa-file-export mr-2"></i>
                  Export All Summaries
                </Button>
                <Button className="w-full" variant="outline">
                  <i className="fas fa-cog mr-2"></i>
                  Export Configuration
                </Button>
                <Button className="w-full" variant="outline">
                  <i className="fas fa-chart-bar mr-2"></i>
                  Export Analytics Data
                </Button>
                <Button className="w-full" variant="outline">
                  <i className="fas fa-database mr-2"></i>
                  Export Training Data
                </Button>

                <div className="mt-4 p-3 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground">
                    <i className="fas fa-info-circle mr-1"></i>
                    Exports include metadata and comply with medical data standards
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-upload text-primary mr-2"></i>
                  Import Data
                </CardTitle>
                <CardDescription>Import configurations and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <i className="fas fa-cloud-upload-alt text-2xl text-muted-foreground mb-2"></i>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop configuration files here
                  </p>
                  <Button variant="outline" size="sm">
                    <i className="fas fa-folder-open mr-1"></i>
                    Browse Files
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <i className="fas fa-cog mr-2"></i>
                    Import Configuration
                  </Button>
                  <Button className="w-full" variant="outline">
                    <i className="fas fa-database mr-2"></i>
                    Import Training Data
                  </Button>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="text-xs text-muted-foreground">
                    <i className="fas fa-shield-check mr-1"></i>
                    All imports are validated for safety and compatibility
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-tools text-primary mr-2"></i>
                Advanced Settings
              </CardTitle>
              <CardDescription>Advanced configuration options for power users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">Custom API Endpoint</Label>
                    <Input
                      id="api-endpoint"
                      placeholder="https://api.example.com/v1"
                      defaultValue=""
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batch-size">Processing Batch Size</Label>
                    <Input
                      id="batch-size"
                      type="number"
                      defaultValue="32"
                      min="1"
                      max="128"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cache-size">Cache Size (MB)</Label>
                    <Input
                      id="cache-size"
                      type="number"
                      defaultValue="512"
                      min="64"
                      max="2048"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select defaultValue="info">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      defaultValue="30"
                      min="5"
                      max="300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retry-attempts">Retry Attempts</Label>
                    <Input
                      id="retry-attempts"
                      type="number"
                      defaultValue="3"
                      min="0"
                      max="10"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex space-x-4">
                  <Button>
                    <i className="fas fa-save mr-2"></i>
                    Save All Settings
                  </Button>
                  <Button variant="outline">
                    <i className="fas fa-undo mr-2"></i>
                    Reset to Defaults
                  </Button>
                  <Button variant="destructive">
                    <i className="fas fa-trash mr-2"></i>
                    Clear All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}