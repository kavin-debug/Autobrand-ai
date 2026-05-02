# 🚀 AutoBrand AI — Marketing Content Generator

> An AI-powered hackathon MVP that generates Instagram captions, LinkedIn posts, and email campaigns from a simple form.

---

## ✨ Features

- 🎯 **3 Platform Formats** — Instagram, LinkedIn, Email in one click
- 🤖 **AI-Powered** — Uses Claude (Anthropic) API; falls back to smart mock output
- 🎨 **Real-time Banner Preview** — Updates as you type
- 🔥 **Tone Selector** — Formal, Casual, or Hype
- 📋 **One-click Copy** — Per tab or copy all formats
- 💅 **Dark SaaS UI** — Glassmorphism, animated orbs, Syne + DM Mono fonts

---

## 🗂 Folder Structure

```
autobrand-ai/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.tsx          # Entry point
    ├── App.tsx           # Root layout, state management
    ├── index.css         # Global styles, animations
    ├── types.ts          # TypeScript types
    ├── aiService.ts      # Anthropic API + mock fallback
    └── components/
        ├── InputPanel.tsx      # Form: name, description, audience, tone
        ├── OutputPanel.tsx     # Tabbed output with copy buttons
        ├── BannerPreview.tsx   # Live visual banner simulation
        └── LoadingSkeleton.tsx # Animated loading state
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ and npm

### 1. Install dependencies

```bash
cd autobrand-ai
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
npm run preview
```

---

## 🤖 AI Configuration

The app calls the **Anthropic Claude API** (`claude-sonnet-4-20250514`).

- **In Claude.ai artifacts**: API key is handled automatically by the proxy
- **Local development**: If the API key is missing or unavailable, the app falls back to **realistic mock responses** automatically — no crashes, no broken demo
- **To use your own key**: Set `VITE_ANTHROPIC_API_KEY` env variable and update `aiService.ts` to use `import.meta.env.VITE_ANTHROPIC_API_KEY`

The mock fallback generates tone-specific content for all 3 platforms, so the demo works perfectly even without an API key.

---

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 + TypeScript | Core framework |
| Vite | Build tool |
| Tailwind CSS | Utility styling |
| Lucide React | Icon system |
| Syne + DM Mono fonts | Typography |
| Anthropic Claude API | AI generation |

---

## 🏆 Demo Tips (For Hackathon)

1. Pre-fill with a strong example: `"TechFest 2025"` / `"India's largest college hackathon with ₹5L prize pool"` / `"college students and startup founders"`
2. Switch between tones live — the banner preview and output both update
3. Use "Copy all formats" to paste everything at once
4. The banner preview is live — type and it updates in real time

---

Built for hackathons. Built to impress. — **@kavin-debug**
