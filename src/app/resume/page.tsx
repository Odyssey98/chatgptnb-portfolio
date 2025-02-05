'use client';

import React, { useEffect, useState } from 'react';
import { Github, Mail, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// 添加翻译类型和内容
type Language = 'en' | 'zh';

type Translations = {
  [key in Language]: {
    back: string;
    title: string;
    subtitle: string;
    contact: {
      phone: string;
      email: string;
      location: string;
      github: string;
    };
    personalInfo: {
      title: string;
      gender: string;
      education: string;
      experience: string;
      position: string;
    };
    skills: {
      title: string;
      items: string[];
      frontendDev: string;
      toolsOthers: string;
    };
    experience: {
      title: string;
      jobs: {
        period: string;
        company: string;
        position: string;
        responsibilities: string[];
      }[];
    };
    projects: {
      title: string;
      items: {
        name: string;
        period: string;
        description: string;
        responsibilities: string;
        stack: string;
        highlights: string;
      }[];
    };
    education: {
      title: string;
      university: string;
      faculty: string;
      period: string;
    };
  };
};

const translations: Translations = {
  en: {
    back: 'Back',
    title: 'Yang Shihao',
    subtitle: 'Frontend Developer',
    contact: {
      phone: '19125233798',
      email: 'yongbi1217@163.com',
      location: 'Shenzhen',
      github: 'Odyssey76',
    },
    personalInfo: {
      title: 'Personal Information',
      gender: 'Male',
      education: "Bachelor's Degree",
      experience: '3 Years',
      position: 'Frontend Developer',
    },
    skills: {
      title: 'Professional Skills',
      items: [
        'Proficient in modern frontend development and engineering practices',
        'Rich experience in web performance optimization',
        'Rich experience in responsive design and mobile adaptation',
        'Proficient in modern frontend build tools and engineering',
        'Experienced in component development and architecture design',
        'Familiar with browser rendering mechanisms',
        'Familiar with frontend testing and CI/CD',
        'Familiar with Mini Program development',
      ],
      frontendDev: 'Frontend Development',
      toolsOthers: 'Tools & Others',
    },
    experience: {
      title: 'Work Experience',
      jobs: [
        {
          period: '2022.03 - Present',
          company: 'Shanjian Technology',
          position: 'Frontend Developer',
          responsibilities: [
            'Responsible for AI-related Web development (Face Swap, Chat)',
            'Responsible for influencer settlement and backend development',
            'Responsible for development and maintenance of common components, libraries and tools',
          ],
        },
        {
          period: '2021.04 - 2022.03',
          company: 'ZA Tech',
          position: 'Frontend Developer',
          responsibilities: [
            'Responsible for core business module development and maintenance',
            'Responsible for optimizing frontend architecture and component abstraction',
            'Collaborate with team on project planning, design and development',
          ],
        },
      ],
    },
    projects: {
      title: 'Project Experience',
      items: [
        {
          name: 'FacePlay (Web)',
          period: '2023.08 - 2024.01',
          description:
            'A web application for face swapping in images/videos with payment and history features.',
          responsibilities:
            'Developed drag-and-drop upload, video frame extraction with WebAssembly FFmpeg, payment system and user history modules.',
          stack: 'Modern Frontend Stack + WebAssembly + FFmpeg',
          highlights:
            'Optimized video frame extraction process and solved CORS issues, significantly improving upload performance and user experience.',
        },
        {
          name: 'Influencer Settlement (Mini Program)',
          period: '2023.04 - 2023.08',
          description:
            'A WeChat Mini Program for influencer settlement with private message verification.',
          responsibilities:
            'Developed the entire Mini Program including authentication, form submission, settlement records and private card sharing.',
          stack: 'Mini Program Development Stack + Custom Error Tracking',
          highlights:
            'Implemented custom error reporting mechanism to improve issue identification efficiency with WeChat API integration.',
        },
        {
          name: 'Team Scaffold CLI',
          period: '2022.07 - 2022.10',
          description:
            'Internal scaffolding tool for standardizing team project setup.',
          responsibilities:
            'Led the development of CLI tool supporting Mini Program, backend and H5/Web project types.',
          stack: 'Node.js + Commander + Inquirer',
          highlights:
            'Automated project initialization process, significantly reducing setup time and maintaining consistency across team projects.',
        },
        {
          name: 'ChatMe (Web)',
          period: '2022.12 - 2023.03',
          description:
            'A ChatGPT-like application with content moderation and payment system.',
          responsibilities:
            'Developed typewriter effect chat interface, mobile adaptation, payment system and internationalization.',
          stack: 'Modern Web Stack + Markdown Processing',
          highlights:
            'Achieved high-performance frontend implementation with smooth user interactions and responsive design.',
        },
        {
          name: 'ZA Bank (Mobile App)',
          period: '2021.06 - 2022.03',
          description:
            'A comprehensive virtual bank in Hong Kong offering various banking services.',
          responsibilities: 'Led the development of account opening module.',
          stack: 'Mobile App Development Stack + Custom UI Components',
          highlights:
            'Successfully delivered a secure and user-friendly account opening experience.',
        },
      ],
    },
    education: {
      title: 'Education',
      university: 'Henan University (Double First-Class)',
      faculty: 'School of Software',
      period: '2017.09 - 2021.06',
    },
  },
  zh: {
    back: '返回',
    title: '杨世浩',
    subtitle: '前端开发工程师',
    contact: {
      phone: '19125233798',
      email: 'yongbi1217@163.com',
      location: '深圳',
      github: 'Odyssey76',
    },
    personalInfo: {
      title: '个人信息',
      gender: '男',
      education: '本科',
      experience: '3年',
      position: '前端开发工程师',
    },
    skills: {
      title: '专业技能',
      items: [
        '精通现代前端开发和工程化实践',
        '丰富的 Web 性能优化经验',
        '丰富的响应式设计和移动端适配经验',
        '精通现代前端构建工具和工程化',
        '丰富的组件开发和架构设计经验',
        '熟悉浏览器渲染机制',
        '熟悉前端测试和 CI/CD',
        '熟悉小程序开发',
      ],
      frontendDev: '前端开发',
      toolsOthers: '工具和其他',
    },
    experience: {
      title: '工作经验',
      jobs: [
        {
          period: '2022.03 - 至今',
          company: '闪剪科技',
          position: '前端开发工程师',
          responsibilities: [
            '负责AI相关项目Web开发（换脸、Chat）',
            '负责达人结算及其配套后台开发',
            '负责公共组件、库和工具的开发和维护，积极尝试在项目中运用前端新技术',
          ],
        },
        {
          period: '2021.04 - 2022.03',
          company: '众安科技',
          position: '前端开发工程师',
          responsibilities: [
            '负责前端核心业务模块的研发和维护',
            '负责推动与优化已有前端项目的基础架构与组件抽象',
            '与团队配合完成整体项目规划、设计与开发',
          ],
        },
      ],
    },
    projects: {
      title: '项目经验',
      items: [
        {
          name: 'FacePlay (Web版)',
          period: '2023.08 - 2024.01',
          description:
            '开发了一个允许用户上传图片或视频进行换脸的Web应用，支持充值和历史记录查看。',
          responsibilities:
            '独立负责用户的拖拽上传功能、使用WebAssembly版本的FFmpeg进行视频截帧，以及充值系统和用户制作记录模块的开发。',
          stack: '现代前端技术栈 + WebAssembly + FFmpeg',
          highlights:
            '优化了视频帧提取过程并解决了跨域问题，显著提升了上传性能和用户体验。',
        },
        {
          name: '达人结算（微信小程序）',
          period: '2023.04 - 2023.08',
          description: '一个面向运营的达人结算小程序，支持微信私密消息验证。',
          responsibilities:
            '负责整个小程序的登录注册、表单填写、结算记录查询和私密卡片分享功能的开发。',
          stack: '小程序开发技术栈 + 自定义错误追踪',
          highlights:
            '针对微信API集成难点，引入自定义错误上报机制，提高问题定位效率。',
        },
        {
          name: '团队脚手架工具',
          period: '2022.07 - 2022.10',
          description:
            '为满足快速响应需求，统一团队项目技术栈，搭建公司内部脚手架。',
          responsibilities:
            '主导开发了支持小程序、后台及H5/Web三种项目类型的命令行工具。',
          stack: 'Node.js + Commander + Inquirer',
          highlights:
            '自动化项目初始化流程，显著减少项目设置时间，保持团队项目一致性。',
        },
        {
          name: 'ChatMe (Web)',
          period: '2022.12 - 2023.03',
          description: '类ChatGPT项目，集成文本审核和充值系统。',
          responsibilities:
            '负责打字机效果聊天界面、移动端适配、充值系统和国际化功能开发。',
          stack: '现代Web开发技术栈 + Markdown处理',
          highlights:
            '实现了高性能的前端功能，确保流畅的用户交互和响应式设计。',
        },
        {
          name: 'ZA Bank (移动端APP)',
          period: '2021.06 - 2022.03',
          description:
            '香港综合性虚拟银行，提供存贷款、跨境支付等多种银行服务。',
          responsibilities: '主要负责开户业务模块的开发。',
          stack: '移动应用开发技术栈 + 自定义UI组件',
          highlights: '成功交付了安全可靠、用户友好的开户体验。',
        },
      ],
    },
    education: {
      title: '教育背景',
      university: '河南大学（双一流）',
      faculty: '软件学院',
      period: '2017.09 - 2021.06',
    },
  },
};

export default function Resume() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // 获取浏览器语言设置
    const browserLang = navigator.language.toLowerCase();
    setLanguage(browserLang.startsWith('zh') ? 'zh' : 'en');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <motion.div
        className="absolute top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          asChild
          variant="ghost"
          className="group px-3 py-2 text-white/80 hover:text-white bg-black/10 hover:bg-black/20 backdrop-blur-sm rounded-full transition-all duration-300"
        >
          <Link href="/" className="flex items-center gap-2 text-sm">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">{translations[language].back}</span>
          </Link>
        </Button>
      </motion.div>

      {/* Header */}
      <motion.header
        className="bg-black text-white py-12 sm:py-20 px-4 sm:px-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            {translations[language].title}
          </h1>
          <p className="text-lg sm:text-xl">
            {translations[language].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
            <a
              href={`mailto:${translations[language].contact.email}`}
              className="flex items-center gap-2 hover:text-[#E5FF7F] transition-colors text-sm sm:text-base"
            >
              <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
              {translations[language].contact.email}
            </a>
            <a
              href={`tel:${translations[language].contact.phone}`}
              className="flex items-center gap-2 hover:text-[#E5FF7F] transition-colors text-sm sm:text-base"
            >
              <Phone size={16} className="sm:w-[18px] sm:h-[18px]" />
              {translations[language].contact.phone}
            </a>
            <a
              href={`https://github.com/${translations[language].contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#E5FF7F] transition-colors text-sm sm:text-base"
            >
              <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
              github.com/{translations[language].contact.github}
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        {/* Personal Info */}
        <motion.section
          className="mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-4 sm:mb-6">
            {translations[language].personalInfo.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">性别：</span>
              {translations[language].personalInfo.gender}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">学历：</span>
              {translations[language].personalInfo.education}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">工作经验：</span>
              {translations[language].personalInfo.experience}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">
              <span className="font-semibold">求职意向：</span>
              {translations[language].personalInfo.position}
            </p>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-4 sm:mb-6">
            {translations[language].skills.title}
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
            {translations[language].skills.items.map((skill, index) => (
              <li key={index} className="break-words">
                {skill}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Experience */}
        <motion.section
          className="mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-4 sm:mb-6">
            {translations[language].experience.title}
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {translations[language].experience.jobs.map((job, index) => (
              <div key={index}>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {job.position}
                </h3>
                <p className="text-gray-600 mb-2 text-sm sm:text-base">
                  {job.company} | {job.period}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="break-words">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          className="mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-4 sm:mb-6">
            {translations[language].projects.title}
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {translations[language].projects.items.map((project, index) => (
              <div key={index}>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {project.name}{' '}
                  <span className="text-gray-500 font-normal text-sm sm:text-base">
                    ({project.period})
                  </span>
                </h3>
                <p className="text-gray-700 mb-2 text-sm sm:text-base">
                  {project.description}
                </p>
                <p className="text-gray-700 mb-2 text-sm sm:text-base">
                  {project.responsibilities}
                </p>
                <p className="text-gray-600 mb-2 text-sm sm:text-base">
                  <span className="font-semibold">技术栈：</span>
                  {project.stack}
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  {project.highlights}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-4 sm:mb-6">
            {translations[language].education.title}
          </h2>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">
              {translations[language].education.university}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {translations[language].education.faculty} |{' '}
              {translations[language].education.period}
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
