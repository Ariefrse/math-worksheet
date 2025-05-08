import React from 'react';
import { RefreshCw, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface ActionButtonsProps {
  onReset: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitted: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onReset,
  onNext,
  onSubmit,
  submitted,
  currentQuestionIndex,
  totalQuestions
}) => {
  const isLast = currentQuestionIndex === totalQuestions - 1;
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg transition-all duration-300 hover:bg-gray-700 hover:scale-105"
      >
        <ChevronLeft size={20} />
        Previous
      </button>
      <button
        onClick={isLast ? onSubmit : onNext}
        disabled={submitted}
        className={`flex items-center gap-2 px-6 py-2 ${submitted ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        {isLast ? <Check size={20} /> : <ChevronRight size={20} />}
        {isLast ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default ActionButtons; 