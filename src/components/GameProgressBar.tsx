import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Trophy, Zap } from "lucide-react";
import { useGameProgress } from "@/hooks/useGameProgress";

export const GameProgressBar = () => {
  const { progress, getPointsToNextLevel, getLevelProgress } = useGameProgress();

  const getLevelColor = () => {
    if (progress.level >= 10) return "text-purple-600";
    if (progress.level >= 5) return "text-yellow-600";
    return "text-blue-600";
  };

  const getLevelIcon = () => {
    if (progress.level >= 10) return <Trophy className="w-5 h-5" />;
    if (progress.level >= 5) return <Star className="w-5 h-5" />;
    return <Zap className="w-5 h-5" />;
  };

  return (
    <Card className="mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`${getLevelColor()}`}>
              {getLevelIcon()}
            </div>
            <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
              Level {progress.level}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {progress.totalPoints.toLocaleString()} ✨
            </div>
            <div className="text-sm text-muted-foreground">
              {getPointsToNextLevel()} to level {progress.level + 1}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Progress 
            value={getLevelProgress()} 
            className="h-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Level {progress.level}</span>
            <span>Level {progress.level + 1}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-3">
          <div className="text-center">
            <div className="text-lg font-bold text-success">
              {progress.achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-xs text-muted-foreground">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {progress.certificates.length}
            </div>
            <div className="text-xs text-muted-foreground">Certificates</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {progress.streak}
            </div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};