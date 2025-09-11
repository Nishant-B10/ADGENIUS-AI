import { generateVeoJSON, generateNanoBananaJSON, formatPromptAsJSON } from './JSONPromptGenerator'

export const generateVeoPromptJSON = (answers: any, briefData: any) => {
  const jsonPrompt = generateVeoJSON(answers, briefData)
  return formatPromptAsJSON(jsonPrompt)
}

export const generateNanoBananaPromptJSON = (answers: any, briefData: any) => {
  const jsonPrompts = generateNanoBananaJSON(answers, briefData)
  return {
    hero: formatPromptAsJSON(jsonPrompts.hero),
    lifestyle: formatPromptAsJSON(jsonPrompts.lifestyle),
    comparison: formatPromptAsJSON(jsonPrompts.comparison)
  }
}

export const generateVeoPrompt = (answers: any, briefData: any) => {
  // Extract key information from questionnaire
  const product = answers[1] || ''
  const customerStory = answers[2] || ''
  const involvement = answers[3]?.toLowerCase() || ''
  const emotions = answers[7] || ''
  const brand = answers[8] || ''
  
  // Determine style based on involvement level
  const isHighInvolvement = involvement.includes('high') || involvement.includes('research')
  
  const veoPrompt = {
    context: extractContext(answers),
    subject: extractSubject(answers),
    action: determineAction(answers, briefData),
    composition: isHighInvolvement ? 'Medium shot, professional framing' : 'Dynamic wide shot',
    camera: isHighInvolvement ? 'Steady, slow dolly-in' : 'Smooth tracking shot',
    lighting: extractLighting(emotions),
    style: isHighInvolvement ? 'Photorealistic, professional' : 'Cinematic, vibrant',
    audio: generateAudioCue(answers, briefData)
  }
  
  return formatVeoPrompt(veoPrompt)
}

const extractContext = (answers: any) => {
  // Question 6: Where are customers?
  const context = answers[6] || ''
  if (context.includes('office') || context.includes('work')) {
    return 'A modern, professional office environment during business hours'
  }
  if (context.includes('home')) {
    return 'A warm, comfortable home setting with natural lighting'
  }
  return 'A bright, welcoming environment with soft ambient lighting'
}

const extractSubject = (answers: any) => {
  // Question 2: Customer stories
  const story = answers[2] || ''
  if (story.includes('professional') || story.includes('business')) {
    return 'A confident professional in smart casual attire'
  }
  if (story.includes('family') || story.includes('parent')) {
    return 'A caring parent in comfortable, everyday clothing'
  }
  return 'A relatable person with a genuine, warm expression'
}

const determineAction = (answers: any, briefData: any) => {
  const problem = answers[1] || ''
  if (problem.includes('save time')) {
    return 'confidently completing a task with ease and satisfaction'
  }
  if (problem.includes('quality')) {
    return 'carefully examining and appreciating the product'
  }
  return 'discovering and experiencing the product benefits'
}

const extractLighting = (emotions: string) => {
  if (emotions.includes('trust') || emotions.includes('reliable')) {
    return 'Soft, even lighting creating a trustworthy atmosphere'
  }
  if (emotions.includes('excitement') || emotions.includes('energy')) {
    return 'Bright, dynamic lighting with warm tones'
  }
  return 'Natural, golden hour light creating warmth and appeal'
}

const generateAudioCue = (answers: any, briefData: any) => {
  const emotions = briefData.emotionalTriggers || []
  if (emotions.includes('Trust')) {
    return 'Calm, reassuring background music with subtle piano'
  }
  if (emotions.includes('Innovation')) {
    return 'Modern, upbeat electronic track with positive energy'
  }
  return 'Light orchestral score building to a satisfying resolution'
}

const formatVeoPrompt = (prompt: any) => {
  return `
**Context/Setting:** ${prompt.context}

**Subject & Description:** ${prompt.subject}

**Action/Movement:** ${prompt.action}

**Composition/Framing:** ${prompt.composition}

**Camera Parameters:** ${prompt.camera}

**Lighting & Ambiance:** ${prompt.lighting}

**Style/Aesthetic:** ${prompt.style}

**Audio Cue:** ${prompt.audio}
  `.trim()
}

export const generateNanoBananaPrompt = (answers: any, briefData: any) => {
  const product = answers[1] || ''
  const brand = answers[8] || ''
  const emotions = answers[7] || ''
  
  return {
    hero: generateHeroImagePrompt(product, brand),
    lifestyle: generateLifestylePrompt(answers, briefData),
    comparison: generateComparisonPrompt(answers),
    testimonial: generateTestimonialPrompt(answers[2])
  }
}

const generateHeroImagePrompt = (product: string, brand: string) => {
  return `A high-resolution, studio-lit product photograph of ${product || 'the product'}. The product is positioned at a slight 45-degree angle on a clean, minimalist surface. Soft, three-point lighting creates subtle shadows and highlights. The composition uses negative space effectively, with the product占据 the lower two-thirds of the frame. Photorealistic style with sharp focus and professional color grading. Background should be a subtle gradient from light gray to white.`
}

const generateLifestylePrompt = (answers: any, briefData: any) => {
  const context = answers[6] || ''
  const audience = briefData.audience || ''
  
  return `A lifestyle photograph showing ${audience || 'a person'} naturally using the product in ${context || 'their daily environment'}. The scene captures a genuine moment of satisfaction and ease. Natural lighting creates an authentic, documentary-style feel. The composition follows the rule of thirds, with the subject positioned off-center. Photorealistic style with warm color grading. The image should convey the emotional benefit of the product through body language and facial expression.`
}

const generateComparisonPrompt = (answers: any) => {
  const competitors = answers[5] || ''
  return `A clean, minimalist comparison image showing the product advantage. Split-screen or side-by-side composition with clear visual hierarchy. Even, neutral lighting to ensure fair comparison. The design should use subtle visual cues to highlight superiority without being aggressive. Professional, infographic-style aesthetic with clear labels and indicators.`
}

const generateTestimonialPrompt = (story: string) => {
  return `A portrait photograph of a satisfied customer in their natural environment. The subject has a genuine, warm expression conveying authentic satisfaction. Soft, flattering lighting creates an approachable, trustworthy feel. Medium shot with shallow depth of field to focus attention on the subject. The background should be softly blurred but relevant to their story. Photorealistic style with natural color grading.`
}