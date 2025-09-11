interface VeoPromptJSON {
  context: string
  subject: string
  action: string
  composition: string
  camera: string
  lighting: string
  style: string
  audio: string
  duration?: number
  aspectRatio?: string
}

interface NanoBananaPromptJSON {
  subject: string
  action?: string
  environment: string
  composition: string
  lighting: string
  style: string
  aspectRatio: string
  colorPalette?: string[]
  negative?: string[]
}

export const generateVeoJSON = (answers: any, briefData: any): VeoPromptJSON => {
  const involvement = answers[3]?.toLowerCase() || ''
  const isHighInvolvement = involvement.includes('high') || involvement.includes('research')
  const emotions = answers[7]?.toLowerCase() || ''
  const context = answers[6] || ''
  const product = answers[1] || ''
  const customerStory = answers[2] || ''
  
  // Determine context based on Question 6
  let sceneContext = "A modern, professional environment"
  if (context.includes('home')) {
    sceneContext = "A warm, inviting home setting with natural light"
  } else if (context.includes('office') || context.includes('work')) {
    sceneContext = "A sleek, modern office space with clean lines"
  } else if (context.includes('outdoor')) {
    sceneContext = "An outdoor setting with natural beauty"
  }
  
  // Determine subject based on target audience
  let subject = "A professional individual"
  if (customerStory.includes('family')) {
    subject = "A happy family enjoying time together"
  } else if (customerStory.includes('young')) {
    subject = "A energetic young professional"
  } else if (customerStory.includes('senior') || customerStory.includes('older')) {
    subject = "A wise, experienced individual"
  }
  
  // Determine action based on product benefit
  let action = "using the product with satisfaction"
  if (product.includes('save time')) {
    action = "efficiently completing a task with a smile of relief"
  } else if (product.includes('connect')) {
    action = "engaging meaningfully with others"
  } else if (product.includes('health')) {
    action = "enjoying an active, healthy moment"
  }
  
  // Emotional-based audio
  let audioCue = "Uplifting instrumental music with a modern feel"
  if (emotions.includes('trust')) {
    audioCue = "Calm, reassuring background music with soft piano"
  } else if (emotions.includes('excitement')) {
    audioCue = "Energetic, upbeat music with driving rhythm"
  } else if (emotions.includes('peace')) {
    audioCue = "Peaceful ambient sounds with gentle melody"
  }
  
  return {
    context: sceneContext,
    subject: subject,
    action: action,
    composition: isHighInvolvement 
      ? "Medium shot with professional framing, subject centered"
      : "Dynamic wide shot with rule of thirds composition",
    camera: isHighInvolvement
      ? "Steady camera with slow, deliberate dolly-in"
      : "Smooth tracking shot following the action",
    lighting: isHighInvolvement
      ? "Even, professional lighting with soft shadows"
      : "Warm, golden hour lighting with natural feel",
    style: isHighInvolvement
      ? "Photorealistic, clean, professional aesthetic"
      : "Cinematic, vibrant with shallow depth of field",
    audio: audioCue,
    duration: 15,
    aspectRatio: "16:9"
  }
}

export const generateNanoBananaJSON = (answers: any, briefData: any) => {
  const product = answers[1] || 'the product'
  const context = answers[6] || 'professional setting'
  const brand = answers[8] || ''
  const competitors = answers[5] || ''
  
  const heroShot: NanoBananaPromptJSON = {
    subject: product,
    environment: "Clean, minimalist studio background with subtle gradient",
    composition: "Center-weighted composition with negative space",
    lighting: "Three-point studio lighting with soft shadows",
    style: "Photorealistic, high-resolution product photography",
    aspectRatio: "1:1",
    colorPalette: ["#FFFFFF", "#F5F5F0", "#C9A961"],
    negative: ["text", "watermark", "blur", "distortion"]
  }
  
  const lifestyleShot: NanoBananaPromptJSON = {
    subject: `Person naturally using ${product}`,
    action: "Engaging with product in authentic way",
    environment: context,
    composition: "Rule of thirds, environmental portrait",
    lighting: "Natural, ambient lighting",
    style: "Lifestyle photography, candid and authentic",
    aspectRatio: "16:9",
    negative: ["staged", "artificial", "stock photo feel"]
  }
  
  const comparisonShot: NanoBananaPromptJSON = {
    subject: `${product} showcasing key advantages`,
    environment: "Clean comparison layout with clear visual hierarchy",
    composition: "Split-screen or side-by-side arrangement",
    lighting: "Even, neutral lighting for fair comparison",
    style: "Infographic style with clean design",
    aspectRatio: "16:9",
    colorPalette: ["#0A0A0A", "#FAFAF8", "#C9A961"],
    negative: ["biased", "unfair", "misleading"]
  }
  
  return {
    hero: heroShot,
    lifestyle: lifestyleShot,
    comparison: comparisonShot
  }
}

export const formatPromptAsJSON = (promptData: any): string => {
  return JSON.stringify(promptData, null, 2)
}

export const createCompleteAdPackage = (answers: any, briefData: any) => {
  const veoPrompt = generateVeoJSON(answers, briefData)
  const imagePrompts = generateNanoBananaJSON(answers, briefData)
  
  return {
    campaign: {
      created: new Date().toISOString(),
      strategy: briefData.strategy,
      targetAudience: briefData.audience,
      usp: briefData.usp
    },
    video: {
      platform: "veo3",
      prompt: veoPrompt
    },
    images: {
      platform: "nano_banana",
      prompts: imagePrompts
    },
    copy: {
      headlines: generateHeadlineJSON(briefData),
      cta: generateCTAJSON(briefData)
    }
  }
}

const generateHeadlineJSON = (briefData: any) => {
  const isRational = briefData.strategy?.type?.includes('High')
  
  if (isRational) {
    return [
      { text: "Proven Results You Can Measure", weight: 1.0 },
      { text: "The Data-Driven Choice", weight: 0.9 },
      { text: "Trusted by Industry Leaders", weight: 0.85 }
    ]
  }
  
  return [
    { text: "Transform Your Tomorrow", weight: 1.0 },
    { text: "Where Dreams Become Reality", weight: 0.9 },
    { text: "Your Journey Starts Here", weight: 0.85 }
  ]
}

const generateCTAJSON = (briefData: any) => {
  const isRational = briefData.strategy?.type?.includes('High')
  
  if (isRational) {
    return [
      { text: "See the Data", action: "learn_more" },
      { text: "Get Your Analysis", action: "conversion" },
      { text: "Calculate ROI", action: "tool" }
    ]
  }
  
  return [
    { text: "Start Your Journey", action: "conversion" },
    { text: "Join Us Today", action: "signup" },
    { text: "Discover More", action: "learn_more" }
  ]
}