import React from 'react';
import { Check, X } from 'lucide-react';

interface VoteButtonProps {
  type: 'yes' | 'no';
  count: number;
  percentage: number;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export const VoteButton: React.FC<VoteButtonProps> = ({
  type,
  count,
  percentage,
  isSelected = false,
  isDisabled = false,
  onClick,
}) => {
  const isYes = type === 'yes';
  
  const baseClasses = `
    flex-1 relative overflow-hidden rounded-lg border-2 transition-all duration-200 
    ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105 active:scale-95'}
  `;
  
  const colorClasses = isYes
    ? `${isSelected 
        ? 'border-green-500 bg-green-50 text-green-700' 
        : 'border-green-200 bg-white text-green-600 hover:border-green-300 hover:bg-green-50'
      }`
    : `${isSelected 
        ? 'border-red-500 bg-red-50 text-red-700' 
        : 'border-red-200 bg-white text-red-600 hover:border-red-300 hover:bg-red-50'
      }`;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${colorClasses}`}
    >
      {/* Background percentage bar */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          isYes ? 'bg-green-100' : 'bg-red-100'
        }`}
        style={{ width: `${percentage}%` }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2 py-3 px-4">
        {isYes ? (
          <Check size={18} className={isSelected ? 'text-green-700' : 'text-green-600'} />
        ) : (
          <X size={18} className={isSelected ? 'text-red-700' : 'text-red-600'} />
        )}
        <div className="text-center">
          <div className="font-semibold text-sm">
            {isYes ? 'Yes' : 'No'}
          </div>
          <div className="text-xs opacity-80">
            {count.toLocaleString()} ({percentage.toFixed(1)}%)
          </div>
        </div>
      </div>
    </button>
  );
};