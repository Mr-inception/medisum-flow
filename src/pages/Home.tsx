import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState("");
  const [perspective, setPerspective] = useState<"patient" | "clinician">("patient");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const features = [
    {
      icon: "fas fa-user-md",
      title: "Patient-Friendly Summaries",
      description: "Transform complex medical information into clear, understandable language for patients.",
      color: "text-primary"
    },
    {
      icon: "fas fa-stethoscope",
      title: "Clinician-Focused Reports",
      description: "Generate precise, technical summaries tailored for healthcare professionals.",
      color: "text-success"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Medical Safety First",
      description: "Built with strict safety protocols and medical disclaimer compliance.",
      color: "text-warning"
    },
    {
      icon: "fas fa-chart-line",
      title: "Real-time Analytics",
      description: "Monitor model performance and accuracy with comprehensive analytics.",
      color: "text-primary"
    }
  ];

  const stats = [
    { label: "Q&As Processed", value: "25,847", icon: "fas fa-comments" },
    { label: "Model Accuracy", value: "94.2%", icon: "fas fa-bullseye" },
    { label: "Processing Speed", value: "1.3s", icon: "fas fa-bolt" },
    { label: "Safety Score", value: "99.8%", icon: "fas fa-shield-check" }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setSummary("");
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setSummary("");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setSummary("");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copySummary = async () => {
    if (summary) {
      try {
        await navigator.clipboard.writeText(summary);
        // You could add a toast notification here
      } catch (error) {
        console.error('Failed to copy summary:', error);
      }
    }
  };

  const processPDF = async () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    setSummary("");

    try {
      // Show initial progress
      setUploadProgress(10);
      
      // Convert file to base64 for API transmission
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          setUploadProgress(30);
          
          const base64Content = e.target?.result as string;
          const base64Data = base64Content.split(',')[1]; // Remove data:application/pdf;base64, prefix
          
          setUploadProgress(50);
          
          // Call the backend API
          const response = await fetch('http://localhost:8000/upload-pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pdf_content: base64Data,
              perspective: perspective,
              max_length: 200
            }),
          });

          setUploadProgress(80);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.error) {
            setSummary(`Error: ${data.error}`);
          } else {
            setSummary(data.summary);
          }
          
          setUploadProgress(100);
        } catch (error) {
          console.error('Error processing PDF:', error);
          setSummary(`Error processing PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
          setIsProcessing(false);
        }
      };
      
      reader.readAsDataURL(uploadedFile);
      
    } catch (error) {
      console.error('Error processing PDF:', error);
      setSummary(`Error processing PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden medical-gradient">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              MediSum
              <span className="block text-4xl font-light opacity-90"></span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95">
              Advanced AI-powered medical question and answer summarization with dual perspectives 
              for both patients and healthcare professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/summarize">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  <i className="fas fa-brain mr-2"></i>
                  Try Summarization
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent border-white/60 text-white hover:bg-white/10 hover:text-white">
                  <i className="fas fa-chart-line mr-2"></i>
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Upload Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Upload Medical Documents
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload PDF medical documents and get instant AI-powered summaries tailored for patients or clinicians
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Area */}
              <Card className="card-gradient border-0 card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-file-pdf text-primary mr-2"></i>
                    Document Upload
                  </CardTitle>
                  <CardDescription>
                    Drag & drop or click to upload medical PDF documents
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      uploadedFile 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50'
                    }`}
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                  >
                    {uploadedFile ? (
                      <div className="space-y-4">
                        <div className="text-primary text-4xl">
                          <i className="fas fa-file-pdf"></i>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <Button onClick={resetUpload} variant="outline" size="sm">
                          <i className="fas fa-times mr-2"></i>
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-muted-foreground text-4xl">
                          <i className="fas fa-cloud-upload-alt"></i>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Drop your PDF here</p>
                          <p className="text-sm text-muted-foreground">or click to browse</p>
                        </div>
                        <Button 
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                        >
                          <i className="fas fa-upload mr-2"></i>
                          Choose File
                        </Button>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Perspective Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Summary Perspective</Label>
                    <div className="flex space-x-2">
                      <Button
                        variant={perspective === "patient" ? "default" : "outline"}
                        onClick={() => setPerspective("patient")}
                        className="flex-1"
                        size="sm"
                      >
                        <i className="fas fa-user mr-2"></i>
                        Patient-Friendly
                      </Button>
                      <Button
                        variant={perspective === "clinician" ? "default" : "outline"}
                        onClick={() => setPerspective("clinician")}
                        className="flex-1"
                        size="sm"
                      >
                        <i className="fas fa-user-md mr-2"></i>
                        Clinician-Focused
                      </Button>
                    </div>
                  </div>

                  {/* Process Button */}
                  <Button
                    onClick={processPDF}
                    disabled={!uploadedFile || isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-magic mr-2"></i>
                        Generate {perspective === "patient" ? "Patient" : "Clinical"} Summary
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Results Area */}
              <Card className="card-gradient border-0 card-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-brain text-primary mr-2"></i>
                    AI Summary
                    {perspective && (
                      <Badge variant="outline" className="ml-2">
                        {perspective === "patient" ? "Patient-Friendly" : "Clinical"}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    AI-generated summary of your medical document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isProcessing ? (
                    <div className="space-y-4">
                      <Progress value={uploadProgress} className="w-full" />
                      <div className="text-center text-sm text-muted-foreground">
                        Processing your document... {uploadProgress}%
                      </div>
                    </div>
                  ) : summary ? (
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap text-foreground">
                            {summary}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Generated {new Date().toLocaleTimeString()}
                        </div>
                        <Button variant="outline" size="sm" onClick={copySummary}>
                          <i className="fas fa-copy mr-1"></i>
                          Copy Summary
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <i className="fas fa-file-alt text-4xl mb-4 opacity-50"></i>
                      <p>Upload a PDF to generate an AI summary</p>
                      <p className="text-sm">Choose your perspective and click process</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Medical Disclaimer */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-warning/10 border border-warning/20 rounded-lg px-4 py-2">
                <i className="fas fa-exclamation-triangle text-warning"></i>
                <span className="text-sm text-muted-foreground">
                  This AI-generated content is for educational purposes only and should not replace professional medical advice.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center card-gradient border-0 elevated-shadow">
                <CardContent className="pt-6">
                  <div className={`text-3xl mb-2 text-primary`}>
                    <i className={stat.icon}></i>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Intelligent Medical Summarization
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform delivers accurate, safe, and contextually appropriate 
              medical summaries for diverse healthcare needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-gradient border-0 hover:elevated-shadow transition-all duration-300 group">
                <CardHeader>
                  <div className={`text-4xl mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                    <i className={feature.icon}></i>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-16 bg-warning/10 border-y-2 border-warning/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-warning text-3xl mb-4">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Important Medical Disclaimer</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              This AI-powered medical summarization tool is designed for educational and research purposes only. 
              It is not intended to replace professional medical advice, diagnosis, or treatment. Always seek the 
              advice of qualified healthcare providers with any questions regarding medical conditions. The AI-generated 
              summaries should be reviewed by licensed medical professionals before any clinical application.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 trust-gradient">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Medical Communication?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join healthcare professionals worldwide who trust our AI-powered summarization platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/summarize">
              <Button size="lg" className="text-lg px-8 py-3">
                <i className="fas fa-rocket mr-2"></i>
                Start Summarizing
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                <i className="fas fa-chart-line mr-2"></i>
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}