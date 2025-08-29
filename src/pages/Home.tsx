import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden medical-gradient">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Medical Summarization
              <span className="block text-4xl font-light opacity-90">AI Challenge</span>
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
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white/30 text-white hover:bg-white/10">
                  <i className="fas fa-chart-line mr-2"></i>
                  View Dashboard
                </Button>
              </Link>
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
            <Link to="/training">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                <i className="fas fa-cogs mr-2"></i>
                Configure Models
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}