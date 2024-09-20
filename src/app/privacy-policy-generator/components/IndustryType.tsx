import React from 'react';

interface IndustryTypeProps {
  selectedIndustry: string;
  onSelect: (industry: string) => void;
}

const industries = [
  '电子商务', '教育', '金融', '医疗健康', '社交媒体', '游戏', '其他'
];

const IndustryType: React.FC<IndustryTypeProps> = ({ selectedIndustry, onSelect }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">请选择您的行业类型</h2>
      <div className="grid grid-cols-2 gap-4">
        {industries.map((industry) => (
          <button
            key={industry}
            className={`py-2 px-4 rounded ${
              industry === selectedIndustry
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
            onClick={() => onSelect(industry)}
          >
            {industry}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IndustryType;