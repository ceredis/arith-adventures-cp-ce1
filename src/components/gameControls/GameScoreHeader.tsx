
import React from 'react';

interface GameScoreHeaderProps {
  questionNumber: number;
  totalQuestions: number;
  score: number;
}

const GameScoreHeader: React.FC<GameScoreHeaderProps> = ({ questionNumber, totalQuestions, score }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="px-3 py-1 bg-gray-100 rounded-md">
        Question: {questionNumber}/{totalQuestions}
      </div>
      <div className="px-3 py-1 bg-gray-100 rounded-md">
        Score: {score}/{totalQuestions}
      </div>
    </div>
  );
};

export default GameScoreHeader;
