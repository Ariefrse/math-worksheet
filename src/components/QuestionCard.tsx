import React from 'react';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
  };
  currentIndex: number;
  totalQuestions: number;
  submitted: boolean;
  answers: Record<number, string>;
  onSelectOption: (questionId: number, option: string) => void;
  direction: 'next' | 'prev';
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  submitted,
  answers,
  onSelectOption,
  direction
}) => {
  // Format the question text to be more readable
  const formattedQuestion = question.question.replace(
    /(\d+)\s+rounded\s+off\s+to\s+the\s+nearest\s+10/i,
    'Round <span class="font-bold text-blue-600">$1</span> to the nearest 10'
  );

  return (
    <div className="relative">
      <div 
        key={question.id}
        className={`p-6 rounded-xl border shadow-sm ${direction === 'next' ? 'animate-slide-in' : 'animate-fade-in'}
          ${submitted 
            ? answers[question.id] === question.correctAnswer
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
            : 'bg-white border-gray-200'}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">Question {currentIndex + 1} of {totalQuestions}</span>
          </div>
        </div>

        <div className="mb-6">
          <p 
            className="text-lg font-medium text-gray-900"
            dangerouslySetInnerHTML={{ __html: formattedQuestion }}
          />
          <p className="mt-2 text-sm text-gray-500">
            Choose the number that is closest to the given number when rounded to the nearest 10
          </p>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <label
              key={option}
              className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-300
                ${answers[question.id] === option 
                  ? submitted && option === question.correctAnswer
                    ? 'bg-green-100 text-green-900 transform scale-102 border-2 border-green-300 shadow-sm'
                    : submitted && option !== question.correctAnswer
                      ? 'bg-red-100 text-red-900 transform scale-102 border-2 border-red-300 shadow-sm'
                      : 'bg-blue-50 text-blue-900 transform scale-102 border-2 border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50 hover:scale-101 border border-gray-200'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={answers[question.id] === option}
                onChange={() => onSelectOption(question.id, option)}
                disabled={submitted}
                className="text-blue-600 focus:ring-blue-500 transition-all"
              />
              <span className="text-lg font-medium">{option}</span>
              {submitted && option === question.correctAnswer && (
                <div className="ml-auto flex items-center space-x-2">
                  <span className="text-sm text-green-600">Correct!</span>
                  <Check className="text-green-500" size={20} />
                </div>
              )}
              {submitted && option !== question.correctAnswer && answers[question.id] === option && (
                <div className="ml-auto flex items-center space-x-2">
                  <span className="text-sm text-red-600">Incorrect</span>
                  <X className="text-red-500" size={20} />
                </div>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard; 