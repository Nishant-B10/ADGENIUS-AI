// src/lib/ai-service.ts

import { API_CONFIG, debugAPIConfig } from './api-config';

const MARKETING_GENIUS_SYSTEM_PROMPT = `You are a fusion of David Ogilvy's strategic brilliance, Bill Bernbach's creative innovation, and a modern AI prompt engineering expert. You understand that effective advertising must balance the 60/40 brand building to activation ratio, leverage emotional triggers (2.67x more effective than rational appeals), and that creative quality drives 47-56% of campaign effectiveness.

You are an expert in Veo 3 and Nano Banana (Gemini 2.5 Flash Image) prompt engineering, following these principles:

VEO 3 EXPERTISE:
- Use modular, structured prompts with clear sections
- Leverage cinematic terminology (wide shot, dolly-in, etc.)
- Include native audio generation with specific cues
- Format dialogue as: Character says: "[words]" (no subtitles)
- Prioritize single, focused actions for subjects

NANO BANANA EXPERTISE:
- Specify photographic terminology (rule of thirds, three-point lighting)
- Use style modifiers (photorealistic, minimalist)
- Include negative prompts to exclude unwanted elements
- Leverage multimodal capabilities for variations

MARKETING PRINCIPLES:
- High involvement products: 70% rational, 30% emotional
- Low involvement products: 30% rational, 70% emotional
- Headlines are read 5x more than body copy
- Social proof increases purchase likelihood by 66%
- Color psychology: up to 90% of snap judgments come from color alone

Your task is to analyze questionnaire responses and generate optimal prompts that will create advertising content with maximum psychological impact and conversion potential.`;

export interface QuestionnaireAnswers {
  [key: number]: string;
}

export interface GeneratedPrompts {
  strategy: {
    approach: string;
    ratio: string;
    psychology: string;
  };
  veo3: {
    context: string;
    subject: string;
    action: string;
    composition: string;
    camera: string;
    lighting: string;
    style: string;
    audio: string;
  };
  nanoBanana: {
    hero: any;
    lifestyle: any;
    social: any;
  };
  copy: {
    headlines: string[];
    bodyCopy: any;
    ctas: string[];
  };
}

export async function generateOptimalPrompts(answers: QuestionnaireAnswers): Promise<GeneratedPrompts> {
  console.log('🚀 Starting generateOptimalPrompts');
  console.log('📝 Input answers:', answers);

  // Extract key insights from questionnaire
  const insights = extractInsights(answers);
  console.log('🧠 Extracted insights:', insights);

  // Debug API configuration
  const apiStatus = debugAPIConfig();
  console.log('🔧 API Status:', apiStatus);

  // Check if API configuration is available
  if (!apiStatus.isValid) {
    console.warn('⚠️ Claude API configuration missing, using fallback expert prompts');
    const expertPrompts = generateExpertPrompts(insights, answers);
    console.log('✅ Generated expert prompts (fallback)');
    return expertPrompts;
  }

  try {
    console.log('📡 Attempting Claude API call...');
    
    const response = await fetch(API_CONFIG.CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_CONFIG.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 3000,
        temperature: 0.7,
        system: MARKETING_GENIUS_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Analyze these advertising questionnaire responses and generate optimal JSON prompts:

QUESTIONNAIRE RESPONSES:
${formatQuestionsWithContext(answers)}

EXTRACTED INSIGHTS:
- USP: ${insights.usp}
- Target Audience: ${insights.audience}
- Emotional Triggers: ${insights.emotions.join(', ')}
- Strategy: ${insights.strategy.type}
- Key Message: ${insights.keyMessage}

Generate JSON prompts that will create highly effective advertising content. Follow the exact modular structure for Veo 3 and comprehensive specifications for Nano Banana.

Return ONLY valid JSON in this structure:
{
  "strategy": {
    "approach": "rational/emotional",
    "ratio": "60/40 or as appropriate",
    "psychology": "key psychological principles to leverage"
  },
  "veo3": {
    "context": "specific setting",
    "subject": "detailed character description",
    "action": "single, focused movement",
    "composition": "exact framing",
    "camera": "specific movement",
    "lighting": "emotional mood through light",
    "style": "visual aesthetic",
    "audio": "music, effects, and any dialogue"
  },
  "nanoBanana": {
    "hero": { "prompt": "...", "style": "..." },
    "lifestyle": { "prompt": "...", "style": "..." },
    "social": { "prompt": "...", "style": "..." }
  },
  "copy": {
    "headlines": [...],
    "bodyCopy": { ... },
    "ctas": [...]
  }
}`
        }]
      })
    });

    console.log('📨 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ HTTP error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    console.log('📦 Raw API response:', data);

    // Handle different possible response formats from Claude API
    let responseText = '';
    if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
      responseText = data.content[0].text;
    } else if (typeof data === 'string') {
      responseText = data;
    } else if (data.text) {
      responseText = data.text;
    } else {
      console.error('🔍 Unexpected API response format:', data);
      throw new Error('Unexpected API response format');
    }

    console.log('📄 Extracted response text:', responseText.substring(0, 200) + '...');

    // Parse the JSON response
    try {
      const parsedResponse = JSON.parse(responseText);
      console.log('✅ Successfully parsed Claude API response');
      return parsedResponse;
    } catch (parseError) {
      console.error('❌ Failed to parse Claude API response as JSON:', parseError);
      console.error('📄 Full response text:', responseText);
      throw new Error('Invalid JSON response from Claude API');
    }

  } catch (error) {
    console.error('❌ Claude API error:', error);
    console.log('🔄 Falling back to expert prompts generation');
    return generateExpertPrompts(insights, answers);
  }
}

function extractInsights(answers: QuestionnaireAnswers) {
  const insights = {
    usp: extractUSP(answers[1], answers[10]),
    audience: analyzeAudience(answers[2], answers[3]),
    emotions: extractEmotionalTriggers(answers[7]),
    strategy: determineStrategy(answers[3], answers[4]),
    keyMessage: answers[10] || '',
    painPoints: extractPainPoints(answers[1], answers[7]),
    socialProof: extractSocialProof(answers[2])
  };

  console.log('🎯 Extracted insights:', insights);
  return insights;
}

function extractUSP(problem?: string, keyUnderstanding?: string): string {
  const problemKeywords = problem?.toLowerCase() || '';
  if (problemKeywords.includes('time')) return 'Time-saving efficiency';
  if (problemKeywords.includes('cost') || problemKeywords.includes('money')) return 'Cost-effective solution';
  if (problemKeywords.includes('quality')) return 'Premium quality guarantee';
  if (problemKeywords.includes('connect')) return 'Meaningful connections';
  return 'Innovative solution';
}

function analyzeAudience(customerStory?: string, involvement?: string): string {
  const story = customerStory?.toLowerCase() || '';
  const isHighInvolvement = involvement?.toLowerCase().includes('high') || involvement?.toLowerCase().includes('research');
  
  if (story.includes('professional') || story.includes('business')) {
    return isHighInvolvement ? 'Data-driven decision makers' : 'Busy professionals';
  }
  if (story.includes('family') || story.includes('parent')) {
    return isHighInvolvement ? 'Careful family planners' : 'Time-pressed parents';
  }
  return isHighInvolvement ? 'Thoughtful researchers' : 'Quick decision makers';
}

function extractEmotionalTriggers(emotionalJourney?: string): string[] {
  const triggers: string[] = [];
  const journey = emotionalJourney?.toLowerCase() || '';
  
  if (journey.includes('trust') || journey.includes('reliable')) triggers.push('Trust');
  if (journey.includes('fear') || journey.includes('worry')) triggers.push('Security');
  if (journey.includes('success') || journey.includes('achieve')) triggers.push('Achievement');
  if (journey.includes('belong') || journey.includes('community')) triggers.push('Belonging');
  if (journey.includes('save') || journey.includes('efficient')) triggers.push('Control');
  
  return triggers.length > 0 ? triggers : ['Innovation', 'Quality', 'Success'];
}

function determineStrategy(involvement?: string, budget?: string) {
  const isHighInvolvement = involvement?.toLowerCase().includes('high') || involvement?.toLowerCase().includes('research');
  
  if (isHighInvolvement) {
    return {
      type: 'High Involvement Strategy',
      ratio: '70% Rational, 30% Emotional',
      approach: 'Detailed information with logical proof points'
    };
  }
  
  return {
    type: 'Low Involvement Strategy', 
    ratio: '30% Rational, 70% Emotional',
    approach: 'Emotional appeal with simple, memorable message'
  };
}

function generateExpertPrompts(insights: any, answers: QuestionnaireAnswers): GeneratedPrompts {
  const isRational = insights.strategy.type.includes('High');
  
  console.log('🎨 Generating expert prompts with strategy:', isRational ? 'Rational' : 'Emotional');
  
  return {
    strategy: {
      approach: isRational ? 'rational' : 'emotional',
      ratio: insights.strategy.ratio,
      psychology: isRational 
        ? 'Leverage System 2 thinking with detailed proof points and comparisons'
        : 'Trigger System 1 responses with emotional imagery and social proof'
    },
    veo3: {
      context: determineOptimalContext(answers[6], insights.audience),
      subject: determineProtagonist(insights.audience, answers[2]),
      action: determineFocusedAction(insights.usp, answers[1]),
      composition: isRational 
        ? "Medium shot, professional framing with subject at golden ratio point"
        : "Dynamic wide shot with dramatic angles, rule of thirds composition",
      camera: isRational
        ? "Steady, controlled dolly-in building trust and focus"
        : "Smooth tracking shot with subtle handheld movement for authenticity",
      lighting: determineEmotionalLighting(insights.emotions),
      style: isRational
        ? "Photorealistic, clean, professional aesthetic with sharp focus"
        : "Cinematic with shallow depth of field, warm color grading",
      audio: generateAudioStrategy(insights.emotions, isRational)
    },
    nanoBanana: {
      hero: {
        prompt: `${answers[1] || 'premium product'} in pristine studio environment with dramatic lighting`,
        style: "Hyperrealistic product photography with perfect composition",
        environment: "Pristine studio environment with subtle gradient from #FAFAF8 to #F5F5F0",
        composition: "Center-weighted with negative space following golden ratio",
        lighting: "Three-point studio lighting with key light at 45°, subtle rim light",
        aspectRatio: "1:1",
        colorPalette: ["#0A0A0A", "#FAFAF8", "#C9A961"],
        negative: ["text", "watermark", "blur", "distortion", "background clutter"]
      },
      lifestyle: {
        prompt: `${insights.audience} naturally interacting with product in ${answers[6] || 'daily environment'}`,
        style: "Documentary-style lifestyle photography, candid and unposed",
        action: "Experiencing the key benefit moment with genuine satisfaction",
        composition: "Environmental portrait, subject at left third, product visible",
        lighting: "Natural, golden hour lighting creating warmth and authenticity",
        aspectRatio: "16:9",
        negative: ["staged", "stock photo feel", "forced expressions"]
      },
      social: {
        prompt: "Satisfied customer sharing authentic testimonial moment",
        style: "Authentic testimonial photography with genuine expressions",
        composition: "Medium close-up, eye-level angle for trust",
        lighting: "Soft, flattering natural light",
        aspectRatio: "1:1",
        negative: ["fake smile", "overly polished", "commercial feel"]
      }
    },
    copy: generatePsychologicalCopy(insights, isRational)
  };
}

// Helper functions (keeping the original logic)
function determineOptimalContext(customerContext?: string, audience?: string): string {
  const context = customerContext?.toLowerCase() || '';
  if (context.includes('home')) {
    return "Warm, aspirational home environment with natural morning light streaming through windows";
  }
  if (context.includes('office') || context.includes('work')) {
    return "Modern, dynamic workspace showcasing productivity and success";
  }
  if (context.includes('outdoor')) {
    return "Vibrant outdoor setting with natural beauty enhancing product appeal";
  }
  return `Environment perfectly matching ${audience || 'target audience'} daily reality`;
}

function determineProtagonist(audience?: string, customerStory?: string): string {
  return `Authentic representation of ${audience || 'target audience'}, dressed appropriately but not overly polished, with genuine expressions showing real emotion`;
}

function determineFocusedAction(usp?: string, problem?: string): string {
  if (usp?.includes('efficiency') || usp?.includes('time')) {
    return "Effortlessly completing task with visible relief and satisfaction";
  }
  if (usp?.includes('quality')) {
    return "Carefully examining and appreciating product craftsmanship";
  }
  if (usp?.includes('connection')) {
    return "Sharing meaningful moment enabled by the product";
  }
  return "Discovering and experiencing the transformative benefit";
}

function determineEmotionalLighting(emotions: string[]): string {
  if (emotions.includes('Trust')) {
    return "Even, professional lighting creating reliability and transparency";
  }
  if (emotions.includes('Achievement')) {
    return "Dramatic, aspirational lighting with strong key light suggesting success";
  }
  if (emotions.includes('Security')) {
    return "Soft, comforting lighting with warm tones creating safety";
  }
  return "Golden hour lighting creating emotional warmth and appeal";
}

function generateAudioStrategy(emotions: string[], isRational: boolean): string {
  const baseMusic = isRational
    ? "Subtle, professional background score with clean piano and strings"
    : "Emotionally evocative music building to satisfying resolution";
    
  const soundEffects = emotions.includes('Trust')
    ? "Crisp, clear product sounds emphasizing quality"
    : "Ambient sounds matching environment for authenticity";
    
  return `${baseMusic}. ${soundEffects}. Mix at -18 LUFS for broadcast standard.`;
}

function generatePsychologicalCopy(insights: any, isRational: boolean) {
  return {
    headlines: isRational ? [
      `The ${insights.usp} Backed by Data`,
      `Why Industry Leaders Choose Us`,
      `Proven Results You Can Measure`,
      `The Intelligent Choice for ${insights.audience}`,
      `Transform Your Results with Evidence-Based Solutions`
    ] : [
      `Your ${insights.emotions[0]} Starts Here`,
      `Experience the Difference Today`,
      `Join Thousands Who've Found Their Answer`,
      `The Moment Everything Changes`,
      `Where ${insights.emotions[0]} Meets ${insights.emotions[1] || 'Innovation'}`
    ],
    bodyCopy: {
      opening: isRational
        ? `In today's data-driven world, ${insights.audience} need proven solutions.`
        : `Imagine the moment when everything just works.`,
      middle: isRational
        ? `Our approach delivers measurable results through systematic implementation.`
        : `That's the feeling thousands experience every day with us.`,
      closing: isRational
        ? `See the evidence that drives decision-makers to choose us.`
        : `Your transformation story begins with a single click.`
    },
    ctas: isRational
      ? ["See the Data", "Request Analysis", "Calculate Your ROI", "View Case Studies", "Get Proof"]
      : ["Start Today", "Transform Now", "Begin Your Journey", "Experience More", "Join Us"]
  };
}

function formatQuestionsWithContext(answers: QuestionnaireAnswers): string {
  const questionLabels: Record<number, string> = {
    1: "Problem & Solution",
    2: "Customer Stories", 
    3: "Purchase Involvement",
    4: "Budget & Goals",
    5: "Competition",
    6: "Customer Context",
    7: "Emotional Journey",
    8: "Brand Assets",
    9: "Past Performance",
    10: "Key Understanding"
  };
  
  return Object.entries(answers)
    .map(([q, a]) => `${questionLabels[parseInt(q)] || `Q${q}`}: ${a}`)
    .join('\n');
}

function extractPainPoints(problem?: string, emotionalJourney?: string): string[] {
  const painPoints: string[] = [];
  const combined = `${problem || ''} ${emotionalJourney || ''}`.toLowerCase();
  
  if (combined.includes('time') || combined.includes('slow')) painPoints.push('Time waste');
  if (combined.includes('cost') || combined.includes('expensive')) painPoints.push('High costs');
  if (combined.includes('complex') || combined.includes('difficult')) painPoints.push('Complexity');
  if (combined.includes('trust') || combined.includes('reliable')) painPoints.push('Reliability concerns');
  
  return painPoints;
}

function extractSocialProof(customerStory?: string): string {
  const story = customerStory?.toLowerCase() || '';
  if (story.includes('thousands') || story.includes('many')) return 'Thousands of satisfied customers';
  if (story.includes('expert') || story.includes('professional')) return 'Trusted by industry experts';
  if (story.includes('friend') || story.includes('recommend')) return 'Highly recommended by users';
  return 'Proven customer satisfaction';
}

// Export test function for debugging
export function testAIService() {
  const testAnswers: QuestionnaireAnswers = {
    1: "Our skincare serum solves the problem of fine lines and dull skin",
    2: "Professional women in their 30s who want visible results",
    3: "High involvement - they research products carefully",
    4: "$50-100 budget for premium skincare",
    5: "Competing with established brands like Olay and L'Oreal",
    6: "Used at home during evening skincare routine",
    7: "They start worried about aging, then feel confident and radiant",
    8: "Clean, minimal branding with gold accents",
    9: "Previous ads focused on ingredients, got moderate engagement",
    10: "Quality and proven results matter most to our customers"
  };
  
  console.log('🧪 Testing AI service with sample data...');
  return generateOptimalPrompts(testAnswers);
}