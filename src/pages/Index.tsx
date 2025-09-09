import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Flame, Waves, Brain, Phone, BarChart3, Play, BookOpen, Users, Satellite } from "lucide-react";
import mainHeroImage from "@/assets/main-hero.jpg";

export default function Index() {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const features = [
    {
      icon: <Play className="w-8 h-8" />,
      title: language === "en" ? "Interactive Simulations" : "इंटरैक्टिव सिमुलेशन",
      description: language === "en" 
        ? "Practice emergency scenarios with realistic decision-making challenges"
        : "वास्तविक निर्णय लेने की चुनौतियों के साथ आपातकालीन स्थितियों का अभ्यास करें",
      path: "/simulations"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: language === "en" ? "Adaptive Quizzes" : "अनुकूली क्विज़",
      description: language === "en" 
        ? "Test your knowledge with dynamic questions that adapt to your learning"
        : "गतिशील प्रश्नों के साथ अपने ज्ञान का परीक्षण करें जो आपकी सीख के अनुकूल हों",
      path: "/quiz"
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: language === "en" ? "Emergency Contacts" : "आपातकालीन संपर्क",
      description: language === "en" 
        ? "Create and download personalized emergency contact cards"
        : "व्यक्तिगत आपातकालीन संपर्क कार्ड बनाएं और डाउनलोड करें",
      path: "/emergency"
    },
    {
      icon: <Satellite className="w-8 h-8" />,
      title: language === "en" ? "Government Alerts" : "सरकारी अलर्ट",
      description: language === "en" 
        ? "Real-time disaster alerts from official Indian government sources"
        : "आधिकारिक भारतीय सरकारी स्रोतों से वास्तविक समय आपदा अलर्ट",
      path: "/government-alerts"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: language === "en" ? "Progress Tracking" : "प्रगति ट्रैकिंग",
      description: language === "en" 
        ? "Monitor learning progress with detailed analytics and reports"
        : "विस्तृत विश्लेषण और रिपोर्ट के साथ सीखने की प्रगति की निगरानी करें",
      path: "/admin"
    }
  ];

  const disasters = [
    {
      id: "earthquake",
      icon: <Zap className="w-12 h-12" />,
      title: language === "en" ? "Earthquake Safety" : "भूकंप सुरक्षा",
      description: language === "en" 
        ? "Learn Drop, Cover, and Hold On techniques"
        : "ड्रॉप, कवर, और होल्ड ऑन तकनीक सीखें",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      id: "fire",
      icon: <Flame className="w-12 h-12" />,
      title: language === "en" ? "Fire Safety" : "अग्नि सुरक्षा",
      description: language === "en" 
        ? "Master evacuation and fire fighting basics"
        : "निकासी और आग बुझाने की बुनियादी बातें सीखें",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      id: "flood",
      icon: <Waves className="w-12 h-12" />,
      title: language === "en" ? "Flood Safety" : "बाढ़ सुरक्षा",
      description: language === "en" 
        ? "Understand water safety and evacuation routes"
        : "पानी की सुरक्षा और निकासी मार्गों को समझें",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={mainHeroImage} 
            alt="Disaster preparedness education"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {language === "en" 
                ? "Learn Disaster Preparedness Through Interactive Training"
                : "इंटरैक्टिव प्रशिक्षण के माध्यम से आपदा तैयारी सीखें"
              }
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              {language === "en" 
                ? "Master emergency response skills with realistic simulations, adaptive quizzes, and comprehensive safety training designed for students and educators."
                : "छात्रों और शिक्षकों के लिए डिज़ाइन किए गए वास्तविक सिमुलेशन, अनुकूली क्विज़ और व्यापक सुरक्षा प्रशिक्षण के साथ आपातकालीन प्रतिक्रिया कौशल में महारत हासिल करें।"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate("/simulations")} 
                variant="hero" 
                size="xl"
                className="text-lg px-8 animate-bounce-in"
              >
                {language === "en" ? "Start Learning" : "सीखना शुरू करें"}
              </Button>
              <Button 
                onClick={() => navigate("/quiz")} 
                variant="outline" 
                size="xl"
                className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                {language === "en" ? "Take Quiz" : "क्विज़ लें"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Types Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              {language === "en" ? "Master Three Critical Disaster Types" : "तीन महत्वपूर्ण आपदा प्रकारों में महारत हासिल करें"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === "en" 
                ? "Each disaster requires specific knowledge and response strategies. Practice all three to become fully prepared."
                : "प्रत्येक आपदा के लिए विशिष्ट ज्ञान और प्रतिक्रिया रणनीतियों की आवश्यकता होती है। पूर्ण तैयारी के लिए तीनों का अभ्यास करें।"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {disasters.map((disaster, index) => (
              <Card 
                key={disaster.id} 
                className={`disaster-card cursor-pointer group ${disaster.borderColor} border-2`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/simulation/${disaster.id}`)}
              >
                <CardContent className="p-8 text-center">
                  <div className={`${disaster.bgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={disaster.color}>
                      {disaster.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{disaster.title}</h3>
                  <p className="text-muted-foreground mb-4">{disaster.description}</p>
                  <Badge variant="secondary" className="px-4 py-1">
                    {language === "en" ? "Interactive Training" : "इंटरैक्टिव प्रशिक्षण"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => navigate("/simulations")} 
              variant="disaster" 
              size="lg"
              className="animate-pulse-glow"
            >
              {language === "en" ? "Explore All Simulations" : "सभी सिमुलेशन देखें"}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
              {language === "en" ? "Complete Learning Platform" : "संपूर्ण शिक्षण मंच"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === "en" 
                ? "Everything you need for comprehensive disaster preparedness education in one platform."
                : "एक मंच में व्यापक आपदा तैयारी शिक्षा के लिए आवश्यक सब कुछ।"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="disaster-card cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(feature.path)}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-bounce-in">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {language === "en" 
                ? "Ready to Build Safer Communities?" 
                : "सुरक्षित समुदाय बनाने के लिए तैयार हैं?"
              }
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {language === "en" 
                ? "Join thousands of students and educators who are already mastering disaster preparedness skills."
                : "हजारों छात्रों और शिक्षकों से जुड़ें जो पहले से ही आपदा तैयारी कौशल में महारत हासिल कर रहे हैं।"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/simulations")} 
                variant="hero" 
                size="xl"
                className="bg-white text-primary hover:bg-white/90"
              >
                {language === "en" ? "Start Training Now" : "अभी प्रशिक्षण शुरू करें"}
              </Button>
              <Button 
                onClick={() => navigate("/admin")} 
                variant="outline" 
                size="xl"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {language === "en" ? "View Progress" : "प्रगति देखें"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
