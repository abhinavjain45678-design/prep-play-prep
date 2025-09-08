import earthquakeImage from "@/assets/earthquake-hero.jpg";
import fireImage from "@/assets/fire-hero.jpg";
import floodImage from "@/assets/flood-hero.jpg";
import tornadoImage from "@/assets/tornado-hero.jpg";
import tsunamiImage from "@/assets/tsunami-hero.jpg";
import volcanoImage from "@/assets/volcano-hero.jpg";
import blizzardImage from "@/assets/blizzard-hero.jpg";

export interface ExpandedDisasterType {
  id: string;
  name: string;
  description: string;
  image: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  scenarios: ExpandedScenario[];
  quiz: ExpandedQuizQuestion[];
  category: "Natural" | "Weather" | "Geological";
  severity: "Low" | "Medium" | "High" | "Extreme";
  preparationTime: string;
}

export interface ExpandedScenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  choices: ExpandedChoice[];
  learningObjective: string;
}

export interface ExpandedChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  points: number;
  consequence?: string;
}

export interface ExpandedQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

export const expandedDisasters: ExpandedDisasterType[] = [
  {
    id: "earthquake",
    name: "Earthquake Safety",
    description: "Learn how to respond during and after an earthquake. Practice Drop, Cover, and Hold On techniques and understand seismic safety.",
    image: earthquakeImage,
    difficulty: "Intermediate",
    duration: "15 mins",
    category: "Geological",
    severity: "High",
    preparationTime: "0 seconds",
    scenarios: [
      {
        id: "eq-scenario-1",
        title: "Earthquake at School",
        description: "You're in your classroom when the ground starts shaking violently.",
        situation: "The floor is shaking, books are falling from shelves, and students are panicking. What's your first action?",
        learningObjective: "Learn the proper Drop, Cover, and Hold On technique",
        choices: [
          {
            id: "eq-choice-1",
            text: "Run outside immediately",
            isCorrect: false,
            feedback: "Running during shaking is dangerous. You could fall or be hit by falling objects.",
            points: 0,
            consequence: "You trip while running and get injured by falling debris."
          },
          {
            id: "eq-choice-2",
            text: "Drop, Cover, and Hold On under your desk",
            isCorrect: true,
            feedback: "Excellent! This is the correct response. Drop to your hands and knees, take cover under a sturdy desk, and hold on.",
            points: 10,
            consequence: "You stay safe under the desk while objects fall around you."
          },
          {
            id: "eq-choice-3",
            text: "Stand in the doorway",
            isCorrect: false,
            feedback: "Modern doorways aren't necessarily safer. Drop, Cover, and Hold On is better.",
            points: 2,
            consequence: "The doorway provides some protection but you're still exposed to falling objects."
          }
        ]
      },
      {
        id: "eq-scenario-2",
        title: "After the Shaking Stops",
        description: "The earthquake has stopped. What should you do next?",
        situation: "The shaking has ended. You're safe under your desk, but you can hear people moving around.",
        learningObjective: "Understand proper evacuation procedures after an earthquake",
        choices: [
          {
            id: "eq-choice-4",
            text: "Wait for instructions from your teacher",
            isCorrect: true,
            feedback: "Correct! Follow your teacher's evacuation plan. They will guide you safely outside.",
            points: 10,
            consequence: "Your teacher leads the class safely outside using the designated evacuation route."
          },
          {
            id: "eq-choice-5",
            text: "Rush outside with everyone else",
            isCorrect: false,
            feedback: "This could cause dangerous crowding. Follow the evacuation plan calmly.",
            points: 3,
            consequence: "Crowding at exits causes panic and some people get trampled."
          },
          {
            id: "eq-choice-6",
            text: "Check if the building is damaged first",
            isCorrect: false,
            feedback: "Leave building inspection to professionals. Focus on safe evacuation.",
            points: 1,
            consequence: "While checking the building, an aftershock occurs and you're caught inside."
          }
        ]
      }
    ],
    quiz: [
      {
        id: "eq-quiz-1",
        question: "What does 'Drop, Cover, and Hold On' mean?",
        options: [
          "Drop your belongings, cover your head, hold someone's hand",
          "Drop to hands and knees, take cover under sturdy furniture, hold on to it",
          "Drop to the floor, cover your eyes, hold your breath",
          "Drop everything, cover the windows, hold the door"
        ],
        correctAnswer: 1,
        explanation: "Drop to your hands and knees, take cover under a sturdy desk or table, and hold on to it while protecting your head and neck.",
        difficulty: "easy",
        category: "Basic Response"
      },
      {
        id: "eq-quiz-2",
        question: "If you're outdoors during an earthquake, what should you do?",
        options: [
          "Run to the nearest building",
          "Stay away from buildings, trees, and power lines",
          "Lie flat on the ground",
          "Get in a car immediately"
        ],
        correctAnswer: 1,
        explanation: "Stay in the open, away from buildings, trees, power lines, and other hazards that could fall.",
        difficulty: "medium",
        category: "Outdoor Safety"
      }
    ]
  },
  {
    id: "fire",
    name: "Fire Safety",
    description: "Master fire evacuation procedures, learn when to fight a fire versus when to evacuate, and understand fire prevention.",
    image: fireImage,
    difficulty: "Beginner",
    duration: "12 mins",
    category: "Natural",
    severity: "High",
    preparationTime: "Minutes",
    scenarios: [
      {
        id: "fire-scenario-1",
        title: "Kitchen Fire",
        description: "A small fire has started in the kitchen while cooking.",
        situation: "Oil in a pan has caught fire. The flames are small but growing. What do you do?",
        learningObjective: "Learn proper response to cooking fires",
        choices: [
          {
            id: "fire-choice-1",
            text: "Pour water on the fire",
            isCorrect: false,
            feedback: "Never use water on oil fires! It will cause the fire to spread and create dangerous splashing.",
            points: 0,
            consequence: "The fire spreads rapidly and burns you with hot oil."
          },
          {
            id: "fire-choice-2",
            text: "Turn off the heat and cover with a lid",
            isCorrect: true,
            feedback: "Perfect! Turn off the heat source and carefully cover with a lid to cut off oxygen.",
            points: 10,
            consequence: "The fire is quickly extinguished by removing oxygen."
          },
          {
            id: "fire-choice-3",
            text: "Use a fire extinguisher immediately",
            isCorrect: false,
            feedback: "For small cooking fires, covering with a lid is safer and more effective than a fire extinguisher.",
            points: 5,
            consequence: "The extinguisher works but creates a huge mess and may contaminate food surfaces."
          }
        ]
      }
    ],
    quiz: [
      {
        id: "fire-quiz-1",
        question: "What should you do if your clothes catch fire?",
        options: [
          "Run to get help",
          "Stop, Drop, and Roll",
          "Try to remove the burning clothes",
          "Jump in water"
        ],
        correctAnswer: 1,
        explanation: "Stop immediately, drop to the ground, and roll to smother the flames. Running will fan the flames and make them worse.",
        difficulty: "easy",
        category: "Personal Safety"
      }
    ]
  },
  {
    id: "flood",
    name: "Flood Safety",
    description: "Understand flood warnings, evacuation routes, water safety during flooding events, and flash flood recognition.",
    image: floodImage,
    difficulty: "Advanced",
    duration: "18 mins",
    category: "Weather",
    severity: "Extreme",
    preparationTime: "Hours to Days",
    scenarios: [
      {
        id: "flood-scenario-1",
        title: "Rising Waters",
        description: "Heavy rains have caused flooding in your neighborhood.",
        situation: "Water levels are rising quickly outside your home. You can see cars struggling to move through the streets.",
        learningObjective: "Understand when to evacuate vs shelter in place during floods",
        choices: [
          {
            id: "flood-choice-1",
            text: "Stay inside and move to higher ground",
            isCorrect: true,
            feedback: "Correct! Get to the highest level of your home and wait for emergency services.",
            points: 10,
            consequence: "You safely wait on the second floor while emergency services arrive."
          },
          {
            id: "flood-choice-2",
            text: "Try to drive to safety",
            isCorrect: false,
            feedback: "Driving in flood water is extremely dangerous. Just 6 inches of moving water can knock you down, and 12 inches can carry away a vehicle.",
            points: 0,
            consequence: "Your car gets swept away by the current and you barely escape."
          },
          {
            id: "flood-choice-3",
            text: "Walk through the water to reach higher ground",
            isCorrect: false,
            feedback: "Never walk through moving water. It can be deeper than it appears and hide dangerous debris.",
            points: 2,
            consequence: "You fall into a hidden drain and get swept downstream."
          }
        ]
      }
    ],
    quiz: [
      {
        id: "flood-quiz-1",
        question: "How much moving water can knock an adult off their feet?",
        options: [
          "2 feet (60 cm)",
          "1 foot (30 cm)",
          "6 inches (15 cm)",
          "3 feet (90 cm)"
        ],
        correctAnswer: 2,
        explanation: "Just 6 inches (15 cm) of moving water can knock an adult off their feet. Moving water is incredibly powerful.",
        difficulty: "medium",
        category: "Water Safety"
      }
    ]
  },
  {
    id: "tornado",
    name: "Tornado Safety",
    description: "Learn tornado warning signs, safe shelter locations, and post-tornado safety procedures.",
    image: tornadoImage,
    difficulty: "Advanced",
    duration: "20 mins",
    category: "Weather",
    severity: "Extreme",
    preparationTime: "Minutes",
    scenarios: [
      {
        id: "tornado-scenario-1",
        title: "Tornado Warning Issued",
        description: "A tornado warning has been issued for your area.",
        situation: "You hear the tornado sirens and see a dark, rotating cloud approaching. You're at home with your family.",
        learningObjective: "Learn proper tornado shelter procedures",
        choices: [
          {
            id: "tornado-choice-1",
            text: "Go to the basement or interior room on lowest floor",
            isCorrect: true,
            feedback: "Excellent! Get to the lowest floor, interior room, away from windows. Basements are best.",
            points: 10,
            consequence: "Your family safely shelters in the basement during the tornado."
          },
          {
            id: "tornado-choice-2",
            text: "Go outside to see the tornado",
            isCorrect: false,
            feedback: "Never go outside during a tornado warning! Flying debris is extremely dangerous.",
            points: 0,
            consequence: "You're struck by flying debris and seriously injured."
          },
          {
            id: "tornado-choice-3",
            text: "Get in your car and drive away",
            isCorrect: false,
            feedback: "Don't try to outrun a tornado in a car. Seek shelter in a sturdy building.",
            points: 1,
            consequence: "Your car is lifted by the tornado and you're seriously injured."
          }
        ]
      }
    ],
    quiz: [
      {
        id: "tornado-quiz-1",
        question: "What is the safest place to shelter during a tornado?",
        options: [
          "Near windows to watch the storm",
          "Basement or interior room on lowest floor",
          "In a mobile home",
          "Under an overpass"
        ],
        correctAnswer: 1,
        explanation: "The safest place is a basement or interior room on the lowest floor, away from windows.",
        difficulty: "easy",
        category: "Shelter Safety"
      }
    ]
  },
  {
    id: "tsunami",
    name: "Tsunami Safety",
    description: "Recognize tsunami warning signs, understand evacuation zones, and learn coastal safety procedures.",
    image: tsunamiImage,
    difficulty: "Advanced",
    duration: "16 mins",
    category: "Geological",
    severity: "Extreme",
    preparationTime: "Minutes to Hours",
    scenarios: [
      {
        id: "tsunami-scenario-1",
        title: "Ocean Receding",
        description: "You're at the beach and notice the ocean water pulling back unusually far.",
        situation: "The ocean has pulled back much further than normal, exposing the seafloor. People are walking out to collect shells and fish.",
        learningObjective: "Recognize natural tsunami warning signs",
        choices: [
          {
            id: "tsunami-choice-1",
            text: "Run to higher ground immediately",
            isCorrect: true,
            feedback: "Correct! Ocean receding is a natural tsunami warning. Get to high ground fast!",
            points: 10,
            consequence: "You safely reach high ground before the massive wave arrives."
          },
          {
            id: "tsunami-choice-2",
            text: "Walk out to see the exposed seafloor",
            isCorrect: false,
            feedback: "Extremely dangerous! The ocean receding means a tsunami wave is coming.",
            points: 0,
            consequence: "You're caught by the incoming tsunami wave and swept away."
          },
          {
            id: "tsunami-choice-3",
            text: "Warn others and then seek shelter",
            isCorrect: false,
            feedback: "Good intention but time is critical. Get to safety first, then help if possible.",
            points: 5,
            consequence: "You save some people but barely reach safety yourself."
          }
        ]
      }
    ],
    quiz: [
      {
        id: "tsunami-quiz-1",
        question: "What is a natural warning sign of an approaching tsunami?",
        options: [
          "Loud ocean sounds",
          "Ocean water pulling back unusually far",
          "Seagulls flying inland",
          "Warm ocean water"
        ],
        correctAnswer: 1,
        explanation: "When ocean water pulls back unusually far, exposing the seafloor, it's a natural warning that a tsunami wave is approaching.",
        difficulty: "medium",
        category: "Warning Signs"
      }
    ]
  },
  {
    id: "volcano",
    name: "Volcanic Eruption Safety",
    description: "Learn about volcanic hazards, ash fall protection, and evacuation procedures during volcanic activity.",
    image: volcanoImage,
    difficulty: "Advanced",
    duration: "22 mins",
    category: "Geological",
    severity: "Extreme",
    preparationTime: "Hours to Days",
    scenarios: [
      {
        id: "volcano-scenario-1",
        title: "Ash Fall Alert",
        description: "A nearby volcano has erupted and ash is falling in your area.",
        situation: "Volcanic ash is falling like snow. The air is becoming difficult to breathe and visibility is decreasing.",
        learningObjective: "Learn proper response to volcanic ash fall",
        choices: [
          {
            id: "volcano-choice-1",
            text: "Stay indoors with windows and doors closed",
            isCorrect: true,
            feedback: "Correct! Stay indoors, close all openings, and use masks or damp cloths to breathe.",
            points: 10,
            consequence: "You stay safe indoors while the ash fall passes."
          },
          {
            id: "volcano-choice-2",
            text: "Go outside to clean the ash off your car",
            isCorrect: false,
            feedback: "Never go outside during ash fall! Volcanic ash is harmful to lungs and eyes.",
            points: 0,
            consequence: "You develop serious respiratory problems from inhaling ash."
          },
          {
            id: "volcano-choice-3",
            text: "Drive to a safer location",
            isCorrect: false,
            feedback: "Driving during ash fall is dangerous due to poor visibility and engine damage.",
            points: 2,
            consequence: "Your car engine fails due to ash intake and you're stranded."
          }
        ]
      }
    ],
    quiz: [
      {
        id: "volcano-quiz-1",
        question: "What should you do if caught in volcanic ash fall?",
        options: [
          "Cover your mouth and nose, seek shelter indoors",
          "Run to higher ground",
          "Pour water on the ash to settle it",
          "Use a regular dust mask for protection"
        ],
        correctAnswer: 0,
        explanation: "Cover your mouth and nose with a damp cloth or N95 mask, and seek shelter indoors immediately.",
        difficulty: "medium",
        category: "Ash Protection"
      }
    ]
  },
  {
    id: "blizzard",
    name: "Blizzard Safety",
    description: "Understand severe winter weather preparation, hypothermia prevention, and survival techniques during blizzards.",
    image: blizzardImage,
    difficulty: "Intermediate",
    duration: "14 mins",
    category: "Weather",
    severity: "High",
    preparationTime: "Hours",
    scenarios: [
      {
        id: "blizzard-scenario-1",
        title: "Stranded in Car",
        description: "You're trapped in your car during a severe blizzard.",
        situation: "Your car is stuck in snow during a blizzard. Visibility is zero and temperatures are dropping rapidly.",
        learningObjective: "Learn survival techniques when stranded in winter weather",
        choices: [
          {
            id: "blizzard-choice-1",
            text: "Stay in the car and call for help",
            isCorrect: true,
            feedback: "Correct! Stay with your vehicle, call for help, and run the engine periodically for heat.",
            points: 10,
            consequence: "You stay warm in the car until rescue arrives."
          },
          {
            id: "blizzard-choice-2",
            text: "Walk to find help",
            isCorrect: false,
            feedback: "Walking in a blizzard is extremely dangerous due to disorientation and hypothermia risk.",
            points: 0,
            consequence: "You become lost in the blizzard and develop severe hypothermia."
          },
          {
            id: "blizzard-choice-3",
            text: "Keep the engine running continuously",
            isCorrect: false,
            feedback: "This wastes fuel and risks carbon monoxide poisoning. Run engine periodically.",
            points: 3,
            consequence: "You run out of fuel and develop carbon monoxide poisoning."
          }
        ]
      }
    ],
    quiz: [
      {
        id: "blizzard-quiz-1",
        question: "What is the most important thing to do if stranded in a car during a blizzard?",
        options: [
          "Keep moving to stay warm",
          "Stay with the vehicle and signal for help",
          "Turn off the engine to save fuel",
          "Walk to the nearest building"
        ],
        correctAnswer: 1,
        explanation: "Stay with your vehicle as it provides shelter. Signal for help and run the engine periodically for heat.",
        difficulty: "easy",
        category: "Vehicle Safety"
      }
    ]
  }
];

export const getExpandedDisasterById = (id: string): ExpandedDisasterType | undefined => {
  return expandedDisasters.find(disaster => disaster.id === id);
};