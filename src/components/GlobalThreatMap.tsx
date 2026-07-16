import React, { useState, useEffect } from "react";
import { Globe, ShieldAlert, Terminal, Play, Pause, RefreshCw } from "lucide-react";

interface Ping {
  x: number;
  y: number;
  id: number;
  delay: number;
}

interface GlobalThreatMapProps {
  customPings: Ping[];
  onSimulateAttack: () => void;
}

interface AttackVector {
  id: string;
  source: { x: number; y: number; label: string };
  dest: { x: number; y: number; label: string };
  type: string;
  severity: "critical" | "high" | "medium";
  color: string;
}

interface ThreatLog {
  time: string;
  ip: string;
  origin: string;
  target: string;
  type: string;
  status: "BLOCKED" | "MITIGATED" | "MONITORING";
}

export default function GlobalThreatMap({ customPings, onSimulateAttack }: GlobalThreatMapProps) {
  const [hoveredPing, setHoveredPing] = useState<Ping | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeVectors, setActiveVectors] = useState<AttackVector[]>([]);
  const [logs, setLogs] = useState<ThreatLog[]>([]);

  // Continents and regions simplified SVG paths for viewBox 800 x 400
  const continents = [
    {
      name: "North America",
      d: "M 60,85 L 90,80 L 120,60 L 170,65 L 190,75 L 210,95 L 215,120 L 200,145 L 210,170 L 195,195 L 175,200 L 160,220 L 155,240 L 145,255 L 135,250 L 130,235 L 135,210 L 120,195 L 110,205 L 100,200 L 95,185 L 105,170 L 90,150 L 70,145 L 60,130 L 50,115 L 55,95 Z"
    },
    {
      name: "South America",
      d: "M 155,245 L 165,250 L 180,275 L 190,300 L 200,330 L 195,360 L 185,390 L 175,405 L 168,405 L 160,370 L 150,340 L 145,310 L 140,285 L 148,260 Z"
    },
    {
      name: "Greenland",
      d: "M 210,45 L 230,40 L 245,45 L 240,65 L 225,75 L 215,65 Z"
    },
    {
      name: "Africa",
      d: "M 350,195 L 370,190 L 390,195 L 415,205 L 425,220 L 430,245 L 420,270 L 405,300 L 395,325 L 385,335 L 380,330 L 375,310 L 360,280 L 350,260 L 340,235 L 338,215 Z"
    },
    {
      name: "Eurasia",
      d: "M 325,110 L 350,105 L 380,100 L 410,95 L 440,90 L 480,95 L 520,100 L 560,110 L 590,125 L 600,145 L 595,170 L 575,195 L 555,215 L 535,225 L 510,220 L 495,235 L 470,230 L 455,215 L 440,225 L 425,215 L 415,200 L 395,190 L 375,185 L 360,180 L 345,170 L 330,160 L 320,140 L 320,125 Z"
    },
    {
      name: "Australia",
      d: "M 530,300 L 555,295 L 575,305 L 580,325 L 565,345 L 545,340 L 525,325 Z"
    },
    {
      name: "United Kingdom",
      d: "M 320,135 L 325,130 L 328,138 L 322,142 Z"
    },
    {
      name: "Japan",
      d: "M 600,150 L 605,155 L 603,165 L 598,160 Z"
    }
  ];

  // Static target nodes on map for cyber-attack lasers
  const threatTargets = [
    { name: "New York Hub", x: 180, y: 110 },
    { name: "Frankfurt DC", x: 380, y: 120 },
    { name: "London Custody", x: 340, y: 125 },
    { name: "Singapore Gateway", x: 520, y: 220 },
    { name: "Tokyo Core Node", x: 600, y: 155 },
    { name: "Sydney Node", x: 560, y: 320 },
    { name: "Sao Paulo Terminal", x: 180, y: 310 },
    { name: "Cape Town Relay", x: 395, y: 315 }
  ];

  const attackTypes = [
    { name: "DDoS Flood Vector", color: "#ff3b30", severity: "critical" },
    { name: "SQLi Database Probe", color: "#ff9500", severity: "high" },
    { name: "Malware Decrypt Attack", color: "#00e5ff", severity: "medium" },
    { name: "MFA Session Bypass", color: "#af52de", severity: "high" },
    { name: "Ransomware Loop", color: "#ff3b30", severity: "critical" }
  ];

  // Generate a random attack vector
  const triggerRandomAttack = () => {
    const sourceIndex = Math.floor(Math.random() * threatTargets.length);
    let destIndex = Math.floor(Math.random() * threatTargets.length);
    while (destIndex === sourceIndex) {
      destIndex = Math.floor(Math.random() * threatTargets.length);
    }

    const source = threatTargets[sourceIndex];
    const dest = threatTargets[destIndex];
    const attack = attackTypes[Math.floor(Math.random() * attackTypes.length)];

    const newVector: AttackVector = {
      id: `VEC-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      source: { x: source.x, y: source.y, label: source.name },
      dest: { x: dest.x, y: dest.y, label: dest.name },
      type: attack.name,
      severity: attack.severity as any,
      color: attack.color
    };

    setActiveVectors(prev => [...prev.slice(-3), newVector]); // Keep last 4 vectors active

    // Log the attack to console
    const newLog: ThreatLog = {
      time: new Date().toLocaleTimeString(),
      ip: `${Math.floor(Math.random() * 220) + 10}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`,
      origin: source.name,
      target: dest.name,
      type: attack.name,
      status: Math.random() > 0.3 ? "BLOCKED" : "MITIGATED"
    };

    setLogs(prev => [newLog, ...prev.slice(0, 15)]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    // Trigger initial logs
    triggerRandomAttack();
    triggerRandomAttack();

    const interval = setInterval(() => {
      triggerRandomAttack();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[440px] w-full">
      
      {/* Inline styles for custom futuristic animations */}
      <style>{`
        @keyframes cyber-dash {
          to {
            stroke-dashoffset: -200;
          }
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .cyber-laser-active {
          animation: cyber-dash 3s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 2px;
        }
      `}</style>

      {/* Main Map Canvas Area (3/4 width) */}
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-outline-variant/30 bg-[#060a12] flex flex-col group p-4">
        
        {/* Top Header Controls overlay inside the map container */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
          <div className="flex items-center gap-2 bg-[#090e17]/90 px-3 py-1.5 rounded-xl border border-outline-variant/40 shadow-2xl pointer-events-auto">
            <Globe className="h-4 w-4 text-primary-container animate-spin [animation-duration:15s]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-on-surface font-mono uppercase tracking-wider">Aegis Threat Radar</span>
              <span className="text-[8px] font-mono text-emerald-400">STATUS: INTERCEPTORS STABLE</span>
            </div>
          </div>

          <div className="flex gap-2 pointer-events-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-[#090e17]/90 hover:bg-white/[0.04] p-1.5 rounded-lg border border-outline-variant/40 text-on-surface-variant hover:text-on-surface cursor-pointer transition-colors"
              title={isPlaying ? "Pause Attacks Animation" : "Resume Attacks Animation"}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={onSimulateAttack}
              className="bg-error/20 hover:bg-error/30 text-error px-2.5 py-1.5 rounded-lg border border-error/40 font-mono text-[9px] font-bold tracking-wider flex items-center gap-1 cursor-pointer transition-all"
            >
              <ShieldAlert className="h-3 w-3 animate-pulse" />
              INJECT INCIDENT
            </button>
          </div>
        </div>

        {/* Map SVG Canvas */}
        <div className="flex-1 w-full h-full relative mt-8">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full select-none"
            style={{ minHeight: "260px" }}
          >
            {/* Definitions for Gradients, Glow filters, and patterns */}
            <defs>
              <linearGradient id="continent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0b111e" />
                <stop offset="100%" stopColor="#0f192b" />
              </linearGradient>
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Latitude and Longitude Dashed Grid Lines */}
            <g opacity="0.15">
              {/* Horizontal Lines */}
              <line x1="0" y1="100" x2="800" y2="100" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="3,6" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="3,6" />
              <line x1="0" y1="300" x2="800" y2="300" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="3,6" />
              {/* Vertical Lines */}
              <line x1="200" y1="0" x2="200" y2="400" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="3,6" />
              <line x1="400" y1="0" x2="400" y2="400" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="3,6" />
              <line x1="600" y1="0" x2="600" y2="400" stroke="#00e5ff" strokeWidth="0.5" strokeDasharray="3,6" />
            </g>

            {/* Continents outlines and styled fill */}
            <g id="continents">
              {continents.map((c, i) => (
                <path
                  key={i}
                  d={c.d}
                  fill="url(#continent-grad)"
                  stroke="rgba(0, 229, 255, 0.22)"
                  strokeWidth="1.2"
                  className="transition-all duration-300 hover:fill-[#13233c] hover:stroke-[#00e5ff]"
                >
                  <title>{c.name}</title>
                </path>
              ))}
            </g>

            {/* Static Core Infrastructure Target Nodes */}
            <g id="threat-targets">
              {threatTargets.map((t, idx) => (
                <g key={idx} transform={`translate(${t.x}, ${t.y})`}>
                  <circle r="4" fill="#00e5ff" opacity="0.3" className="animate-ping" style={{ animationDuration: "3s" }} />
                  <circle r="2.5" fill="#00e5ff" />
                  <text
                    y="-8"
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.45)"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {t.name}
                  </text>
                </g>
              ))}
            </g>

            {/* Cyber Warfare Attack Laser Beams (Bezier Arcs) */}
            <g id="attack-vectors">
              {activeVectors.map((v) => {
                const midX = (v.source.x + v.dest.x) / 2;
                const midY = Math.min(v.source.y, v.dest.y) - 60; // Curved height
                const curveD = `M ${v.source.x} ${v.source.y} Q ${midX} ${midY} ${v.dest.x} ${v.dest.y}`;

                return (
                  <g key={v.id}>
                    {/* Shadow trailing guide-line */}
                    <path
                      d={curveD}
                      fill="none"
                      stroke={v.color}
                      strokeWidth="1"
                      opacity="0.12"
                    />
                    {/* Active moving laser pulse */}
                    <path
                      d={curveD}
                      fill="none"
                      stroke={v.color}
                      strokeWidth="1.8"
                      strokeDasharray="12 120"
                      strokeDashoffset="0"
                      className="cyber-laser-active"
                      filter="url(#glow-filter)"
                    />
                  </g>
                );
              })}
            </g>

            {/* Dynamic Interactive Threat Pings from parent props */}
            <g id="custom-pings">
              {customPings.map((ping) => {
                // Translate percentages to absolute map viewport width/height
                const absoluteX = (ping.x / 100) * 800;
                const absoluteY = (ping.y / 100) * 400;

                return (
                  <g
                    key={ping.id}
                    transform={`translate(${absoluteX}, ${absoluteY})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPing(ping)}
                    onMouseLeave={() => setHoveredPing(null)}
                  >
                    {/* Glowing outer concentric animation circles */}
                    <circle r="12" fill="none" stroke="#ff3b30" strokeWidth="1" className="origin-center" style={{ transformOrigin: "0px 0px", animation: "pulse-ring 2s infinite" }} />
                    <circle r="4" fill="#ff3b30" className="animate-pulse" />
                    <circle r="1.5" fill="#ffffff" />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Hover Tooltip Overlay */}
        {hoveredPing && (
          <div
            className="absolute bg-[#0f172a] border border-error/30 text-[10px] text-on-surface p-2.5 rounded-xl shadow-2xl pointer-events-none transition-all duration-200 z-50 flex flex-col gap-0.5"
            style={{
              top: `${hoveredPing.y - 12}%`,
              left: `${hoveredPing.x + 2}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex items-center gap-1 text-error font-bold font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
              Live Cyber Probe
            </div>
            <div className="text-on-surface-variant font-mono">X-Coord: {hoveredPing.x}% | Y-Coord: {hoveredPing.y}%</div>
            <div className="text-[9px] text-slate-400 mt-1">Severity: UNRESOLVED IMMEDIATE THREAT</div>
          </div>
        )}

        {/* Bottom Status bar info overlay */}
        <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant bg-[#090e17]/80 p-2 rounded-xl border border-outline-variant/20">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Intercept Engines Listening</span>
          </div>
          <div>SWIFT nodes polled: 4,591/4,591</div>
        </div>

      </div>

      {/* Cyber Real-Time Attack Console Sidebar (1/4 width) */}
      <div className="w-full lg:w-72 bg-[#090e17] border border-outline-variant/30 rounded-2xl p-4 flex flex-col h-full overflow-hidden shrink-0">
        <div className="flex items-center gap-2 border-b border-[#1f2937]/50 pb-3 mb-3">
          <Terminal className="h-4 w-4 text-primary-container" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-on-surface uppercase tracking-wider font-mono">Radar Telemetry Feed</span>
            <span className="text-[8px] text-on-surface-variant font-mono">Simulated Attack Vector Log</span>
          </div>
        </div>

        {/* Live Logs Feed */}
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
          {logs.length === 0 ? (
            <div className="text-center text-[10px] text-on-surface-variant font-mono py-12">
              Waiting for live telemetry handshake...
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className="bg-white/[0.01] hover:bg-white/[0.03] p-2 rounded-lg border border-[#1f2937]/40 text-[9px] font-mono transition-colors flex flex-col gap-0.5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">{log.time}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-black text-[8px] ${
                      log.status === "BLOCKED" ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
                <div className="text-on-surface truncate">
                  <span className="text-primary-container">SRC:</span> {log.origin} ({log.ip})
                </div>
                <div className="text-on-surface truncate">
                  <span className="text-secondary-fixed">DEST:</span> {log.target}
                </div>
                <div className="text-[8px] text-on-surface-variant uppercase tracking-wider font-semibold mt-0.5 truncate text-slate-400">
                  {log.type}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
