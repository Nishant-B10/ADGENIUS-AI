export const exportToText = (content: any, filename: string) => {
  const element = document.createElement('a')
  const file = new Blob([content], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = `${filename}.txt`
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const exportBriefToText = (briefData: any, veoPrompt: string, imagePrompts: any) => {
  const content = `
ADGENIUS AI - CREATIVE BRIEF
Generated: ${new Date().toLocaleDateString()}
=====================================

STRATEGY BRIEF
--------------
Unique Selling Proposition:
${briefData.usp}

Target Audience:
${briefData.audience}

Strategy Type: ${briefData.strategy?.type}
Ratio: ${briefData.strategy?.ratio}
Approach: ${briefData.strategy?.approach}

Emotional Triggers:
${briefData.emotionalTriggers?.join(', ')}

Key Messages:
${briefData.keyMessages?.join('\n')}

=====================================

VEO 3 VIDEO PROMPT
------------------
${veoPrompt}

=====================================

IMAGE PROMPTS (NANO BANANA)
---------------------------
Hero Shot:
${imagePrompts.hero}

Lifestyle:
${imagePrompts.lifestyle}

=====================================
  `.trim()
  
  exportToText(content, 'creative-brief')
}

export const exportCopyToText = (generatedContent: any) => {
  const content = `
ADGENIUS AI - GENERATED COPY
Generated: ${new Date().toLocaleDateString()}
=====================================

HEADLINES (5 Variations)
------------------------
${generatedContent.headlines.map((h: string, i: number) => `${i + 1}. ${h}`).join('\n')}

=====================================

BODY COPY
---------
Opening:
${generatedContent.bodyCopy.opening}

Middle:
${generatedContent.bodyCopy.middle}

Closing:
${generatedContent.bodyCopy.closing}

=====================================

CALL-TO-ACTION OPTIONS
----------------------
${generatedContent.ctas.map((cta: string, i: number) => `${i + 1}. ${cta}`).join('\n')}

=====================================
  `.trim()
  
  exportToText(content, 'ad-copy')
}

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}