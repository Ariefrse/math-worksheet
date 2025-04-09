import React from 'react';
import { Award } from 'lucide-react';

interface HighScore {
  name: string;
  score: number;
  date: string;
}

interface HighScoresProps {
  highScores: HighScore[];
}

const HighScores: React.FC<HighScoresProps> = ({ highScores }) => {
  return (
    <div className="animate-scale-in">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Award className="mr-2 text-yellow-500" size={24} />
        High Scores
      </h2>
      <div className="space-y-2">
        {highScores.map((highScore: HighScore, index: number) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transform transition-all duration-300 hover:scale-102 hover:bg-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center">
              {index === 0 && <span className="text-yellow-500 mr-2">🥇</span>}
              {index === 1 && <span className="text-gray-400 mr-2">🥈</span>}
              {index === 2 && <span className="text-amber-600 mr-2">🥉</span>}
              {index > 2 && <span className="text-gray-400 mr-2">{index + 1}.</span>}
              <div>
                <span className="font-medium">{highScore.name}</span>
                <span className="text-sm text-gray-500 ml-2">({highScore.date})</span>
              </div>
            </div>
            <span className="text-blue-600 font-semibold">{highScore.score}/12</span>
          </div>
        ))}
        {highScores.length === 0 && (
          <p className="text-center text-gray-500 animate-fade-in">No high scores yet!</p>
        )}
      </div>
    </div>
  );
};

export default HighScores; 