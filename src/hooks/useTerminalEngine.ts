import { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomScript, generateCommandOutput } from '../utils/FakeDataGenerator';

export interface LogEntry {
  id: number;
  text: string;
}

const MAX_LOGS = 200;

export function useTerminalEngine() {
  const nextId = useRef(0);
  const createLog = (text: string): LogEntry => ({ id: nextId.current++, text });

  const [logs, setLogs] = useState<LogEntry[]>([
    createLog("HACKSIM TERMINAL v2.4.1 (Linux-x86_64)"),
    createLog("Engine initialized. Awaiting manual input."),
    createLog("Type 'start' to begin automated sequence."),
    createLog("Type 'help' for manual override commands."),
    createLog("------------------------------------------------"),
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const currentScriptRef = useRef<string[]>([]);
  const scriptIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const currentLineRef = useRef("");

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Automated log generation (typing effect)
  useEffect(() => {
    if (!isRunning) return;

    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      // If we finished typing the current line
      if (charIndexRef.current >= currentLineRef.current.length) {
        if (scriptIndexRef.current >= currentScriptRef.current.length || currentScriptRef.current.length === 0) {
          currentScriptRef.current = getRandomScript();
          scriptIndexRef.current = 0;
        }
        
        currentLineRef.current = currentScriptRef.current[scriptIndexRef.current++];
        charIndexRef.current = 0;
        
        setLogs(prev => {
          const newLogs = [...prev, createLog("")];
          if (newLogs.length > MAX_LOGS) return newLogs.slice(newLogs.length - MAX_LOGS);
          return newLogs;
        });
        
        // Slight pause between lines
        let nextDelay = Math.random() * 100 + 50;
        if (Math.random() > 0.8) nextDelay += 300;
        timeoutId = setTimeout(typeNextChar, nextDelay);
        return;
      }

      // Type characters at variable speeds
      const charsToType = Math.floor(Math.random() * 3) + 1;
      const nextStr = currentLineRef.current.substring(charIndexRef.current, charIndexRef.current + charsToType);
      charIndexRef.current += charsToType;

      setLogs(prev => {
        if (prev.length === 0) return prev;
        const newLogs = [...prev];
        const lastLog = newLogs[newLogs.length - 1];
        newLogs[newLogs.length - 1] = { ...lastLog, text: lastLog.text + nextStr };
        return newLogs;
      });

      let delay = Math.random() * 40 + 10;
      if (Math.random() > 0.95) delay += 100;
      timeoutId = setTimeout(typeNextChar, delay);
    };

    timeoutId = setTimeout(typeNextChar, 100);

    return () => clearTimeout(timeoutId);
  }, [isRunning]);

  const addLog = useCallback((lineOrLines: string | string[]) => {
    setLogs((prev) => {
      const arrayLines = Array.isArray(lineOrLines) ? lineOrLines : [lineOrLines];
      const newEntries = arrayLines.map(text => createLog(text));
      const newLogs = [...prev, ...newEntries];
      if (newLogs.length > MAX_LOGS) {
        return newLogs.slice(newLogs.length - MAX_LOGS);
      }
      return newLogs;
    });
  }, []);

  const clear = useCallback(() => {
    setLogs([]);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    charIndexRef.current = currentLineRef.current.length; // Force fresh line next tick
    addLog("[*] Execution engine STARTED.");
  }, [addLog]);

  const stop = useCallback(() => {
    setIsRunning(false);
    addLog("[*] Execution engine STOPPED. Awaiting manual input.");
  }, [addLog]);

  const executeCommand = useCallback((cmd: string) => {
    if (!cmd.trim()) return;
    
    addLog(`root@kali:~# ${cmd}`);
    
    const lowerCmd = cmd.trim().toLowerCase();
    
    if (lowerCmd === 'clear') {
      clear();
      return;
    }
    if (lowerCmd === 'stop') {
      stop();
      return;
    }
    if (lowerCmd === 'start') {
      start();
      return;
    }

    setIsRunning(false); 
    
    setTimeout(() => {
      const output = generateCommandOutput(cmd);
      addLog(output);
    }, 400);

  }, [addLog, clear, stop, start]);

  return {
    logs,
    isRunning,
    scrollRef,
    start,
    stop,
    clear,
    executeCommand,
    addLog
  };
}
