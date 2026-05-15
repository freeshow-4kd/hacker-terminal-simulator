export default function Bottombar() {
  return (
    <footer className="h-6 bg-[#0a0a0a] border-t border-[#333333] flex items-center px-4 justify-between shrink-0 z-20 text-[9px] text-[#888888]">
      <div className="flex gap-4">
        <span>SESSION: <span className="text-white">A9-X22</span></span>
        <span>ENCODING: <span className="text-white">UTF-8</span></span>
      </div>
      <div className="flex gap-4">
        <span>LATENCY: <span className="text-white">14ms</span></span>
        <span>LOG: <span className="text-white">SYSLOG_TMP.LOG</span></span>
      </div>
    </footer>
  );
}
