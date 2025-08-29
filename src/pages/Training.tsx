import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Training() {
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(47);
  const [totalEpochs, setTotalEpochs] = useState(100);
  const [trainingLoss, setTrainingLoss] = useState(0.0042);
  const [validationAccuracy, setValidationAccuracy] = useState(94.2);
  const [logs, setLogs] = useState([
    "2024-01-15 14:23:15 - Training initialized with 15,000 Q&A pairs",
    "2024-01-15 14:23:16 - Model architecture: Transformer-based encoder-decoder",
    "2024-01-15 14:23:17 - Batch size: 32, Learning rate: 2e-5",
    "2024-01-15 14:24:45 - Epoch 45/100 - Loss: 0.0045 - Val Acc: 93.8%",
    "2024-01-15 14:26:12 - Epoch 46/100 - Loss: 0.0043 - Val Acc: 94.1%",
    "2024-01-15 14:27:38 - Epoch 47/100 - Loss: 0.0042 - Val Acc: 94.2%"
  ]);

  const [architecture, setArchitecture] = useState("transformer");
  const [batchSize, setBatchSize] = useState("32");
  const [learningRate, setLearningRate] = useState("2e-5");
  const [maxEpochs, setMaxEpochs] = useState("100");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTraining) {
      interval = setInterval(() => {
        if (currentEpoch < totalEpochs) {
          setCurrentEpoch(prev => prev + 1);
          const newLoss = Math.max(0.001, trainingLoss - Math.random() * 0.0002);
          const newAcc = Math.min(99.9, validationAccuracy + Math.random() * 0.3);
          setTrainingLoss(newLoss);
          setValidationAccuracy(newAcc);
          
          const timestamp = new Date().toLocaleString();
          const newLog = `${timestamp} - Epoch ${currentEpoch + 1}/${totalEpochs} - Loss: ${newLoss.toFixed(4)} - Val Acc: ${newAcc.toFixed(1)}%`;
          setLogs(prev => [...prev.slice(-10), newLog]);
        } else {
          setIsTraining(false);
          const timestamp = new Date().toLocaleString();
          setLogs(prev => [...prev, `${timestamp} - Training completed successfully!`]);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isTraining, currentEpoch, totalEpochs, trainingLoss, validationAccuracy]);

  const startTraining = () => {
    setIsTraining(true);
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [...prev, `${timestamp} - Starting new training session...`]);
  };

  const pauseTraining = () => {
    setIsTraining(false);
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [...prev, `${timestamp} - Training paused by user`]);
  };

  const stopTraining = () => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setTrainingLoss(0.1);
    setValidationAccuracy(85.0);
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [...prev, `${timestamp} - Training stopped and reset`]);
  };

  const configurations = [
    { name: "Medical BERT Base", description: "Pre-trained on medical literature", status: "ready" },
    { name: "BioBERT Clinical", description: "Optimized for clinical texts", status: "ready" },
    { name: "Custom Transformer", description: "Purpose-built for Q&A summarization", status: "active" },
    { name: "GPT Medical Fine-tune", description: "Large language model adaptation", status: "pending" }
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Model Training</h1>
          <p className="text-muted-foreground">Configure and monitor AI model training sessions</p>
        </div>
        <Badge variant={isTraining ? "default" : "outline"} className="px-3 py-1">
          <div className={`w-2 h-2 rounded-full mr-2 ${isTraining ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
          {isTraining ? "Training Active" : "Training Idle"}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Training Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-cogs text-primary mr-2"></i>
                Training Configuration
              </CardTitle>
              <CardDescription>Set up model architecture and hyperparameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="architecture">Model Architecture</Label>
                <Select value={architecture} onValueChange={setArchitecture}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transformer">Transformer Encoder-Decoder</SelectItem>
                    <SelectItem value="bert">BERT-based Summarizer</SelectItem>
                    <SelectItem value="gpt">GPT Fine-tuned</SelectItem>
                    <SelectItem value="biobert">BioBERT Clinical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="batch-size">Batch Size</Label>
                <Select value={batchSize} onValueChange={setBatchSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="32">32</SelectItem>
                    <SelectItem value="64">64</SelectItem>
                    <SelectItem value="128">128</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="learning-rate">Learning Rate</Label>
                <Select value={learningRate} onValueChange={setLearningRate}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1e-5">1e-5</SelectItem>
                    <SelectItem value="2e-5">2e-5</SelectItem>
                    <SelectItem value="5e-5">5e-5</SelectItem>
                    <SelectItem value="1e-4">1e-4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="max-epochs">Maximum Epochs</Label>
                <Input
                  id="max-epochs"
                  type="number"
                  value={maxEpochs}
                  onChange={(e) => setMaxEpochs(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={startTraining} 
                  disabled={isTraining}
                  className="flex-1"
                  size="sm"
                >
                  <i className="fas fa-play mr-1"></i>
                  Start
                </Button>
                <Button 
                  onClick={pauseTraining} 
                  disabled={!isTraining}
                  variant="outline"
                  className="flex-1"
                  size="sm"
                >
                  <i className="fas fa-pause mr-1"></i>
                  Pause
                </Button>
                <Button 
                  onClick={stopTraining}
                  variant="destructive"
                  className="flex-1"
                  size="sm"
                >
                  <i className="fas fa-stop mr-1"></i>
                  Stop
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Model Configurations */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-layer-group text-primary mr-2"></i>
                Available Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {configurations.map((config, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <div className="font-medium text-sm text-foreground">{config.name}</div>
                      <div className="text-xs text-muted-foreground">{config.description}</div>
                    </div>
                    <Badge variant={config.status === "active" ? "default" : 
                                   config.status === "ready" ? "outline" : "secondary"}>
                      {config.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Progress and Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Training Progress */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-chart-line text-primary mr-2"></i>
                Training Progress
              </CardTitle>
              <CardDescription>Real-time training metrics and progress tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{currentEpoch}/{totalEpochs}</div>
                  <div className="text-sm text-muted-foreground">Epochs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{trainingLoss.toFixed(4)}</div>
                  <div className="text-sm text-muted-foreground">Training Loss</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{validationAccuracy.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Validation Acc</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {isTraining ? Math.ceil((totalEpochs - currentEpoch) * 1.5) : 0}m
                  </div>
                  <div className="text-sm text-muted-foreground">Time Remaining</div>
                </div>
              </div>
              <Progress value={(currentEpoch / totalEpochs) * 100} className="h-3 mb-2" />
              <div className="text-sm text-muted-foreground text-center">
                {isTraining ? "Training in progress..." : "Training idle"}
              </div>
            </CardContent>
          </Card>

          {/* Training Logs */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-terminal text-primary mr-2"></i>
                Training Logs
              </CardTitle>
              <CardDescription>Real-time training output and system messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-black/90 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
                {logs.map((log, index) => (
                  <div key={index} className="text-green-400 mb-1">
                    {log}
                  </div>
                ))}
                {isTraining && (
                  <div className="text-yellow-400 animate-pulse">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Training epoch {currentEpoch + 1}...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Training Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BLEU Score:</span>
                  <span className="font-medium text-foreground">0.847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ROUGE-L:</span>
                  <span className="font-medium text-foreground">0.762</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Perplexity:</span>
                  <span className="font-medium text-foreground">2.14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">F1 Score:</span>
                  <span className="font-medium text-foreground">0.891</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="text-lg">System Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">GPU Usage:</span>
                    <span className="font-medium text-foreground">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Memory:</span>
                    <span className="font-medium text-foreground">24.3/32 GB</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="font-medium text-foreground">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}