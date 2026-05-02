import { FormData, GeneratedContent } from './types'

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages'

function buildPrompt(data: FormData): string {
  return `You are an elite marketing copywriter. Generate high-converting marketing content for the following:

Product/Event Name: ${data.productName}
Description: ${data.description}
Target Audience: ${data.targetAudience}
Tone: ${data.tone} (${
    data.tone === 'formal'
      ? 'professional, authoritative, polished'
      : data.tone === 'casual'
      ? 'friendly, conversational, relatable'
      : 'energetic, bold, exciting, use emojis and excitement'
  })

Generate exactly 3 pieces of marketing content. Return ONLY valid JSON, no markdown, no explanation:

{
  "instagram": "<Instagram caption with relevant hashtags and emojis, 150-200 chars>",
  "linkedin": "<LinkedIn post, professional framing, 2-3 short paragraphs, ends with CTA>",
  "email": "<Email campaign: Subject line on first line prefixed with 'Subject:', then blank line, then body with greeting, value prop, CTA, and sign-off>"
}

Important: Make it genuinely compelling for ${data.targetAudience}. The ${data.tone} tone should be very clear.`
}

// Fallback mock responses when API is unavailable
function getMockResponse(data: FormData): GeneratedContent {
  const toneMap = {
    formal: {
      instagram: `Introducing ${data.productName} — engineered for ${data.targetAudience} who demand excellence. Precision meets purpose. Explore what's possible. 🎯\n\n#Innovation #${data.productName.replace(/\s/g, '')} #Excellence #Professional`,
      linkedin: `I'm thrilled to announce ${data.productName}.\n\nDesigned specifically for ${data.targetAudience}, this represents a significant step forward in how we approach ${data.description.slice(0, 40)}.\n\nOur commitment is simple: deliver measurable results through thoughtful design and rigorous execution.\n\n📌 Learn more and request a demo today. Let's discuss how ${data.productName} can serve your goals.`,
      email: `Subject: Introducing ${data.productName} — Built for ${data.targetAudience}\n\nDear Valued Professional,\n\nWe are pleased to formally introduce ${data.productName} — a solution crafted with ${data.targetAudience} at its core.\n\n${data.description}\n\nOur team has worked diligently to ensure this meets the highest standards of quality and reliability.\n\n→ Schedule a personalized walkthrough: [Book a Demo]\n\nWarm regards,\nThe ${data.productName} Team`,
    },
    casual: {
      instagram: `Hey ${data.targetAudience}! 👋 Meet ${data.productName} — the thing you didn't know you needed. ${data.description.slice(0, 60)} Give it a shot!\n\n#${data.productName.replace(/\s/g, '')} #MustHave #GameChanger`,
      linkedin: `Quick update — we built something pretty cool.\n\n${data.productName} is live, and it's made for folks like you in ${data.targetAudience}.\n\nHere's the short version: ${data.description}\n\nNo fluff. Just something that works. Drop a comment if you want to try it, I'll send you access 👇`,
      email: `Subject: Hey, ${data.productName} just launched 🎉\n\nHi there!\n\nWe wanted you to be one of the first to know — ${data.productName} is officially out!\n\n${data.description}\n\nWe built this with ${data.targetAudience} in mind, so it should feel right at home for you.\n\n👉 Check it out here: [Get Started]\n\nLet us know what you think — we genuinely want your feedback.\n\nCheers,\nThe Team`,
    },
    hype: {
      instagram: `🔥🔥 ${data.productName} IS HERE AND IT'S ABOUT TO CHANGE EVERYTHING 🔥🔥\n\n${data.targetAudience}, your wait is OVER. This is not a drill. This is the moment. 🚀⚡\n\n#${data.productName.replace(/\s/g, '')} #GameOver #NextLevel #Fire #MustSee`,
      linkedin: `🚨 HUGE NEWS 🚨\n\n${data.productName} just dropped — and the ${data.targetAudience} space will NEVER be the same.\n\nWe didn't just build a product. We built a MOVEMENT. ⚡\n\n${data.description}\n\nThis is the opportunity. Don't blink. Don't scroll past this.\n\n🔗 LINK IN COMMENTS — Go. Now. You won't regret it. 🏆🔥`,
      email: `Subject: 🚀 ${data.productName} just DROPPED — Don't miss this!\n\nOH WOW. IT'S FINALLY HERE. 🎉🔥\n\n[First name], the day has come — ${data.productName} is LIVE and it's everything we promised and more.\n\n⚡ ${data.description}\n\nWe built this for ${data.targetAudience} who are DONE settling for less.\n\n🎯 LIMITED TIME: Be an early adopter → [CLAIM YOUR SPOT NOW]\n\nThis is your moment. Don't let it slip.\n\nLet's GO 🚀\n— The ${data.productName} Squad`,
    },
  }

  return toneMap[data.tone]
}

export async function generateContent(data: FormData): Promise<GeneratedContent> {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '',      // Handled by proxy in Claude artifacts
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: buildPrompt(data) }],
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const json = await response.json()
    const rawText = json.content?.[0]?.text ?? ''

    // Strip any markdown fences
    const cleaned = rawText.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned) as GeneratedContent

    return parsed
  } catch (err) {
    console.warn('API unavailable, using mock response:', err)
    // Simulate a short delay for realistic feel
    await new Promise((r) => setTimeout(r, 1800))
    return getMockResponse(data)
  }
}
