import React, { useState } from 'react'
import { Sparkles, Zap, Target, Type, FileText, Users } from 'lucide-react'
import { FormData, Tone } from '../types'

interface InputPanelProps {
  onGenerate: (data: FormData) => void
  isLoading: boolean
}

const TONES: { id: Tone; label: string; emoji: string; desc: string }[] = [
  { id: 'formal', label: 'Formal', emoji: '🎩', desc: 'Professional & polished' },
  { id: 'casual', label: 'Casual', emoji: '✌️', desc: 'Friendly & real' },
  { id: 'hype', label: 'Hype', emoji: '🔥', desc: 'Bold & electric' },
]

export const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isLoading }) => {
  const [form, setForm] = useState<FormData>({
    productName: '',
    description: '',
    targetAudience: '',
    tone: 'casual',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.productName.trim() || !form.description.trim()) return
    onGenerate(form)
  }

  const isValid = form.productName.trim().length > 0 && form.description.trim().length > 0

  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col gap-5">
      {/* Panel Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)' }}
        >
          <Sparkles size={15} color="white" />
        </div>
        <div>
          <h2 className="font-display font-700 text-sm text-white" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            Brand Details
          </h2>
          <p style={{ fontSize: 11, color: 'rgba(232,234,246,0.35)', fontFamily: 'Outfit, sans-serif' }}>
            Fill in the fields to generate content
          </p>
        </div>
      </div>

      <div className="divider" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        {/* Product Name */}
        <div>
          <label className="field-label flex items-center gap-2">
            <Type size={10} />
            Product / Event Name
          </label>
          <input
            type="text"
            placeholder="e.g. LaunchPad Pro, TechFest 2025..."
            className="input-field"
            style={{ padding: '11px 14px', fontSize: 14 }}
            value={form.productName}
            onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
            maxLength={80}
          />
          <div className="flex justify-end mt-1">
            <span className="char-count">{form.productName.length}/80</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="field-label flex items-center gap-2">
            <FileText size={10} />
            Description
          </label>
          <textarea
            placeholder="What does it do? What makes it special? Key benefits..."
            className="input-field"
            style={{ padding: '11px 14px', fontSize: 14, resize: 'none', minHeight: 90 }}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            maxLength={300}
          />
          <div className="flex justify-end mt-1">
            <span className="char-count">{form.description.length}/300</span>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="field-label flex items-center gap-2">
            <Users size={10} />
            Target Audience
          </label>
          <input
            type="text"
            placeholder="e.g. startup founders, college students, developers..."
            className="input-field"
            style={{ padding: '11px 14px', fontSize: 14 }}
            value={form.targetAudience}
            onChange={(e) => setForm((f) => ({ ...f, targetAudience: e.target.value }))}
            maxLength={80}
          />
        </div>

        {/* Tone Selector */}
        <div>
          <label className="field-label flex items-center gap-2">
            <Zap size={10} />
            Content Tone
          </label>
          <div className="grid grid-cols-3 gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`tone-btn flex flex-col items-center gap-1 py-3`}
                style={
                  form.tone === t.id
                    ? {
                        background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,60,172,0.08))',
                        borderColor: 'rgba(255, 107, 53, 0.55)',
                        color: '#FF6B35',
                      }
                    : {}
                }
                onClick={() => setForm((f) => ({ ...f, tone: t.id }))}
              >
                <span style={{ fontSize: 18 }}>{t.emoji}</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 12 }}>{t.label}</span>
                <span style={{ fontSize: 10, opacity: 0.6 }}>{t.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          {/* Usage hint */}
          <div
            className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg"
            style={{
              background: 'rgba(0, 217, 192, 0.05)',
              border: '1px solid rgba(0, 217, 192, 0.12)',
            }}
          >
            <Target size={12} color="#00D9C0" />
            <span style={{ fontSize: 11, color: 'rgba(232,234,246,0.45)', fontFamily: 'Outfit, sans-serif' }}>
              AI will tailor all 3 formats to your inputs
            </span>
          </div>

          <button
            type="submit"
            className="generate-btn"
            disabled={!isValid || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="inline-block w-4 h-4 rounded-full border-2 border-white"
                  style={{ borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite' }}
                />
                Generating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={15} />
                Generate Content
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
