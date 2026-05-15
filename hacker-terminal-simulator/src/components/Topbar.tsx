import { useEffect, useState } from 'react';

export default function Topbar() {
  const [cpu, setCpu] = useState(12);
  const [mem, setMem] = useState(45);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCpu(Math.floor(Math.random() * 40) + 20); // 20-60%
      setMem(Math.floor(Math.random() * 20) + 40); // 40-60%
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-10 bg-[#0a0a0a] border-b border-[#333333] flex items-center px-4 justify-between shrink-0 z-20">
      <div className="flex items-center gap-6">
        <div className="text-xs font-bold tracking-widest text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          HACKSIM v2.4.1
        </div>
        <div className="flex gap-4 text-[10px] text-[#888888] uppercase">
          <span>USER: <span className="text-white">ROOT</span></span>
          <span>TARGET: <span className="text-[#ff3333]">EXTERNAL_NODE_09</span></span>
          <span>STATUS: <span className="text-green-400">BREACHED</span></span>
        </div>
      </div>
      <div className="flex gap-6 text-[10px] items-center">
        <div className="flex gap-2 text-[#888888]">
          <span>CPU</span>
          <div className="w-12 h-2 bg-[#111] border border-[#333333]">
            <div className="h-full bg-white transition-all" style={{ width: `${cpu}%` }}></div>
          </div>
        </div>
        <div className="flex gap-2 text-[#888888]">
          <span>MEM</span>
          <div className="w-12 h-2 bg-[#111] border border-[#333333]">
            <div className="h-full bg-white transition-all" style={{ width: `${mem}%` }}></div>
          </div>
        </div>
        <div className="text-white tabular-nums">{time}</div>
      </div>
    </header>
  );
}
