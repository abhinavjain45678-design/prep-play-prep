import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DisasterCard } from "@/components/DisasterCard";
import { expandedDisasters } from "@/data/expandedDisasters";
import { Zap, Flame, Waves, Wind, Mountain, Snowflake, Droplets } from "lucide-react";
import realEarthquake from "@/assets/real-earthquake-new.jpg";
import realVolcano from "@/assets/real-volcano.jpg";
import realFlood from "@/assets/real-flood-new.avif";
import realCyclone from "@/assets/real-cyclone.webp";
import earthquakeVideo from "@/assets/videos/earthquake.mp4";
import volcanoVideo from "@/assets/videos/volcano.mp4";
import floodVideo from "@/assets/videos/flood.mp4";
import cycloneVideo from "@/assets/videos/cyclone.mp4";

const iconMap = {
  earthquake: <Zap className="w-6 h-6" />,
  fire: <Flame className="w-6 h-6" />,
  flood: <Waves className="w-6 h-6" />,
  tornado: <Wind className="w-6 h-6" />,
  tsunami: <Droplets className="w-6 h-6" />,
  volcano: <Mountain className="w-6 h-6" />,
  blizzard: <Snowflake className="w-6 h-6" />,
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
            {language === "en" ? "Disaster Simulations with Real Images" : "वास्तविक चित्रों के साथ आपदा सिमुलेशन"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en" 
              ? "Experience realistic disaster scenarios with real images. Learn, make decisions, and improve your disaster preparedness skills."
              : "वास्तविक चित्रों के साथ वास्तविक आपदा परिदृश्यों का अनुभव करें। सीखें, निर्णय लें, और अपनी आपदा तैयारी कौशल में सुधार करें।"
            }
          </p>
        </div>

        {/* Real Disaster Images */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {language === "en" ? "Real Disaster Images" : "वास्तविक आपदा चित्र"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                {language === "en" ? "Earthquake Damage" : "भूकंप क्षति"}
              </h3>
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium relative group">
                <img 
                  src={realEarthquake} 
                  alt="Real earthquake damage showing collapsed buildings and cracked ground"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <video 
                  src={earthquakeVideo}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Real earthquake damage showing the devastating effects on buildings and infrastructure."
                  : "वास्तविक भूकंप क्षति जो इमारतों और बुनियादी ढांचे पर विनाशकारी प्रभाव दिखाती है।"
                }
              </p>
            </div>
            
              <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Mountain className="w-5 h-5 text-red-600" />
                {language === "en" ? "Volcanic Eruption" : "ज्वालामुखी विस्फोट"}
              </h3>
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium relative group">
                <img 
                  src={realVolcano} 
                  alt="Real volcanic eruption with lava and ash clouds"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <video 
                  src={volcanoVideo}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Real volcanic eruption showing the immense power of molten lava and ash clouds."
                  : "वास्तविक ज्वालामुखी विस्फोट जो पिघले लावा और राख के बादलों की अपार शक्ति दिखाता है।"
                }
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-600" />
                {language === "en" ? "Flood Devastation" : "बाढ़ तबाही"}
              </h3>
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium relative group">
                <img 
                  src={realFlood} 
                  alt="Real flood with submerged buildings and rising water"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <video 
                  src={floodVideo}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Real flood imagery showing submerged areas and the impact of rising waters."
                  : "वास्तविक बाढ़ की तस्वीरें जो जलमग्न क्षेत्रों और बढ़ते पानी के प्रभाव को दिखाती हैं।"
                }
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Wind className="w-5 h-5 text-gray-600" />
                {language === "en" ? "Cyclone Power" : "चक्रवात शक्ति"}
              </h3>
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium relative group">
                <img 
                  src={realCyclone} 
                  alt="Real cyclone from space showing massive spiral formation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <video 
                  src={cycloneVideo}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  muted
                  loop
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "en" 
                  ? "Real cyclone viewed from space showing the massive spiral formation and eye of the storm."
                  : "अंतरिक्ष से देखा गया वास्तविक चक्रवात जो विशाल सर्पिल निर्माण और तूफान की आंख दिखाता है।"
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
                ? "After exploring these real disaster images, challenge yourself with adaptive quizzes!"
                : "इन वास्तविक आपदा चित्रों का अन्वेषण करने के बाद, अनुकूली क्विज़ के साथ खुद को चुनौती दें!"
              }
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}