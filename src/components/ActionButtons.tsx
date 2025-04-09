import React from 'react';
import { RefreshCw, Send } from 'lucide-react';

interface ActionButtonsProps {
  onReset: () => void;
  onSubmit: () => void;
  submitted: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onReset,
  onSubmit,
  submitted
}) => {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg transition-all duration-300 hover:bg-gray-700 hover:scale-105"
      >
        <RefreshCw size={20} />
        Reset
      </button>
      <button
        onClick={onSubmit}
        disabled={submitted}
        className={`flex items-center gap-2 px-6 py-2 ${submitted ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed`}
      >
        <Send size={20} />
        Submit
      </button>
    </div>
  );
};

export default ActionButtons; 