import React from 'react'
import { Layers } from 'lucide-react'
import { FormData, Tone } from '../types'

interface BannerPreviewProps {
  data: FormData
}

const TONE_GRADIENTS: Record<Tone, string> = {
  formal: 'linear-gradient(135deg, #0C0F1A 0%, #1a1f3c 40%, #0d1b2a 100%)',
  casual: 'linear-gradient(135deg, #0f1923 0%, #1a2a1f 40%, #0f1a23 100%)',
  hype: 'linear-gradient(135deg, #1a0c0c 0%, #1a0a1a 40%, #0c0a1a 100%)',
}

const TONE_ACCENT: Record<Tone, string> = {
  formal: '#4FA8FF',
  casual: '#00D9C0',
  hype: '#FF6B35',
}

const TONE_ACCENT2: Record<Tone, string> = {
  formal: '#9B5CF6',
  casual: '#A8FF78',
  hype: '#FF3CAC',
}

const TONE_TAG: Record<Tone, string> = {
  formal: 'PROFESSIONAL GRADE',
  casual: 'FOR REAL PEOPLE',
  hype: '🔥 LIMITED DROP',
}

const TONE_SUBTEXT: Record<Tone, string> = {
  formal: 'Trusted. Verified. Exceptional.',
  casual: 'Made for you. Just like that.',
  hype: 'Don\'t sleep. This changes everything.',
}

export const BannerPreview: React.FC<BannerPreviewProps> = ({ data }) => {
  const accent = TONE_ACCENT[data.tone]
  const accent2 = TONE_ACCENT2[data.tone]
  const gradient = TONE_GRADIENTS[data.tone]

  return (
    <div className="glass rounded-2xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Layers size={14} style={{ color: 'rgba(232,234,246,0.4)' }} />
        <span
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(232,234,246,0.35)',
          }}
        >
          Banner Preview
        </span>
        <div
          className="ml-auto px-2 py-0.5 rounded"
          style={{
            background: 'rgba(255,255,255,0.04)',
            fontSize: 10,
            color: 'rgba(232,234,246,0.3)',
            fontFamily: 'DM Mono, monospace',
          }}
        >
          1200 × 628
        </div>
      </div>

      {/* Banner */}
      <div
        className="banner-preview relative"
        style={{
          background: gradient,
          minHeight: 180,
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" />

        {/* Decorative orbs */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: accent,
            opacity: 0.12,
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -30,
            left: -20,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: accent2,
            opacity: 0.1,
            filter: 'blur(30px)',
          }}
        />

        {/* Decorative geometric */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            width: 80,
            height: 80,
            border: `1px solid ${accent}22`,
            borderRadius: '50%',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 28,
            right: 32,
            width: 56,
            height: 56,
            border: `1px solid ${accent}33`,
            borderRadius: '50%',
            opacity: 0.5,
          }}
        />

        {/* Top — Tag */}
        <div className="flex items-center justify-between" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="platform-badge"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}40`,
              color: accent,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: accent,
                display: 'inline-block',
              }}
            />
            {TONE_TAG[data.tone]}
          </div>

          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 10,
              color: 'rgba(232,234,246,0.25)',
            }}
          >
            autobrand.ai
          </div>
        </div>

        {/* Center — Main Content */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: 16 }}>
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: data.productName.length > 20 ? 20 : 26,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}
          >
            {data.productName || 'Your Product Name'}
          </h3>
          <p
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 12,
              color: 'rgba(232,234,246,0.5)',
              maxWidth: '80%',
              lineHeight: 1.4,
            }}
          >
            {data.description
              ? data.description.slice(0, 80) + (data.description.length > 80 ? '…' : '')
              : 'Your product description will appear here.'}
          </p>
        </div>

        {/* Bottom */}
        <div
          className="flex items-center justify-between"
          style={{ position: 'relative', zIndex: 1, marginTop: 16 }}
        >
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 11,
              color: 'rgba(232,234,246,0.3)',
              fontStyle: 'italic',
            }}
          >
            {TONE_SUBTEXT[data.tone]}
          </span>

          <div
            style={{
              padding: '5px 14px',
              borderRadius: 6,
              background: `linear-gradient(90deg, ${accent}, ${accent2})`,
              fontFamily: 'Syne, sans-serif',
              fontSize: 11,
              fontWeight: 700,
              color: 'white',
              letterSpacing: '0.03em',
            }}
          >
            Learn More →
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: 10,
          color: 'rgba(232,234,246,0.2)',
          fontFamily: 'DM Mono, monospace',
          textAlign: 'center',
        }}
      >
        Preview updates in real-time with your inputs
      </p>
    </div>
  )
}
