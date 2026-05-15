import { useState, useEffect } from 'react';

interface RightPanelProps {
  onCommand: (cmd: string) => void;
}

export default function RightPanel({ onCommand }: RightPanelProps) {
  const tools = ["scan", "enum", "exploit", "hash", "shell", "help"];

  return (
    <aside className="w-56 bg-[#050505] flex flex-col shrink-0">
      <div className="p-3 border-b border-[#333333] h-1/4">
        <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-tighter mb-2">Tools</h3>
        <div className="grid grid-cols-2 gap-1">
          {tools.map(tool => (
            <div 
              key={tool}
              onClick={() => onCommand(tool)}
              className={`text-[9px] border border-[#333333] p-1 text-center cursor-pointer uppercase ${
                tool === 'exploit' ? 'bg-white text-black' : 'hover:bg-white hover:text-black text-white'
              }`}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 border-b border-[#333333] h-2/5 overflow-hidden">
        <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-tighter mb-2">Network</h3>
        <table className="w-full text-[9px] text-[#888888]">
          <thead>
            <tr className="text-left border-b border-[#333333]">
              <th className="pb-1">PORT</th>
              <th className="pb-1">SERVICE</th>
              <th className="pb-1">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <tr><td className="py-1">22</td><td>SSH</td><td className="text-green-500">ACT</td></tr>
            <tr><td className="py-1">80</td><td>HTTP</td><td className="text-green-500">ACT</td></tr>
            <tr><td className="py-1">443</td><td>SSL</td><td className="text-green-500">ACT</td></tr>
            <tr><td className="py-1">3306</td><td>SQL</td><td className="text-yellow-500">LST</td></tr>
            <tr><td className="py-1">8080</td><td>PRX</td><td className="text-red-500">OFF</td></tr>
          </tbody>
        </table>
      </div>
      <div className="p-3 flex-1 overflow-hidden">
        <h3 className="text-[10px] font-bold text-[#888888] uppercase tracking-tighter mb-2">Notes</h3>
        <div className="text-[10px] text-white space-y-2 opacity-70 italic leading-relaxed">
          <p>• Target firewall bypassed via SQLi on main portal.</p>
          <p>• Root access achieved at 23:14:02.</p>
          <p>• Database extraction in progress: 42% complete.</p>
        </div>
      </div>
    </aside>
  );
}
