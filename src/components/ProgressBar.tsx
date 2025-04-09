import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  current: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, total, current }) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-blue-600">{Math.round(normalizedProgress)}%</span>
      </div>
      
      <div className="relative bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${normalizedProgress}%`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
          }}
        />
        
        {/* Progress markers */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: total + 1 }).map((_, index) => (
            <div 
              key={index}
              className="h-full w-px bg-gray-300"
              style={{ 
                marginLeft: `${(index * 100) / total}%`,
                opacity: index <= current ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">Question {current} of {total}</span>
        <span className="text-xs text-gray-500">
          {current === total ? 'Final Question' : `${total - current} remaining`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar; 