import React, { useState, useEffect, ChangeEvent } from 'react';
import { Trophy } from 'lucide-react';
import Confetti from './components/Confetti';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import NavigationButtons from './components/NavigationButtons';
import ActionButtons from './components/ActionButtons';
import HighScores from './components/HighScores';
import ScoreDisplay from './components/ScoreDisplay';
import { playSound } from './utils/soundEffects';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface HighScore {
  name: string;
  score: number;
  date: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "17 rounded off to the nearest 10 is..",
    options: ["10", "20", "17"],
    correctAnswer: "20"
  },
  {
    id: 2,
    question: "45 rounded off to the nearest 10 is..",
    options: ["50", "45", "40"],
    correctAnswer: "50"
  },
  {
    id: 3,
    question: "75 rounded off to the nearest 10 is..",
    options: ["70", "80", "175"],
    correctAnswer: "80"
  },
  {
    id: 4,
    question: "19 rounded to the nearest 10 is..",
    options: ["20", "10", "19"],
    correctAnswer: "20"
  },
  {
    id: 5,
    question: "64 rounded off to the nearest 10 is..",
    options: ["64", "70", "60"],
    correctAnswer: "60"
  },
  {
    id: 6,
    question: "0 rounded off to the nearest 10 is..",
    options: ["10", "1", "0"],
    correctAnswer: "0"
  },
  {
    id: 7,
    question: "98 rounded off to the nearest 10 is..",
    options: ["80", "100", "89"],
    correctAnswer: "100"
  },
  {
    id: 8,
    question: "199 rounded off to the nearest 10 is..",
    options: ["190", "100", "200"],
    correctAnswer: "200"
  },
  {
    id: 9,
    question: "94 rounded off to the nearest 10 is..",
    options: ["100", "94", "90"],
    correctAnswer: "90"
  },
  {
    id: 10,
    question: "165 rounded off to the nearest 10 is..",
    options: ["160", "170", "150"],
    correctAnswer: "170"
  },
  {
    id: 11,
    question: "445 rounded off to the nearest 10 is..",
    options: ["450", "440", "500"],
    correctAnswer: "450"
  },
  {
    id: 12,
    question: "999 rounded off to the nearest 10 is..",
    options: ["990", "1,000", "909"],
    correctAnswer: "1,000"
  }
];

function App() {
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [showNameError, setShowNameError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedScores = localStorage.getItem('highScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    }
  }, []);

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev: Record<number, string>) => ({
      ...prev,
      [questionId]: option
    }));
    playSound('click');
  };

  const saveHighScore = (score: number) => {
    const newScore: HighScore = {
      name,
      score,
      date: new Date().toLocaleDateString()
    };
    
    const newHighScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    setHighScores(newHighScores);
    localStorage.setItem('highScores', JSON.stringify(newHighScores));
    
    // Show confetti for high scores (8 or more correct)
    if (score >= 8) {
      setShowConfetti(true);
      playSound('success');
    }
  };

  const calculateScore = () => {
    if (!name.trim()) {
      setShowNameError(true);
      return;
    }
    
    setShowNameError(false);
    const correctAnswers = questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    
    setScore(correctAnswers);
    setSubmitted(true);
    saveHighScore(correctAnswers);
    
    // Show feedback message based on score
    if (correctAnswers >= 10) {
      setFeedbackMessage("Excellent! You're a rounding master!");
    } else if (correctAnswers >= 7) {
      setFeedbackMessage("Good job! You're getting better!");
    } else if (correctAnswers >= 5) {
      setFeedbackMessage("Not bad! Keep practicing!");
    } else {
      setFeedbackMessage("Keep practicing! You'll get better!");
    }
  };

  const resetWorksheet = () => {
    setAnswers({});
    setScore(null);
    setSubmitted(false);
    setCurrentQuestionIndex(0);
    setShowHighScores(false);
    setFeedbackMessage(null);
    playSound('click');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const navigateQuestion = (dir: 'prev' | 'next') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(dir);
    
    setTimeout(() => {
      setCurrentQuestionIndex((prev: number) => 
        dir === 'next' 
          ? Math.min(prev + 1, questions.length - 1)
          : Math.max(prev - 1, 0)
      );
      setIsAnimating(false);
    }, 300);
    
    playSound('click');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      {showConfetti && (
        <Confetti 
          duration={5000} 
          onComplete={() => setShowConfetti(false)} 
        />
      )}
      
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 transform transition-all duration-300 hover:shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
              Rounding Off to Nearest 10
            </h1>
            
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="relative flex-1 animate-slide-in">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all
                    ${showNameError ? 'border-red-500 animate-bounce' : 'border-gray-300'}`}
                />
                {showNameError && (
                  <p className="absolute text-red-500 text-sm mt-1 animate-fade-in">Please enter your name</p>
                )}
              </div>
              
              <button
                onClick={() => setShowHighScores(!showHighScores)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
                title="High Scores"
              >
                <Trophy size={24} />
              </button>
            </div>

            <ScoreDisplay 
              score={score}
              feedbackMessage={feedbackMessage}
            />
          </div>

          {showHighScores ? (
            <HighScores highScores={highScores} />
          ) : (
            <>
              <ProgressBar 
                progress={progress} 
                total={questions.length} 
                current={currentQuestionIndex + 1} 
              />
              
              <div className="relative">
                <QuestionCard 
                  question={currentQuestion}
                  currentIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                  submitted={submitted}
                  answers={answers}
                  onSelectOption={handleOptionSelect}
                  direction={direction}
                />

                <NavigationButtons 
                  currentIndex={currentQuestionIndex}
                  totalQuestions={questions.length}
                  onNavigate={navigateQuestion}
                  isAnimating={isAnimating}
                />
              </div>

              <ActionButtons 
                onReset={resetWorksheet}
                onSubmit={calculateScore}
                submitted={submitted}
              />
            </>
          )}

          <footer className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-3">
             
              <div className="text-xs text-gray-500 space-y-1">
                <p>Content and questions provided by <a href="https://www.mathinenglish.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">www.mathinenglish.com</a></p>
                
                <p className="text-gray-400">This app is for front-end web developer assessment purposes only.</p>
              </div>
            
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;