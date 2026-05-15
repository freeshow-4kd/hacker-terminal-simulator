import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogEntry } from '../hooks/useTerminalEngine';

interface TerminalProps {
  logs: LogEntry[];
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onCommand: (cmd: string) => void;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
}

export default function Terminal({ logs, scrollRef, onCommand, onStart, onStop, onClear }: TerminalProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-[#020202] relative border-r border-[#333333] font-mono">
      <div className="absolute top-0 right-0 p-2 z-10 flex gap-2">
        <button onClick={onStart} className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase hover:opacity-80 cursor-pointer transition-colors">Start</button>
        <button onClick={onStop} className="px-3 py-1 border border-[#333333] text-[#888888] text-[10px] font-bold uppercase hover:text-white cursor-pointer transition-colors">Stop</button>
        <button onClick={onClear} className="px-3 py-1 border border-[#333333] text-[#888888] text-[10px] font-bold uppercase hover:text-white cursor-pointer transition-colors">Clear</button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto terminal-scroll text-[13px] space-y-1 leading-tight z-10 pb-16"
      >
        <AnimatePresence initial={false}>
          {logs.map((logEntry) => {
            const { id, text: log } = logEntry;
            let colorClass = "text-gray-300";
            if (log.includes("[!]") || log.includes("denied") || log.includes("WARN") || log.includes("ATTACKING")) colorClass = "text-yellow-400";
            else if (log.includes("[SUCCESS]") || log.includes("SUCCESS") || log.includes("OPEN")) colorClass = "text-green-400 font-bold";
            else if (log.includes("root@kali:~#")) colorClass = "text-gray-400";
            else if (log.includes("bash: ")) colorClass = "text-red-400";
            else if (log.startsWith("-->")) colorClass = "text-gray-400 pl-4";
            else if (log.startsWith("[0.")) colorClass = "text-gray-500";
            else if (log.startsWith("import ") || log.startsWith("from ") || log.includes("require(")) colorClass = "text-purple-400";
            else if (log.startsWith("function ") || log.startsWith("def ") || log.includes("() {") || log.includes("):")) colorClass = "text-blue-400";
            else if (log.startsWith("const ") || log.startsWith("let ") || log.startsWith("var ")) colorClass = "text-blue-300";
            else if (log.includes("if ") || log.includes("else ") || log.includes("for ") || log.includes("while ") || log.includes("return ")) colorClass = "text-pink-400";
            else if (log.startsWith("#include") || log.startsWith("#define")) colorClass = "text-orange-400";
            else if (log.includes("class ") || log.includes("struct ")) colorClass = "text-yellow-300";
            else if (log.includes("\"") || log.includes("'")) colorClass = "text-green-300";
            else if (log.includes("//") || log.startsWith("# ")) colorClass = "text-gray-500 italic";
            
            return (
              <motion.div 
                key={id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`${colorClass} whitespace-pre-wrap break-all px-1 -mx-1`}
              >
                {log}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="h-12 border-t border-[#333333] flex items-center px-4 gap-3 bg-[#080808] z-20">
        <span className="text-white text-sm">❯</span>
        <form onSubmit={handleSubmit} className="flex-1">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent border-none outline-none text-white w-full text-sm placeholder:text-gray-600 focus:ring-0"
            placeholder="Enter command (scan, connect, enum, ai, help)..."
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </form>
      </div>
    </main>
  );
}
