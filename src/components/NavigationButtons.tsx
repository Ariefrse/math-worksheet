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
    <div className="flex items-center justify-center mt-4">
      <span className="text-sm text-gray-500 animate-fade-in">
        Question {currentIndex + 1} of {totalQuestions}
      </span>
    </div>
  );
};

export default NavigationButtons; 