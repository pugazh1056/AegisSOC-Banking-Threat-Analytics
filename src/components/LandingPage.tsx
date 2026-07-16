import React, { useState } from "react";
import { 
  ShieldAlert, 
  ArrowRight, 
  Building2, 
  CircleDollarSign, 
  Globe, 
  PiggyBank, 
  Brain, 
  KeyRound, 
  FileCheck, 
  User, 
  Quote 
} from "lucide-react";

interface LandingPageProps {
  onEnterApp: () => void;
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail("");
    }
  };

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#080B12] text-[#dce4e5]">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-[#080B12]/80 backdrop-blur-md z-50 border-b border-outline-variant/30 flex justify-between items-center px-6 md:px-16">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-primary-container h-8 w-8" />
          <span className="text-2xl font-black tracking-tight text-on-surface">AegisSOC</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary-container transition-colors" href="#features">Features</a>
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary-container transition-colors" href="#testimonials">Testimonials</a>
          <a className="text-sm font-medium text-on-surface-variant hover:text-primary-container transition-colors" href="#stats">Performance</a>
          <button 
            onClick={onEnterApp}
            className="bg-primary-container text-on-primary-fixed px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-fixed transition-colors shadow-lg shadow-primary-container/10 flex items-center gap-1 cursor-pointer"
          >
            Launch Sandbox Console
            <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 md:px-16 overflow-hidden hero-gradient min-h-[85vh] flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 border border-primary-container/20 rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span className="text-xs font-mono tracking-wider uppercase text-primary-container">v3.5 Operational Baseline</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-on-surface">
                Securing the Future of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container to-primary">Global Banking.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
                Enterprise-grade behavioral intelligence and quantum-safe security architecture designed specifically for high-stakes financial operations. A trusted partner in the SOC.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={onEnterApp}
                  className="bg-primary-container text-on-primary-fixed px-8 py-4 rounded-lg font-bold text-sm hover:bg-primary-fixed transition-all hover:translate-y-[-1px] cursor-pointer text-center flex items-center justify-center gap-2 shadow-lg shadow-primary-container/20"
                >
                  Enter Banking SOC Portal
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a 
                  href="#features"
                  className="border border-outline-variant/50 text-on-surface px-8 py-4 rounded-lg font-bold text-sm hover:border-primary-container hover:text-primary-container transition-colors text-center block"
                >
                  Explore Architecture
                </a>
              </div>
            </div>
            
            {/* Abstract Secure Graphic Mock */}
            <div className="relative h-[400px] lg:h-[550px] w-full rounded-2xl overflow-hidden glass-card flex items-center justify-center border border-outline-variant/30 group">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10"></div>
              <div 
                className="bg-cover bg-center w-full h-full opacity-80 mix-blend-screen scale-102 transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtwW1fqClwwbdm7RN-Hf1Ley-_mSlXuf0eFu1jpExjKH2HNJ2y3m51aEQtJoGkiQc4xcS16wkpWw7pgF2Lh97OA1nKcronf6hMQ2UKejQGAUuZmboOjAvDPby8_-2BhqxzZX2PrSlWXjCq5FJ9nZbVvnhJCtFZQmbTa95-vqvp1itvU-Z9oT0Scfc7dnrt396FzboFfIQ4d5zQvOVUAVWWNp_Kw3SLVh3Z5f_ryHQQDZM-doi5csZF_VCWzWo-MYUUxeuj1Bsd_rs')" }}
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#111827]/90 border border-outline-variant/30 backdrop-blur-md z-20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-primary-container font-semibold">Active Node Sentinel</span>
                  <span className="px-2 py-0.5 text-[9px] bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Operational</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">Cognitive Defense Matrix active across 4,591 endpoints.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-12 border-y border-outline-variant/20 bg-[#080f11]">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <p className="font-mono text-xs font-semibold text-center text-on-surface-variant uppercase tracking-widest mb-8">
              Trusted by Global Financial Institutions
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2">
                <Building2 className="h-6 w-6 text-on-surface-variant" />
                <span className="text-lg font-bold tracking-tight text-on-surface">Global Trust</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-6 w-6 text-on-surface-variant" />
                <span className="text-lg font-bold tracking-tight text-on-surface">FedPartner</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6 text-on-surface-variant" />
                <span className="text-lg font-bold tracking-tight text-on-surface">EuroSec Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <PiggyBank className="h-6 w-6 text-on-surface-variant" />
                <span className="text-lg font-bold tracking-tight text-on-surface">First Capital</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="py-32 px-6 md:px-16 bg-[#080B12]" id="features">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
                Architected for Operational Excellence
              </h2>
              <p className="text-on-surface-variant text-base leading-relaxed">
                Moving beyond legacy alert fatigue to provide cognitive clarity and precision in high-stakes threat detection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="glass-card p-8 rounded-xl hover:border-primary-container/50 transition-all duration-300 group hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded bg-primary-container/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="text-primary-container h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Behavioral Intelligence</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Continuous baselining of user and entity behavior to detect subtle anomalies before they escalate into breaches.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card p-8 rounded-xl hover:border-primary-container/50 transition-all duration-300 group hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded bg-primary-container/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <KeyRound className="text-primary-container h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Quantum-Safe Encryption</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Future-proof cryptographic foundations designed to withstand emerging threats from post-quantum computing networks.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card p-8 rounded-xl hover:border-primary-container/50 transition-all duration-300 group hover:translate-y-[-4px]">
                <div className="w-12 h-12 rounded bg-primary-container/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileCheck className="text-primary-container h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">Automated SOC Compliance</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Seamless integration with major regulatory frameworks (GDPR, PCI-DSS, SOC2) with one-click instant audit reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 md:px-16 border-y border-outline-variant/20 bg-[#111827]" id="stats">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
              <div className="p-6">
                <p className="text-5xl font-extrabold text-primary-container mb-2">99.9%</p>
                <p className="font-mono text-xs text-on-surface-variant tracking-wider uppercase">Detection Accuracy</p>
              </div>
              <div className="p-6">
                <p className="text-5xl font-extrabold text-primary-container mb-2">&lt;5m</p>
                <p className="font-mono text-xs text-on-surface-variant tracking-wider uppercase">Avg. Response Time</p>
              </div>
              <div className="p-6">
                <p className="text-5xl font-extrabold text-primary-container mb-2">100%</p>
                <p className="font-mono text-xs text-on-surface-variant tracking-wider uppercase">Compliance Ready</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 px-6 md:px-16 bg-[#080B12]" id="testimonials">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex justify-center">
              <Quote className="h-12 w-12 text-outline-variant/40" />
            </div>
            <p className="text-2xl md:text-3xl text-on-surface italic leading-relaxed font-light">
              &ldquo;SentinelAI has transformed our security posture. It&rsquo;s not just about stopping threats; it&rsquo;s about having a wise, reliable partner that understands the nuanced operational realities of global banking.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-4 pt-6">
              <div className="w-14 h-14 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/40 shadow-lg">
                <div 
                  className="bg-cover bg-center w-full h-full" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsT9IWuCNy4iQPcLn1F9apNUfHJcvnNeEMFKeLaVBYQlAFBfBzCZ5HSmAuoubt9DYlHKH85-aE-8qj-tdFs3UJFVv_7QgNUiZsig6weiu0wIxo35VF0EY0n4BfkVX2NZnskz_dAoA7dEx80tdoGl1-B2Jr7o-_hPd-av0sCAmq4RghHLOtqXPqJ1vwU_nIIQUFMUJo4wRLlqp6fGOsLtVLnCoXZpe12DvInoDUl9RaLKD2QFguyKRuLUjjjmJtSh3WFjo1mMpjeuU')" }}
                />
              </div>
              <div className="text-left">
                <p className="text-base font-bold text-on-surface">Sarah Jenkins</p>
                <p className="text-sm text-on-surface-variant">Chief Information Security Officer, Global Trust Bank</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant/20 bg-[#111827] py-16 px-6 md:px-16 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">Ready to Secure Your Institution?</h2>
          <p className="text-on-surface-variant text-base">Schedule a comprehensive technical deep-dive with our security architecture team.</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto pt-4">
            <input 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#080f11] border border-outline-variant/40 rounded-lg px-4 py-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none flex-grow text-sm transition-all" 
              placeholder="Work Email Address" 
              type="email"
            />
            <button 
              type="submit"
              className="bg-primary-container text-on-primary-fixed px-6 py-3 rounded-lg font-bold text-sm hover:bg-primary-fixed transition-colors whitespace-nowrap cursor-pointer shadow-md shadow-primary-container/10"
            >
              Request Demo
            </button>
          </form>

          {subscribed && (
            <p className="text-emerald-400 font-mono text-xs animate-fade-in">
              Demo request submitted. Our team will contact you shortly!
            </p>
          )}

          <div className="pt-16 flex flex-col md:flex-row justify-between items-center text-xs text-on-surface-variant font-mono border-t border-outline-variant/10">
            <p>&copy; 2026 SentinelAI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a className="hover:text-primary-container transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-primary-container transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
