import React from 'react';
import Link from 'next/link';
import AnimatedTitle from './components/AnimatedTitle';

const projects = [
  { name: '2024最新退休计算器', description: '快来计算你的退休年龄吧！', url: 'https://tuixiu.chatgptnb.com' },
  { name: 'HN2XHS', description: 'Hacker News帖子一键转小红书风格', url: 'https://hn2xhs.chatgptnb.com' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 py-16 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-5xl mx-auto">
        <AnimatedTitle>一些好玩的东西</AnimatedTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
                <Link href={project.url} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                  探索项目
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="mt-20 text-center text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Odyssey98 </p>
      </footer>
    </div>
  );
}
