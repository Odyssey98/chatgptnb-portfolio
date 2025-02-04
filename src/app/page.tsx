'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Code,
  Cpu,
  Brain,
  Zap,
  Calculator,
  ExternalLink,
} from 'lucide-react';

// 定义项目类型
type Project = {
  name: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  url: string;
  icon: React.ReactNode;
};

const projects: Project[] = [
  {
    name: {
      en: 'FinSight AI',
      zh: 'FinSight AI',
    },
    description: {
      en: 'Combining AI analysis with professional financial data for deep market insights',
      zh: '结合AI分析和专业金融数据，深入洞察市场',
    },
    url: 'https://ai.chatgptnb.com/',
    icon: <Brain className="w-6 h-6" />,
  },
  {
    name: {
      en: 'HN2XHS',
      zh: 'HN2XHS',
    },
    description: {
      en: 'Convert Hacker News posts to Xiaohongshu style with one click',
      zh: '一键将Hacker News文章转换为小红书风格',
    },
    url: 'https://xhs.chatgptnb.com/',
    icon: <Code className="w-6 h-6" />,
  },
  {
    name: {
      en: 'Time Value',
      zh: '用时宝',
    },
    description: {
      en: 'Let data tell you the daily cost of your electronic devices',
      zh: '让数据告诉你电子设备的每日使用成本',
    },
    url: 'https://ysb.chatgptnb.com/',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    name: {
      en: 'Privacy Policy Generator',
      zh: '隐私政策生成器',
    },
    description: {
      en: 'Generate privacy policies and terms',
      zh: '生成隐私政策和使用条款',
    },
    url: '/privacy-policy-generator',
    icon: <Code className="w-6 h-6" />,
  },
  {
    name: {
      en: 'Wiki Explorer',
      zh: 'Wiki Explorer',
    },
    description: {
      en: 'Interactive visualization tool for exploring Wikipedia connections',
      zh: '交互式维基百科知识关系可视化工具',
    },
    url: 'https://wiki-explorer-sigma.vercel.app/',
    icon: <Brain className="w-6 h-6" />,
  },
  {
    name: {
      en: 'Real Address Generator',
      zh: '真实地址生成器',
    },
    description: {
      en: 'Generate real, usable random addresses',
      zh: '生成真实可用的随机地址',
    },
    url: '/random-address-generator',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    name: {
      en: 'Diaphragmatic Breathing Exercise',
      zh: '腹式呼吸练习',
    },
    description: {
      en: 'A breathing exercise tool to help you relax',
      zh: '帮助你放松的呼吸练习工具',
    },
    url: '/breathing-exercise',
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    name: {
      en: '2024 Retirement Calculator',
      zh: '2024最新退休年龄计算器',
    },
    description: {
      en: 'Calculate your retirement age now!',
      zh: '立即计算你的退休年龄！',
    },
    url: 'https://tuixiu.chatgptnb.com',
    icon: <Calculator className="w-6 h-6" />,
  },
];

// 添加类型定义
type Language = 'en' | 'zh';

type Translations = {
  [key in Language]: {
    description: string;
    experimentalProjects: string;
    exploreProject: string;
  };
};

const translations: Translations = {
  en: {
    description:
      'Explore fascinating experimental projects without writing a single line of code',
    experimentalProjects: 'Experimental Projects',
    exploreProject: 'Explore Project',
  },
  zh: {
    description: '以下项目全部使用AI生成，没有敲一行代码',
    experimentalProjects: '实验项目',
    exploreProject: '查看项目',
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // 获取浏览器语言设置
    const browserLang = navigator.language.toLowerCase();
    setLanguage(browserLang.startsWith('zh') ? 'zh' : 'en');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F2FFB3] to-[#E5FF7F] text-gray-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 relative">
          <motion.div
            className="absolute inset-0 bg-[#E5FF7F] opacity-20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 relative z-10 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Odyssey&apos;s
            </motion.span>{' '}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI Lab
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {translations[language].description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Badge
              variant="secondary"
              className="text-sm py-1 px-3 bg-[#E5FF7F] text-gray-800 border border-gray-200"
            >
              <Sparkles className="w-4 h-4 mr-1 inline" />
              {translations[language].experimentalProjects}
            </Badge>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <CardHeader className="relative">
                    <motion.div
                      className="absolute top-4 right-4 text-[#97CC04]"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {project.icon}
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-800">
                      {project.name[language]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {project.description[language]}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#97CC04] text-gray-700 hover:bg-[#E5FF7F]/20 hover:border-[#E5FF7F] bg-transparent active:bg-transparent focus:bg-transparent"
                    >
                      <Link
                        href={project.url}
                        className="flex items-center justify-center text-gray-700 hover:text-gray-700 active:text-gray-700"
                      >
                        {translations[language].exploreProject}
                        <motion.span
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </motion.span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.footer
        className="mt-24 text-center text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p>© {new Date().getFullYear()} Odyssey&apos;s</p>
      </motion.footer>
    </div>
  );
}
