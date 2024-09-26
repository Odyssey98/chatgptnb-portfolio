import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

type CompanyInfoProps = {
  onSubmit: (info: CompanyInfoType) => void;
};

export type CompanyInfoType = {
  name: string;
  website: string;
  contactEmail: string;
};

export default function CompanyInfo({ onSubmit }: CompanyInfoProps) {
  const [info, setInfo] = useState<CompanyInfoType>({
    name: '',
    website: '',
    contactEmail: '',
  });

  const handleSubmit = () => {
    if (info.name && info.website && info.contactEmail) {
      onSubmit(info);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">公司信息</h2>
      <div className="space-y-6">
        <div className="relative">
          <InputText
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 -top-2.5 left-2 bg-white dark:bg-gray-800 px-1">公司名称</label>
        </div>
        <div className="relative">
          <InputText
            value={info.website}
            onChange={(e) => setInfo({ ...info, website: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 -top-2.5 left-2 bg-white dark:bg-gray-800 px-1">公司网站</label>
        </div>
        <div className="relative">
          <InputText
            value={info.contactEmail}
            onChange={(e) => setInfo({ ...info, contactEmail: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 -top-2.5 left-2 bg-white dark:bg-gray-800 px-1">联系邮箱</label>
        </div>
      </div>
      <Button
        label="下一步"
        onClick={handleSubmit}
        disabled={!info.name || !info.website || !info.contactEmail}
        className="w-full mt-8 p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
      />
    </div>
  );
}