import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, X } from "lucide-react";
import { Achievement } from "@/hooks/useGameProgress";

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementNotification = ({ achievement, onClose }: AchievementNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="w-80 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-xl animate-bounce-in">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              <Badge variant="secondary" className="text-orange-600 font-bold">
                Achievement Unlocked!
              </Badge>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-3xl">{achievement.icon}</div>
            <div>
              <h3 className="font-bold text-lg">{achievement.title}</h3>
              <p className="text-white/90 text-sm">{achievement.description}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-200 text-sm font-bold">
                  +{achievement.points} ✨
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};