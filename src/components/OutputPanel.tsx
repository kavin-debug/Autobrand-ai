import React, { useState, useEffect } from 'react'
import { Copy, Check, Instagram, Linkedin, Mail, ChevronRight } from 'lucide-react'
import { GeneratedContent, TabId } from '../types'
import { LoadingSkeleton } from './LoadingSkeleton'

interface OutputPanelProps {
  content: GeneratedContent | null
  isLoading: boolean
}

const TABS: { id: TabId; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <Instagram size={14} />,
    color: '#E1306C',
    bg: 'rgba(225, 48, 108, 0.12)',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: <Linkedin size={14} />,
    color: '#0A66C2',
    bg: 'rgba(10, 102, 194, 0.12)',
  },
  {
    id: 'email',
    label: 'Email',
    icon: <Mail size={14} />,
    color: '#00D9C0',
    bg: 'rgba(0, 217, 192, 0.12)',
  },
]

const PLATFORM_LABELS: Record<TabId, { name: string; stat: string }> = {
  instagram: { name: 'Instagram Caption', stat: '~2.4B users' },
  linkedin: { name: 'LinkedIn Post', stat: '~1B professionals' },
  email: { name: 'Email Campaign', stat: 'Est. ~3.9% CTR' },
}

const EMPTY_STATE = (
  <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: 'rgba(255, 107, 53, 0.06)',
        border: '1px dashed rgba(255, 107, 53, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ChevronRight size={24} color="rgba(255,107,53,0.4)" />
    </div>
    <div className="text-center">
      <p
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 15,
          fontWeight: 700,
          color: 'rgba(232,234,246,0.5)',
          marginBottom: 6,
        }}
      >
        Your content will appear here
      </p>
      <p style={{ fontSize: 12, color: 'rgba(232,234,246,0.25)', fontFamily: 'Outfit, sans-serif' }}>
        Fill in the form on the left and click Generate
      </p>
    </div>

    {/* Decorative preview boxes */}
    <div className="flex flex-col gap-2 w-full max-w-xs mt-4">
      {[100, 80, 90].map((w, i) => (
        <div
          key={i}
          style={{
            height: 10,
            width: `${w}%`,
            borderRadius: 5,
            background: 'rgba(255,255,255,0.04)',
          }}
        />
      ))}
    </div>
  </div>
)

export const OutputPanel: React.FC<OutputPanelProps> = ({ content, isLoading }) => {
  const [activeTab, setActiveTab] = useState<TabId>('instagram')
  const [copied, setCopied] = useState<TabId | null>(null)
  const [animKey, setAnimKey] = useState(0)

  // Re-animate when content changes
  useEffect(() => {
    if (content) setAnimKey((k) => k + 1)
  }, [content])

  const handleCopy = async (tab: TabId) => {
    if (!content) return
    await navigator.clipboard.writeText(content[tab])
    setCopied(tab)
    setTimeout(() => setCopied(null), 2000)
  }

  const activeTabData = TABS.find((t) => t.id === activeTab)!

  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col gap-5">
      {/* Panel Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00D9C0, #4FA8FF)' }}
          >
            <Mail size={14} color="white" />
          </div>
          <div>
            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 14,
                color: 'white',
              }}
            >
              Generated Content
            </h2>
            <p style={{ fontSize: 11, color: 'rgba(232,234,246,0.35)', fontFamily: 'Outfit, sans-serif' }}>
              3 platform-optimized formats
            </p>
          </div>
        </div>

        {content && (
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 11,
                color: '#00D9C0',
              }}
            >
              Ready
            </span>
          </div>
        )}
      </div>

      <div className="divider" />

      {isLoading ? (
        <LoadingSkeleton />
      ) : !content ? (
        EMPTY_STATE
      ) : (
        <div key={animKey} className="flex flex-col gap-4 flex-1 content-appear">
          {/* Tabs */}
          <div
            className="flex gap-1 p-1 rounded-xl"
            style={{ background: 'rgba(6, 8, 16, 0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn flex-1 flex items-center justify-center gap-2`}
                style={
                  activeTab === tab.id
                    ? {
                        background: tab.bg,
                        borderColor: `${tab.color}50`,
                        color: tab.color,
                      }
                    : {}
                }
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active content */}
          <div className="flex flex-col gap-4 flex-1" style={{ animation: 'tabIn 0.3s ease forwards' }}>
            {/* Meta row */}
            <div className="flex items-center justify-between">
              <div
                className="platform-badge"
                style={{
                  background: activeTabData.bg,
                  border: `1px solid ${activeTabData.color}30`,
                  color: activeTabData.color,
                }}
              >
                {activeTabData.icon}
                {PLATFORM_LABELS[activeTab].name}
              </div>

              <div className="flex items-center gap-3">
                <span
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 10,
                    color: 'rgba(232,234,246,0.25)',
                  }}
                >
                  {PLATFORM_LABELS[activeTab].stat}
                </span>
                <button
                  className={`copy-btn ${copied === activeTab ? 'copied' : ''}`}
                  onClick={() => handleCopy(activeTab)}
                >
                  {copied === activeTab ? (
                    <>
                      <Check size={11} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Content box */}
            <div
              className="flex-1 rounded-xl p-4"
              style={{
                background: 'rgba(6, 8, 16, 0.7)',
                border: '1px solid rgba(255,255,255,0.05)',
                minHeight: 180,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle accent bar on left */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 12,
                  bottom: 12,
                  width: 3,
                  borderRadius: '0 2px 2px 0',
                  background: `linear-gradient(180deg, ${activeTabData.color}, transparent)`,
                  opacity: 0.6,
                }}
              />
              <pre
                className="output-text"
                style={{ paddingLeft: 12 }}
              >
                {content[activeTab]}
              </pre>
            </div>

            {/* Word count */}
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 11, color: 'rgba(232,234,246,0.2)', fontFamily: 'DM Mono, monospace' }}>
                {content[activeTab].split(/\s+/).filter(Boolean).length} words ·{' '}
                {content[activeTab].length} chars
              </span>

              {/* All-copy button */}
              <button
                className="flex items-center gap-2"
                style={{
                  fontSize: 11,
                  color: 'rgba(255,107,53,0.5)',
                  fontFamily: 'Outfit, sans-serif',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.target as HTMLElement).style.color = '#FF6B35'
                }}
                onMouseLeave={(e) => {
                  ;(e.target as HTMLElement).style.color = 'rgba(255,107,53,0.5)'
                }}
                onClick={async () => {
                  const all = `=== INSTAGRAM ===\n${content.instagram}\n\n=== LINKEDIN ===\n${content.linkedin}\n\n=== EMAIL ===\n${content.email}`
                  await navigator.clipboard.writeText(all)
                }}
              >
                <Copy size={11} />
                Copy all formats
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
