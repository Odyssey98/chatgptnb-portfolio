import React, { useState } from 'react';
import { Button } from 'primereact/button';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { generatePolicy } from '../utils/generatePolicy';

type GenerationMethod = 'quick' | 'custom';
type OptionKey = 'industry' | 'dataCollection' | 'dataUsage' | 'dataSharing' | 'userRights' | 'security' | 'specialConsiderations';

interface PolicyResultProps {
  method: GenerationMethod;
  quickSelections: Record<OptionKey, string[]>;
  customAnswers: Record<string, string>;
  onEdit: () => void;
  onSave: () => void;
}

const PolicyResult: React.FC<PolicyResultProps> = ({
  method,
  quickSelections,
  customAnswers,
  onEdit,
  onSave
}) => {
  const generatedPolicy = generatePolicy(method, quickSelections, customAnswers);
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    const splitText = doc.splitTextToSize(generatedPolicy, 180);
    doc.text(splitText, 15, 15);
    doc.save("隐私政策.pdf");
  };

  const saveAsMarkdown = () => {
    const blob = new Blob([generatedPolicy], {type: "text/markdown;charset=utf-8"});
    saveAs(blob, "隐私政策.md");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPolicy).then(() => {
      // 显示复制成功的提示
    });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">生成的隐私政策</h2>
      
      {/* 添加选项卡切换 */}
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 ${activeTab === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          预览
        </button>
        <button
          onClick={() => setActiveTab('raw')}
          className={`px-4 py-2 ${activeTab === 'raw' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          原始文本
        </button>
      </div>

      {/* 预览模式 */}
      {activeTab === 'preview' && (
        <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 min-h-[300px] overflow-auto">
          {/* 使用 dangerouslySetInnerHTML 来渲染格式化的HTML */}
          <div dangerouslySetInnerHTML={{ __html: formatPolicy(generatedPolicy) }} />
        </div>
      )}

      {/* 原始文本模式 */}
      {activeTab === 'raw' && (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[300px] whitespace-pre-wrap text-gray-800 dark:text-gray-200 overflow-auto">
          {generatedPolicy}
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-4">
        <Button label="编辑" icon="pi pi-pencil" onClick={onEdit} className="p-button-secondary" />
        <Button label="保存" icon="pi pi-save" onClick={onSave} className="p-button-secondary" />
        <Button label="下载 PDF" icon="pi pi-file-pdf" onClick={generatePDF} className="p-button-secondary" />
        <Button label="下载 Markdown" icon="pi pi-file" onClick={saveAsMarkdown} className="p-button-secondary" />
        <Button label="复制到剪贴板" icon="pi pi-copy" onClick={copyToClipboard} className="p-button-secondary" />
      </div>
    </div>
  );
};

// 添加一个函数来格式化政策文本为HTML
function formatPolicy(policy: string): string {
  // 实现简单的Markdown到HTML的转换
  // 这里只是一个示例,您可能需要使用更复杂的Markdown解析器
  return policy
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>');
}

export default PolicyResult;