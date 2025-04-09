import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentIndex: number;
  totalQuestions: number;
  onNavigate: (direction: 'prev' | 'next') => void;
  isAnimating: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  totalQuestions,
  onNavigate,
  isAnimating
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <button
        onClick={() => onNavigate('prev')}
        disabled={currentIndex === 0 || isAnimating}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <span className="text-sm text-gray-500 animate-fade-in">
        Question {currentIndex + 1} of {totalQuestions}
      </span>
      <button
        onClick={() => onNavigate('next')}
        disabled={currentIndex === totalQuestions - 1 || isAnimating}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default NavigationButtons; 