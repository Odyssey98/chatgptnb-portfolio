import React from 'react';
import { FaBolt, FaCog,  } from 'react-icons/fa';

interface GenerationMethodProps {
  onSelect: (method: 'quick' | 'custom') => void;
}

const GenerationMethod: React.FC<GenerationMethodProps> = ({ onSelect }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8">
      {/* <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        选择生成方式
      </h2> */}
      <div className="space-y-4">
        <button
          className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => onSelect('quick')}
        >
          <FaBolt className="mr-3 text-2xl" />
          <span className="text-xl">快速生成</span>
        </button>
        <button
          className="flex items-center justify-center w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:focus:ring-gray-600"
          onClick={() => onSelect('custom')}
        >
          <FaCog className="mr-3 text-2xl" />
          <span className="text-xl">自定义生成</span>
        </button>
      </div>
      {/* <div className="mt-8 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg flex items-start">
        <FaInfoCircle className="text-blue-500 dark:text-blue-300 mr-3 mt-1 flex-shrink-0" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          选择快速生成或自定义生成。后续步骤中可进行调整。
        </p>
      </div> */}
    </div>
  );
};

export default GenerationMethod;