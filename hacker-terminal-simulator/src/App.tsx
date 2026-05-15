import Topbar from './components/Topbar';
import Bottombar from './components/Bottombar';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import Terminal from './components/Terminal';
import { useTerminalEngine } from './hooks/useTerminalEngine';

export default function App() {
  const { logs, isRunning, scrollRef, start, stop, clear, executeCommand } = useTerminalEngine();

  return (
    <div className="h-screen w-screen bg-[#050505] text-white font-mono overflow-hidden flex flex-col relative select-none crt-overlay">
      <div className="crt-scanline"></div>
      <Topbar />
      
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel />
        <Terminal 
          logs={logs} 
          scrollRef={scrollRef as any} 
          onCommand={executeCommand} 
          isRunning={isRunning}
          onStart={start}
          onStop={stop}
          onClear={clear}
        />
        <RightPanel onCommand={executeCommand} />
      </div>

      <Bottombar />
    </div>
  );
}
