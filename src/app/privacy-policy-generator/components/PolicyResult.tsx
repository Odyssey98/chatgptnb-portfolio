import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { saveAs } from 'file-saver';
import { generatePolicy } from '../utils/generatePolicy';
import { CompanyInfoType } from './CompanyInfo';
import { marked } from 'marked';

type GenerationMethod = 'quick' | 'custom';
type OptionKey = 'industry' | 'dataCollection' | 'dataUsage' | 'dataSharing' | 'userRights' | 'security' | 'specialConsiderations';

interface PolicyResultProps {
  method: GenerationMethod;
  quickSelections: Record<OptionKey, string[]>;
  customAnswers: Record<string, string>;
  onEdit: () => void;
  onSave: () => void;
  companyInfo: CompanyInfoType;
}

const PolicyResult: React.FC<PolicyResultProps> = ({
  method,
  quickSelections,
  customAnswers,
  onEdit,
  companyInfo
}) => {
  const generatedPolicy = generatePolicy(method, quickSelections, customAnswers, companyInfo);
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');

  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   let y = 20;
  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const margin = 20;
  //   const maxWidth = pageWidth - 2 * margin;

  //   const addTextToDoc = (text: string, fontSize = 12, isTitle = false) => {
  //     doc.setFontSize(fontSize);
  //     const lines = doc.splitTextToSize(text, maxWidth);
  //     lines.forEach((line: string) => {
  //       if (y > 280) {
  //         doc.addPage();
  //         y = 20;
  //       }
  //       doc.text(line, margin, y);
  //       y += fontSize * 0.5 + (isTitle ? 5 : 2);
  //     });
  //   };

  //   // 解析 Markdown
  //   const tokens = marked.lexer(generatedPolicy);
    
  //   tokens.forEach((token: marked.Token) => {
  //     switch (token.type) {
  //       case 'heading':
  //         const fontSize = 24 - (token as marked.Tokens.Heading).depth * 2;
  //         addTextToDoc((token as marked.Tokens.Heading).text, fontSize, true);
  //         break;
  //       case 'paragraph':
  //         addTextToDoc((token as marked.Tokens.Paragraph).text);
  //         break;
  //       case 'list':
  //         (token as marked.Tokens.List).items.forEach((item) => {
  //           addTextToDoc(`• ${item.text}`);
  //         });
  //         break;
  //     }
  //     y += 5; // 段落间距
  //   });

  //   doc.save(`${companyInfo.name}隐私政策.pdf`);
  // };

  const saveAsHTML = () => {
    const htmlContent = marked.parse(generatedPolicy);
    const fullHTML = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyInfo.name}隐私政策</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; }
        h2 { color: #34495e; }
        ul { padding-left: 20px; }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;
    const blob = new Blob([fullHTML], {type: "text/html;charset=utf-8"});
    saveAs(blob, `${companyInfo.name}隐私政策.html`);
  };

  const saveAsMarkdown = () => {
    const blob = new Blob([generatedPolicy], {type: "text/markdown;charset=utf-8"});
    saveAs(blob, `${companyInfo.name}隐私政策.md`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPolicy).then(() => {
      console.log('内容已复制到剪贴板');
    }).catch(err => {
      console.error('复制失败:', err);
    });
  };

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">生成的隐私政策</h2>
      
      {/* 选项卡切换 */}
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
          <div dangerouslySetInnerHTML={{ __html: marked.parse(generatedPolicy) }} />
        </div>
      )}

      {/* 原始文本模式 */}
      {activeTab === 'raw' && (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[300px] whitespace-pre-wrap text-gray-800 dark:text-gray-200 overflow-auto">
          {generatedPolicy}
        </div>
      )}

      <div className="flex flex-wrap justify-between gap-4">
        <Button label="回退编辑" icon="pi pi-pencil" onClick={onEdit} className="p-button-secondary" />
        <Button label="下载 HTML" icon="pi pi-file" onClick={saveAsHTML} className="p-button-secondary" />
        <Button label="下载 Markdown" icon="pi pi-file" onClick={saveAsMarkdown} className="p-button-secondary" />
        <Button label="复制到剪贴板" icon="pi pi-copy" onClick={copyToClipboard} className="p-button-secondary" />
      </div>
    </div>
  );
};

export default PolicyResult;