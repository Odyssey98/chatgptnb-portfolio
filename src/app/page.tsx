import React from 'react';
import Link from 'next/link';
import AnimatedTitle from './components/AnimatedTitle';

const projects = [
  { name: '2024最新退休计算器', description: '快来计算你的退休年龄吧！', url: 'https://tuixiu.chatgptnb.com' },
  { name: 'HN2XHS', description: 'Hacker News帖子一键转小红书风格', url: 'https://xhs.chatgptnb.com/' },
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
              className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
                <Link href={project.url} className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                  试试看
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
