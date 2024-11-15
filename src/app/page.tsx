'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Code, Cpu, Brain, Zap, Calculator, ExternalLink } from 'lucide-react'

const projects = [
  { name: '2024最新退休计算器', description: '快来计算你的退休年龄吧！', url: 'https://tuixiu.chatgptnb.com', icon: <Calculator className="w-6 h-6" /> },
  { name: 'HN2XHS', description: 'Hacker News帖子一键转小红书风格', url: 'https://xhs.chatgptnb.com/', icon: <Code className="w-6 h-6" /> },
  { name: '用时宝', description: '让数据告诉你每天的电子产品使用成本', url: 'https://ysb.chatgptnb.com/', icon: <Zap className="w-6 h-6" /> },
  { name: 'FinSight AI', description: '融合AI智能分析与专业金融数据，为您提供深度市场洞察', url: 'https://ai.chatgptnb.com/', icon: <Brain className="w-6 h-6" /> },
  { name: '隐私协议政策生成器', description: '隐私协议政策生成器', url: '/privacy-policy-generator', icon: <Code className="w-6 h-6" /> },
  { name: '真实地址生成器', description: '生成真实可用的随机地址', url: '/random-address-generator', icon: <Sparkles className="w-6 h-6" /> },
  { name: '腹式呼吸练习器', description: '帮助你放松身心的呼吸练习工具', url: '/breathing-exercise', icon: <Cpu className="w-6 h-6" /> },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16 relative">
          <motion.div
            className="absolute inset-0 bg-blue-300 opacity-20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10 text-gray-800">
            AI 实验室
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-6">
            不敲一行代码，探索有趣的实验项目
          </p>
          <Badge variant="secondary" className="text-sm py-1 px-3 bg-blue-500 text-white">
            <Sparkles className="w-4 h-4 mr-1 inline" />
            实验项目
          </Badge>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4 text-blue-500">
                    {project.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-50">
                    <Link href={project.url}>
                      探索项目
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <footer className="mt-24 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Odyssey76</p>
      </footer>
    </div>
  );
}
