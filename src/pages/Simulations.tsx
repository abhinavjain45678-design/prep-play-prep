import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DisasterCard } from "@/components/DisasterCard";
import { disasters } from "@/data/disasters";
import { Zap, Flame, Waves } from "lucide-react";

const iconMap = {
  earthquake: <Zap className="w-6 h-6" />,
  fire: <Flame className="w-6 h-6" />,
  flood: <Waves className="w-6 h-6" />,
};

export default function Simulations() {
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  const handleDisasterSelect = (disasterId: string) => {
    navigate(`/simulation/${disasterId}`);
  };

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {language === "en" ? "Disaster Simulations" : "आपदा सिमुलेशन"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en" 
              ? "Practice emergency scenarios in a safe environment. Learn, make decisions, and improve your disaster preparedness skills."
              : "सुरक्षित वातावरण में आपातकालीन स्थितियों का अभ्यास करें। सीखें, निर्णय लें, और अपनी आपदा तैयारी कौशल में सुधार करें।"
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {disasters.map((disaster, index) => (
            <div
              key={disaster.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-scale-in"
            >
              <DisasterCard
                title={disaster.name}
                description={disaster.description}
                image={disaster.image}
                difficulty={disaster.difficulty}
                duration={disaster.duration}
                onSelect={() => handleDisasterSelect(disaster.id)}
                icon={iconMap[disaster.id as keyof typeof iconMap]}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="gradient-primary p-8 rounded-2xl text-white animate-bounce-in">
            <h2 className="text-2xl font-bold mb-4">
              {language === "en" ? "Ready to Test Your Knowledge?" : "अपने ज्ञान का परीक्षण करने के लिए तैयार हैं?"}
            </h2>
            <p className="mb-6">
              {language === "en" 
                ? "After completing simulations, challenge yourself with adaptive quizzes!"
                : "सिमुलेशन पूरा करने के बाद, अनुकूली क्विज़ के साथ खुद को चुनौती दें!"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}