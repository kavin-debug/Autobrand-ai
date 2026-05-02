export type Tone = 'formal' | 'casual' | 'hype'

export interface FormData {
  productName: string
  description: string
  targetAudience: string
  tone: Tone
}

export interface GeneratedContent {
  instagram: string
  linkedin: string
  email: string
}

export type TabId = 'instagram' | 'linkedin' | 'email'
