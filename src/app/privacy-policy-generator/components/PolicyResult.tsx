import React from 'react';
import { Button } from 'primereact/button';

type GenerationMethod = 'quick' | 'custom';
type OptionKey = 'industry' | 'dataCollection' | 'dataUsage' | 'dataSharing' | 'userRights' | 'security' | 'specialConsiderations';

interface PolicyResultProps {
  policy: string;
  method: GenerationMethod;
  quickSelections: Record<OptionKey, string[]>;
  customAnswers: Record<string, string>;
  onEdit: () => void;
  onSave: () => void;
}

const PolicyResult: React.FC<PolicyResultProps> = ({
  policy,
  method,
  quickSelections,
  customAnswers,
  onEdit,
  onSave
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">生成的隐私政策</h2>
      <div className="mb-4">
        <strong>生成方法:</strong> {method === 'quick' ? '快速生成' : '自定义生成'}
        {method === 'quick' && (
          <div>
            <strong>选择的选项:</strong>
            <ul>
              {Object.entries(quickSelections).map(([key, values]) => (
                <li key={key}>
                  <strong>{key}:</strong> {values.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
        {method === 'custom' && (
          <div>
            <strong>自定义回答:</strong>
            <ul>
              {Object.entries(customAnswers).map(([question, answer]) => (
                <li key={question}>
                  <strong>{question}:</strong> {answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="border rounded p-4 bg-gray-50 min-h-[300px] whitespace-pre-wrap">
        {policy}
      </div>
      <div className="flex justify-between">
        <Button label="编辑" icon="pi pi-pencil" onClick={onEdit} className="p-button-secondary" />
        <Button label="保存" icon="pi pi-save" onClick={onSave} className="p-button-secondary" />
      </div>
    </div>
  );
};

export default PolicyResult;