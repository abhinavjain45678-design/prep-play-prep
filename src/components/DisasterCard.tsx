import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DisasterCardProps {
  title: string;
  description: string;
  image: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  onSelect: () => void;
  icon?: React.ReactNode;
}

export function DisasterCard({ 
  title, 
  description, 
  image, 
  difficulty, 
  duration, 
  onSelect, 
  icon 
}: DisasterCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-emergency text-emergency-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  return (
    <Card className="disaster-card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={getDifficultyColor(difficulty)}>
            {difficulty}
          </Badge>
          <Badge variant="secondary">
            {duration}
          </Badge>
        </div>
        {icon && (
          <div className="absolute top-4 right-4 text-white text-2xl">
            {icon}
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <Button 
          onClick={onSelect}
          variant="disaster"
          size="lg"
          className="w-full"
        >
          Start Simulation
        </Button>
      </CardContent>
    </Card>
  );
}