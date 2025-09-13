import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { DisasterCard } from "@/components/DisasterCard";
import { expandedDisasters } from "@/data/expandedDisasters";
import { Zap, Flame, Waves, Wind, Mountain, Snowflake, Droplets } from "lucide-react";
import { useTranslation } from "@/lib/translations";
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
  const { t } = useTranslation(language);

  const handleDisasterSelect = (disasterId: string) => {
    navigate(`/simulation/${disasterId}`);
  };

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {t("simulations.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("simulations.subtitle")}
          </p>
        </div>

        {/* Real Disaster Images */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {t("simulations.realImagesTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                {t("simulations.earthquake.title")}
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
                {t("simulations.earthquake.description")}
              </p>
            </div>
            
              <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Mountain className="w-5 h-5 text-red-600" />
                {t("simulations.volcano.title")}
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
                {t("simulations.volcano.description")}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Waves className="w-5 h-5 text-blue-600" />
                {t("simulations.flood.title")}
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
                {t("simulations.flood.description")}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Wind className="w-5 h-5 text-gray-600" />
                {t("simulations.cyclone.title")}
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
                {t("simulations.cyclone.description")}
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
              {t("simulations.quizPrompt")}
            </h2>
            <p className="mb-6">
              {t("simulations.quizDescription")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}