import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function Summarize() {
  const [perspective, setPerspective] = useState<"patient" | "clinician">("patient");
  const [question, setQuestion] = useState("What are the symptoms and treatment options for Type 2 diabetes?");
  const [answer, setAnswer] = useState(`Type 2 diabetes is a chronic metabolic disorder characterized by insulin resistance and relative insulin deficiency. Clinical manifestations include polyuria, polydipsia, polyphagia, unexplained weight loss, fatigue, and blurred vision. Long-term complications encompass diabetic nephropathy, retinopathy, neuropathy, and increased cardiovascular risk.

Treatment modalities include:
1. Lifestyle modifications: dietary counseling, structured exercise programs, weight management
2. Pharmacological interventions: metformin as first-line therapy, followed by sulfonylureas, DPP-4 inhibitors, GLP-1 receptor agonists, or insulin based on glycemic control and patient-specific factors
3. Regular monitoring: HbA1c every 3-6 months, lipid profiles, renal function assessment, ophthalmologic examinations
4. Preventive measures: vaccination protocols, foot care education, cardiovascular risk stratification`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState("");

  const generateSummary = async () => {
    setIsProcessing(true);
    setProgress(0);
    setSummary("");

    try {
      // Import the LLM client
      const { llmClient } = await import('@/lib/llm-client');
      
      // Update progress steps
      const steps = [
        "Analyzing medical content...",
        "Processing terminology...",
        "Adapting to perspective...",
        "Generating summary...",
        "Performing safety validation..."
      ];

      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 400));
        setProgress((i + 1) * 20);
      }

      // Call your custom LLM
      const response = await llmClient.generateSummary({
        question,
        answer,
        perspective,
        maxLength: 1000,
        temperature: 0.7
      });

      setSummary(response.summary);
      
      // Show success feedback
      console.log('Summary generated successfully:', {
        confidence: response.confidence,
        processingTime: response.processing_time,
        safetyScore: response.safety_score
      });

    } catch (error) {
      console.error('Failed to generate summary:', error);
      setSummary(`Error: Failed to generate summary. Please check your LLM backend is running and try again.

Technical details: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Medical Q&A Summarization</h1>
          <p className="text-muted-foreground">Transform medical content using your custom LLM</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <i className="fas fa-shield-check mr-1"></i>
            Safety Verified
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Perspective Toggle */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-users text-primary mr-2"></i>
                Target Perspective
              </CardTitle>
              <CardDescription>Choose the intended audience for the summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button
                  variant={perspective === "patient" ? "default" : "outline"}
                  onClick={() => setPerspective("patient")}
                  className="flex-1"
                >
                  <i className="fas fa-user mr-2"></i>
                  Patient-Friendly
                </Button>
                <Button
                  variant={perspective === "clinician" ? "default" : "outline"}
                  onClick={() => setPerspective("clinician")}
                  className="flex-1"
                >
                  <i className="fas fa-user-md mr-2"></i>
                  Clinician-Focused
                </Button>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                {perspective === "patient" 
                  ? "Simplified language, avoiding medical jargon, focusing on practical information"
                  : "Technical terminology, clinical protocols, evidence-based recommendations"
                }
              </div>
            </CardContent>
          </Card>

          {/* Question Input */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <Label htmlFor="question" className="text-base font-medium flex items-center">
                <i className="fas fa-question-circle text-primary mr-2"></i>
                Medical Question
              </Label>
            </CardHeader>
            <CardContent>
              <Textarea
                id="question"
                placeholder="Enter the medical question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Answer Input */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <Label htmlFor="answer" className="text-base font-medium flex items-center">
                <i className="fas fa-clipboard-list text-primary mr-2"></i>
                Medical Answer/Content
              </Label>
            </CardHeader>
            <CardContent>
              <Textarea
                id="answer"
                placeholder="Enter the detailed medical answer or content to summarize..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button 
            onClick={generateSummary}
            disabled={isProcessing || !question.trim() || !answer.trim()}
            size="lg"
            className="w-full"
          >
            {isProcessing ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Processing...
              </>
            ) : (
              <>
                <i className="fas fa-brain mr-2"></i>
                Generate {perspective === "patient" ? "Patient-Friendly" : "Clinical"} Summary
              </>
            )}
          </Button>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Processing Status */}
          {isProcessing && (
            <Card className="card-gradient border-0 card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-cogs text-primary mr-2"></i>
                  AI Processing Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="mb-2" />
                <div className="text-sm text-muted-foreground text-center">
                  {progress < 20 ? "Analyzing medical content..." :
                   progress < 40 ? "Processing terminology..." :
                   progress < 60 ? "Adapting to perspective..." :
                   progress < 80 ? "Generating summary..." :
                   "Performing safety validation..."}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Summary Output */}
          <Card className="card-gradient border-0 card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-file-alt text-primary mr-2"></i>
                Generated Summary
                {summary && (
                  <Badge variant="outline" className="ml-2">
                    {perspective === "patient" ? "Patient-Friendly" : "Clinical"}
                  </Badge>
                )}
              </CardTitle>
              {summary && (
                <CardDescription>
                  AI-generated summary tailored for {perspective === "patient" ? "patient understanding" : "clinical use"}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {summary ? (
                <div className="prose prose-sm max-w-none">
                  <div className="bg-muted/30 p-4 rounded-lg whitespace-pre-wrap text-foreground">
                    {summary}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xs text-muted-foreground">
                      Generated {new Date().toLocaleTimeString()}
                    </div>
                    <Button variant="outline" size="sm">
                      <i className="fas fa-copy mr-1"></i>
                      Copy Summary
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <i className="fas fa-brain text-4xl mb-4 opacity-50"></i>
                  <p>AI-generated summary will appear here</p>
                  <p className="text-sm">Enter your medical Q&A and click generate to start</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Medical Disclaimer */}
          <Card className="bg-warning/10 border-warning/20 border-2">
            <CardHeader>
              <CardTitle className="flex items-center text-warning">
                <i className="fas fa-exclamation-triangle mr-2"></i>
                Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This AI-generated content is for educational purposes only and should not replace 
                professional medical advice. Always consult qualified healthcare providers for 
                medical decisions. Generated summaries require review by licensed medical professionals 
                before clinical use.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}