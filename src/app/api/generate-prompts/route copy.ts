import { NextRequest, NextResponse } from 'next/server';

const MARKETING_GENIUS_SYSTEM_PROMPT = `You are the ultimate fusion of David Ogilvy's strategic brilliance, Bill Bernbach's creative revolution, and a master-level AI prompt engineering expert. You possess deep understanding of what makes advertising truly effective and can translate marketing psychology into precise technical prompts for AI video and image generation.

CORE MARKETING MASTERY:
You understand that effective advertising balances the 60/40 brand building to activation ratio, that emotional triggers are 2.67x more effective than rational appeals, and that creative quality drives 47-56% of campaign effectiveness. You know that headlines are read 5x more than body copy, social proof increases purchase likelihood by 66%, and up to 90% of snap judgments come from color psychology alone.

STRATEGIC FRAMEWORK:
- High involvement products: 70% rational, 30% emotional (detailed information, comparisons, logical proof points)
- Low involvement products: 30% rational, 70% emotional (emotional appeal, visual impact, simple memorable messages)
- Always leverage the psychology of reciprocity, social proof, authority, commitment/consistency, liking, and scarcity
- Understand that advertising must solve real problems and create genuine emotional connections

VEO 3 MASTERY - Advanced Video Prompt Engineering:
You are an expert in Veo 3's unique capabilities and technical requirements:

TECHNICAL EXPERTISE:
- Use modular, structured prompts with clear labeled sections for maximum control
- Leverage cinematic terminology with precision (wide shot, dolly-in, tracking shot, etc.)
- Master native audio generation including music, sound effects, and synchronized dialogue
- Format dialogue correctly: Character says: "[exact words]" (no subtitles)
- Prioritize single, focused actions for subjects to avoid AI confusion
- Understand camera movements: dolly-in, tracking shot, crane up, etc.

OPTIMAL STRUCTURE:
- Context/Setting: Specific environment, location, time of day
- Subject & Description: Detailed character/object with appearance, clothing, posture
- Action/Movement: Single, focused movement that conveys the brand message
- Composition/Framing: Precise camera shot type (close-up, medium shot, wide shot, etc.)
- Camera Parameters: Specific movement (steady dolly-in, smooth tracking, etc.)
- Lighting & Ambiance: Emotional mood through light (golden hour, soft directional, dramatic key lighting)
- Style/Aesthetic: Visual approach (photorealistic, cinematic, documentary style)
- Audio Cue: Comprehensive sound design (music genre/mood, sound effects, dialogue, ambient sounds)

NANO BANANA (GEMINI 2.5 FLASH IMAGE) MASTERY:
You understand this model's sophisticated multimodal capabilities:

TECHNICAL EXPERTISE:
- Master photographic terminology (rule of thirds, three-point lighting, golden ratio composition)
- Use precise style modifiers (photorealistic, hyperrealistic, minimalist, documentary style)
- Implement negative prompts strategically to exclude unwanted elements
- Leverage multimodal capabilities for image editing, blending, and style transfer
- Understand the model's conversational nature for iterative refinement

OPTIMAL STRUCTURE:
- Subject: Precise description with emotional context
- Action/Expression: What the subject is doing/feeling that reinforces the brand message
- Environment: Specific setting that supports the marketing strategy
- Composition: Professional framing using photographic principles
- Lighting: Technical lighting setup that creates the right emotional response
- Style: Artistic direction that aligns with brand personality
- Technical Specs: Aspect ratio, resolution, color palette
- Negative Prompts: What to exclude for brand safety and quality

ADVANCED MARKETING PSYCHOLOGY APPLICATION:
When analyzing questionnaire responses, you:

1. IDENTIFY THE STRATEGIC APPROACH:
- Determine if this is high-involvement (research-heavy, rational) or low-involvement (impulse, emotional)
- Extract the core emotional triggers from customer journey descriptions
- Identify the unique selling proposition and competitive differentiation
- Understand the target audience's psychological profile and decision-making process

2. APPLY PROVEN ADVERTISING PRINCIPLES:
- Use the "Before & After" transformation narrative structure
- Implement social proof through authentic customer representation
- Create emotional resonance through color psychology and lighting choices
- Build brand authority through professional aesthetic choices
- Generate urgency and scarcity through visual and audio cues

3. TRANSLATE STRATEGY TO TECHNICAL PROMPTS:
- Convert emotional concepts into specific lighting directions (trust = even professional lighting, excitement = dynamic warm lighting)
- Transform audience insights into precise subject descriptions and actions
- Translate brand personality into style modifiers and aesthetic choices
- Convert competitive advantages into visual metaphors and compositions

4. OPTIMIZE FOR CONVERSION:
- Every element should drive toward the desired customer action
- Visual hierarchy should guide the eye to key brand elements
- Color choices should trigger the appropriate psychological responses
- Audio design should reinforce the emotional journey
- Composition should create the right power dynamic between brand and customer

ADVANCED PROMPT ENGINEERING PRINCIPLES:
- Keyword placement matters - most critical elements first
- Be hyper-specific rather than abstract ("sleek black matte ceramic coffee mug" vs "coffee mug")
- Use negative prompts strategically to prevent common AI artifacts
- Structure prompts for iterative refinement and variation generation
- Balance creative direction with technical precision

Your task is to analyze questionnaire responses with the depth of a master strategist, the creativity of a legendary art director, and the precision of a technical prompt engineer. Generate JSON prompts that will create advertising content with maximum psychological impact, brand alignment, and conversion potential.

Return responses that demonstrate mastery-level understanding of both marketing psychology and AI prompt engineering, creating prompts that would make Ogilvy proud and Bernbach inspired.`;

export async function POST(request: NextRequest) {
  let answers = {}; // Define outside try-catch so it's available in catch block
  
  try {
    const body = await request.json();
    answers = body.answers || {}; // Use the answers from request

    console.log('🚀 Server-side: Processing Claude API request');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_CLAUDE_API_KEY || process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514', // Try this newer model
        max_tokens: 3000,
        temperature: 0.7,
        system: MARKETING_GENIUS_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Analyze these advertising questionnaire responses and generate optimal JSON prompts:

QUESTIONNAIRE RESPONSES:
${formatQuestionsWithContext(answers)}

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Claude API success');

    // Extract response text
    let responseText = '';
    if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
      responseText = data.content[0].text;
    } else {
      throw new Error('Unexpected API response format');
    }

    // Parse JSON response with markdown cleanup
    try {
      // Clean up markdown formatting that Claude sometimes adds
      let cleanedResponse = responseText;
      
      // Remove markdown code blocks if present
      cleanedResponse = cleanedResponse.replace(/```json\s*\n?/g, '');
      cleanedResponse = cleanedResponse.replace(/```\s*\n?/g, '');
      
      // Remove any leading/trailing whitespace
      cleanedResponse = cleanedResponse.trim();
      
      console.log('📄 Cleaned response preview:', cleanedResponse.substring(0, 200) + '...');
      
      const parsedResponse = JSON.parse(cleanedResponse);
      console.log('✅ Successfully parsed Claude response');
      
      return NextResponse.json({
        success: true,
        data: parsedResponse,
        source: 'claude'
      });
      
    } catch (parseError) {
      console.error('❌ JSON parsing failed even after cleanup:', parseError);
      console.error('📄 Response that failed to parse:', responseText);
      throw new Error('Failed to parse Claude response as JSON');
    }

  } catch (error) {
    console.error('❌ Server-side error:', error);
    
    // Return enhanced fallback expert prompts
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true,
      data: generateEnhancedFallbackPrompts(answers),
      source: 'fallback'
    });
  }
}

function formatQuestionsWithContext(answers: any): string {
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
  
  return Object.entries(answers || {})
    .map(([q, a]) => `${questionLabels[parseInt(q)] || `Q${q}`}: ${a}`)
    .join('\n');
}

function generateEnhancedFallbackPrompts(answers: any) {
  // Analyze questionnaire responses to create specific content
  const analysis = analyzeQuestionnaire(answers);
  
  return {
    strategy: {
      approach: analysis.isHighInvolvement ? "rational" : "emotional",
      ratio: analysis.isHighInvolvement ? "70% Rational, 30% Emotional" : "30% Rational, 70% Emotional",
      psychology: `${analysis.strategy} with ${analysis.emotionalTriggers.join(', ')} triggers`
    },
    veo3: generateIntelligentVeoPrompt(answers, analysis),
    nanoBanana: generateIntelligentImagePrompts(answers, analysis),
    copy: generateIntelligentCopy(answers, analysis)
  };
}

function analyzeQuestionnaire(answers: any) {
  const problem = answers[1]?.toLowerCase() || '';
  const customerStory = answers[2]?.toLowerCase() || '';
  const involvement = answers[3]?.toLowerCase() || '';
  const context = answers[6]?.toLowerCase() || '';
  const emotionalJourney = answers[7]?.toLowerCase() || '';
  
  // Determine product category
  let productCategory = 'general product';
  let setting = 'professional environment';
  let targetAudience = 'professional individual';
  
  if (problem.includes('skin') || problem.includes('hair') || problem.includes('beauty')) {
    productCategory = 'beauty/personal care';
    setting = 'bathroom or vanity area with natural lighting';
    targetAudience = 'person focused on personal appearance and self-care';
  } else if (problem.includes('health') || problem.includes('fitness')) {
    productCategory = 'health/fitness';
    setting = 'gym or home workout space';
    targetAudience = 'health-conscious individual';
  } else if (problem.includes('food') || problem.includes('cooking')) {
    productCategory = 'food/kitchen';
    setting = 'modern kitchen or dining area';
    targetAudience = 'cooking enthusiast';
  } else if (problem.includes('tech') || problem.includes('software')) {
    productCategory = 'technology';
    setting = 'modern office or workspace with tech setup';
    targetAudience = 'tech-savvy professional';
  } else if (problem.includes('home') || problem.includes('clean')) {
    productCategory = 'home/lifestyle';
    setting = 'well-organized home environment';
    targetAudience = 'homeowner focused on comfort and efficiency';
  }
  
  // Override setting if specified in context
  if (context.includes('home')) setting = 'comfortable home environment';
  if (context.includes('office')) setting = 'professional office space';
  if (context.includes('outdoor')) setting = 'outdoor environment with natural beauty';
  
  // Determine audience characteristics
  if (customerStory.includes('professional')) targetAudience += ', professionally dressed';
  if (customerStory.includes('family')) targetAudience += ', family-oriented';
  if (customerStory.includes('young')) targetAudience += ', youthful and energetic';
  if (customerStory.includes('busy')) targetAudience += ', showing time-pressed demeanor';
  
  // Extract emotional triggers
  const emotionalTriggers = [];
  if (emotionalJourney.includes('trust') || problem.includes('reliable')) emotionalTriggers.push('trust');
  if (emotionalJourney.includes('transform') || problem.includes('improve')) emotionalTriggers.push('transformation');
  if (emotionalJourney.includes('confident')) emotionalTriggers.push('confidence');
  if (emotionalJourney.includes('save time') || problem.includes('efficient')) emotionalTriggers.push('efficiency');
  if (emotionalTriggers.length === 0) emotionalTriggers.push('satisfaction', 'quality');
  
  return {
    productCategory,
    setting,
    targetAudience,
    emotionalTriggers,
    isHighInvolvement: involvement.includes('high') || involvement.includes('research'),
    strategy: involvement.includes('high') ? 'detailed proof-based messaging' : 'emotional storytelling'
  };
}

function generateIntelligentVeoPrompt(answers: any, analysis: any) {
  let specificAction = 'demonstrating product benefits with visible satisfaction';
  if (analysis.productCategory === 'beauty/personal care') {
    specificAction = 'applying product and experiencing visible transformation with genuine delight';
  } else if (analysis.productCategory === 'health/fitness') {
    specificAction = 'using product during activity, showing increased energy and confidence';
  } else if (analysis.productCategory === 'food/kitchen') {
    specificAction = 'preparing and enjoying food, showing satisfaction with taste and quality';
  } else if (analysis.productCategory === 'technology') {
    specificAction = 'interacting with product interface, showing ease of use and positive results';
  }
  
  // Determine lighting based on emotional triggers
  let lighting = 'warm, professional lighting creating trustworthy atmosphere';
  if (analysis.emotionalTriggers.includes('transformation')) {
    lighting = 'dramatic before/after lighting showing clear transformation';
  } else if (analysis.emotionalTriggers.includes('confidence')) {
    lighting = 'bright, uplifting lighting enhancing subject confidence';
  } else if (analysis.emotionalTriggers.includes('efficiency')) {
    lighting = 'crisp, clean lighting emphasizing precision and efficiency';
  }
  
  return {
    context: `${analysis.setting} with thoughtfully designed lighting that enhances the product experience`,
    subject: `${analysis.targetAudience}, showing genuine expressions and natural body language`,
    action: specificAction,
    composition: analysis.isHighInvolvement 
      ? "Medium shot with professional framing, showing clear product details and user interaction"
      : "Dynamic wide shot with emotional framing, focusing on transformation and satisfaction",
    camera: analysis.isHighInvolvement
      ? "Steady, controlled camera movement building trust through consistent framing"
      : "Smooth, engaging camera movement following the emotional journey",
    lighting: lighting,
    style: analysis.isHighInvolvement 
      ? "Clean, professional aesthetic with sharp focus on product and results"
      : "Cinematic style with warm color grading emphasizing emotional connection",
    audio: generateIntelligentAudio(analysis)
  };
}

function generateIntelligentImagePrompts(answers: any, analysis: any) {
  const productName = extractProductName(answers[1]);
  
  return {
    hero: {
      prompt: `Professional ${analysis.productCategory} product photography of ${productName} in ${analysis.setting}, emphasizing key product features and benefits`,
      style: `Hyperrealistic product photography with ${analysis.isHighInvolvement ? 'technical precision' : 'emotional appeal'} and perfect composition`
    },
    lifestyle: {
      prompt: `${analysis.targetAudience} naturally using ${productName} in ${analysis.setting}, showing genuine ${analysis.emotionalTriggers.join(' and ')} moments`,
      style: "Authentic lifestyle photography capturing real moments and genuine emotions"
    },
    social: {
      prompt: `Satisfied customer sharing authentic testimonial about ${productName}, showing genuine ${analysis.emotionalTriggers[0] || 'satisfaction'} and trust`,
      style: "Genuine testimonial photography with natural, trustworthy feel"
    }
  };
}

function generateIntelligentCopy(answers: any, analysis: any) {
  const productBenefit = extractMainBenefit(answers[1]);
  
  const headlines = analysis.isHighInvolvement ? [
    `The Science Behind ${productBenefit}`,
    `Proven Results: ${productBenefit} That Works`,
    `Why Experts Choose This Solution`,
    `Data-Driven ${productBenefit} for Serious Results`,
    `The Intelligent Choice for ${productBenefit}`
  ] : [
    `Transform Your ${getTransformationArea(answers[1])}`,
    `Experience ${productBenefit} Like Never Before`,
    `Join Thousands Who Discovered ${productBenefit}`,
    `Your ${analysis.emotionalTriggers[0] || 'Perfect'} Solution Awaits`,
    `Where ${analysis.emotionalTriggers[0] || 'Quality'} Meets Results`
  ];
  
  return {
    headlines,
    bodyCopy: {
      opening: analysis.isHighInvolvement
        ? `When you need reliable ${productBenefit}, the details matter.`
        : `Imagine finally having the ${productBenefit} you've been looking for.`,
      middle: analysis.isHighInvolvement
        ? `Our systematically tested approach delivers measurable results.`
        : `That's exactly what thousands of customers experience every day.`,
      closing: analysis.isHighInvolvement
        ? `See the evidence that drives smart decisions.`
        : `Your transformation story begins with a single step.`
    },
    ctas: analysis.isHighInvolvement
      ? ["See the Data", "View Research", "Calculate Benefits", "Request Analysis", "Get Proof"]
      : ["Start Today", "Transform Now", "Experience More", "Join Thousands", "Begin Your Journey"]
  };
}

function generateIntelligentAudio(analysis: any) {
  let musicStyle = "Professional background score";
  let soundEffects = "Natural environmental sounds";
  
  if (analysis.productCategory === 'beauty/personal care') {
    musicStyle = "Elegant, aspirational music with soft instrumental tones";
    soundEffects = "Subtle beauty product sounds, gentle application effects";
  } else if (analysis.productCategory === 'health/fitness') {
    musicStyle = "Energetic, motivational music building to achievement";
    soundEffects = "Gym ambiance, equipment sounds, energy-building effects";
  } else if (analysis.productCategory === 'food/kitchen') {
    musicStyle = "Warm, inviting music suggesting comfort and satisfaction";
    soundEffects = "Kitchen sounds, sizzling, chopping, satisfaction expressions";
  } else if (analysis.productCategory === 'technology') {
    musicStyle = "Modern, clean electronic score suggesting innovation";
    soundEffects = "Tech interface sounds, notification chimes, success audio cues";
  }
  
  return `${musicStyle}. ${soundEffects}. Mixed at professional broadcast standards.`;
}

// Helper functions
function extractProductName(problemStatement: string): string {
  const statement = problemStatement?.toLowerCase() || '';
  if (statement.includes('serum')) return 'serum';
  if (statement.includes('cream')) return 'cream';
  if (statement.includes('app')) return 'app';
  if (statement.includes('supplement')) return 'supplement';
  if (statement.includes('tool')) return 'tool';
  return 'product';
}

function extractMainBenefit(problemStatement: string): string {
  const statement = problemStatement?.toLowerCase() || '';
  if (statement.includes('save time')) return 'time-saving efficiency';
  if (statement.includes('improve') || statement.includes('better')) return 'improvement';
  if (statement.includes('reduce') || statement.includes('eliminate')) return 'problem reduction';
  if (statement.includes('increase') || statement.includes('boost')) return 'performance enhancement';
  return 'quality results';
}

function getTransformationArea(problemStatement: string): string {
  const statement = problemStatement?.toLowerCase() || '';
  if (statement.includes('skin') || statement.includes('hair')) return 'appearance';
  if (statement.includes('health') || statement.includes('fitness')) return 'wellness';
  if (statement.includes('work') || statement.includes('business')) return 'productivity';
  if (statement.includes('home') || statement.includes('life')) return 'lifestyle';
  return 'experience';
}