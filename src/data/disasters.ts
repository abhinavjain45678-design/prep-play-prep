import earthquakeImage from "@/assets/earthquake-hero.jpg";
import fireImage from "@/assets/fire-hero.jpg";
import floodImage from "@/assets/flood-hero.jpg";

export interface DisasterType {
  id: string;
  name: string;
  description: string;
  image: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  scenarios: Scenario[];
  quiz: QuizQuestion[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  choices: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  points: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export const disasters: DisasterType[] = [
  {
    id: "earthquake",
    name: "Earthquake Safety",
    description: "Learn how to respond during and after an earthquake. Practice Drop, Cover, and Hold On techniques.",
    image: earthquakeImage,
    difficulty: "Intermediate",
    duration: "15 mins",
    scenarios: [
      {
        id: "eq-scenario-1",
        title: "Earthquake at School",
        description: "You're in your classroom when the ground starts shaking violently.",
        situation: "The floor is shaking, books are falling from shelves, and students are panicking. What's your first action?",
        choices: [
          {
            id: "eq-choice-1",
            text: "Run outside immediately",
            isCorrect: false,
            feedback: "Running during shaking is dangerous. You could fall or be hit by falling objects.",
            points: 0
          },
          {
            id: "eq-choice-2",
            text: "Drop, Cover, and Hold On under your desk",
            isCorrect: true,
            feedback: "Excellent! This is the correct response. Drop to your hands and knees, take cover under a sturdy desk, and hold on.",
            points: 10
          },
          {
            id: "eq-choice-3",
            text: "Stand in the doorway",
            isCorrect: false,
            feedback: "Modern doorways aren't necessarily safer. Drop, Cover, and Hold On is better.",
            points: 2
          }
        ]
      },
      {
        id: "eq-scenario-2",
        title: "After the Shaking Stops",
        description: "The earthquake has stopped. What should you do next?",
        situation: "The shaking has ended. You're safe under your desk, but you can hear people moving around.",
        choices: [
          {
            id: "eq-choice-4",
            text: "Wait for instructions from your teacher",
            isCorrect: true,
            feedback: "Correct! Follow your teacher's evacuation plan. They will guide you safely outside.",
            points: 10
          },
          {
            id: "eq-choice-5",
            text: "Rush outside with everyone else",
            isCorrect: false,
            feedback: "This could cause dangerous crowding. Follow the evacuation plan calmly.",
            points: 3
          },
          {
            id: "eq-choice-6",
            text: "Check if the building is damaged first",
            isCorrect: false,
            feedback: "Leave building inspection to professionals. Focus on safe evacuation.",
            points: 1
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
        difficulty: "easy"
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
        difficulty: "medium"
      }
    ]
  },
  {
    id: "fire",
    name: "Fire Safety",
    description: "Master fire evacuation procedures and learn when to fight a fire versus when to evacuate.",
    image: fireImage,
    difficulty: "Beginner",
    duration: "12 mins",
    scenarios: [
      {
        id: "fire-scenario-1",
        title: "Kitchen Fire",
        description: "A small fire has started in the kitchen while cooking.",
        situation: "Oil in a pan has caught fire. The flames are small but growing. What do you do?",
        choices: [
          {
            id: "fire-choice-1",
            text: "Pour water on the fire",
            isCorrect: false,
            feedback: "Never use water on oil fires! It will cause the fire to spread and create dangerous splashing.",
            points: 0
          },
          {
            id: "fire-choice-2",
            text: "Turn off the heat and cover with a lid",
            isCorrect: true,
            feedback: "Perfect! Turn off the heat source and carefully cover with a lid to cut off oxygen.",
            points: 10
          },
          {
            id: "fire-choice-3",
            text: "Use a fire extinguisher immediately",
            isCorrect: false,
            feedback: "For small cooking fires, covering with a lid is safer and more effective than a fire extinguisher.",
            points: 5
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
        difficulty: "easy"
      }
    ]
  },
  {
    id: "flood",
    name: "Flood Safety",
    description: "Understand flood warnings, evacuation routes, and water safety during flooding events.",
    image: floodImage,
    difficulty: "Advanced",
    duration: "18 mins",
    scenarios: [
      {
        id: "flood-scenario-1",
        title: "Rising Waters",
        description: "Heavy rains have caused flooding in your neighborhood.",
        situation: "Water levels are rising quickly outside your home. You can see cars struggling to move through the streets.",
        choices: [
          {
            id: "flood-choice-1",
            text: "Stay inside and move to higher ground",
            isCorrect: true,
            feedback: "Correct! Get to the highest level of your home and wait for emergency services.",
            points: 10
          },
          {
            id: "flood-choice-2",
            text: "Try to drive to safety",
            isCorrect: false,
            feedback: "Driving in flood water is extremely dangerous. Just 6 inches of moving water can knock you down, and 12 inches can carry away a vehicle.",
            points: 0
          },
          {
            id: "flood-choice-3",
            text: "Walk through the water to reach higher ground",
            isCorrect: false,
            feedback: "Never walk through moving water. It can be deeper than it appears and hide dangerous debris.",
            points: 2
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
        difficulty: "medium"
      }
    ]
  }
];

export const getDisasterById = (id: string): DisasterType | undefined => {
  return disasters.find(disaster => disaster.id === id);
};