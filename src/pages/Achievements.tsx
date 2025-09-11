import { useState } from "react";
import { Header } from "@/components/Header";
import { GameProgressBar } from "@/components/GameProgressBar";
import { CertificateGenerator } from "@/components/CertificateGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Award, Star, Lock, Download, User } from "lucide-react";
import { useGameProgress } from "@/hooks/useGameProgress";
import { useNavigate } from "react-router-dom";

export default function Achievements() {
  const [language, setLanguage] = useState("en");
  const [studentName, setStudentName] = useState(() => 
    localStorage.getItem('studentName') || 'Safety Hero'
  );
  const { progress } = useGameProgress();
  const navigate = useNavigate();

  const handleNameChange = (name: string) => {
    setStudentName(name);
    localStorage.setItem('studentName', name);
  };

  const unlockedAchievements = progress.achievements.filter(a => a.unlocked);
  const lockedAchievements = progress.achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              🏆 {language === "en" ? "Your Gaming Progress" : "आपकी गेमिंग प्रगति"}
            </h1>
            <p className="text-xl text-muted-foreground">
              {language === "en" 
                ? "Track your achievements, earn certificates, and level up your safety skills!"
                : "अपनी उपलब्धियों को ट्रैक करें, प्रमाणपत्र अर्जित करें, और अपने सुरक्षा कौशल को बढ़ाएं!"
              }
            </p>
          </div>

          <GameProgressBar />

          {/* Student Name Input */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {language === "en" ? "Personalize Your Certificates" : "अपने प्रमाणपत्र को व्यक्तिगत बनाएं"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="studentName">
                    {language === "en" ? "Your Name" : "आपका नाम"}
                  </Label>
                  <Input
                    id="studentName"
                    value={studentName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder={language === "en" ? "Enter your name for certificates" : "प्रमाणपत्र के लिए अपना नाम दर्ज करें"}
                  />
                </div>
                <Button 
                  onClick={() => navigate("/simulations")}
                  variant="hero"
                >
                  {language === "en" ? "Earn More Points!" : "और अंक अर्जित करें!"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="achievements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="achievements" className="gap-2">
                <Trophy className="w-4 h-4" />
                {language === "en" ? "Achievements" : "उपलब्धियां"}
              </TabsTrigger>
              <TabsTrigger value="certificates" className="gap-2">
                <Award className="w-4 h-4" />
                {language === "en" ? "Certificates" : "प्रमाणपत्र"}
              </TabsTrigger>
              <TabsTrigger value="stats" className="gap-2">
                <Star className="w-4 h-4" />
                {language === "en" ? "Statistics" : "आंकड़े"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-success">
                  ✨ {language === "en" ? "Unlocked Achievements" : "अनलॉक की गई उपलब्धियां"} ({unlockedAchievements.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {unlockedAchievements.map((achievement) => (
                    <Card key={achievement.id} className="bg-gradient-to-r from-success/10 to-primary/10 border-success/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{achievement.title}</h3>
                            <p className="text-muted-foreground text-sm">{achievement.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-success">
                                +{achievement.points} ✨
                              </Badge>
                              {achievement.unlockedAt && (
                                <span className="text-xs text-muted-foreground">
                                  {achievement.unlockedAt.toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 text-muted-foreground">
                  🔒 {language === "en" ? "Locked Achievements" : "लॉक की गई उपलब्धियां"} ({lockedAchievements.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lockedAchievements.map((achievement) => (
                    <Card key={achievement.id} className="opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl grayscale">
                            <Lock className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-muted-foreground">{achievement.title}</h3>
                            <p className="text-muted-foreground text-sm">{achievement.description}</p>
                            <Badge variant="outline" className="mt-2">
                              {achievement.points} ✨
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {language === "en" ? "Your Safety Certificates" : "आपके सुरक्षा प्रमाणपत्र"}
                </h2>
                <p className="text-muted-foreground">
                  {language === "en" 
                    ? "Download and share your achievements with friends and family!"
                    : "अपनी उपलब्धियों को डाउनलोड करें और दोस्तों व परिवार के साथ साझा करें!"
                  }
                </p>
              </div>

              {progress.certificates.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Award className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-xl font-bold mb-2">
                      {language === "en" ? "No Certificates Yet" : "अभी तक कोई प्रमाणपत्र नहीं"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {language === "en" 
                        ? "Complete quizzes and simulations to earn your first certificate!"
                        : "अपना पहला प्रमाणपत्र अर्जित करने के लिए क्विज़ और सिमुलेशन पूरे करें!"
                      }
                    </p>
                    <Button onClick={() => navigate("/quiz")} variant="hero">
                      {language === "en" ? "Start Quiz" : "क्विज़ शुरू करें"}
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-8">
                  {progress.certificates.map((certificate) => (
                    <CertificateGenerator 
                      key={certificate.id}
                      certificate={certificate}
                      studentName={studentName}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      {language === "en" ? "Learning Stats" : "सीखने की आंकड़े"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{progress.completedQuizzes.length}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "en" ? "Quizzes Completed" : "पूरे किए गए क्विज़"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary">{progress.completedSimulations.length}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "en" ? "Simulations Completed" : "पूरे किए गए सिमुलेशन"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      {language === "en" ? "Achievement Progress" : "उपलब्धि प्रगति"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">{unlockedAchievements.length}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "en" ? "Achievements Unlocked" : "अनलॉक की गई उपलब्धियां"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-warning">{progress.certificates.length}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "en" ? "Certificates Earned" : "अर्जित प्रमाणपत्र"}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      {language === "en" ? "Level Information" : "स्तर की जानकारी"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{progress.level}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "en" ? "Current Level" : "वर्तमान स्तर"}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">{progress.streak}</div>
                      <div className="text-sm text-muted-foreground">
                        {language === "en" ? "Day Streak" : "दिन की लकीर"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}