import React from 'react'
import { Sparkles, Github, Zap } from 'lucide-react'
import Generator from './components/Generator'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background orbs */}
      <div
        className="bg-orb"
        style={{ width: 600, height: 600, background: '#FF6B35', top: -200, right: -200 }}
      />
      <div
        className="bg-orb"
        style={{ width: 500, height: 500, background: '#FF3CAC', bottom: -150, left: -150, animationDelay: '-4s' }}
      />
      <div
        className="bg-orb"
        style={{ width: 300, height: 300, background: '#00D9C0', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animationDelay: '-8s' }}
      />

      {/* Main layout */}
      <div className="relative z-10 min-h-screen flex flex-col" style={{ padding: '0 20px 40px' }}>

        {/* ——— NAVBAR ——— */}
        <nav
          className="glass flex items-center justify-between sticky top-0 z-20"
          style={{ padding: '12px 24px', margin: '0 -20px', borderBottom: '1px solid rgba(255,255,255,0.06)', borderRadius: 0 }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(255,107,53,0.4)',
              }}
            >
              <Sparkles size={16} color="white" />
            </div>
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
              Auto<span className="gradient-text-orange">Brand</span>
              <span style={{ color: 'rgba(232,234,246,0.4)', fontWeight: 400, marginLeft: 2 }}>AI</span>
            </span>
          </div>

          {/* Center badge */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,217,192,0.06)', border: '1px solid rgba(0,217,192,0.15)' }}
          >
            <Zap size={11} color="#00D9C0" />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#00D9C0' }}>
              AI-Powered Marketing Generator
            </span>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/kavin-debug"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(232,234,246,0.4)', transition: 'color 0.2s', display: 'flex' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(232,234,246,0.9)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(232,234,246,0.4)')}
          >
            <Github size={18} />
          </a>
        </nav>

        {/* ——— HERO ——— */}
        <div className="text-center py-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.18)' }}
          >
            <span style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: '#FF6B35' }}>✦ Hackathon Edition</span>
            <span style={{ width: 1, height: 12, background: 'rgba(255,107,53,0.3)', display: 'inline-block' }} />
            <span style={{ fontSize: 12, fontFamily: 'DM Mono, monospace', color: 'rgba(232,234,246,0.4)' }}>
              Instagram · LinkedIn · Email
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(30px, 5vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: 16,
            }}
          >
            <span style={{ color: 'white' }}>Generate </span>
            <span className="gradient-text">marketing content</span>
            <br />
            <span style={{ color: 'white' }}>in seconds.</span>
          </h1>

          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, color: 'rgba(232,234,246,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            AI-crafted captions, posts, and emails — tailored to your brand, your audience, and your tone.
          </p>
        </div>

        {/* ——— GENERATOR (always visible, no opacity:0 animation) ——— */}
        <div style={{ maxWidth: 780, margin: '0 auto', width: '100%', paddingBottom: 40 }}>
          <Generator />
        </div>

        {/* ——— FOOTER ——— */}
        <div className="text-center mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 20 }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(232,234,246,0.2)' }}>
            Built with ❤️ for hackathon · AutoBrand AI © 2025 ·{' '}
            <a
              href="https://github.com/kavin-debug"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,107,53,0.5)', textDecoration: 'none' }}
            >
              @kavin-debug
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
