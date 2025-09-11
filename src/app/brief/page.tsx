'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { generateVeoPrompt, generateNanoBananaPrompt } from '@/components/AIPromptGenerator'
import { exportBriefToText, copyToClipboard } from '@/components/ExportUtils'
import { generateVeoPromptJSON, generateNanoBananaPromptJSON } from '@/components/AIPromptGenerator'


export default function Brief() {
  const [briefData, setBriefData] = useState<any>(null)
  const [answers, setAnswers] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('brief')
  const [veoPrompt, setVeoPrompt] = useState('')
  const [imagePrompts, setImagePrompts] = useState<any>({})
  // const [aiPrompts, setAiPrompts] = useState<any>(null)
  const [generatingAI, setGeneratingAI] = useState(false)

  const generateWithAI = async () => {
  setGeneratingAI(true)
  
  try {
    console.log('🤖 Generating with Claude AI using marketing expertise...')
    
    // Call your Next.js API route instead of external API
    const response = await fetch('/api/generate-prompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        answers: answers
      })
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`)
    }

    const result = await response.json()
    console.log('📦 API Response:', result)

    if (result.success) {
      const claudeResults = result.data
      console.log('🔍 Debug Claude veo3 response:', claudeResults.veo3) // <- ADD THIS
      console.log('✅ Claude AI generated optimized prompts:', claudeResults)
      
      // Update brief with Claude's strategic analysis
      setBriefData({
        usp: `Claude Analysis: ${claudeResults.strategy.psychology}`,
        audience: `Target: ${extractAudienceFromClaudeResults(claudeResults)}`,
        strategy: {
          type: claudeResults.strategy.approach === 'rational' ? 'High Involvement Strategy' : 'Low Involvement Strategy',
          ratio: claudeResults.strategy.ratio,
          approach: claudeResults.strategy.psychology
        },
        emotionalTriggers: extractTriggersFromHeadlines(claudeResults.copy.headlines),
        keyMessages: [
          `Primary: ${claudeResults.copy.headlines[0]}`,
          `Secondary: ${claudeResults.copy.headlines[1]}`,
          `CTA: ${claudeResults.copy.ctas[0]}`
        ]
      })
      
      // Set Veo 3 JSON prompt (optimized by Claude for video generation)
      const veoJSON = {
        context: claudeResults.veo3.context,
        subject: claudeResults.veo3.subject,
        action: claudeResults.veo3.action,
        composition: claudeResults.veo3.composition,
        camera: claudeResults.veo3.camera,
        lighting: claudeResults.veo3.lighting,
        style: claudeResults.veo3.style,
        audio: claudeResults.veo3.audio,
        duration: 15,
        aspectRatio: "16:9"
      }
      setVeoPrompt(JSON.stringify(veoJSON, null, 2))
      console.log('🎬 Setting Veo prompt to Claude content:', JSON.stringify(veoJSON, null, 2)) // Add this debug line
      
      // Set Nano Banana JSON prompts (optimized by Claude for image generation)
      setImagePrompts({
        hero: JSON.stringify(claudeResults.nanoBanana.hero, null, 2),
        lifestyle: JSON.stringify(claudeResults.nanoBanana.lifestyle, null, 2),
        comparison: JSON.stringify(claudeResults.nanoBanana.social, null, 2)
      })
      
      alert('🎯 Claude AI has generated marketing-optimized JSON prompts! Ready for Veo 3 & Nano Banana.')
      
    } else if (result.fallback) {
      // Handle fallback case
      console.log('⚠️ Using fallback prompts due to API issue:', result.error)
      const claudeResults = result.data
      
      // Still update the UI with fallback prompts
      setBriefData({
        usp: `Fallback Analysis: ${claudeResults.strategy.psychology}`,
        audience: `Target: Expert-generated based on your responses`,
        strategy: {
          type: claudeResults.strategy.approach === 'rational' ? 'High Involvement Strategy' : 'Low Involvement Strategy',
          ratio: claudeResults.strategy.ratio,
          approach: claudeResults.strategy.psychology
        },
        emotionalTriggers: ['Expert', 'Generated', 'Marketing'],
        keyMessages: [
          `Primary: ${claudeResults.copy.headlines[0]}`,
          `Secondary: ${claudeResults.copy.headlines[1]}`,
          `CTA: ${claudeResults.copy.ctas[0]}`
        ]
      })
      
      const veoJSON = {
        context: claudeResults.veo3.context,
        subject: claudeResults.veo3.subject,
        action: claudeResults.veo3.action,
        composition: claudeResults.veo3.composition,
        camera: claudeResults.veo3.camera,
        lighting: claudeResults.veo3.lighting,
        style: claudeResults.veo3.style,
        audio: claudeResults.veo3.audio,
        duration: 15,
        aspectRatio: "16:9"
      }
      setVeoPrompt(JSON.stringify(veoJSON, null, 2))
      
      setImagePrompts({
        hero: JSON.stringify(claudeResults.nanoBanana.hero, null, 2),
        lifestyle: JSON.stringify(claudeResults.nanoBanana.lifestyle, null, 2),
        comparison: JSON.stringify(claudeResults.nanoBanana.social, null, 2)
      })
      
      alert('⚠️ Claude API had issues, but generated expert fallback prompts! Still ready for Veo 3 & Nano Banana.')
    }
    
    // Force UI refresh - ADD IT HERE
    window.location.hash = 'video';
    
  } catch (error) {
    console.error('❌ Client-side generation failed:', error)
    alert('❌ Generation failed completely. Check console for details.')
  } finally {
    setGeneratingAI(false)
  }
}

// Helper functions to extract data from Claude's structured response
const extractAudienceFromClaudeResults = (results: any) => {
  return results.copy.headlines[0]?.replace(/^(Your|The|For)/, '') || 'Marketing-optimized audience'
}

const extractTriggersFromHeadlines = (headlines: string[]) => {
  // Extract emotional triggers from Claude's marketing-optimized headlines
  const triggers = []
  const headlineText = headlines.join(' ').toLowerCase()
  
  if (headlineText.includes('trust') || headlineText.includes('proven')) triggers.push('Trust')
  if (headlineText.includes('transform') || headlineText.includes('change')) triggers.push('Transformation') 
  if (headlineText.includes('success') || headlineText.includes('results')) triggers.push('Achievement')
  if (headlineText.includes('discover') || headlineText.includes('experience')) triggers.push('Discovery')
  
  return triggers.length > 0 ? triggers : ['Claude-Optimized', 'Marketing', 'Psychology']
}

  useEffect(() => {
    const savedAnswers = localStorage.getItem('questionnaireAnswers')
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)
      setAnswers(parsedAnswers)
      generateBrief(parsedAnswers)
    } else {
      window.location.href = '/questionnaire'
    }
  }, [])

  const generateBrief = (answers: any) => {
    setTimeout(() => {
      const brief = {
        usp: `Based on your problem statement: "${answers[1]?.substring(0, 100)}...", your USP focuses on delivering measurable results with proven validation.`,
        audience: `Your target audience consists of ${answers[3]?.includes('high') ? 'thoughtful decision-makers' : 'quick decision-makers'} who value ${answers[2]?.substring(0, 50)}...`,
        strategy: determineStrategy(answers),
        emotionalTriggers: extractEmotionalTriggers(answers),
        keyMessages: [
          "Primary: Address the core problem directly",
          "Secondary: Showcase transformation stories",
          "Supporting: Provide social proof"
        ]
      }
      
      setBriefData(brief)
      
      const veo = generateVeoPrompt(answers, brief)
      setVeoPrompt(veo)
      
      const images = generateNanoBananaPrompt(answers, brief)
      setImagePrompts(images)
      
      setLoading(false)
    }, 2000)
  }

  const determineStrategy = (answers: any) => {
    if (answers[3]?.toLowerCase().includes('high') || answers[3]?.toLowerCase().includes('research')) {
      return {
        type: "High Involvement Strategy",
        ratio: "70% Rational, 30% Emotional",
        approach: "Focus on detailed information, comparisons, and logical arguments"
      }
    }
    return {
      type: "Low Involvement Strategy",
      ratio: "30% Rational, 70% Emotional",
      approach: "Focus on emotional appeal, visual impact, and simple messages"
    }
  }

  const extractEmotionalTriggers = (answers: any) => {
    const triggers = []
    const answer7 = answers[7]?.toLowerCase() || ''
    
    if (answer7.includes('trust') || answer7.includes('reliable')) triggers.push('Trust')
    if (answer7.includes('fear') || answer7.includes('worry')) triggers.push('Security')
    if (answer7.includes('success') || answer7.includes('achieve')) triggers.push('Achievement')
    if (answer7.includes('belong') || answer7.includes('community')) triggers.push('Belonging')
    
    if (triggers.length === 0) {
      triggers.push('Innovation', 'Quality', 'Success')
    }
    
    return triggers
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black pt-24 px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Analyzing your responses...</p>
          <p className="text-gray-400 mt-2">Generating your creative brief</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black pt-24 px-8 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Header with AI Generation Button */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-white mb-4">
            Your Creative Brief
          </h1>
          <div className="w-24 h-0.5 bg-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-400 mb-4">
            AI-Generated Strategy & Content Prompts
          </p>
          <button
            onClick={generateWithAI}
            disabled={generatingAI}
            className="px-6 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500 disabled:opacity-50"
          >
            {generatingAI ? 'Generating...' : '🤖 Generate with Claude AI'}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('brief')}
            className={`px-6 py-3 ${activeTab === 'brief' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-400'}`}
          >
            Strategy Brief
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-6 py-3 ${activeTab === 'video' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-400'}`}
          >
            Video Prompt (Veo 3)
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-6 py-3 ${activeTab === 'image' ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-400'}`}
          >
            Image Prompts (Nano Banana)
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'brief' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Unique Selling Proposition
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {briefData?.usp}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Target Audience
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {briefData?.audience}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Recommended Strategy: {briefData?.strategy?.type}
              </h2>
              <p className="text-gray-300 mb-2">
                <strong>Ratio:</strong> {briefData?.strategy?.ratio}
              </p>
              <p className="text-gray-300">
                <strong>Approach:</strong> {briefData?.strategy?.approach}
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Key Messages
              </h2>
              <ul className="space-y-2">
                {briefData?.keyMessages?.map((message: string, index: number) => (
                  <li key={index} className="text-gray-300 flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    {message}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Emotional Triggers
              </h2>
              <div className="flex flex-wrap gap-3">
                {briefData?.emotionalTriggers?.map((trigger: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800 text-yellow-600 rounded-full text-sm"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Veo 3 Video Generation Prompt (JSON Format)
              </h2>
              <pre className="text-gray-300 bg-black p-4 rounded overflow-x-auto font-mono text-sm">
                {generateVeoPromptJSON(answers, briefData)}
              </pre>
              <button 
                onClick={async () => {
                  const success = await copyToClipboard(generateVeoPromptJSON(answers, briefData))
                  if (success) alert('JSON prompt copied to clipboard!')
                }}
                className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500"
              >
                Copy JSON Prompt
              </button>
            </div>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Hero Product Shot (JSON)
              </h2>
              <pre className="text-gray-300 bg-black p-4 rounded overflow-x-auto font-mono text-sm">
                {generateNanoBananaPromptJSON(answers, briefData).hero}
              </pre>
              <button 
                onClick={async () => {
                  const success = await copyToClipboard(generateNanoBananaPromptJSON(answers, briefData).hero)
                  if (success) alert('Hero shot JSON copied!')
                }}
                className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500"
              >
                Copy JSON
              </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Lifestyle Image (JSON)
              </h2>
              <pre className="text-gray-300 bg-black p-4 rounded overflow-x-auto font-mono text-sm">
                {generateNanoBananaPromptJSON(answers, briefData).lifestyle}
              </pre>
              <button 
                onClick={async () => {
                  const success = await copyToClipboard(generateNanoBananaPromptJSON(answers, briefData).lifestyle)
                  if (success) alert('Lifestyle JSON copied!')
                }}
                className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500"
              >
                Copy JSON
              </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-serif text-yellow-600 mb-4">
                Comparison Shot (JSON)
              </h2>
              <pre className="text-gray-300 bg-black p-4 rounded overflow-x-auto font-mono text-sm">
                {generateNanoBananaPromptJSON(answers, briefData).comparison}
              </pre>
              <button 
                onClick={async () => {
                  const success = await copyToClipboard(generateNanoBananaPromptJSON(answers, briefData).comparison)
                  if (success) alert('Comparison JSON copied!')
                }}
                className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500"
              >
                Copy JSON
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <Link href="/questionnaire">
            <button className="px-6 py-3 border border-gray-700 text-gray-400 rounded hover:border-white hover:text-white">
              ← Edit Answers
            </button>
          </Link>
          <button 
            onClick={() => exportBriefToText(briefData, veoPrompt, imagePrompts)}
            className="px-6 py-3 border border-gray-700 text-gray-400 rounded hover:border-white hover:text-white"
          >
            📥 Export Brief
          </button>
          <Link href="/generate">
            <button className="px-8 py-3 bg-yellow-600 text-black font-medium rounded hover:bg-yellow-500">
              Generate Content →
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}