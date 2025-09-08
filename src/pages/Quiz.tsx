import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { disasters, QuizQuestion } from "@/data/disasters";
import { Brain, Clock, Trophy, RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [language, setLanguage] = useState("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  
  const navigate = useNavigate();

  // Combine all quiz questions from all disasters
  const allQuestions: QuizQuestion[] = disasters.flatMap(disaster => disaster.quiz);
  
  // Shuffle and select random questions
  const [quizQuestions] = useState(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length)); // Max 10 questions
  });

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + (showResult ? 1 : 0)) / quizQuestions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || showResult || isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, showResult, isCompleted, currentQuestionIndex]);

  // Reset timer for new question
  useEffect(() => {
    setTimeLeft(30);
    setIsTimerActive(true);
  }, [currentQuestionIndex]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setSelectedAnswer(-1); // Mark as incorrect due to timeout
    setShowResult(true);
    setUserAnswers([...userAnswers, -1]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setIsTimerActive(false);
    setShowResult(true);
    
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setIsCompleted(false);
    setTimeLeft(30);
    setIsTimerActive(true);
  };

  const getScorePercentage = () => (score / quizQuestions.length) * 100;
  
  const getScoreColor = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-success text-success-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen">
        <Header onLanguageChange={setLanguage} currentLanguage={language} />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center animate-result-bounce">
            <div className="gradient-primary p-8 rounded-2xl text-white mb-8">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">
                {language === "en" ? "Quiz Complete!" : "क्विज़ पूरा!"}
              </h1>
              <div className="text-6xl font-bold mb-2 text-yellow-300">
                {score}/{quizQuestions.length}
              </div>
              <p className="text-xl">
                {Math.round(getScorePercentage())}% {language === "en" ? "Correct" : "सही"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-primary mb-1">{quizQuestions.length}</div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Questions" : "प्रश्न"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-success mb-1">{score}</div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Correct" : "सही"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className={`text-xl font-bold mb-1 ${getScoreColor()}`}>
                    {Math.round(getScorePercentage())}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" ? "Score" : "स्कोर"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={handleRestart} variant="outline" size="lg" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                {language === "en" ? "Try Again" : "फिर कोशिश करें"}
              </Button>
              <Button onClick={() => navigate("/simulations")} variant="hero" size="lg">
                {language === "en" ? "Practice Simulations" : "सिमुलेशन अभ्यास"}
              </Button>
              <Button onClick={() => navigate("/")} variant="secondary" size="lg" className="gap-2">
                <Home className="w-4 h-4" />
                {language === "en" ? "Home" : "होम"}
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
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">
                  {language === "en" ? "Adaptive Quiz" : "अनुकूली क्विज़"}
                </h1>
                <Badge variant="secondary">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                  {currentQuestion.difficulty.toUpperCase()}
                </Badge>
                <div className={`flex items-center gap-2 text-sm font-medium ${
                  timeLeft <= 10 ? "text-destructive animate-pulse" : "text-muted-foreground"
                }`}>
                  <Clock className="w-4 h-4" />
                  {timeLeft}s
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <Progress 
                value={(timeLeft / 30) * 100} 
                className={`h-1 ${timeLeft <= 10 ? "animate-pulse" : ""}`}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const isIncorrectSelection = showResult && isSelected && !isCorrect;
                const shouldHighlightCorrect = showResult && isCorrect;
                
                let buttonVariant: "outline" | "success" | "destructive" = "outline";
                if (shouldHighlightCorrect) buttonVariant = "success";
                if (isIncorrectSelection) buttonVariant = "destructive";

                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    size="lg"
                    className="w-full text-left justify-start h-auto p-4 transition-all duration-300"
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Explanation */}
          {showResult && (
            <Card className="mb-8 animate-fade-in">
              <CardContent className="p-6">
                <div className={`p-4 rounded-lg border-l-4 ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? "bg-success/10 border-success text-success-foreground"
                    : "bg-destructive/10 border-destructive text-destructive-foreground"
                }`}>
                  <h3 className="font-semibold mb-2">
                    {language === "en" ? "Explanation:" : "व्याख्या:"}
                  </h3>
                  <p>{currentQuestion.explanation}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          {showResult && (
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {language === "en" ? "Score:" : "स्कोर:"} 
                <span className="font-bold text-primary ml-1">
                  {score}/{currentQuestionIndex + 1}
                </span>
              </div>
              <Button onClick={handleNext} variant="hero" size="lg">
                {currentQuestionIndex < quizQuestions.length - 1 
                  ? (language === "en" ? "Next Question" : "अगला प्रश्न")
                  : (language === "en" ? "Finish Quiz" : "क्विज़ समाप्त करें")
                }
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}