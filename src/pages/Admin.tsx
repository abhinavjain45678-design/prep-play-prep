import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, Brain, Target, TrendingUp, Download, RefreshCw } from "lucide-react";

interface StudentData {
  id: string;
  name: string;
  class: string;
  simulationScore: number;
  quizScore: number;
  completedSimulations: number;
  completedQuizzes: number;
  lastActivity: string;
}

interface ClassPerformance {
  class: string;
  avgSimulation: number;
  avgQuiz: number;
  students: number;
}

export default function Admin() {
  const [language, setLanguage] = useState("en");
  const [students, setStudents] = useState<StudentData[]>([]);
  const [classPerformance, setClassPerformance] = useState<ClassPerformance[]>([]);

  // Mock data generation
  useEffect(() => {
    const mockStudents: StudentData[] = [
      {
        id: "1",
        name: "Aisha Sharma",
        class: "Class 8A",
        simulationScore: 85,
        quizScore: 92,
        completedSimulations: 3,
        completedQuizzes: 8,
        lastActivity: "2024-01-15"
      },
      {
        id: "2",
        name: "Rohan Patel",
        class: "Class 8A",
        simulationScore: 78,
        quizScore: 85,
        completedSimulations: 2,
        completedQuizzes: 6,
        lastActivity: "2024-01-14"
      },
      {
        id: "3",
        name: "Priya Singh",
        class: "Class 8B",
        simulationScore: 92,
        quizScore: 88,
        completedSimulations: 3,
        completedQuizzes: 9,
        lastActivity: "2024-01-15"
      },
      {
        id: "4",
        name: "Arjun Kumar",
        class: "Class 8B",
        simulationScore: 74,
        quizScore: 79,
        completedSimulations: 2,
        completedQuizzes: 5,
        lastActivity: "2024-01-13"
      },
      {
        id: "5",
        name: "Meera Gupta",
        class: "Class 9A",
        simulationScore: 88,
        quizScore: 91,
        completedSimulations: 3,
        completedQuizzes: 7,
        lastActivity: "2024-01-15"
      },
      {
        id: "6",
        name: "Vikram Joshi",
        class: "Class 9A",
        simulationScore: 81,
        quizScore: 83,
        completedSimulations: 2,
        completedQuizzes: 6,
        lastActivity: "2024-01-14"
      }
    ];

    setStudents(mockStudents);

    // Calculate class performance
    const classStats = mockStudents.reduce((acc, student) => {
      const className = student.class;
      if (!acc[className]) {
        acc[className] = {
          class: className,
          totalSimulation: 0,
          totalQuiz: 0,
          count: 0
        };
      }
      acc[className].totalSimulation += student.simulationScore;
      acc[className].totalQuiz += student.quizScore;
      acc[className].count += 1;
      return acc;
    }, {} as Record<string, any>);

    const performanceData = Object.values(classStats).map((stat: any) => ({
      class: stat.class,
      avgSimulation: Math.round(stat.totalSimulation / stat.count),
      avgQuiz: Math.round(stat.totalQuiz / stat.count),
      students: stat.count
    }));

    setClassPerformance(performanceData);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-primary";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadgeVariant = (score: number): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 90) return "default";
    if (score >= 80) return "secondary";
    if (score >= 70) return "outline";
    return "destructive";
  };

  const totalStudents = students.length;
  const avgSimulationScore = Math.round(students.reduce((sum, s) => sum + s.simulationScore, 0) / totalStudents);
  const avgQuizScore = Math.round(students.reduce((sum, s) => sum + s.quizScore, 0) / totalStudents);
  const activeToday = students.filter(s => s.lastActivity === "2024-01-15").length;

  const pieData = [
    { name: "Excellent (90+)", value: students.filter(s => s.simulationScore >= 90).length, color: "#22c55e" },
    { name: "Good (80-89)", value: students.filter(s => s.simulationScore >= 80 && s.simulationScore < 90).length, color: "#3b82f6" },
    { name: "Average (70-79)", value: students.filter(s => s.simulationScore >= 70 && s.simulationScore < 80).length, color: "#f59e0b" },
    { name: "Needs Help (<70)", value: students.filter(s => s.simulationScore < 70).length, color: "#ef4444" }
  ];

  const exportData = () => {
    const csvContent = [
      ["Name", "Class", "Simulation Score", "Quiz Score", "Completed Simulations", "Completed Quizzes", "Last Activity"],
      ...students.map(s => [s.name, s.class, s.simulationScore, s.quizScore, s.completedSimulations, s.completedQuizzes, s.lastActivity])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student-performance-report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-primary">
              {language === "en" ? "Admin Dashboard" : "एडमिन डैशबोर्ड"}
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                {language === "en" ? "Refresh" : "रिफ्रेश"}
              </Button>
              <Button onClick={exportData} variant="secondary" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                {language === "en" ? "Export Data" : "डेटा निर्यात"}
              </Button>
            </div>
          </div>
          <p className="text-xl text-muted-foreground">
            {language === "en" 
              ? "Monitor student progress and performance across disaster preparedness training."
              : "आपदा तैयारी प्रशिक्षण में छात्र प्रगति और प्रदर्शन की निगरानी करें।"
            }
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Simulation</p>
                  <p className={`text-2xl font-bold ${getScoreColor(avgSimulationScore)}`}>
                    {avgSimulationScore}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Quiz Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(avgQuizScore)}`}>
                    {avgQuizScore}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Today</p>
                  <p className="text-2xl font-bold text-success">{activeToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Class Performance Chart */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>
                {language === "en" ? "Class-wise Performance" : "कक्षावार प्रदर्शन"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgSimulation" fill="#3b82f6" name="Simulation" />
                  <Bar dataKey="avgQuiz" fill="#10b981" name="Quiz" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Distribution */}
          <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>
                {language === "en" ? "Performance Distribution" : "प्रदर्शन वितरण"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>
              {language === "en" ? "Student Performance Details" : "छात्र प्रदर्शन विवरण"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-medium transition-all duration-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.class}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Simulations</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={getScoreBadgeVariant(student.simulationScore)}>
                          {student.simulationScore}%
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ({student.completedSimulations})
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Quizzes</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={getScoreBadgeVariant(student.quizScore)}>
                          {student.quizScore}%
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ({student.completedQuizzes})
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Last Active</p>
                      <p className="text-xs">{student.lastActivity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}