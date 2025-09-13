// Comprehensive translation system for the disaster preparedness app

export interface Translation {
  [key: string]: string | Translation;
}

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      simulations: "Simulations", 
      quizzes: "Quizzes",
      emergency: "Emergency Contacts",
      caseStudies: "Case Studies",
      achievements: "Achievements",
      admin: "Admin Dashboard",
      emergencyId: "Emergency ID"
    },
    
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      close: "Close",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      reset: "Reset",
      search: "Search",
      filter: "Filter",
      settings: "Settings",
      help: "Help",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
      language: "Language",
      theme: "Theme",
      lightMode: "Light Mode",
      darkMode: "Dark Mode"
    },

    // Header
    header: {
      appName: "SafeLearn",
      tagline: "Disaster Preparedness",
      switchToHindi: "हिंदी",
      switchToEnglish: "English"
    },

    // Home Page
    home: {
      heroTitle: "Learn Disaster Preparedness Through Interactive Simulations",
      heroSubtitle: "Experience realistic disaster scenarios in a safe environment. Build confidence and skills to protect yourself and your community.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      featuresTitle: "Why Choose SafeLearn?",
      features: {
        realistic: {
          title: "Realistic Simulations",
          description: "Experience true-to-life disaster scenarios with immersive 3D environments"
        },
        adaptive: {
          title: "Adaptive Learning",
          description: "Personalized quizzes that adapt to your knowledge level and learning pace"
        },
        certified: {
          title: "Get Certified",
          description: "Earn certificates as you complete modules and demonstrate your preparedness skills"
        },
        emergency: {
          title: "Emergency Ready",
          description: "Access critical emergency contacts and real-time disaster alerts instantly"
        }
      },
      disastersTitle: "Interactive Disaster Simulations",
      earthquake: "Earthquake",
      fire: "Fire",
      flood: "Flood", 
      tornado: "Tornado",
      tsunami: "Tsunami",
      volcano: "Volcano",
      blizzard: "Blizzard"
    },

    // Simulations Page
    simulations: {
      title: "Disaster Simulations with Real Images",
      subtitle: "Experience realistic disaster scenarios with real images. Learn, make decisions, and improve your disaster preparedness skills.",
      realImagesTitle: "Real Disaster Images",
      earthquake: {
        title: "Earthquake Damage",
        description: "Real earthquake damage showing the devastating effects on buildings and infrastructure."
      },
      volcano: {
        title: "Volcanic Eruption", 
        description: "Real volcanic eruption showing the immense power of molten lava and ash clouds."
      },
      flood: {
        title: "Flood Devastation",
        description: "Real flood imagery showing submerged areas and the impact of rising waters."
      },
      cyclone: {
        title: "Cyclone Power",
        description: "Real cyclone viewed from space showing the massive spiral formation and eye of the storm."
      },
      quizPrompt: "Ready to Test Your Knowledge?",
      quizDescription: "After exploring these real disaster images, challenge yourself with adaptive quizzes!",
      startSimulation: "Start Simulation",
      difficulty: {
        easy: "Easy",
        medium: "Medium", 
        hard: "Hard"
      },
      duration: "Duration"
    },

    // Emergency Page
    emergency: {
      title: "Emergency Contacts & Resources",
      subtitle: "Quick access to emergency services and important contact information",
      nationalEmergency: "National Emergency",
      police: "Police",
      fire: "Fire Department",
      medical: "Medical Emergency",
      disaster: "Disaster Management",
      women: "Women Helpline",
      child: "Child Helpline",
      mentalHealth: "Mental Health",
      callNow: "Call Now",
      sosButton: "SOS - Emergency Call",
      sosDescription: "Press for immediate emergency assistance"
    },

    // Quiz Page
    quiz: {
      title: "Adaptive Disaster Preparedness Quiz",
      subtitle: "Test your knowledge with our intelligent quiz system that adapts to your skill level",
      startQuiz: "Start Quiz",
      question: "Question",
      of: "of",
      submit: "Submit Answer",
      nextQuestion: "Next Question",
      correct: "Correct!",
      incorrect: "Incorrect",
      explanation: "Explanation",
      score: "Score",
      results: "Quiz Results",
      passed: "Congratulations! You passed!",
      failed: "Keep learning! Try again.",
      retakeQuiz: "Retake Quiz",
      viewCertificate: "View Certificate"
    },

    // Achievements Page  
    achievements: {
      title: "Your Achievements",
      subtitle: "Track your progress and earn certificates as you master disaster preparedness",
      earned: "Earned",
      notEarned: "Not Earned",
      progress: "Progress",
      certificates: "Certificates",
      downloadCertificate: "Download Certificate",
      shareAchievement: "Share Achievement"
    },

    // Emergency ID Page
    emergencyId: {
      title: "Emergency ID Card",
      subtitle: "Create your emergency identification card with essential information",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      age: "Age", 
      bloodType: "Blood Type",
      phoneNumber: "Phone Number",
      emergencyContact: "Emergency Contact",
      emergencyPhone: "Emergency Contact Phone",
      medicalInfo: "Medical Information",
      allergies: "Allergies",
      medications: "Current Medications",
      medicalConditions: "Medical Conditions",
      generateCard: "Generate ID Card",
      downloadCard: "Download ID Card",
      printCard: "Print ID Card"
    },

    // Case Studies Page
    caseStudies: {
      title: "Historical Disaster Case Studies",
      subtitle: "Learn from real disaster events and understand their impact on communities",
      readMore: "Read More",
      impact: "Impact",
      casualties: "Casualties",
      damage: "Damage",
      lessons: "Lessons Learned",
      preparedness: "Preparedness Measures"
    },

    // Admin Page
    admin: {
      title: "Admin Panel",
      students: "Students",
      performance: "Performance",
      dashboard: "Admin Dashboard",
      refresh: "Refresh",
      exportData: "Export Data"
    }
  },

  hi: {
    // Navigation
    nav: {
      home: "होम",
      simulations: "सिमुलेशन",
      quizzes: "क्विज़",
      emergency: "आपातकालीन संपर्क", 
      caseStudies: "केस स्टडी",
      achievements: "उपलब्धियां",
      admin: "एडमिन डैशबोर्ड",
      emergencyId: "आपातकालीन आईडी"
    },

    // Common
    common: {
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      warning: "चेतावनी", 
      save: "सेव करें",
      cancel: "रद्द करें",
      edit: "संपादित करें",
      delete: "हटाएं",
      confirm: "पुष्टि करें",
      close: "बंद करें",
      next: "अगला",
      previous: "पिछला",
      submit: "जमा करें",
      reset: "रीसेट",
      search: "खोजें",
      filter: "फिल्टर",
      settings: "सेटिंग्स",
      help: "सहायता",
      about: "हमारे बारे में",
      contact: "संपर्क",
      privacy: "गोपनीयता",
      terms: "नियम",
      language: "भाषा",
      theme: "थीम",
      lightMode: "लाइट मोड",
      darkMode: "डार्क मोड"
    },

    // Header
    header: {
      appName: "SafeLearn",
      tagline: "आपदा तैयारी",
      switchToHindi: "हिंदी", 
      switchToEnglish: "English"
    },

    // Home Page
    home: {
      heroTitle: "इंटरैक्टिव सिमुलेशन के माध्यम से आपदा तैयारी सीखें",
      heroSubtitle: "सुरक्षित वातावरण में वास्तविक आपदा परिदृश्यों का अनुभव करें। अपनी और अपने समुदाय की सुरक्षा के लिए आत्मविश्वास और कौशल बनाएं।",
      getStarted: "शुरू करें",
      learnMore: "और जानें",
      featuresTitle: "SafeLearn क्यों चुनें?",
      features: {
        realistic: {
          title: "वास्तविक सिमुलेशन",
          description: "इमर्सिव 3D वातावरण के साथ जीवंत आपदा परिदृश्यों का अनुभव करें"
        },
        adaptive: {
          title: "अनुकूली शिक्षा",
          description: "व्यक्तिगत क्विज़ जो आपके ज्ञान स्तर और सीखने की गति के अनुकूल होते हैं"
        },
        certified: {
          title: "प्रमाणित हों",
          description: "मॉड्यूल पूरा करने और तैयारी कौशल प्रदर्शित करने पर प्रमाणपत्र अर्जित करें"
        },
        emergency: {
          title: "आपातकाल तैयार",
          description: "महत्वपूर्ण आपातकालीन संपर्क और वास्तविक समय आपदा अलर्ट तुरंत एक्सेस करें"
        }
      },
      disastersTitle: "इंटरैक्टिव आपदा सिमुलेशन",
      earthquake: "भूकंप",
      fire: "आग",
      flood: "बाढ़",
      tornado: "बवंडर", 
      tsunami: "सुनामी",
      volcano: "ज्वालामुखी",
      blizzard: "बर्फीला तूफान"
    },

    // Simulations Page
    simulations: {
      title: "वास्तविक चित्रों के साथ आपदा सिमुलेशन",
      subtitle: "वास्तविक चित्रों के साथ वास्तविक आपदा परिदृश्यों का अनुभव करें। सीखें, निर्णय लें, और अपनी आपदा तैयारी कौशल में सुधार करें।",
      realImagesTitle: "वास्तविक आपदा चित्र",
      earthquake: {
        title: "भूकंप क्षति",
        description: "वास्तविक भूकंप क्षति जो इमारतों और बुनियादी ढांचे पर विनाशकारी प्रभाव दिखाती है।"
      },
      volcano: {
        title: "ज्वालामुखी विस्फोट",
        description: "वास्तविक ज्वालामुखी विस्फोट जो पिघले लावा और राख के बादलों की अपार शक्ति दिखाता है।"
      },
      flood: {
        title: "बाढ़ तबाही",
        description: "वास्तविक बाढ़ की तस्वीरें जो जलमग्न क्षेत्रों और बढ़ते पानी के प्रभाव को दिखाती हैं।"
      },
      cyclone: {
        title: "चक्रवात शक्ति",
        description: "अंतरिक्ष से देखा गया वास्तविक चक्रवात जो विशाल सर्पिल निर्माण और तूफान की आंख दिखाता है।"
      },
      quizPrompt: "अपने ज्ञान का परीक्षण करने के लिए तैयार हैं?",
      quizDescription: "इन वास्तविक आपदा चित्रों का अन्वेषण करने के बाद, अनुकूली क्विज़ के साथ खुद को चुनौती दें!",
      startSimulation: "सिमुलेशन शुरू करें",
      difficulty: {
        easy: "आसान",
        medium: "मध्यम",
        hard: "कठिन"
      },
      duration: "अवधि"
    },

    // Emergency Page
    emergency: {
      title: "आपातकालीन संपर्क और संसाधन",
      subtitle: "आपातकालीन सेवाओं और महत्वपूर्ण संपर्क जानकारी तक त्वरित पहुंच",
      nationalEmergency: "राष्ट्रीय आपातकाल",
      police: "पुलिस",
      fire: "दमकल विभाग",
      medical: "चिकित्सा आपातकाल",
      disaster: "आपदा प्रबंधन", 
      women: "महिला हेल्पलाइन",
      child: "बाल हेल्पलाइन",
      mentalHealth: "मानसिक स्वास्थ्य",
      callNow: "अभी कॉल करें",
      sosButton: "SOS - आपातकालीन कॉल",
      sosDescription: "तत्काल आपातकालीन सहायता के लिए दबाएं"
    },

    // Quiz Page
    quiz: {
      title: "अनुकूली आपदा तैयारी क्विज़",
      subtitle: "हमारी बुद्धिमान क्विज़ प्रणाली के साथ अपने ज्ञान का परीक्षण करें जो आपके कौशल स्तर के अनुकूल होती है",
      startQuiz: "क्विज़ शुरू करें",
      question: "प्रश्न",
      of: "का",
      submit: "उत्तर जमा करें",
      nextQuestion: "अगला प्रश्न",
      correct: "सही!",
      incorrect: "गलत",
      explanation: "व्याख्या",
      score: "स्कोर",
      results: "क्विज़ परिणाम",
      passed: "बधाई हो! आप पास हो गए!",
      failed: "सीखते रहें! फिर कोशिश करें।",
      retakeQuiz: "क्विज़ फिर से लें",
      viewCertificate: "प्रमाणपत्र देखें"
    },

    // Achievements Page
    achievements: {
      title: "आपकी उपलब्धियां",
      subtitle: "अपनी प्रगति को ट्रैक करें और आपदा तैयारी में महारत हासिल करते समय प्रमाणपत्र अर्जित करें",
      earned: "अर्जित",
      notEarned: "अर्जित नहीं",
      progress: "प्रगति",
      certificates: "प्रमाणपत्र",
      downloadCertificate: "प्रमाणपत्र डाउनलोड करें",
      shareAchievement: "उपलब्धि साझा करें"
    },

    // Emergency ID Page
    emergencyId: {
      title: "आपातकालीन आईडी कार्ड",
      subtitle: "आवश्यक जानकारी के साथ अपना आपातकालीन पहचान कार्ड बनाएं",
      personalInfo: "व्यक्तिगत जानकारी",
      fullName: "पूरा नाम",
      age: "उम्र",
      bloodType: "रक्त समूह", 
      phoneNumber: "फोन नंबर",
      emergencyContact: "आपातकालीन संपर्क",
      emergencyPhone: "आपातकालीन संपर्क फोन",
      medicalInfo: "चिकित्सा जानकारी",
      allergies: "एलर्जी",
      medications: "वर्तमान दवाएं",
      medicalConditions: "चिकित्सा स्थितियां",
      generateCard: "आईडी कार्ड जेनरेट करें",
      downloadCard: "आईडी कार्ड डाउनलोड करें",
      printCard: "आईडी कार्ड प्रिंट करें"
    },

    // Case Studies Page
    caseStudies: {
      title: "ऐतिहासिक आपदा केस स्टडी",
      subtitle: "वास्तविक आपदा घटनाओं से सीखें और समुदायों पर उनके प्रभाव को समझें",
      readMore: "और पढ़ें",
      impact: "प्रभाव",
      casualties: "हताहत",
      damage: "नुकसान",
      lessons: "सीखे गए सबक",
      preparedness: "तैयारी उपाय"
    },

    // Admin Page
    admin: {
      title: "एडमिन पैनल",
      students: "छात्र",
      performance: "प्रदर्शन",
      dashboard: "एडमिन डैशबोर्ड",
      refresh: "रिफ्रेश",
      exportData: "डेटा निर्यात"
    }
  }
};

// Helper function to get nested translation
export function getTranslation(
  language: string,
  key: string,
  fallback?: string
): string {
  const keys = key.split('.');
  let current: any = translations[language as keyof typeof translations];
  
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      // Fallback to English if translation not found
      current = translations.en;
      for (const fallbackKey of keys) {
        if (current && typeof current === 'object' && fallbackKey in current) {
          current = current[fallbackKey];
        } else {
          return fallback || key;
        }
      }
      break;
    }
  }
  
  return typeof current === 'string' ? current : fallback || key;
}

// Hook for using translations
export function useTranslation(language: string) {
  return {
    t: (key: string, fallback?: string) => getTranslation(language, key, fallback),
    language
  };
}