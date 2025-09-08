import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DisasterCard } from "@/components/DisasterCard";
import { expandedDisasters } from "@/data/expandedDisasters";
import { Zap, Flame, Waves, Wind, Mountain, Snowflake, Droplets } from "lucide-react";
import EarthquakeScene3D from "@/components/3d/EarthquakeScene3D";
import FireScene3D from "@/components/3d/FireScene3D";
import FloodScene3D from "@/components/3d/FloodScene3D";
import TornadoScene3D from "@/components/3d/TornadoScene3D";

const iconMap = {
  earthquake: <Zap className="w-6 h-6" />,
  fire: <Flame className="w-6 h-6" />,
  flood: <Waves className="w-6 h-6" />,
  tornado: <Wind className="w-6 h-6" />,
  tsunami: <Droplets className="w-6 h-6" />,
  volcano: <Mountain className="w-6 h-6" />,
  blizzard: <Snowflake className="w-6 h-6" />,
};

const sceneMap = {
  earthquake: EarthquakeScene3D,
  fire: FireScene3D,
  flood: FloodScene3D,
  tornado: TornadoScene3D,
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
            {language === "en" ? "Disaster Simulations with 3D Effects" : "3D प्रभावों के साथ आपदा सिमुलेशन"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en" 
              ? "Experience realistic disaster scenarios with immersive 3D animations. Learn, make decisions, and improve your disaster preparedness skills."
              : "रोमांचक 3D एनिमेशन के साथ वास्तविक आपदा परिदृश्यों का अनुभव करें। सीखें, निर्णय लें, और अपनी आपदा तैयारी कौशल में सुधार करें।"
            }
          </p>
        </div>

        {/* 3D Disaster Previews */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === "en" ? "Interactive 3D Disaster Models" : "इंटरैक्टिव 3D आपदा मॉडल"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                {language === "en" ? "Earthquake 3D Model" : "भूकंप 3D मॉडल"}
              </h3>
              <EarthquakeScene3D />
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Watch buildings shake and ground crack in real-time. Click and drag to explore the scene."
                  : "इमारतों को हिलते और जमीन को फटते देखें। दृश्य का पता लगाने के लिए क्लिक करें और खींचें।"
                }
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-600" />
                {language === "en" ? "Fire 3D Model" : "आग 3D मॉडल"}
              </h3>
              <FireScene3D />
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Experience realistic fire and smoke effects with dynamic flames and particles."
                  : "गतिशील लपटों और कणों के साथ वास्तविक आग और धुआं प्रभाव का अनुभव करें।"
                }
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-600" />
                {language === "en" ? "Flood 3D Model" : "बाढ़ 3D मॉडल"}
              </h3>
              <FloodScene3D />
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "See rising waters, floating debris, and realistic rain effects in this flood simulation."
                  : "इस बाढ़ सिमुलेशन में बढ़ते पानी, तैरते मलबे और वास्तविक बारिश के प्रभाव देखें।"
                }
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Wind className="w-5 h-5 text-gray-600" />
                {language === "en" ? "Tornado 3D Model" : "बवंडर 3D मॉडल"}
              </h3>
              <TornadoScene3D />
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Watch a spinning tornado with flying debris and wind effects."
                  : "उड़ते मलबे और हवा के प्रभावों के साथ एक घूमते बवंडर को देखें।"
                }
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up">
          {expandedDisasters.map((disaster, index) => (
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
                ? "After experiencing these realistic 3D simulations, challenge yourself with adaptive quizzes!"
                : "इन वास्तविक 3D सिमुलेशन का अनुभव करने के बाद, अनुकूली क्विज़ के साथ खुद को चुनौती दें!"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}