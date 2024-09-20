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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">公司信息</h2>
      <div className="space-y-4">
        <InputText
          placeholder="公司名称"
          value={info.name}
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
          className="w-full"
        />
        <InputText
          placeholder="公司网站"
          value={info.website}
          onChange={(e) => setInfo({ ...info, website: e.target.value })}
          className="w-full"
        />
        <InputText
          placeholder="联系邮箱"
          value={info.contactEmail}
          onChange={(e) => setInfo({ ...info, contactEmail: e.target.value })}
          className="w-full"
        />
      </div>
      <Button
        label="下一步"
        onClick={handleSubmit}
        disabled={!info.name || !info.website || !info.contactEmail}
        className="w-full"
      />
    </div>
  );
}