import React, { useState } from 'react'
import { Sparkles, Copy, Check, Instagram, Linkedin, Mail } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tone = 'formal' | 'casual' | 'hype'

interface FormInput {
  name: string
  description: string
  audience: string
  tone: Tone
}

interface GeneratedOutput {
  instagram: string
  linkedin: string
  email: string
}

// ─── Mock function (per your spec) ────────────────────────────────────────────

function generateContent(input: FormInput): GeneratedOutput {
  const tag = input.name.replace(/\s+/g, '')
  const audienceNote = input.audience ? ` Perfect for ${input.audience}.` : ''

  const tonePrefix: Record<Tone, string> = {
    formal:  `We are pleased to introduce`,
    casual:  `Say hello to`,
    hype:    `🔥 JUST DROPPED —`,
  }

  const toneEmoji: Record<Tone, string> = {
    formal: '🎯',
    casual: '✌️',
    hype:   '🚀',
  }

  return {
    instagram:
      `${toneEmoji[input.tone]} ${input.name} is here! ${input.description}${audienceNote}\n\n` +
      `#${tag} #Marketing #Launch #${input.tone.charAt(0).toUpperCase() + input.tone.slice(1)}`,

    linkedin:
      `${tonePrefix[input.tone]} ${input.name}.\n\n` +
      `${input.description}${audienceNote}\n\n` +
      `We built this with purpose — and we can't wait for you to experience it.\n\n` +
      `👉 Follow for updates and early access.`,

    email:
      `Subject: Introducing ${input.name}\n\n` +
      `Hi there,\n\n` +
      `${input.description}${audienceNote}\n\n` +
      `${tonePrefix[input.tone]} ${input.name} — and it's ready for you.\n\n` +
      `→ Get started today: [Insert Link]\n\n` +
      `Best,\nThe ${input.name} Team`,
  }
}

// ─── Output card ──────────────────────────────────────────────────────────────

interface OutputCardProps {
  platform: 'instagram' | 'linkedin' | 'email'
  content: string
}

const PLATFORM_META = {
  instagram: {
    label: 'Instagram Caption',
    icon: <Instagram size={14} />,
    color: '#E1306C',
    bg: 'rgba(225,48,108,0.1)',
    border: 'rgba(225,48,108,0.25)',
  },
  linkedin: {
    label: 'LinkedIn Post',
    icon: <Linkedin size={14} />,
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.1)',
    border: 'rgba(10,102,194,0.25)',
  },
  email: {
    label: 'Email Campaign',
    icon: <Mail size={14} />,
    color: '#00D9C0',
    bg: 'rgba(0,217,192,0.1)',
    border: 'rgba(0,217,192,0.25)',
  },
}

function OutputCard({ platform, content }: OutputCardProps) {
  const [copied, setCopied] = useState(false)
  const meta = PLATFORM_META[platform]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        background: 'rgba(17,21,38,0.8)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 20,
            background: meta.bg,
            border: `1px solid ${meta.border}`,
            color: meta.color,
            fontSize: 12,
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
          }}
        >
          {meta.icon}
          {meta.label}
        </div>

        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '5px 12px',
            borderRadius: 6,
            border: copied
              ? `1px solid rgba(0,217,192,0.5)`
              : '1px solid rgba(255,255,255,0.1)',
            background: copied ? 'rgba(0,217,192,0.1)' : 'rgba(255,255,255,0.04)',
            color: copied ? '#00D9C0' : 'rgba(232,234,246,0.55)',
            fontSize: 12,
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

      {/* Content */}
      <pre
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 13,
          lineHeight: 1.8,
          color: 'rgba(232,234,246,0.82)',
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}
      >
        {content}
      </pre>
    </div>
  )
}

// ─── Tone button ──────────────────────────────────────────────────────────────

interface ToneBtnProps {
  id: Tone
  emoji: string
  label: string
  active: boolean
  onClick: () => void
}

function ToneBtn({ id, emoji, label, active, onClick }: ToneBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        padding: '10px 8px',
        borderRadius: 10,
        border: active ? '1px solid rgba(255,107,53,0.55)' : '1px solid rgba(255,255,255,0.08)',
        background: active
          ? 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,60,172,0.08))'
          : 'rgba(6,8,16,0.6)',
        color: active ? '#FF6B35' : 'rgba(232,234,246,0.45)',
        fontFamily: 'Outfit, sans-serif',
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.18s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span style={{ fontSize: 18 }}>{emoji}</span>
      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12 }}>{label}</span>
    </button>
  )
}

// ─── Main Generator component ─────────────────────────────────────────────────

export default function Generator() {
  const [form, setForm] = useState<FormInput>({
    name: '',
    description: '',
    audience: '',
    tone: 'casual',
  })
  const [output, setOutput] = useState<GeneratedOutput | null>(null)
  const [loading, setLoading] = useState(false)

  const isValid = form.name.trim().length > 0 && form.description.trim().length > 0

  const handleGenerate = () => {
    if (!isValid) return
    setLoading(true)
    setOutput(null)

    // Simulate a brief async delay for UX realism
    setTimeout(() => {
      setOutput(generateContent(form))
      setLoading(false)
    }, 900)
  }

  // ─── Shared field styles ───────────────────────────────────────────────────
  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    background: 'rgba(6,8,16,0.8)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10,
    color: '#e8eaf6',
    fontFamily: 'Outfit, sans-serif',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Syne, sans-serif',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(232,234,246,0.38)',
    marginBottom: 8,
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Input card ── */}
      <div
        style={{
          background: 'rgba(17,21,38,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          padding: '28px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255,107,53,0.35)',
              flexShrink: 0,
            }}
          >
            <Sparkles size={16} color="white" />
          </div>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 15, color: 'white', margin: 0 }}>
              Brand Details
            </p>
            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: 'rgba(232,234,246,0.35)', margin: 0 }}>
              Fill in the fields below to generate content
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }} />

        {/* Fields — 2-column on wider screens */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>

          {/* Product Name */}
          <div>
            <label style={labelStyle}>Product / Event Name *</label>
            <input
              type="text"
              placeholder="e.g. TechFest 2025, LaunchPad Pro…"
              value={form.name}
              maxLength={80}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={fieldStyle}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255,107,53,0.5)'
                e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.08)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Target Audience */}
          <div>
            <label style={labelStyle}>Target Audience</label>
            <input
              type="text"
              placeholder="e.g. startup founders, college students…"
              value={form.audience}
              maxLength={80}
              onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))}
              style={fieldStyle}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(255,107,53,0.5)'
                e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.08)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
        </div>

        {/* Description — full width */}
        <div>
          <label style={labelStyle}>Description *</label>
          <textarea
            placeholder="What does it do? What makes it special? Key benefits…"
            value={form.description}
            maxLength={300}
            rows={3}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            style={{ ...fieldStyle, resize: 'vertical', minHeight: 80 }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255,107,53,0.5)'
              e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.08)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.08)'
              e.target.style.boxShadow = 'none'
            }}
          />
          <div style={{ textAlign: 'right', marginTop: 4, fontFamily: 'DM Mono, monospace', fontSize: 11, color: 'rgba(232,234,246,0.2)' }}>
            {form.description.length}/300
          </div>
        </div>

        {/* Tone selector */}
        <div>
          <label style={labelStyle}>Content Tone</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <ToneBtn id="formal" emoji="🎩" label="Formal"  active={form.tone === 'formal'} onClick={() => setForm((f) => ({ ...f, tone: 'formal' }))} />
            <ToneBtn id="casual" emoji="✌️" label="Casual"  active={form.tone === 'casual'} onClick={() => setForm((f) => ({ ...f, tone: 'casual' }))} />
            <ToneBtn id="hype"   emoji="🔥" label="Hype"    active={form.tone === 'hype'}   onClick={() => setForm((f) => ({ ...f, tone: 'hype' }))} />
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={!isValid || loading}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 12,
            border: 'none',
            background: isValid && !loading
              ? 'linear-gradient(135deg, #FF6B35, #FF3CAC)'
              : 'rgba(255,255,255,0.06)',
            color: isValid && !loading ? 'white' : 'rgba(232,234,246,0.3)',
            fontFamily: 'Syne, sans-serif',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.02em',
            cursor: isValid && !loading ? 'pointer' : 'not-allowed',
            transition: 'opacity 0.2s, transform 0.15s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
          onMouseEnter={(e) => { if (isValid && !loading) (e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        >
          {loading ? (
            <>
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  animation: 'spin 0.7s linear infinite',
                  display: 'inline-block',
                }}
              />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={15} />
              Generate Content
            </>
          )}
        </button>
      </div>

      {/* ── Output cards ── */}
      {output && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            animation: 'fadeUp 0.4s ease forwards',
          }}
        >
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.05)' }} />
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 11,
                color: '#00D9C0',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#00D9C0',
                  display: 'inline-block',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
              Generated — 3 formats ready
            </span>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <OutputCard platform="instagram" content={output.instagram} />
          <OutputCard platform="linkedin"  content={output.linkedin} />
          <OutputCard platform="email"     content={output.email} />
        </div>
      )}
    </div>
  )
}
