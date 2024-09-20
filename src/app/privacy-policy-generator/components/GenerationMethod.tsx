import React from 'react';
import { FaBolt, FaCog } from 'react-icons/fa';

interface GenerationMethodProps {
  onSelect: (method: 'quick' | 'custom') => void;
}

const GenerationMethod: React.FC<GenerationMethodProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">选择生成方式</h2>
      <div className="space-y-6 w-full">
        <button
          className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition duration-200 hover:scale-105"
          onClick={() => onSelect('quick')}
        >
          <FaBolt className="mr-3" />
          <span>快速生成</span>
        </button>
        <button
          className="flex items-center justify-center w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition duration-200 hover:scale-105"
          onClick={() => onSelect('custom')}
        >
          <FaCog className="mr-3" />
          <span>自定义生成</span>
        </button>
      </div>
      <p className="mt-8 text-sm text-gray-600 dark:text-gray-400 text-center">
        选择快速生成以获取基本隐私政策，或选择自定义生成以创建更详细的政策。
      </p>
    </div>
  );
};

export default GenerationMethod;