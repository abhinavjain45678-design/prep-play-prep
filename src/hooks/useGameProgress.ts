import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface GameProgress {
  totalPoints: number;
  level: number;
  achievements: Achievement[];
  completedSimulations: string[];
  completedQuizzes: string[];
  streak: number;
  certificates: Certificate[];
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  earnedAt: Date;
  disasterType: string;
  score: number;
  level: string;
}

const initialAchievements: Achievement[] = [
  {
    id: 'first-quiz',
    title: '🧠 Quiz Master',
    description: 'Complete your first quiz!',
    icon: '🧠',
    points: 50,
    unlocked: false
  },
  {
    id: 'first-simulation',
    title: '🎮 Simulation Starter',
    description: 'Complete your first simulation!',
    icon: '🎮',
    points: 75,
    unlocked: false
  },
  {
    id: 'earthquake-expert',
    title: '🌍 Earthquake Expert',
    description: 'Master earthquake safety!',
    icon: '🌍',
    points: 100,
    unlocked: false
  },
  {
    id: 'fire-hero',
    title: '🔥 Fire Safety Hero',
    description: 'Become a fire safety champion!',
    icon: '🔥',
    points: 100,
    unlocked: false
  },
  {
    id: 'flood-guardian',
    title: '🌊 Flood Guardian',
    description: 'Master flood safety techniques!',
    icon: '🌊',
    points: 100,
    unlocked: false
  },
  {
    id: 'perfect-score',
    title: '⭐ Perfect Score',
    description: 'Get 100% on any quiz!',
    icon: '⭐',
    points: 150,
    unlocked: false
  },
  {
    id: 'streak-master',
    title: '🔥 Streak Master',
    description: 'Complete activities 5 days in a row!',
    icon: '🔥',
    points: 200,
    unlocked: false
  },
  {
    id: 'safety-champion',
    title: '🏆 Safety Champion',
    description: 'Earn 1000 points total!',
    icon: '🏆',
    points: 250,
    unlocked: false
  }
];

export const useGameProgress = () => {
  const [progress, setProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('gameProgress');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        achievements: parsed.achievements || initialAchievements,
        certificates: parsed.certificates?.map((cert: any) => ({
          ...cert,
          earnedAt: new Date(cert.earnedAt)
        })) || []
      };
    }
    return {
      totalPoints: 0,
      level: 1,
      achievements: initialAchievements,
      completedSimulations: [],
      completedQuizzes: [],
      streak: 0,
      certificates: []
    };
  });

  useEffect(() => {
    localStorage.setItem('gameProgress', JSON.stringify({
      ...progress,
      certificates: progress.certificates.map(cert => ({
        ...cert,
        earnedAt: cert.earnedAt.toISOString()
      }))
    }));
  }, [progress]);

  const addPoints = (points: number, source: string) => {
    setProgress(prev => {
      const newTotal = prev.totalPoints + points;
      const newLevel = Math.floor(newTotal / 500) + 1;
      
      return {
        ...prev,
        totalPoints: newTotal,
        level: newLevel
      };
    });
    
    checkAchievements(source);
  };

  const completeQuiz = (quizId: string, score: number, totalQuestions: number) => {
    const percentage = (score / totalQuestions) * 100;
    const points = Math.round(percentage * 2); // Up to 200 points for perfect score
    
    setProgress(prev => ({
      ...prev,
      completedQuizzes: [...prev.completedQuizzes, quizId]
    }));
    
    addPoints(points, 'quiz');
    
    if (percentage === 100) {
      unlockAchievement('perfect-score');
    }
    
    // Generate certificate for good performance
    if (percentage >= 80) {
      generateCertificate('quiz', quizId, score, totalQuestions);
    }
  };

  const completeSimulation = (simulationId: string, score: number) => {
    const points = score * 10; // 10 points per correct choice
    
    setProgress(prev => ({
      ...prev,
      completedSimulations: [...prev.completedSimulations, simulationId]
    }));
    
    addPoints(points, 'simulation');
    
    // Check disaster-specific achievements
    if (simulationId.includes('earthquake')) {
      unlockAchievement('earthquake-expert');
    } else if (simulationId.includes('fire')) {
      unlockAchievement('fire-hero');
    } else if (simulationId.includes('flood')) {
      unlockAchievement('flood-guardian');
    }
    
    generateCertificate('simulation', simulationId, score, 10);
  };

  const checkAchievements = (source: string) => {
    if (source === 'quiz' && progress.completedQuizzes.length === 0) {
      unlockAchievement('first-quiz');
    }
    if (source === 'simulation' && progress.completedSimulations.length === 0) {
      unlockAchievement('first-simulation');
    }
    if (progress.totalPoints >= 1000) {
      unlockAchievement('safety-champion');
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setProgress(prev => ({
      ...prev,
      achievements: prev.achievements.map(achievement =>
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      )
    }));
  };

  const generateCertificate = (type: 'quiz' | 'simulation', id: string, score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    let level = 'Bronze';
    if (percentage >= 90) level = 'Gold';
    else if (percentage >= 80) level = 'Silver';
    
    const certificate: Certificate = {
      id: `${type}-${id}-${Date.now()}`,
      title: `${type === 'quiz' ? 'Quiz Master' : 'Simulation Hero'} Certificate`,
      description: `Successfully completed ${id} with ${percentage.toFixed(1)}% accuracy`,
      earnedAt: new Date(),
      disasterType: id,
      score: percentage,
      level
    };
    
    setProgress(prev => ({
      ...prev,
      certificates: [...prev.certificates, certificate]
    }));
  };

  const getPointsToNextLevel = () => {
    const currentLevelMin = (progress.level - 1) * 500;
    const nextLevelMin = progress.level * 500;
    return nextLevelMin - progress.totalPoints;
  };

  const getLevelProgress = () => {
    const currentLevelMin = (progress.level - 1) * 500;
    const nextLevelMin = progress.level * 500;
    const progressInLevel = progress.totalPoints - currentLevelMin;
    return (progressInLevel / (nextLevelMin - currentLevelMin)) * 100;
  };

  return {
    progress,
    addPoints,
    completeQuiz,
    completeSimulation,
    unlockAchievement,
    getPointsToNextLevel,
    getLevelProgress
  };
};