export const FAKE_LOGS = [
  "[+] Initializing connection to target server...",
  "[+] Bypass firewall rules [PORT 443]...",
  "[!] WARN: Anomaly detected in subnet mask routing.",
  "[+] Extracting encryption headers...",
  "[+] Handshake established securely.",
  "[+] Running dictionary attack on standard hashes...",
  "[+] SUCCESS: Root access vector found.",
  "[*] Downloading module payload... [25%]",
  "[*] Downloading module payload... [68%]",
  "[*] Downloading module payload... [100%]",
  "[+] Payload loaded into memory buffer.",
  "[*] Scanning local network for vulnerable nodes...",
  "--> SSH service detected on 192.168.1.105",
  "--> FTP service detected on 192.168.1.110",
  "--> HTTP API detected on 10.0.0.5",
  "[+] Deploying AI heuristics module...",
  "[+] AI analysis: PII configuration pattern isolated.",
  "[*] Compiling exploit from source...",
  "[+] Compilation successful. 0 warnings.",
  "[+] Executing shellcode...",
  "[!] ALERT: Intrusion Detection System triggered! Applying obfuscation...",
  "[+] Obfuscation complete. Session stabilized.",
  "[+] Retrieving database schema (7 tables found).",
  "[*] Reading /etc/shadow... Permission denied.",
  "[*] Escalating privileges using CVE-202X-XXXX bypass...",
  "[+] Root achieved.",
  "[+] Enumeration complete."
];

export const FAKE_SYSTEM_PROCESSES = [
  "kernel_task",
  "docker_daemon",
  "sshd",
  "bash",
  "python3 network_sniffer.py",
  "htop",
  "nmap -sS 192.168.1.0/24",
  "proxy_relay",
  "ai_analyzer"
];

export const generateRandomIp = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 255)}`;
};

export const generateFakeNetworkConnections = (count: number = 5) => {
  const states = ["ESTABLISHED", "LISTEN", "TIME_WAIT", "CLOSE_WAIT", "SYN_SENT"];
  const services = ["HTTP", "HTTPS", "SSH", "FTP", "MYSQL", "UNKNOWN"];
  
  return Array.from({ length: count }).map(() => ({
    ip: generateRandomIp(),
    port: [80, 443, 22, 21, 3306, Math.floor(Math.random() * 60000) + 1024][Math.floor(Math.random() * 6)],
    state: states[Math.floor(Math.random() * states.length)],
    service: services[Math.floor(Math.random() * services.length)]
  }));
};

export const FAKE_SCRIPTS = [
  [
    "import socket",
    "import struct",
    "import time",
    "def port_scan(target_ip, start_port, end_port):",
    "    print(f'[*] Scanning {target_ip}...')",
    "    for port in range(start_port, end_port):",
    "        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)",
    "        socket.setdefaulttimeout(1)",
    "        result = sock.connect_ex((target_ip, port))",
    "        if result == 0:",
    "            print(f'[+] Port {port} is open')",
    "        sock.close()",
    "port_scan('192.168.1.104', 1, 1024)",
  ],
  [
    "#include <stdio.h>",
    "#include <string.h>",
    "void bypass_aslr() {",
    "    void *ptr = malloc(1024);",
    "    printf(\"[+] Allocated shellcode at %p\\n\", ptr);",
    "    memset(ptr, 0x90, 512);",
    "}",
    "int main(int argc, char *argv[]) {",
    "    if (argc > 1) {",
    "        printf(\"[*] Initializing exploit sequence\\n\");",
    "        bypass_aslr();",
    "    }",
    "    return 0;",
    "}"
  ],
  [
    "const crypto = require('crypto');",
    "function generateAESKey() {",
    "  return crypto.randomBytes(32);",
    "}",
    "function encryptPayload(data, key) {",
    "  const iv = crypto.randomBytes(16);",
    "  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);",
    "  let encrypted = cipher.update(data, 'utf8', 'hex');",
    "  encrypted += cipher.final('hex');",
    "  return { iv: iv.toString('hex'), encryptedData: encrypted };",
    "}",
    "console.log('[+] Payload encrypted securely.');"
  ],
  [
    "#!/bin/bash",
    "echo '[*] Harvesting sensitive active directories...'",
    "cp /etc/passwd /tmp/backup_passwd_09",
    "cp /etc/shadow /tmp/backup_shadow_09",
    "tar -czf /tmp/harvest.tar.gz /tmp/backup_*",
    "rm -rf /tmp/backup_*",
    "echo '[+] Harvesting complete, ready for exfiltration over port 443.'"
  ]
];

export const getRandomScript = () => {
  return FAKE_SCRIPTS[Math.floor(Math.random() * FAKE_SCRIPTS.length)];
};

export const generateRandomLogLine = () => {
  const timestamp = new Date().toISOString().split('T')[1].slice(0, -1); // 00:00:00.000
  const randomLog = FAKE_LOGS[Math.floor(Math.random() * FAKE_LOGS.length)];
  return `[${timestamp}] ${randomLog}`;
};

export const generateCommandOutput = (command: string): string[] => {
  const cmd = command.trim().toLowerCase();
  
  if (cmd === 'help') {
    return [
      "AVAILABLE COMMANDS:",
      "  start    - Resume automated terminal process",
      "  stop     - Pause automated terminal process",
      "  clear    - Clear terminal buffer",
      "  scan     - Initiate network vulnerability scan",
      "  enum     - Enumerate target system users/files",
      "  exploit  - Execute simulated payload drops",
      "  ai       - Run heuristic AI threat analysis",
      "  connect  - Establish secure tunnel to target"
    ];
  }
  
  if (cmd === 'scan') {
    return [
      "[*] Initiating simulated network scan...",
      "[*] Sweeping subnet 10.0.0.0/24 for active hosts...",
      "--> Host 10.0.0.1 (Gateway) [UP]",
      "--> Host 10.0.0.51 (Target Alpha) [UP]",
      "--> Host 10.0.0.104 (Target Beta) [UP]",
      "[+] Active ports on 10.0.0.51: 22(SSH), 80(HTTP), 443(HTTPS), 8080(TCP)",
      "[*] Scan complete. 3 hosts up, 4801 packets sent."
    ];
  }
  
  if (cmd === 'enum') {
    return [
      "[*] Enumerating target data...",
      "[+] OS: Linux 5.15.0-generic x86_64",
      "[+] User info: root(0) admin(1001) service_acc(1002)",
      "[+] Extracting shadow hashes...",
      "[!] Access denied on /etc/shadow. Escalation required."
    ];
  }

  if (cmd === 'ai') {
    return [
      "[*] Booting neural heuristic engine...",
      "[+] Loading weights: exploit_vectors_v9.bin",
      "[+] Analyzing target topological footprint...",
      "--> Result: 87% probability of legacy OpenSSL vulnerability.",
      "--> Result: 92% probability of weak admin credentials.",
      "[+] Strategy recommended: Spearphish -> Credential Harvesting -> Privilege Escalation."
    ];
  }
  
  if (cmd === 'exploit' || cmd === 'connect') {
    return [
      `[*] Executing ${cmd} protocol on target vector...`,
      "[+] Injecting initial buffer layout...",
      "[+] Bypassing DEP and ASLR...",
      "[+] Sending second stage shellcode...",
      "[SUCCESS] Vector locked. Awaiting remote commands."
    ];
  }

  return [
    `bash: ${command}: command not found. Type 'help' for available commands.`
  ];
};
