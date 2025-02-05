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
          name: 'Team Scaffold CLI',
          period: '2022.07 - 2022.10',
          description:
            '为提升团队开发效率，开发的一套标准化项目初始化工具，支持小程序、管理后台、H5等多种项目类型。',
          responsibilities: `
            • 主导脚手架核心功能开发：
              - 设计灵活的项目模板选择机制，支持多种项目类型的快速创建
              - 实现项目配置的动态生成，包括依赖管理、环境配置和构建设置
              - 开发自定义插件系统，支持代码规范检查、git hooks等功能扩展
            • 工程化实践优化：
              - 统一团队技术栈和开发规范，包括目录结构、代码风格等
              - 集成常用工具链，如TypeScript、ESLint、Prettier、Husky等
              - 提供完整的开发文档和最佳实践指南
          `,
          stack: 'Node.js + Commander + Inquirer + 自定义插件系统',
          highlights: `
            • 项目初始化时间从2小时减少到10分钟，大幅提升开发效率
            • 通过统一规范和工具链，降低70%的项目维护成本
            • 支持多种项目类型的一键创建，被团队100%采用
            • 插件系统扩展性强，支持团队定制化需求
          `,
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
          stack: 'React Native + TypeScript + 动画库',
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
        '精通 HTML5/CSS3，包括现代布局（Flexbox/Grid）、动画和响应式设计',
        '精通 JavaScript ES6+，包括异步编程、模块化开发和设计模式',
        '精通现代前端框架和状态管理，对组件化架构有深入理解',
        '精通 TypeScript 开发，包括类型系统、泛型和高级类型工具',
        '丰富的前端工程化经验，包括构建优化、模块联邦和开发效率提升',
        '丰富的前端性能优化经验，包括渲染优化和资源加载优化',
        '熟悉浏览器原理，包括渲染管线和运行时优化',
        '熟悉跨平台开发，包括小程序和混合解决方案',
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
          name: 'FacePlay小程序',
          period: '2023.10 - 至今',
          description:
            '支持文字生成、换脸合成、AI绘画等多种AI创作能力的综合性小程序。',
          responsibilities: `
            • 负责小程序核心制作流程模块开发：
              - 设计实现统一的模板制作流程，抽象通用的上传、预览、支付等功能组件
              - 针对不同类型模板（单人/多人换脸、AE特效等）实现差异化制作流程
              - 集成支付、广告等商业变现功能，实现用户付费/看广告解锁会员权益
            • 优化用户体验和性能表现：
              - 实现素材上传前的格式校验、大小限制等预处理，避免无效上传
              - 使用防抖等性能优化手段，提升交互流畅度
              - 引入Redux统一管理用户信息、支付状态等全局数据
          `,
          stack: 'React + TypeScript + Taro + Redux + Less',
          highlights: `
            • 通过组件复用提升代码可维护性，复用率达50%
            • 通过预处理机制减少70%的无效上传
            • 实现亚秒级的交互响应速度
            • 成功集成多种商业变现渠道
          `,
        },
        {
          name: 'FacePlay (Web版)',
          period: '2023.06 - 2023.09',
          description:
            '一个商业化的人脸换换Web应用，集成支付系统和用户历史记录功能。',
          responsibilities: `
            • 独立开发核心拖拽上传模块，包含进度跟踪和验证功能
            • 使用WebAssembly版本的FFmpeg实现视频帧提取，处理时间减少60%
            • 构建支持多种支付方式的完整支付系统和订单管理
            • 开发带有筛选和导出功能的用户制作记录系统
          `,
          stack: '现代前端技术栈 + WebAssembly + FFmpeg',
          highlights: `
            • 通过自定义Vite配置和后端协作解决视频帧提取的跨域问题
            • 实现大文件分片上传和断点续传功能
            • 核心业务逻辑测试覆盖率达到98%
            • 通过代码分割和懒加载优化首次加载时间减少40%
          `,
        },
        {
          name: '达人结算（微信小程序）',
          period: '2023.02 - 2023.05',
          description: '一个企业级达人结算小程序，支持安全的验证机制。',
          responsibilities: `
            • 主导小程序从架构设计到部署的开发工作
            • 实现基于微信私密消息的安全认证流程
            • 开发具有实时验证和自动保存的表单系统
            • 创建支持高级筛选和导出的结算记录系统
          `,
          stack: '小程序开发技术栈 + 自定义错误追踪',
          highlights:
            '通过组件优化将小程序包控制在2MB以内，实现99.9%的可用性。',
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
          name: '团队脚手架工具',
          period: '2022.07 - 2022.10',
          description:
            '为提升团队开发效率，开发的一套标准化项目初始化工具，支持小程序、管理后台、H5等多种项目类型。',
          responsibilities: `
            • 主导脚手架核心功能开发：
              - 设计灵活的项目模板选择机制，支持多种项目类型的快速创建
              - 实现项目配置的动态生成，包括依赖管理、环境配置和构建设置
              - 开发自定义插件系统，支持代码规范检查、git hooks等功能扩展
            • 工程化实践优化：
              - 统一团队技术栈和开发规范，包括目录结构、代码风格等
              - 集成常用工具链，如TypeScript、ESLint、Prettier、Husky等
              - 提供完整的开发文档和最佳实践指南
          `,
          stack: 'Node.js + Commander + Inquirer + 自定义插件系统',
          highlights: `
            • 项目初始化时间从2小时减少到10分钟，大幅提升开发效率
            • 通过统一规范和工具链，降低70%的项目维护成本
            • 支持多种项目类型的一键创建，被团队100%采用
            • 插件系统扩展性强，支持团队定制化需求
          `,
        },
        {
          name: 'ZA Bank (移动端APP)',
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
          stack: 'React Native + TypeScript + 动画库',
          highlights: `
            • 优化开户流程，将完成率提升30%
            • 活动页面转化率达到预期目标的150%
            • 保持稳定的页面性能指标（FPS>55）
          `,
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
