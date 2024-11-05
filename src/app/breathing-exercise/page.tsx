'use client';

import React, { useState, useEffect } from 'react';

type PhaseType = '准备' | '吸气' | '屏气' | '呼气';

interface BreathingRecord {
  date: string;
  count: number;
  duration: number;
}

const BreathingExercise = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<PhaseType>('准备');
  const [timer, setTimer] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<BreathingRecord[]>([]);

  const INHALE_TIME = 4;
  const HOLD_TIME = 4;
  const EXHALE_TIME = 6;
  const CYCLE_TIME = INHALE_TIME + HOLD_TIME + EXHALE_TIME;

  // 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('breathingHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 计时器效果
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = (prevTimer + 1) % CYCLE_TIME;
          if (newTimer === 0) {
            setPhase('吸气');
            setCount((prev) => prev + 1);
          } else if (newTimer === INHALE_TIME) {
            setPhase('屏气');
          } else if (newTimer === INHALE_TIME + HOLD_TIME) {
            setPhase('呼气');
          }
          return newTimer;
        });
        setTotalDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isBreathing]);

  const saveHistory = () => {
    if (count > 0) {
      const newRecord: BreathingRecord = {
        date: new Date().toLocaleString(),
        count,
        duration: totalDuration,
      };
      const updatedHistory = [newRecord, ...history].slice(0, 10); // 只保留最近10条记录
      setHistory(updatedHistory);
      localStorage.setItem('breathingHistory', JSON.stringify(updatedHistory));
    }
  };

  const toggleBreathing = () => {
    if (isBreathing) {
      saveHistory();
    }
    setIsBreathing(!isBreathing);
    if (!isBreathing) {
      setPhase('吸气');
    }
  };

  const resetExercise = () => {
    if (isBreathing) {
      saveHistory();
    }
    setIsBreathing(false);
    setCount(0);
    setPhase('准备');
    setTimer(0);
    setTotalDuration(0);
  };

  const getAnimationSize = () => {
    switch (phase) {
      case '吸气':
        return ['scale-110', 'scale-125', 'scale-150'];
      case '屏气':
        return ['scale-110', 'scale-125', 'scale-150'];
      case '呼气':
        return ['scale-100', 'scale-110', 'scale-125'];
      default:
        return ['scale-100', 'scale-110', 'scale-125'];
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case '吸气':
        return ['from-blue-500', 'to-purple-500'];
      case '屏气':
        return ['from-purple-500', 'to-pink-500'];
      case '呼气':
        return ['from-pink-500', 'to-blue-500'];
      default:
        return ['from-gray-500', 'to-blue-500'];
    }
  };

  const [size1, size2, size3] = getAnimationSize();
  const [gradientFrom, gradientTo] = getPhaseColor();

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* 渐变背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50" />

      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* 顶部计数器和历史按钮 */}
        <div className="w-full flex justify-between items-center mb-16">
          <div className="text-2xl font-extralight tracking-wider text-gray-200">
            第 {count} 次呼吸
          </div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            {showHistory ? '关闭历史' : '查看历史'}
          </button>
        </div>

        {/* 历史记录面板 */}
        {showHistory && (
          <div className="w-full mb-8 bg-gray-800/50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">历史记录</h3>
            <div className="space-y-3">
              {history.length > 0 ? (
                history.map((record, index) => (
                  <div key={index} className="flex justify-between items-center text-sm text-gray-300">
                    <span>{record.date}</span>
                    <span>{record.count}次呼吸</span>
                    <span>{formatDuration(record.duration)}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">暂无历史记录</div>
              )}
            </div>
          </div>
        )}

        {/* 动画圆圈组 */}
        <div className="relative w-72 h-72 mb-16">
          {/* 外圈动画 */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-10 blur-2xl transition-all duration-1000 ease-in-out ${size3}`} />
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-20 blur-xl transition-all duration-1000 ease-in-out ${size2}`} />
          
          {/* 主圆圈 */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-30 transition-all duration-1000 ease-in-out ${size1} flex items-center justify-center`}>
            <div className="text-center">
              <div className="text-6xl font-extralight mb-2">
                {phase === '准备' ? '' : timer}
              </div>
              <div className="text-xl font-light tracking-widest text-gray-200">
                {phase}
              </div>
            </div>
          </div>
        </div>

        {/* 状态提示 */}
        <div className="mb-16 text-center">
          <div className="text-xl font-light tracking-wide text-gray-300 mb-2">
            {phase === '吸气' && '深深吸气'}
            {phase === '屏气' && '屏住呼吸'}
            {phase === '呼气' && '缓缓呼气'}
            {phase === '准备' && '准备开始'}
          </div>
          <div className="text-sm font-light tracking-wider text-gray-400">
            {isBreathing ? '保持平静的心态' : '点击开始呼吸练习'}
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex gap-8">
          <button
            onClick={toggleBreathing}
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} 
              opacity-90 hover:opacity-100 transition-all duration-300 
              flex items-center justify-center shadow-lg`}
          >
            <div className="text-2xl font-light">
              {isBreathing ? '暂停' : '开始'}
            </div>
          </button>
          
          <button
            onClick={resetExercise}
            className="w-20 h-20 rounded-full bg-gray-800 hover:bg-gray-700 
              transition-colors duration-300 flex items-center justify-center"
          >
            <div className="text-xl font-light text-gray-300">
              重置
            </div>
          </button>
        </div>

        {/* 底部提示 */}
        <div className="fixed bottom-8 text-center">
          <div className="text-sm font-light tracking-wider text-gray-500">
            深呼吸 · 放松身心
          </div>
        </div>

        {/* 添加总时长显示 */}
        <div className="mb-4 text-gray-400 text-sm">
          总时长: {formatDuration(totalDuration)}
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;