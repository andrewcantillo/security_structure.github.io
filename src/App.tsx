import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Smartphone, 
  Fingerprint, 
  Key, 
  Globe,
  Info,
  Server,
  Database,
  Github,
  Users,
  Terminal,
  Activity,
  ZoomIn,
  ZoomOut,
  Maximize,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mermaid component with Zoom/Pan
const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis',
      },
    });
    
    mermaid.render('mermaid-svg-' + Math.random().toString(36).substr(2, 9), chart).then(({ svg }) => {
      setSvg(svg);
    });
  }, [chart]);

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-inner border border-slate-200 overflow-hidden group">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        centerOnInit
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => zoomIn()} className="p-2 bg-white/80 backdrop-blur shadow-sm border border-slate-200 rounded-lg hover:bg-white transition-colors">
                <ZoomIn className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => zoomOut()} className="p-2 bg-white/80 backdrop-blur shadow-sm border border-slate-200 rounded-lg hover:bg-white transition-colors">
                <ZoomOut className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={() => resetTransform()} className="p-2 bg-white/80 backdrop-blur shadow-sm border border-slate-200 rounded-lg hover:bg-white transition-colors">
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
            </div>
            <div className="p-8 cursor-grab active:cursor-grabbing">
              <TransformComponent wrapperStyle={{ width: '100%', height: '500px' }}>
                <div 
                  dangerouslySetInnerHTML={{ __html: svg }} 
                  className="flex items-center justify-center min-w-full min-h-full"
                />
              </TransformComponent>
            </div>
          </>
        )}
      </TransformWrapper>
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <Maximize className="w-3 h-3" />
        Interactive Zoom & Pan
      </div>
    </div>
  );
};

// Risk Tree Component
const RiskTree = ({ layer }: { layer: LayerData }) => {
  return (
    <div className="relative py-8 px-4">
      {/* Root */}
      <div className="flex flex-col items-center mb-12 relative">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            "z-10 p-4 rounded-2xl shadow-lg border-2 flex flex-col items-center gap-2 min-w-[200px]",
            layer.color === 'blue' && "bg-blue-50 border-blue-200 text-blue-700",
            layer.color === 'purple' && "bg-purple-50 border-purple-200 text-purple-700",
            layer.color === 'teal' && "bg-teal-50 border-teal-200 text-teal-700",
            layer.color === 'orange' && "bg-orange-50 border-orange-200 text-orange-700",
          )}
        >
          {layer.icon}
          <span className="font-bold uppercase tracking-tighter">{layer.title}</span>
        </motion.div>
        <div className="w-px h-12 bg-slate-200 mt-0" />
      </div>

      {/* Risk Node */}
      <div className="flex flex-col items-center mb-12 relative">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="z-10 bg-red-50 border-2 border-red-100 p-4 rounded-xl shadow-sm max-w-md text-center"
        >
          <div className="flex items-center justify-center gap-2 text-red-600 font-bold text-xs uppercase mb-2">
            <ShieldAlert className="w-4 h-4" />
            Critical Risk
          </div>
          <p className="text-sm text-red-900 font-medium">{layer.risk}</p>
        </motion.div>
        <div className="w-px h-12 bg-slate-200" />
      </div>

      {/* Branches */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[66%] h-px bg-slate-200 hidden md:block" />
        
        {/* Protected Branch */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-8 bg-slate-200 hidden md:block" />
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm w-full">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase mb-3">
              <Lock className="w-3 h-3" />
              Still Protected
            </div>
            <ul className="space-y-2">
              {layer.protected.map((item, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-slate-300 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Secured Branch */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-8 bg-slate-200 hidden md:block" />
          <div className="bg-emerald-50 border-2 border-emerald-100 p-6 rounded-xl shadow-md w-full flex flex-col items-center justify-center text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mb-3" />
            <div className="text-emerald-900 font-bold text-sm uppercase tracking-tight">
              {layer.secured}
            </div>
          </div>
        </motion.div>

        {/* Mitigations Branch */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-8 bg-slate-200 hidden md:block" />
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm w-full">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase mb-3">
              <CheckCircle2 className="w-3 h-3" />
              Mitigations
            </div>
            <ul className="space-y-2">
              {layer.mitigations.map((item, i) => (
                <li key={i} className="text-[11px] text-slate-600 flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface LayerData {
  id: string;
  title: string;
  icon: React.ReactNode;
  risk: string;
  protected: string[];
  secured: string;
  mitigations: string[];
  color: string;
}

const layers: LayerData[] = [
  {
    id: 'device',
    title: 'DEVICE LAYER',
    icon: <Smartphone className="w-6 h-6" />,
    risk: 'Stolen Mac + known password. All local files, SSH keys, browser sessions and cached credentials exposed.',
    protected: [
      'GitHub — MFA blocks remote login',
      'Brightree — MFA + SSO required',
      'Kinnser — MFA + SSO required',
      'Database — Zero Trust blocks device',
      'Secrets Vault — separate MFA',
      'Teams — MFA still required'
    ],
    secured: 'Device is protected',
    mitigations: [
      'Enable FileVault on all Macs',
      'Enroll in Jamf or Kandji MDM',
      'Strong password policy min 12 chars',
      'Disable guest account'
    ],
    color: 'blue'
  },
  {
    id: 'identity',
    title: 'IDENTITY LAYER',
    icon: <Fingerprint className="w-6 h-6" />,
    risk: 'Phishing / stolen credentials. Full account takeover. GitHub, Brightree, Kinnser and Teams compromised with a single stolen password.',
    protected: [
      'All platforms need a 2nd factor',
      'Database — Zero Trust posture check',
      'Local files — FileVault + physical device',
      'Secrets Vault — device-bound auth',
      'GitHub — SAML SSO enforced',
      'Teams — conditional access active'
    ],
    secured: 'Identity is verified',
    mitigations: [
      'Enable MFA for everyone',
      'SSO via Entra ID — revoke once revoke all',
      'Conditional Access policies',
      'Audit login attempts'
    ],
    color: 'purple'
  },
  {
    id: 'secrets',
    title: 'SECRETS LAYER',
    icon: <Key className="w-6 h-6" />,
    risk: 'API keys committed to code. DB passwords and API tokens exposed to anyone with access to the repository.',
    protected: [
      'User accounts — SSO/MFA unaffected',
      'Brightree — login via SSO only',
      'Kinnser — login via SSO only',
      'Device — FileVault still encrypts',
      'Identity layer — separate credentials',
      'Other secrets — rotate key immediately'
    ],
    secured: 'Secrets are vaulted',
    mitigations: [
      'Use 1Password or Bitwarden Teams',
      'Enable GitHub Secret Scanning',
      'Enable Branch Protection on repos',
      'Rotate leaked keys immediately'
    ],
    color: 'teal'
  },
  {
    id: 'access',
    title: 'ACCESS LAYER',
    icon: <Globe className="w-6 h-6" />,
    risk: 'No Zero Trust gateway. Anyone with credentials can connect from any device or location — no audit trail.',
    protected: [
      'GitHub — SSO + MFA still required',
      'Secrets Vault — auth still active',
      'Teams — MFA still enforced',
      'Local Mac — FileVault still encrypts',
      'Brightree — MFA still blocks access',
      'Kinnser — MFA still blocks access'
    ],
    secured: 'Access is controlled',
    mitigations: [
      'Deploy Cloudflare Zero Trust',
      'Tailscale as lighter alternative',
      'Per-app access policies by role',
      'Full audit log — who, when, where'
    ],
    color: 'orange'
  }
];

const chart = `
flowchart TD
    classDef blue fill:#a5d8ff,stroke:#4a9eed,color:#1e3a5f
    classDef purple fill:#d0bfff,stroke:#8b5cf6,color:#2d1b69
    classDef green fill:#b2f2bb,stroke:#22c55e,color:#1a4d2e
    classDef orange fill:#ffd8a8,stroke:#f59e0b,color:#5c3d1a
    classDef red fill:#ffc9c9,stroke:#ef4444,color:#5c1a1a
    classDef teal fill:#c3fae8,stroke:#22c55e,color:#1a4d4d
    classDef yellow fill:#fff3bf,stroke:#f59e0b,color:#5c3d1a
    classDef pink fill:#eebefa,stroke:#8b5cf6,color:#2d1b69
    classDef secured fill:#b2f2bb,stroke:#22c55e,color:#1a4d2e

    subgraph FLOW["Secure Information Flow"]
        direction LR
        DEV["Developer"]:::blue
        MAC["Corporate Mac 
        FileVault + MDM"]:::blue
        SSO["SSO + MFA"]:::purple
        SECSM["Secrets Manager
        Password / Bitwarden"]:::teal
        ZT["Cloudflare
        Zero Trust"]:::orange

        subgraph RES["Protected Resources"]
            direction TB
            GH["GitHub
            SSO + Branch Protection"]:::green
            DB["Database
            read-only"]:::yellow
            BT["Brightree SaaS"]:::orange
            KN["Kinnser SaaS"]:::orange
            TM["Teams / O365"]:::pink
            LG["Centralized Logs"]:::red
        end

        DEV --> MAC
        MAC -->|login| SSO
        MAC -->|fetch keys| SECSM
        SSO -->|"verified identity + device posture"| ZT
        ZT -->|"authorized access only"| GH
        ZT --> |"authorized access only"| DB
        ZT --> |"authorized access only"| BT
        ZT --> |"authorized access only"| KN
        ZT --> |"authorized access only"| TM
        GH -.->|events| LG
        ZT -.->|events| LG
    end
`;

export default function App() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Security Architecture Explorer</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a 
              href="https://github.com/andrewcantillo/security_structure.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              Repository
            </a>
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              Live Monitoring
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Section */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-slate-900 mb-4"
          >
            Interactive Defense Strategy
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl"
          >
            Explore our security posture through interactive diagrams and hierarchical risk trees. 
            Understand how each layer contributes to a resilient, zero-trust environment.
          </motion.p>
        </div>

        {/* Diagram Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-500" />
              Secure Information Flow
            </h3>
          </div>
          <Mermaid chart={chart} />
        </section>

        {/* Risk Layers Explorer */}
        <section className="mb-16">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Hierarchical Risk Analysis</h3>
            <p className="text-slate-500">Select a layer to visualize its risk-to-mitigation tree structure.</p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border-2",
                  activeLayer === layer.id 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200" 
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                )}
              >
                {layer.icon}
                {layer.title}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px] flex flex-col items-center justify-center p-8">
            <AnimatePresence mode="wait">
              {activeLayer ? (
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
                >
                  <RiskTree layer={layers.find(l => l.id === activeLayer)!} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-400">Select a layer above to start the analysis</h4>
                  <p className="text-slate-400 max-w-xs mx-auto text-sm">
                    Visualizing the security chain helps identify potential weak points and the strength of our mitigations.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Resources Section */}
        <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-8">Protected Resources</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'GitHub', icon: <Github />, color: 'bg-emerald-500/20 text-emerald-400' },
                { name: 'Database', icon: <Database />, color: 'bg-yellow-500/20 text-yellow-400' },
                { name: 'Brightree', icon: <Server />, color: 'bg-orange-500/20 text-orange-400' },
                { name: 'Kinnser', icon: <Server />, color: 'bg-orange-500/20 text-orange-400' },
                { name: 'Teams / O365', icon: <Users />, color: 'bg-purple-500/20 text-purple-400' },
                { name: 'Central Logs', icon: <Terminal />, color: 'bg-red-500/20 text-red-400' },
              ].map((res, i) => (
                <motion.div
                  key={res.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className={cn("p-4 rounded-2xl", res.color)}>
                    {React.cloneElement(res.icon as React.ReactElement, { className: "w-6 h-6" })}
                  </div>
                  <span className="text-xs font-medium text-slate-400">{res.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-900">Security Architecture Explorer</span>
          </div>
          <p className="text-sm text-slate-500">
            © 2026 Enterprise Security Operations. Confidential & Proprietary.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/andrewcantillo/security_structure.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Audit Logs</button>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Policy Docs</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
