import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getExpandedDisasterById } from "@/data/expandedDisasters";
import { CheckCircle, XCircle, Clock, Trophy, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Simulation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const disaster = id ? getExpandedDisasterById(id) : null;

  useEffect(() => {
    if (!disaster) {
      navigate("/simulations");
    }
  }, [disaster, navigate]);

  if (!disaster) {
    return <div>Loading...</div>;
  }

  const currentScenario = disaster.scenarios[currentScenarioIndex];
  const progress = ((currentScenarioIndex + (showFeedback ? 1 : 0)) / disaster.scenarios.length) * 100;

  const handleChoiceSelect = (choice: any) => {
    setSelectedChoice(choice.id);
    setShowFeedback(true);
    if (choice.isCorrect) {
      setScore(score + choice.points);
      toast({
        title: "Correct!",
        description: choice.feedback,
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: choice.feedback,
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (currentScenarioIndex < disaster.scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setShowFeedback(false);
    setIsCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / (disaster.scenarios.length * 10)) * 100;
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen">
        <Header onLanguageChange={setLanguage} currentLanguage={language} />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center animate-result-bounce">
            <div className="gradient-primary p-8 rounded-2xl text-white mb-8">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Simulation Complete!</h1>
              <div className="text-6xl font-bold mb-2 text-yellow-300">{score}</div>
              <p className="text-xl">points earned</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {disaster.scenarios.length}
                  </div>
                  <p className="text-muted-foreground">Scenarios Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor()}`}>
                    {Math.round((score / (disaster.scenarios.length * 10)) * 100)}%
                  </div>
                  <p className="text-muted-foreground">Accuracy</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} variant="outline" size="lg">
                Try Again
              </Button>
              <Button onClick={() => navigate("/quiz")} variant="hero" size="lg">
                Take Quiz
              </Button>
              <Button onClick={() => navigate("/simulations")} variant="secondary" size="lg">
                More Simulations
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-emergency" />
                <h1 className="text-2xl font-bold">{disaster.name}</h1>
                <Badge variant="secondary">
                  Scenario {currentScenarioIndex + 1} of {disaster.scenarios.length}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {disaster.duration}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Scenario Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scenario Image */}
            <div className="relative">
              <img 
                src={disaster.image} 
                alt={currentScenario.title}
                className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-medium"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-xl font-bold mb-2">{currentScenario.title}</h2>
                <p className="text-sm opacity-90">{currentScenario.description}</p>
              </div>
            </div>

            {/* Scenario Content */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Situation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentScenario.situation}
                  </p>
                </CardContent>
              </Card>

              {/* Choices */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">What would you do?</h3>
                {currentScenario.choices.map((choice, index) => {
                  const isSelected = selectedChoice === choice.id;
                  const isCorrect = choice.isCorrect;
                  
                  let buttonVariant: "outline" | "success" | "destructive" = "outline";
                  if (showFeedback && isSelected) {
                    buttonVariant = isCorrect ? "success" : "destructive";
                  }

                  return (
                    <div key={choice.id} className="space-y-2">
                      <Button
                        variant={buttonVariant}
                        size="lg"
                        className="w-full text-left justify-start h-auto p-4"
                        onClick={() => !showFeedback && handleChoiceSelect(choice)}
                        disabled={showFeedback}
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{choice.text}</span>
                          {showFeedback && isSelected && (
                            <div className="ml-auto">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-success" />
                              ) : (
                                <XCircle className="w-5 h-5 text-destructive" />
                              )}
                            </div>
                          )}
                        </div>
                      </Button>
                      
                      {showFeedback && isSelected && (
                        <div className="pl-4 animate-fade-in">
                          <p className={`text-sm p-3 rounded-lg ${
                            isCorrect 
                              ? "bg-success/10 text-success-foreground border-l-4 border-success" 
                              : "bg-destructive/10 text-destructive-foreground border-l-4 border-destructive"
                          }`}>
                            <strong>Explanation:</strong> {choice.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Next Button */}
              {showFeedback && (
                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-muted-foreground">
                    Score: <span className="font-bold text-primary">{score} points</span>
                  </div>
                  <Button onClick={handleNext} variant="hero" size="lg">
                    {currentScenarioIndex < disaster.scenarios.length - 1 ? "Next Scenario" : "Complete Simulation"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}