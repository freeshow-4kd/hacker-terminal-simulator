import { useState, useEffect } from 'react';

export default function LeftPanel() {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <aside className="w-56 border-r border-[#333333] bg-[#050505] flex flex-col shrink-0">
      <div className="p-3 border-b border-[#333333] bg-[#080808]">
        <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-tighter mb-2">File System</h3>
        <div className="text-[11px] space-y-1">
          <div className="hover:bg-white/10 px-1 cursor-default">/bin</div>
          <div className="hover:bg-white/10 px-1 cursor-default text-white">/boot <span className="text-[9px] opacity-50">[SYS]</span></div>
          <div className="hover:bg-white/10 px-1 cursor-default">/dev</div>
          <div className="hover:bg-white/10 px-1 cursor-default">/etc</div>
          <div className="pl-3 space-y-1 border-l border-[#333333] ml-1 mt-1">
            <div className="hover:bg-white/10 px-1 cursor-default">/home</div>
            <div className="hover:bg-white/10 px-1 cursor-default">/usr</div>
          </div>
          <div className="hover:bg-white/10 px-1 cursor-default mt-1">/root</div>
          <div className="hover:bg-white/10 px-1 cursor-default">/var</div>
        </div>
      </div>
      <div className="p-3 flex-1 bg-[#050505]">
        <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-tighter mb-2">System Info</h3>
        <div className="text-[10px] space-y-2 opacity-80 text-white">
          <div className="flex justify-between"><span className="text-[#888888]">OS</span><span>KALI-LNX</span></div>
          <div className="flex justify-between"><span className="text-[#888888]">KERNEL</span><span>5.15.0-76</span></div>
          <div className="flex justify-between"><span className="text-[#888888]">UPTIME</span><span>{formatUptime(uptime + 15153)}</span></div>
          <div className="flex justify-between"><span className="text-[#888888]">IP</span><span>192.168.1.104</span></div>
          <div className="flex justify-between"><span className="text-[#888888]">MAC</span><span>00:1A:2B:3C</span></div>
          <div className="pt-4">
            <div className="h-16 w-full bg-[#111] border border-[#333333] relative overflow-hidden">
              <svg viewBox="0 0 100 40" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline fill="none" stroke="#ffffff" strokeWidth="1" points="0,20 10,15 20,25 30,10 40,30 50,20 60,18 70,22 80,5 90,20 100,15" />
              </svg>
            </div>
            <div className="text-[8px] text-center mt-1 text-[#888888]">NETWORK TRAFFIC ANALYSIS</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
