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
      github: 'Odyssey98',
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
        'Proficient in HTML5/CSS3, including modern layouts (Flexbox/Grid), animations, and responsive design',
        'Proficient in JavaScript ES6+, including async programming, modular development, and design patterns',
        'Proficient in modern frontend frameworks and state management, with deep understanding of component architecture',
        'Proficient in TypeScript development, including type system, generics, and advanced type utilities',
        'Experienced in frontend engineering, including build optimization, module federation, and development efficiency',
        'Experienced in frontend performance optimization, including rendering optimization and resource loading',
        'Familiar with browser principles, including rendering pipeline and runtime optimization',
        'Familiar with cross-platform development, including Mini Program and hybrid solutions',
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
          name: 'FacePlay Mini Program',
          period: '2023.10 - Present',
          description:
            'A comprehensive Mini Program supporting multiple AI creation capabilities including text generation, face swapping, and AI drawing.',
          responsibilities: `
            • Led development of core creation workflow modules:
              - Designed unified template creation process with reusable upload, preview, and payment components
              - Implemented differentiated workflows for various templates (single/multi-face swap, AE effects)
              - Integrated commercial features including paid membership and ad-based unlocking
            • Optimized user experience and performance:
              - Implemented comprehensive material preprocessing with format validation and size limits
              - Enhanced interaction fluidity through debouncing and performance optimization
              - Introduced Redux for centralized state management of user info and payment status
          `,
          stack: 'React + TypeScript + Taro + Redux + Less',
          highlights: `
            • Improved code maintainability with 50% component reuse rate
            • Reduced invalid uploads by 70% through preprocessing
            • Achieved smooth user experience with sub-second response time
            • Successfully integrated multiple monetization channels
          `,
        },
        {
          name: 'FacePlay (Web)',
          period: '2023.06 - 2023.09',
          description:
            'A commercial face-swapping web application with payment integration and user history tracking.',
          responsibilities: `
            • Independently developed the core drag-and-drop upload module with progress tracking and validation
            • Implemented video frame extraction using WebAssembly FFmpeg, reducing processing time by 60%
            • Built a robust payment system with multiple payment methods and order management
            • Developed comprehensive user history tracking with filtering and export capabilities
          `,
          stack: 'Modern Frontend Stack + WebAssembly + FFmpeg',
          highlights: `
            • Solved CORS issues in video frame extraction through custom Vite configuration and backend collaboration
            • Implemented chunked upload for large files with resume capability
            • Achieved 98% test coverage for core business logic
            • Optimized initial load time by 40% through code splitting and lazy loading
          `,
        },
        {
          name: 'Influencer Settlement (Mini Program)',
          period: '2023.02 - 2023.05',
          description:
            'An enterprise WeChat Mini Program for influencer payment management with secure verification.',
          responsibilities: `
            • Led the development of the entire Mini Program from architecture design to deployment
            • Implemented secure authentication flow with WeChat private message verification
            • Developed complex form systems with real-time validation and auto-save
            • Created a flexible settlement record system with advanced filtering and export features
          `,
          stack: 'Mini Program Development Stack + Custom Error Tracking',
          highlights: `
            • Designed and implemented a custom error tracking system reducing issue resolution time by 50%
            • Optimized Mini Program package size to under 2MB through component optimization
            • Achieved 99.9% uptime through robust error handling and fallback mechanisms
            • Implemented offline data persistence improving user experience in poor network conditions
          `,
        },
        {
          name: 'ChatMe (Web)',
          period: '2022.12 - 2023.02',
          description:
            '类ChatGPT智能对话平台，集成内容审核、多语言支持和会员充值功能。',
          responsibilities: `
            • 负责核心对话功能开发：
              - 实现打字机效果的流式响应展示
              - 开发Markdown实时渲染和代码高亮功能
              - 设计对话上下文管理机制，支持多轮对话
            • 系统功能开发和优化：
              - 实现响应式布局，确保多端适配
              - 开发完整的会员充值和权益系统
              - 集成i18n实现多语言国际化
            • 性能优化和体验提升：
              - 实现消息队列，避免回复覆盖
              - 添加骨架屏和加载动画
              - 支持快捷键操作和历史记录
          `,
          stack: 'Next.js + TypeScript + i18n + Markdown渲染 + WebSocket',
          highlights: `
            • 用户平均响应等待时间降低40%
            • 国际化支持覆盖95%的用户区域
            • 用户满意度达到95%以上
            • 支持连续对话长度提升3倍
          `,
        },
        {
          name: '企业级前端项目脚手架',
          period: '2022.07 - 2022.10',
          description: '标准化的项目初始化工具，支持多种项目类型。',
          responsibilities:
            '负责项目模板选择机制、配置动态生成和插件系统的开发。',
          stack: 'Node.js + Commander.js + Inquirer.js + EJS + ESBuild + Git',
          highlights: '项目初始化时间减少80%，团队100%采用，维护成本降低70%。',
        },
        {
          name: 'ZA Bank (Mobile App)',
          period: '2021.06 - 2022.03',
          description:
            '香港领先的虚拟银行应用，提供全面的银行服务，包括存贷款、跨境支付和保险等。',
          responsibilities: `
            • 负责开户业务核心模块开发：
              - 实现身份验证和活体检测流程
              - 开发地址证明上传和OCR识别功能
              - 对接香港监管要求的实名认证系统
            • 负责节日营销活动页开发：
              - 开发圣诞及新年拉新活动落地页
              - 实现复杂的动画交互效果
              - 优化活动页面性能，确保流畅的用户体验
          `,
          stack: 'React Native + TypeScript + Redux + React Navigation',
          highlights: `
            • 优化开户流程，将完成率提升30%
            • 活动页面转化率达到预期目标的150%
            • 保持稳定的页面性能指标（FPS>55）
          `,
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
      github: 'Odyssey98',
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
        '框架应用：熟练运用 React 技术栈，了解 Fiber 架构，具备组件设计和状态管理方案实践经验',
        '工程化建设：具备前端工程化经验，包括 Webpack/Vite 构建配置、模块设计、CI/CD 流程和开发规范制定',
        '性能优化：具有性能优化实践经验，包括资源加载优化、代码分割、首屏加载优化，了解常见性能问题的解决方案',
        '跨端开发：具备小程序和 H5 开发经验，了解不同平台的特性，能够实现多端适配方案',
        '技术实践：对前端新技术保持学习，在项目中实践过 WebAssembly、WebSocket 等技术',
        '工具开发：有脚手架工具开发经验，能够设计和开发提升团队效率的工具',
        '代码规范：注重代码质量和可维护性，遵循团队开发规范，具有代码重构经验',
        '基础能力：扎实的 JavaScript/HTML/CSS 基础，了解浏览器渲染原理和网络通信机制',
        'TypeScript：在项目中熟练使用 TypeScript，了解类型系统，能够开发和维护类型定义',
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
            '主导AI相关项目的前端架构设计和开发，包括换脸、智能对话等多个商业化项目',
            '负责小程序矩阵和配套管理后台的开发，建立统一的开发规范和组件库',
            '推动团队工程化建设，开发脚手架工具和公共组件库，提升团队开发效率',
            '参与技术选型和架构优化，在项目中引入并实践前端新技术',
          ],
        },
        {
          period: '2021.04 - 2022.03',
          company: '众安科技',
          position: '前端开发工程师',
          responsibilities: [
            '负责香港虚拟银行核心业务模块的开发和维护，确保系统稳定性和安全性',
            '主导多个业务模块的性能优化，建立性能监控和优化方案',
            '参与基础架构优化和组件库建设，提升代码复用率和开发效率',
            '配合团队完成重要节日营销活动的开发和性能保障工作',
          ],
        },
      ],
    },
    projects: {
      title: '项目经验',
      items: [
        {
          name: 'FacePlay小程序',
          period: '2023.10 - 至今',
          description:
            '支持文字生成、换脸合成、AI绘画等多种AI创作能力的综合性小程序。',
          responsibilities:
            '负责小程序核心制作流程模块开发，包括统一的模板制作流程、多类型模板差异化处理、支付和广告系统集成，以及性能优化和状态管理。',
          stack: 'Taro + React + TypeScript + Redux',
          highlights: '组件复用率50%，减少70%无效上传，实现亚秒级响应。',
        },
        {
          name: 'FacePlay Web版',
          period: '2023.06 - 2023.09',
          description: '商业化的AI换脸Web应用，支持视频处理和用户记录管理。',
          responsibilities:
            '负责拖拽上传模块、WebAssembly视频处理、支付系统和用户记录管理功能的开发。',
          stack: 'React + WebAssembly + FFmpeg',
          highlights: '视频处理提速60%，测试覆盖率98%，首屏加载优化40%。',
        },
        {
          name: '达人结算小程序',
          period: '2023.02 - 2023.05',
          description: '企业级达人结算系统，支持微信私密消息验证。',
          responsibilities:
            '负责安全认证流程、表单系统和结算记录管理的开发，以及自定义错误追踪系统的设计。',
          stack: '小程序开发技术栈 + 自定义错误追踪',
          highlights: '包大小控制在2MB内，可用性达99.9%，支持离线数据。',
        },
        {
          name: 'ChatMe',
          period: '2022.12 - 2023.02',
          description: '智能对话平台，支持多语言和会员系统。',
          responsibilities:
            '负责流式响应展示、Markdown渲染、多轮对话管理以及多语言和会员系统的开发。',
          stack: 'Next.js + TypeScript + WebSocket',
          highlights: '响应时间降低40%，用户满意度95%，支持多轮对话。',
        },
        {
          name: '前端项目自动化构建工具',
          period: '2022.07 - 2022.10',
          description: '标准化的项目初始化工具，支持多种项目类型。',
          responsibilities:
            '负责项目模板选择机制、配置动态生成和插件系统的开发。',
          stack: 'Node.js + Commander.js + Inquirer.js + EJS + ESBuild + Git',
          highlights: '项目初始化时间减少80%，团队100%采用，维护成本降低70%。',
        },
        {
          name: 'ZA Bank App',
          period: '2021.06 - 2022.03',
          description: '香港虚拟银行App，提供全面的银行服务。',
          responsibilities:
            '负责开户流程和身份验证模块，以及节日营销活动页面的开发和性能优化。',
          stack:
            'React Native + TypeScript + Redux + React Navigation + Lottie',
          highlights: '开户完成率提升30%，活动转化率超150%，FPS稳定在55+。',
        },
      ],
    },
    education: {
      title: '教育背景',
      university: '河南大学',
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
              href="https://github.com/Odyssey98"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#E5FF7F] transition-colors text-sm sm:text-base"
            >
              <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
              github.com/Odyssey98
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-8 py-6 sm:py-16">
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

        {/* Education */}
        <motion.section
          className="mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
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

        {/* Skills */}
        <motion.section
          className="mb-6 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-3 sm:mb-6">
            {translations[language].skills.title}
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {translations[language].skills.items.map((skill, index) => (
              <li
                key={index}
                className="text-sm sm:text-base leading-relaxed pl-1"
              >
                {skill}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Experience - 移到项目经验前面 */}
        <motion.section
          className="mb-6 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-3 sm:mb-6">
            {translations[language].experience.title}
          </h2>
          <div className="space-y-5 sm:space-y-8">
            {translations[language].experience.jobs.map((job, index) => (
              <div key={index} className="bg-white rounded-lg p-3 sm:p-0">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">
                  {job.position}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">
                  {job.company} | {job.period}
                </p>
                <ul className="list-disc list-inside text-gray-800 space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li
                      key={index}
                      className="text-sm sm:text-base leading-relaxed pl-1"
                    >
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects - 移到工作经验后面 */}
        <motion.section
          className="mb-6 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold border-b border-black pb-2 mb-3 sm:mb-6">
            {translations[language].projects.title}
          </h2>
          <div className="space-y-5 sm:space-y-8">
            {translations[language].projects.items.map((project, index) => (
              <div key={index} className="bg-white rounded-lg p-3 sm:p-0">
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2">
                  {project.period}
                </p>
                <p className="text-gray-800 text-sm sm:text-base mb-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="space-y-2 mb-3">
                  <p className="text-gray-800 text-sm sm:text-base whitespace-pre-line leading-relaxed">
                    {project.responsibilities}
                  </p>
                </div>
                <div className="text-xs sm:text-sm space-y-2">
                  <p className="text-gray-800">
                    <span className="font-semibold text-gray-900">
                      技术栈：
                    </span>
                    {project.stack}
                  </p>
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {project.highlights}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
