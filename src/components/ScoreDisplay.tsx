import React from 'react';
import { Star } from 'lucide-react';

interface ScoreDisplayProps {
  score: number | null;
  feedbackMessage: string | null;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, feedbackMessage }) => {
  if (score === null) return null;
  
  return (
    <>
      <div className="text-lg font-semibold animate-bounce-score">
        Score: <span className="text-blue-600">{score}/12</span>
        {score >= 8 && (
          <span className="ml-2 text-yellow-500 inline-flex items-center">
            <Star size={20} className="mr-1" /> Great job!
          </span>
        )}
      </div>
      
      {feedbackMessage && (
        <div className="mt-2 text-md font-medium text-indigo-600 animate-fade-in">
          {feedbackMessage}
        </div>
      )}
    </>
  );
};

export default ScoreDisplay; 