'use client';

import React, { useState, useCallback } from 'react';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Steps } from 'primereact/steps';
import GenerationMethod from './components/GenerationMethod';
import CustomQuestions from './components/CustomQuestions';
import PolicyResult from './components/PolicyResult';
import SaveOptions from './components/SaveOptions';
import CompanyInfo, { CompanyInfoType } from './components/CompanyInfo';
import Head from 'next/head';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { RadioButton } from 'primereact/radiobutton';

type GenerationMethodType = 'quick' | 'custom';
type StepType = 'companyInfo' | 'method' | 'quickGeneration' | 'custom' | 'result' | 'save';
type StepId = keyof typeof options;

const steps: { id: StepId; title: string; icon: string }[] = [
  { id: 'industry', title: '选择行业', icon: 'pi pi-briefcase' },
  { id: 'dataCollection', title: '数据收集', icon: 'pi pi-database' },
  { id: 'dataUsage', title: '数据使用', icon: 'pi pi-chart-bar' },
  { id: 'dataSharing', title: '数据共享', icon: 'pi pi-share-alt' },
  { id: 'userRights', title: '用户权利', icon: 'pi pi-user' },
  { id: 'security', title: '安全措施', icon: 'pi pi-lock' },
  { id: 'specialConsiderations', title: '特殊考虑', icon: 'pi pi-exclamation-triangle' }
];

const options = {
  industry: ['电子商务', '金融服务', '医疗健康', '教育', '社交媒体', '其他'],
  dataCollection: [
    '基本信息（姓名、邮箱）', 
    '联系信息（电话、地址）', 
    '设备信息（IP地址、浏览器类型）', 
    '用户行为（浏览历史、购买记录）', 
    '敏感信息（健康数据、财务信息）',
    '必要个人信息（根据应用类型）'
  ],
  dataUsage: [
    '提供和改进服务', 
    '个性化用户体验', 
    '市场营销', 
    '分析和统计', 
    '法律合规',
    '最小必要原则'
  ],
  dataSharing: ['服务提供商', '广告合作伙伴', '数据分析公司', '法律要求', '不共享'],
  userRights: [
    '访问个人数据', 
    '更正错误信息', 
    '删除个人数据', 
    '限制数据处理', 
    '数据可携性',
    '撤回同意',
    '获取个人信息副本'
  ],
  security: [
    '数据加密', 
    '访问控制', 
    '定期安全审计', 
    '员工培训', 
    '事件响应计划',
    '专门的管理制度和流程'
  ],
  specialConsiderations: [
    '儿童隐私', 
    '跨境数据传输', 
    '自动化决策', 
    'Cookie使用', 
    '第三方集成',
    '敏感信息特殊说明'
  ]
};

export default function PrivacyPolicyGenerator() {
  const [state, setState] = useState({
    step: 'method' as StepType, // 将初始步骤改为 'method'
    companyInfo: {} as CompanyInfoType,
    generationMethod: 'quick' as GenerationMethodType,
    quickStep: 0,
    quickSelections: {} as Record<StepId, string[]>,
    customAnswers: {} as Record<string, string>,
    generatedPolicy: '',
  });

  const handleQuickSelection = useCallback((option: string) => {
    setState(prev => {
      const currentStepId = steps[prev.quickStep].id;
      let updatedSelections;

      // 对于互斥的选项进行单选处理
      if (currentStepId === 'industry' || currentStepId === 'dataSharing') {
        updatedSelections = {
          ...prev.quickSelections,
          [currentStepId]: [option]
        };
      } else {
        // 对于其他选项保持多选
        updatedSelections = {
          ...prev.quickSelections,
          [currentStepId]: prev.quickSelections[currentStepId]
            ? prev.quickSelections[currentStepId].includes(option)
              ? prev.quickSelections[currentStepId].filter(item => item !== option)
              : [...prev.quickSelections[currentStepId], option]
            : [option]
        };
      }

      return {
        ...prev,
        quickSelections: updatedSelections
      };
    });
  }, []);

  const nextQuickStep = useCallback(() => {
    setState(prev => {
      if (prev.quickStep < steps.length - 1) {
        const newQuickStep = prev.quickStep + 1;
        return { ...prev, quickStep: newQuickStep };
      } else {
        const policy = JSON.stringify(prev.quickSelections, null, 2);
        return {
          ...prev,
          step: 'result',
          generatedPolicy: policy
        };
      }
    });
  }, []);

  const prevQuickStep = useCallback(() => {
    setState(prev => {
      const newQuickStep = Math.max(0, prev.quickStep - 1);
      return { ...prev, quickStep: newQuickStep };
    });
  }, []);

  const renderQuickGeneration = () => {
    const currentStepId = steps[state.quickStep].id;
    const currentStep = steps[state.quickStep];
    const isNextDisabled = !state.quickSelections[currentStepId] || state.quickSelections[currentStepId].length === 0;
    const isSingleSelect = currentStepId === 'industry' || currentStepId === 'dataSharing';

    return (
      <div className="space-y-8">
        <div className="overflow-x-auto">
          <Steps 
            key={state.quickStep}
            model={steps.map(() => ({}))} 
            activeIndex={state?.quickStep} 
            className="mb-8 whitespace-nowrap" 
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">{currentStep.title}</h2>
        <div className="flex justify-center items-center text-6xl text-blue-500 mb-8">
          <i className={currentStep.icon}></i>
        </div>
        <div className="space-y-4">
          {options[currentStepId].map(option => (
            <div 
              key={option} 
              className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 cursor-pointer"
              onClick={() => handleQuickSelection(option)}
            >
              {isSingleSelect ? (
                <RadioButton
                  inputId={option}
                  name={currentStepId}
                  value={option}
                  onChange={() => handleQuickSelection(option)}
                  checked={state.quickSelections[currentStepId]?.[0] === option}
                  className="text-blue-600 focus:ring-blue-500"
                />
              ) : (
                <Checkbox
                  inputId={option}
                  checked={state.quickSelections[currentStepId]?.includes(option) || false}
                  className="text-blue-600 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()} 
                />
              )}
              <label htmlFor={option} className="ml-4 text-lg text-gray-700 dark:text-gray-300 cursor-pointer flex-grow">
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-8">
          <Button 
            label="上一步" 
            icon="pi pi-chevron-left" 
            onClick={prevQuickStep} 
            disabled={state.quickStep === 0}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 px-6 py-3 rounded-xl" 
          />
          <Button 
            label={state.quickStep === steps.length - 1 ? '生成政策' : '下一步'} 
            icon="pi pi-chevron-right" 
            iconPos="right" 
            onClick={() => {
              nextQuickStep();
            }}
            disabled={isNextDisabled}
            className={`${isNextDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 rounded-xl`}
          />
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (state.step) {
      case 'method':
        return <GenerationMethod onSelect={(method: GenerationMethodType) => {
          setState(prev => ({
            ...prev,
            generationMethod: method,
            step: 'companyInfo' // 无论选择哪种方法，都先进入公司信息步骤
          }));
        }} />;
      case 'companyInfo':
        return <CompanyInfo onSubmit={(info: CompanyInfoType) => {
          setState(prev => ({
            ...prev,
            companyInfo: info,
            step: prev.generationMethod === 'quick' ? 'quickGeneration' : 'custom'
          }));
        }} />;
      case 'quickGeneration':
        return renderQuickGeneration();
      case 'custom':
        return <CustomQuestions 
          initialAnswers={state.customAnswers}
          onSubmit={(answers: Record<string, string>) => {
            const policy = JSON.stringify(answers, null, 2);
            setState(prev => ({
              ...prev,
              customAnswers: answers,
              generatedPolicy: policy,
              step: 'result'
            }));
          }} 
        />;
      case 'result':
        return <PolicyResult 
          // policy={state.generatedPolicy} 
          method={state.generationMethod}
          quickSelections={state.quickSelections}
          customAnswers={state.customAnswers}
          companyInfo={state.companyInfo}
          onEdit={() => setState(prev => ({
            ...prev,
            step: prev.generationMethod === 'quick' ? 'quickGeneration' : 'custom'
          }))}
          onSave={() => setState(prev => ({ ...prev, step: 'save' }))}
        />;
      case 'save':
        return <SaveOptions />;
      default:
        return <div>未知步骤</div>;
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "隐私协议生成器",
    "description": "使用我们的隐私协议生成器轻松创建符合您需求的隐私政策",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY"
    }
  };

  return (
    <>
      <Head>
        <title>隐私协议生成器 | 轻松创建您的隐私政策</title>
        <meta name="description" content="使用我们的隐私协议生成器轻松创建符合您需求的隐私政策。快速、简单、专业。" />
        <meta name="keywords" content="隐私协议,隐私政策,生成器,在线工具,法律合规" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="隐私协议生成器 | 轻松创建您的隐私政策" />
        <meta property="og:description" content="使用我们的隐私协议生成器轻松创建符合您需求的隐私政策。快速、简单、专业。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chatgptnb.com/privacy-policy-generator" />
        <meta property="og:image" content="https://chatgptnb.com/images/privacy-policy-generator-og.jpg" />
        <link rel="canonical" href="https://chatgptnb.com/privacy-policy-generator" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <main className="flex-grow flex flex-col justify-center items-center w-full mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="w-full max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 dark:text-white mb-8 sm:mb-12">
              隐私协议政策生成器
            </h1>
            <div className="bg-white dark:bg-gray-800 shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8">
                {renderStep()}
              </div>
            </div>
          </div>
        </main>
        
        <footer className="w-full bg-blue-50 dark:bg-blue-900 py-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center text-blue-700 dark:text-blue-200">
              <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm sm:text-base">
                请注意，这个生成器提供的是一个基本框架。您应该根据自己的具体情况和法律要求来调整最终的隐私政策。
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}