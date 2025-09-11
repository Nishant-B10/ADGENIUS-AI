'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { exportCopyToText } from '@/components/ExportUtils'

export default function Generate() {
  const [activeFormat, setActiveFormat] = useState('copy')
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [briefData, setBriefData] = useState<any>(null)

  useEffect(() => {
    // Get brief data from localStorage
    const savedAnswers = localStorage.getItem('questionnaireAnswers')
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers)
      // Generate brief summary for copy generation
      const brief = {
        product: answers[1] || 'your product',
        audience: answers[2] || 'target customers',
        strategy: answers[3]?.includes('high') ? 'rational' : 'emotional',
        competitors: answers[5] || '',
        keyMessage: answers[10] || ''
      }
      setBriefData(brief)
    } else {
      window.location.href = '/questionnaire'
    }
  }, [])

  const generateCopy = () => {
    setLoading(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const headlines = generateHeadlines(briefData)
      const bodyCopy = generateBodyCopy(briefData)
      const ctas = generateCTAs(briefData)
      
      setGeneratedContent({
        headlines,
        bodyCopy,
        ctas
      })
      setLoading(false)
    }, 3000)
  }

  const generateHeadlines = (brief: any) => {
    const isRational = brief.strategy === 'rational'
    
    if (isRational) {
      return [
        `Proven Results: ${brief.product}`,
        `The Smart Choice for ${brief.audience}`,
        `Why Industry Leaders Choose Us`,
        `Measurable Impact, Guaranteed`,
        `Transform Your Business with Data-Driven Solutions`
      ]
    } else {
      return [
        `Your Journey to Success Starts Here`,
        `Experience the Difference`,
        `Where Dreams Meet Reality`,
        `Unlock Your Full Potential`,
        `Join Thousands Who've Transformed Their Lives`
      ]
    }
  }

  const generateBodyCopy = (brief: any) => {
    const isRational = brief.strategy === 'rational'
    
    if (isRational) {
      return {
        opening: `In today's competitive market, ${brief.audience} need solutions that deliver measurable results.`,
        middle: `Our proven approach has helped over 10,000 businesses achieve their goals through systematic implementation and data-driven strategies.`,
        closing: `Don't just take our word for it - see the numbers that speak for themselves.`
      }
    } else {
      return {
        opening: `Imagine waking up each day knowing you have the power to change everything.`,
        middle: `That's exactly what thousands of people just like you discovered when they took the first step with us.`,
        closing: `Your transformation story is waiting to be written. Will you be our next success?`
      }
    }
  }

  const generateCTAs = (brief: any) => {
    const isRational = brief.strategy === 'rational'
    
    if (isRational) {
      return [
        'Get Your Free Analysis',
        'See the Data',
        'Request a Demo',
        'Calculate Your ROI',
        'Download Case Study'
      ]
    } else {
      return [
        'Start Your Journey',
        'Transform Today',
        'Unlock Your Potential',
        'Join Us Now',
        'Begin Your Story'
      ]
    }
  }

  return (
    <main className="min-h-screen bg-black pt-24 px-8 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-white mb-4">
            Content Generation Studio
          </h1>
          <div className="w-24 h-0.5 bg-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-400">
            Create AI-Powered Marketing Content
          </p>
        </div>

        {/* Format Selection */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveFormat('copy')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeFormat === 'copy'
                ? 'bg-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Ad Copy
          </button>
          <button
            onClick={() => setActiveFormat('video')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeFormat === 'video'
                ? 'bg-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            disabled
          >
            Video (Coming Soon)
          </button>
          <button
            onClick={() => setActiveFormat('image')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeFormat === 'image'
                ? 'bg-yellow-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            disabled
          >
            Images (Coming Soon)
          </button>
        </div>

        {/* Generation Area */}
        {activeFormat === 'copy' && (
          <div className="space-y-6">
            {!generatedContent && !loading && (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
                <p className="text-gray-400 mb-6">
                  Ready to generate compelling ad copy based on your brief
                </p>
                <button
                  onClick={generateCopy}
                  className="px-8 py-4 bg-yellow-600 text-black font-medium rounded-lg hover:bg-yellow-500 transition-all"
                >
                  Generate Copy
                </button>
              </div>
            )}

            {loading && (
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
                <div className="w-16 h-16 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-xl">Generating Copy...</p>
                <p className="text-gray-400 mt-2">Using AI to create compelling content</p>
              </div>
            )}

            {generatedContent && !loading && (
              <>
                {/* Headlines */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-serif text-yellow-600 mb-4">
                    Headlines (5 Variations)
                  </h2>
                  <div className="space-y-3">
                    {generatedContent.headlines.map((headline: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                        <p className="text-gray-300">{headline}</p>
                        <button className="text-yellow-600 hover:text-yellow-500 text-sm">
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body Copy */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-serif text-yellow-600 mb-4">
                    Body Copy
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800 rounded">
                      <p className="text-gray-400 text-sm mb-2">Opening:</p>
                      <p className="text-gray-300">{generatedContent.bodyCopy.opening}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded">
                      <p className="text-gray-400 text-sm mb-2">Middle:</p>
                      <p className="text-gray-300">{generatedContent.bodyCopy.middle}</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded">
                      <p className="text-gray-400 text-sm mb-2">Closing:</p>
                      <p className="text-gray-300">{generatedContent.bodyCopy.closing}</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-serif text-yellow-600 mb-4">
                    Call-to-Action Buttons
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {generatedContent.ctas.map((cta: string, index: number) => (
                      <button
                        key={index}
                        className="px-6 py-3 bg-gray-800 text-yellow-600 rounded hover:bg-gray-700 transition-all"
                      >
                        {cta}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setGeneratedContent(null)}
                    className="px-6 py-3 border border-gray-700 text-gray-400 rounded hover:border-white hover:text-white"
                  >
                    Generate New Variations
                    </button>                    
                  <button 
                    onClick={() => exportCopyToText(generatedContent)}
                    className="px-8 py-3 bg-yellow-600 text-black font-medium rounded hover:bg-yellow-500"
                >
                    📥 Export All Copy
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}