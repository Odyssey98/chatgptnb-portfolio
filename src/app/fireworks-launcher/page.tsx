'use client'

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

interface ConfettiProps {
  x: number;
  y: number;
  origin: { x: number; y: number };
}

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function FireworksLauncher() {
  const [confettiCount, setConfettiCount] = useState(0);
  const [confettiProps, setConfettiProps] = useState<ConfettiProps | null>(null);

  const launchConfetti = useCallback((x: number, y: number) => {
    setConfettiCount(prevCount => prevCount + 500); // 增加数量
    setConfettiProps({
      x,
      y,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    });
    setTimeout(() => setConfettiProps(null), 3000); // 延长持续时间
  }, []);

  const launchAllConfetti = () => {
    setConfettiCount(prevCount => prevCount + 2000); // 大幅增加数量
    setConfettiProps({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      origin: { x: 0.5, y: 0.5 }
    });
    setTimeout(() => setConfettiProps(null), 5000); // 进一步延长持续时间
  };

  const resetCounter = () => {
    setConfettiCount(0);
  };

  return (
    <div 
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center"
      onClick={(e) => launchConfetti(e.clientX, e.clientY)}
    >
      <h1 className="text-4xl font-bold mb-8">彩色纸屑治疗</h1>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          launchAllConfetti();
        }}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        释放所有彩色纸屑
      </button>

      <p className="text-2xl mb-4">总计: {confettiCount} 个彩色纸屑</p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          resetCounter();
        }}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        重置计数器
      </button>

      {confettiProps && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500} // 增加每次发射的彩纸数量
          gravity={0.2} // 降低重力，使彩纸飘得更久
          initialVelocityY={30} // 增加初始向上速度
          {...(confettiProps as object)}
        />
      )}
    </div>
  );
}