'use client';

import React, { useState, useEffect } from 'react';

interface CustomQuestionsProps {
  initialAnswers: Record<string, string>;
  onSubmit: (answers: Record<string, string>) => void;
}

const questions = [
  { id: 'dataCollection', question: '您收集哪些类型的个人信息？如何收集（直接提供、自动收集、第三方获取）？是否收集敏感信息？是否使用cookies？' },
  { id: 'dataUsage', question: '收集的信息将用于哪些目的？是否用于直接营销？是否进行自动化决策或用户画像？' },
  { id: 'dataSharing', question: '是否与第三方共享用户数据？如果是，与哪些类型的第三方？共享目的是什么？是否跨境传输数据？' },
  { id: 'dataStorage', question: '数据保留多长时间？采取了哪些安全措施来保护数据？如何处理数据泄露事件？' },
  { id: 'userRights', question: '用户可以行使哪些权利（如访问、更正、删除数据）？如何行使这些权利？是否允许用户选择退出某些数据处理活动？' },
  { id: 'childrenPrivacy', question: '服务是否面向儿童？如何处理儿童的个人信息？' },
  { id: 'policyUpdates', question: '如何通知用户隐私政策的变更？变更后用户如何继续使用服务？' },
  { id: 'contactInfo', question: '用户如何联系您解决隐私相关问题？是否有专门的数据保护官员？' },
  { id: 'legalCompliance', question: '适用哪些隐私法规（如GDPR、CCPA、中国个人信息保护法）？如何确保跨境数据传输的合规性？' },
  { id: 'industrySpecific', question: '您的行业是否有特定的隐私要求（如金融、医疗、电商、教育）？如何处理？' },
  { id: 'technicalDetails', question: '是否使用第三方分析工具？网站/应用是否集成社交媒体功能？是否进行用户行为跟踪？' },
  { id: 'consentManagement', question: '如何获取用户同意？用户如何撤回同意？是否使用分层同意机制？' },
];

const CustomQuestions: React.FC<CustomQuestionsProps> = ({ initialAnswers, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);

  useEffect(() => {
    setAnswers(initialAnswers);
  }, [initialAnswers]);

  const handleChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">请回答以下隐私政策相关问题</h2>
      {questions.map(({ id, question }) => (
        <div key={id} className="flex flex-col">
          <label htmlFor={id} className="mb-2 font-medium">{question}</label>
          <textarea
            id={id}
            value={answers[id] || ''}
            onChange={(e) => handleChange(id, e.target.value)}
            className="border rounded p-2"
            rows={4}
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
        生成隐私政策
      </button>
    </form>
  );
};

export default CustomQuestions;