import { NextRequest, NextResponse } from 'next/server';

const COMPREHENSIVE_MARKETING_SYSTEM_PROMPT = `You are the ultimate fusion of David Ogilvy's strategic brilliance, Bill Bernbach's creative revolution, and master-level AI prompt engineering. You excel at translating comprehensive brand and audience intelligence into precise technical prompts for AI generation.

CRITICAL REQUIREMENT: Always use the EXACT product name provided, never use generic terms like "product" or "premium black product". If the product name is "Colgate Total Advanced" then use "Colgate Total Advanced" throughout all prompts.

EXPERTISE AREAS:
- Advanced psychology-driven advertising (40%+ conversion improvement)
- Comprehensive audience profiling (demographics, psychographics, behavioral)
- Brand asset integration for authentic content generation
- Technical mastery of Veo 3 and Nano Banana prompt engineering

OUTPUT REQUIREMENTS:
Generate four comprehensive deliverables using all provided intelligence:
1. STORYBOARD: Detailed 30-second video with cinematography and exact product name
2. PHOTO PROMPTS: Three distinct image types with demographic targeting and product name
3. CLIENT BRIEF: Strategic summary with psychology and audience insights
4. AD STORYLINE: Narrative arc connecting brand to audience transformation

Always use specific details from the provided data rather than generic placeholders.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers = body.answers || {};

    console.log('🚀 Processing comprehensive brand and audience intelligence');
    
    // FIXED: Proper data extraction from enhanced structure
        const enhancedData = answers.enhanced_data || {};
        const productAssets = enhancedData.product_assets || {};
        const audienceIntelligence = enhancedData.audience_intelligence || {};

        // CRITICAL FIX: Extract product name correctly
        const productName = productAssets.name || answers[1] || 'PRODUCT_NAME_MISSING';
        const brandColors = productAssets.brand_colors || {};
        const targetAges = audienceIntelligence.demographics?.age_ranges?.join(', ') || 'TARGET_AGE_MISSING';
        const incomeGroups = audienceIntelligence.demographics?.income_levels?.join(', ') || 'INCOME_MISSING';
        const coreValues = audienceIntelligence.psychographics?.core_values?.join(', ') || 'VALUES_MISSING';

        // DEBUG: Log what we extracted
        console.log('📝 DEBUG - API Route - Extracted data:', {
          productName,
          targetAges,
          incomeGroups,
          coreValues,
          primaryColor: brandColors.primary,
          hasImage: !!productAssets.image
        });

    // Check API key
    const apiKey = process.env.NEXT_PUBLIC_CLAUDE_API_KEY || process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      throw new Error('Claude API key not configured');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        temperature: 0.7,
        system: COMPREHENSIVE_MARKETING_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: `Generate comprehensive, brand-specific AI prompts. CRITICAL: Use the EXACT product name "${productName}" throughout ALL prompts.

PRODUCT & BRAND ASSETS:
Product Name: "${productName}" (USE THIS EXACT NAME IN ALL PROMPTS - DO NOT USE "PRODUCT" OR GENERIC TERMS)
Product Category: "${productAssets.category || 'Not specified'}"
Product Description: "${productAssets.description || 'Not specified'}"
Brand Colors: Primary ${brandColors.primary || '#000000'}, Secondary ${brandColors.secondary || '#FFFFFF'}, Accent ${brandColors.accent || '#D4AF37'}
Brand Typography: "${productAssets.typography || 'Not specified'}"
Product Image: ${productAssets.image ? 'Visual reference provided for accurate representation' : 'No product image provided'}

TARGET AUDIENCE:
Age Groups: ${targetAges}
Income Levels: ${incomeGroups}
Core Values: ${coreValues}
Research Behavior: ${audienceIntelligence.behavioral?.research_behavior || 'Not specified'}

BRAND STRATEGY:
Brand Personality: ${enhancedData.brand_strategy?.personality || 'Not specified'}
Visual Style: ${enhancedData.brand_strategy?.visual_style || 'Not specified'}
Campaign Objective: ${enhancedData.brand_strategy?.campaign_objective || 'Not specified'}

Return ONLY valid JSON using "${productName}" throughout:

{
  "storyboard": {
    "title": "${productName} Video Storyboard",
    "product_name": "${productName}",
    "scenes": [
      {
        "scene_number": 1,
        "duration": "0-5 seconds",
        "shot_type": "Wide shot",
        "action": "Opening featuring ${productName}",
        "lighting": "Setup with ${brandColors.primary} accents",
        "subject": "${targetAges} customer with ${productName}",
        "brand_integration": "${productName} brand elements visible"
      }
    ]
  },
  "photo_ad_prompts": {
    "hero_image": {
      "prompt": "Professional photography of ${productName} with ${brandColors.primary} brand colors",
      "brand_elements": "Product: ${productName}, targeting ${targetAges}",
      "product_focus": "${productName} prominently featured"
    },
    "lifestyle_image": {
      "prompt": "${targetAges} person using ${productName} naturally",
      "product_integration": "${productName} seamlessly integrated in scene",
      "demographic_targeting": "${targetAges} ${incomeGroups} lifestyle with ${productName}"
    },
    "social_proof": {
      "prompt": "${targetAges} testimonial about ${productName} benefits",
      "product_reference": "${productName} clearly visible and referenced",
      "authenticity": "Genuine ${productName} user experience"
    }
  },
  "client_brief": {
    "product_overview": "${productName} overview and positioning",
    "target_audience": "${targetAges} ${incomeGroups} customers for ${productName}",
    "strategy": "${productName} marketing approach for ${coreValues} audience"
  },
  "ad_storyline": {
    "narrative": "${productName} story for ${targetAges} customers",
    "emotional_journey": "Customer transformation through ${productName}",
    "product_integration": "${productName} central to narrative arc"
  }
}`
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', response.status, errorText);
      throw new Error(`Claude API failed: ${response.status}`);
    }

    const data = await response.json();

    let responseText = '';
    if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
      responseText = data.content[0].text;
    } else {
      throw new Error('Unexpected Claude response format');
    }

    try {
      let cleanedResponse = responseText;
      cleanedResponse = cleanedResponse.replace(/```json\s*\n?/g, '');
      cleanedResponse = cleanedResponse.replace(/```\s*\n?/g, '');
      cleanedResponse = cleanedResponse.trim();
      
      const parsedResponse = JSON.parse(cleanedResponse);
      console.log('✅ Product-specific AI prompts generated with', productName);
      
      return NextResponse.json({
        success: true,
        data: parsedResponse,
        source: 'claude_enhanced',
        generation_context: {
          product_name: productName,
          audience_groups: targetAges,
          income_levels: incomeGroups,
          brand_colors_used: brandColors,
          has_product_image: !!productAssets.image
        }
      });
      
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError);
      throw new Error(`Failed to parse Claude response: ${parseError}`);
    }

  } catch (error) {
    console.error('❌ Enhanced generation error:', error);
    
    // Fallback with actual product name
    const enhancedData = answers.enhanced_data || {};
    const productAssets = enhancedData.product_assets || {};
    const audienceIntelligence = enhancedData.audience_intelligence || {};
    
    const productName = productAssets.name || 'your product';
    const primaryColor = productAssets.brand_colors?.primary || '#000000';
    const secondaryColor = productAssets.brand_colors?.secondary || '#FFFFFF';
    const accentColor = productAssets.brand_colors?.accent || '#D4AF37';
    const targetAges = audienceIntelligence.demographics?.age_ranges?.join(', ') || 'target demographic';
    const incomeGroups = audienceIntelligence.demographics?.income_levels?.join(', ') || 'income bracket';
    const coreValues = audienceIntelligence.psychographics?.core_values?.join(', ') || 'customer values';
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true,
      data: {
        storyboard: {
          title: `${productName} - Enhanced Video Storyboard`,
          product_name: productName,
          target_demographics: `${targetAges}, ${incomeGroups}`,
          scenes: [
            {
              scene_number: 1,
              duration: "0-5 seconds",
              shot_type: "Wide establishing shot",
              action: `Opening scene showcasing ${productName} in premium environment`,
              lighting: `Golden hour lighting with ${primaryColor} brand color accents`,
              subject: `${targetAges} customer in ${incomeGroups} lifestyle setting`,
              brand_integration: `${productName} brand elements subtly integrated`,
              product_reference: `${productName} context establishment`
            },
            {
              scene_number: 2,
              duration: "5-15 seconds",
              shot_type: "Medium to close-up",
              action: `Customer using ${productName} with satisfaction`,
              lighting: `Three-point lighting highlighting ${productName}`,
              subject: `${targetAges} person demonstrating ${productName} benefits`,
              brand_integration: `${productName} prominently featured with ${secondaryColor} background`,
              product_reference: `${productName} functionality showcase`
            },
            {
              scene_number: 3,
              duration: "15-25 seconds",
              shot_type: "Close-up to wide reveal",
              action: `Transformation results from ${productName} usage`,
              lighting: `Dramatic lighting showing ${productName} impact with ${accentColor} highlights`,
              subject: `Customer experiencing ${productName} transformation`,
              brand_integration: `${productName} results display with brand typography`,
              product_reference: `${productName} effectiveness validation`
            },
            {
              scene_number: 4,
              duration: "25-30 seconds",
              shot_type: "Product beauty shot",
              action: `${productName} call-to-action with branding`,
              lighting: `Clean product lighting showcasing ${productName}`,
              subject: `${productName} with complete brand identity`,
              brand_integration: `Full ${productName} brand color integration`,
              product_reference: `${productName} final brand impression`
            }
          ]
        },
        photo_ad_prompts: {
          hero_image: {
            prompt: `Professional product photography of ${productName} with brand colors ${primaryColor} and ${secondaryColor}, styled for ${incomeGroups} market appeal`,
            technical_specs: `Studio lighting highlighting ${productName}, brand color integration ${primaryColor}/${secondaryColor}/${accentColor}`,
            brand_elements: `Product: ${productName}, Colors: ${primaryColor}/${secondaryColor}/${accentColor}`,
            product_focus: `${productName} as central focus with premium styling`
          },
          lifestyle_image: {
            prompt: `${targetAges} person authentically using ${productName} in lifestyle environment with ${primaryColor} brand accents`,
            demographic_casting: `${targetAges} representing ${incomeGroups} lifestyle using ${productName}`,
            brand_integration: `${productName} naturally integrated with ${primaryColor} environmental accents`,
            product_reference: `${productName} seamless lifestyle integration`
          },
          social_proof: {
            prompt: `Authentic ${targetAges} customer testimonial featuring ${productName} with genuine satisfaction`,
            authenticity_cues: `Credible ${productName} user experience for ${targetAges} ${incomeGroups} demographic`,
            brand_consistency: `${productName} visible with ${secondaryColor} background and ${accentColor} accents`,
            product_validation: `${productName} testimonial credibility and satisfaction`
          }
        },
        client_brief: {
          product_overview: `${productName} - ${productAssets.category || 'Product'} targeting ${incomeGroups} customers`,
          target_audience_profile: `${targetAges} customers, Income: ${incomeGroups}, Values: ${coreValues}`,
          psychology_strategy: `${productName} marketing strategy for ${targetAges} customers who value ${coreValues}`,
          creative_guidelines: `Product: ${productName}, Colors: ${primaryColor}/${secondaryColor}/${accentColor}`,
          success_metrics: `${productName} performance measurement for ${incomeGroups} market penetration`
        },
        ad_storyline: {
          narrative_arc: `${productName} story targeting ${targetAges} customers who value ${coreValues}`,
          emotional_journey: `Customer discovers ${productName} and achieves transformation aligned with ${coreValues}`,
          demographic_targeting: `${productName} story resonates with ${targetAges} ${incomeGroups} audience`,
          visual_progression: `${productName} brand color progression: ${secondaryColor} → ${primaryColor} → ${accentColor}`,
          product_integration: `${productName} featured prominently throughout narrative arc`
        }
      },
      source: 'enhanced_fallback_with_product_name'
    });
  }
}