'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Check, Video, Image, FileText, Zap, Users, Target, Palette, Copy, Download, Package } from 'lucide-react'

export default function EnhancedBrief() {
  const [briefData, setBriefData] = useState<any>(null)
  const [answers, setAnswers] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [generatingAI, setGeneratingAI] = useState(false)
  const [apiSource, setApiSource] = useState<'claude' | 'fallback'>('fallback')

  const generateWithAI = async () => {
    setGeneratingAI(true)
    
    try {
      console.log('🧠 Generating enhanced AI content with product assets...')
      
      const response = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          answers: answers
        })
      })

      const result = await response.json()
      console.log('📦 Enhanced API Response:', result)

      setBriefData(result.data)
      setApiSource(result.success ? 'claude' : 'fallback')
      
    } catch (error) {
      console.error('❌ Enhanced generation failed:', error)
    } finally {
      setGeneratingAI(false)
    }
  }

  useEffect(() => {
    const savedAnswers = localStorage.getItem('questionnaireAnswers')
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers)
      setAnswers(parsedAnswers)
      setTimeout(() => generateWithAI(), 1000)
    } else {
      window.location.href = '/questionnaire'
    }
    setLoading(false)
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('Copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const productAssets = answers?.enhanced_data?.product_assets || {};
  const audienceData = answers?.enhanced_data?.audience_intelligence || {};

  if (loading) {
    return (
      <main className="min-h-screen center-luxury" style={{ background: 'var(--surface-primary)' }}>
        <div className="text-center fade-in-luxury">
          <div className="w-20 h-20 rounded-full center-luxury mx-auto mb-6 progress-luxury">
            <div className="progress-fill" style={{ width: '100%' }}></div>
          </div>
          <h2 className="text-hero mb-4" style={{ color: 'var(--text-primary)' }}>
            Analyzing Strategic Intelligence
          </h2>
          <p className="text-body-large" style={{ color: 'var(--text-secondary)' }}>
            Processing brand and audience data...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--surface-primary)' }}>
      <div className="container-luxury section-luxury">
        
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="flex-luxury justify-center mb-8">
            <div className="w-24 h-24 rounded-full center-luxury"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--brand-gold), #F4D03F)',
                   boxShadow: 'var(--shadow-gold)'
                 }}>
              <FileText className="w-12 h-12" style={{ color: 'var(--brand-charcoal)' }} />
            </div>
            <div className="ml-6 text-left">
              <h1 className="text-display" style={{ color: 'var(--text-primary)' }}>
                Strategic Brief
              </h1>
              <p className="text-subheading mt-2" style={{ color: 'var(--brand-gold)' }}>
                {productAssets.name || 'Psychology-powered marketing intelligence'}
              </p>
            </div>
          </div>

          {/* Generation Status */}
          <div className="flex justify-center gap-4 mb-8">
            <div className={`px-6 py-3 rounded-full text-caption font-medium ${apiSource === 'claude' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'}`}>
              {apiSource === 'claude' ? '✅ Claude AI Generated' : '⚠️ Enhanced Fallback'}
            </div>
            <button
              onClick={generateWithAI}
              disabled={generatingAI}
              className="btn-primary"
            >
              {generatingAI ? 'Generating...' : '🔄 Regenerate with Claude AI'}
            </button>
          </div>
        </div>

        {/* Premium Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex p-2 rounded-xl" style={{ background: 'var(--surface-secondary)' }}>
            {[
              { id: 'overview', label: 'Overview', icon: <Target className="w-4 h-4" /> },
              { id: 'storyboard', label: 'Storyboard', icon: <Video className="w-4 h-4" /> },
              { id: 'photos', label: 'Photo Prompts', icon: <Image className="w-4 h-4" /> },
              { id: 'storyline', label: 'Ad Storyline', icon: <Zap className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 font-medium`}
                style={{
                  background: activeTab === tab.id ? 'var(--brand-gold)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--brand-charcoal)' : 'var(--text-secondary)'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid gap-8 max-w-6xl mx-auto">
            
            {/* Product Image & Assets Display */}
            {productAssets.image && (
              <div className="card-luxury">
                <div className="flex items-start gap-6">
                  <Package className="w-8 h-8 mt-1" style={{ color: 'var(--brand-gold)' }} />
                  <div className="flex-1">
                    <h2 className="text-title mb-4" style={{ color: 'var(--text-primary)' }}>
                      Product Assets
                    </h2>
                    <div className="flex items-start gap-6">
                      <div>
                        <img 
                          src={productAssets.image} 
                          alt={`${productAssets.name} reference`}
                          className="w-48 h-48 object-cover rounded-xl border-2"
                          style={{ borderColor: 'var(--brand-gold)' }}
                        />
                        <p className="text-caption mt-2 text-center" style={{ color: 'var(--text-tertiary)' }}>
                          Uploaded Product Image
                        </p>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-heading mb-2" style={{ color: 'var(--brand-gold)' }}>
                          {productAssets.name}
                        </h3>
                        <p className="text-body mb-4" style={{ color: 'var(--text-secondary)' }}>
                          {productAssets.description}
                        </p>
                        <p className="text-caption mb-4" style={{ color: 'var(--text-tertiary)' }}>
                          Category: {productAssets.category}
                        </p>
                        
                        {/* Brand Colors Display */}
                        <div className="space-y-2">
                          <p className="text-caption font-medium" style={{ color: 'var(--brand-gold)' }}>Brand Colors:</p>
                          <div className="flex gap-4">
                            {productAssets.brand_colors?.primary && (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded border-2" style={{ 
                                  background: productAssets.brand_colors.primary, 
                                  borderColor: 'var(--surface-elevated)' 
                                }}></div>
                                <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>
                                  Primary: {productAssets.brand_colors.primary}
                                </span>
                              </div>
                            )}
                            {productAssets.brand_colors?.secondary && (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded border-2" style={{ 
                                  background: productAssets.brand_colors.secondary, 
                                  borderColor: 'var(--surface-elevated)' 
                                }}></div>
                                <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>
                                  Secondary: {productAssets.brand_colors.secondary}
                                </span>
                              </div>
                            )}
                            {productAssets.brand_colors?.accent && (
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded border-2" style={{ 
                                  background: productAssets.brand_colors.accent, 
                                  borderColor: 'var(--surface-elevated)' 
                                }}></div>
                                <span className="text-caption" style={{ color: 'var(--text-tertiary)' }}>
                                  Accent: {productAssets.brand_colors.accent}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
                      <p className="text-caption" style={{ color: 'var(--brand-gold)' }}>
                        ✓ This image and brand assets are integrated into all AI generation prompts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Product Overview */}
            {briefData?.client_brief && (
              <div className="card-luxury">
                <div className="flex items-start gap-4">
                  <Target className="w-8 h-8 mt-1" style={{ color: 'var(--brand-gold)' }} />
                  <div>
                    <h2 className="text-title mb-4" style={{ color: 'var(--text-primary)' }}>
                      Product Overview
                    </h2>
                    <p className="text-body-large" style={{ color: 'var(--text-secondary)' }}>
                      {briefData.client_brief.product_overview}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Target Audience Profile */}
            {briefData?.client_brief && (
              <div className="card-luxury">
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 mt-1" style={{ color: 'var(--brand-gold)' }} />
                  <div className="flex-1">
                    <h2 className="text-title mb-4" style={{ color: 'var(--text-primary)' }}>
                      Target Audience Intelligence
                    </h2>
                    <p className="text-body-large mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {briefData.client_brief.target_audience_profile}
                    </p>
                    
                    {/* Audience Data Summary */}
                    {audienceData.demographics && (
                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        {audienceData.demographics.age_ranges?.length > 0 && (
                          <div className="p-4 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                            <p className="font-medium mb-2" style={{ color: 'var(--brand-gold)' }}>Age Groups:</p>
                            <p className="text-body" style={{ color: 'var(--text-primary)' }}>
                              {audienceData.demographics.age_ranges.join(', ')}
                            </p>
                          </div>
                        )}
                        {audienceData.demographics.income_levels?.length > 0 && (
                          <div className="p-4 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                            <p className="font-medium mb-2" style={{ color: 'var(--brand-gold)' }}>Income Brackets:</p>
                            <p className="text-body" style={{ color: 'var(--text-primary)' }}>
                              {audienceData.demographics.income_levels.join(', ')}
                            </p>
                          </div>
                        )}
                        {audienceData.psychographics?.core_values?.length > 0 && (
                          <div className="p-4 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                            <p className="font-medium mb-2" style={{ color: 'var(--brand-gold)' }}>Core Values:</p>
                            <p className="text-body" style={{ color: 'var(--text-primary)' }}>
                              {audienceData.psychographics.core_values.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Creative Guidelines */}
            {briefData?.client_brief && (
              <div className="card-luxury">
                <div className="flex items-start gap-4">
                  <Palette className="w-8 h-8 mt-1" style={{ color: 'var(--brand-gold)' }} />
                  <div>
                    <h2 className="text-title mb-4" style={{ color: 'var(--text-primary)' }}>
                      Creative Guidelines
                    </h2>
                    <p className="text-body-large" style={{ color: 'var(--text-secondary)' }}>
                      {briefData.client_brief.creative_guidelines}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Storyboard Tab */}
        {activeTab === 'storyboard' && briefData?.storyboard && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="card-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Video className="w-6 h-6" style={{ color: 'var(--brand-gold)' }} />
                <div>
                  <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                    {briefData.storyboard.title}
                  </h2>
                  {briefData.storyboard.product_name && (
                    <p className="text-caption" style={{ color: 'var(--brand-gold)' }}>
                      Product: {briefData.storyboard.product_name}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid gap-6">
                {briefData.storyboard.scenes?.map((scene: any, index: number) => (
                  <div key={index} className="border rounded-xl p-6" style={{ borderColor: 'var(--surface-elevated)', background: 'var(--surface-secondary)' }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full center-luxury" style={{ background: 'var(--brand-gold)', color: 'var(--brand-charcoal)' }}>
                        <span className="font-bold text-lg">{scene.scene_number}</span>
                      </div>
                      <div>
                        <h3 className="text-heading" style={{ color: 'var(--text-primary)' }}>
                          Scene {scene.scene_number}
                        </h3>
                        <p className="text-caption" style={{ color: 'var(--brand-gold)' }}>
                          {scene.duration}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-body mb-4">
                      <div>
                        <p className="font-medium mb-1" style={{ color: 'var(--brand-gold)' }}>Shot & Movement:</p>
                        <p style={{ color: 'var(--text-secondary)' }}>
                          {scene.shot_type} {scene.camera_movement ? `- ${scene.camera_movement}` : ''}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium mb-1" style={{ color: 'var(--brand-gold)' }}>Lighting:</p>
                        <p style={{ color: 'var(--text-secondary)' }}>{scene.lighting}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1" style={{ color: 'var(--brand-gold)' }}>Subject & Action:</p>
                        <p style={{ color: 'var(--text-secondary)' }}>{scene.subject} - {scene.action}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1" style={{ color: 'var(--brand-gold)' }}>Audio:</p>
                        <p style={{ color: 'var(--text-secondary)' }}>{scene.audio}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t" style={{ borderColor: 'var(--surface-elevated)' }}>
                      <p className="font-medium mb-1" style={{ color: 'var(--brand-gold)' }}>Brand Integration:</p>
                      <p className="text-body" style={{ color: 'var(--text-secondary)' }}>{scene.brand_integration}</p>
                      {scene.product_reference && (
                        <div className="mt-2">
                          <p className="font-medium mb-1" style={{ color: 'var(--brand-gold)' }}>Product Reference:</p>
                          <p className="text-body" style={{ color: 'var(--text-secondary)' }}>{scene.product_reference}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t flex gap-4" style={{ borderColor: 'var(--surface-elevated)' }}>
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(briefData.storyboard, null, 2))}
                  className="btn-secondary"
                >
                  <Copy className="w-4 h-4" />
                  Copy Storyboard JSON
                </button>
                <button 
                  onClick={() => copyToClipboard(briefData.storyboard.scenes.map((s: any) => `Scene ${s.scene_number}: ${s.action}`).join('\n'))}
                  className="btn-ghost"
                >
                  Copy Scene Summary
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Photo Prompts Tab */}
        {activeTab === 'photos' && briefData?.photo_ad_prompts && (
          <div className="max-w-6xl mx-auto space-y-6">
            {Object.entries(briefData.photo_ad_prompts).map(([type, prompt]: [string, any]) => (
              <div key={type} className="card-luxury">
                <div className="flex items-center gap-3 mb-6">
                  <Image className="w-6 h-6" style={{ color: 'var(--brand-gold)' }} />
                  <h2 className="text-title capitalize" style={{ color: 'var(--text-primary)' }}>
                    {type.replace('_', ' ')} Photo
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2" style={{ color: 'var(--brand-gold)' }}>Nano Banana Prompt:</p>
                    <p className="text-body-large p-4 rounded-lg" style={{ background: 'var(--surface-secondary)', color: 'var(--text-primary)' }}>
                      {prompt.prompt}
                    </p>
                  </div>
                  
                  {prompt.technical_specs && (
                    <div>
                      <p className="font-medium mb-2" style={{ color: 'var(--brand-gold)' }}>Technical Specifications:</p>
                      <p className="text-body p-4 rounded-lg" style={{ background: 'var(--surface-secondary)', color: 'var(--text-secondary)' }}>
                        {prompt.technical_specs}
                      </p>
                    </div>
                  )}
                  
                  {prompt.brand_elements && (
                    <div>
                      <p className="font-medium mb-2" style={{ color: 'var(--brand-gold)' }}>Brand Integration:</p>
                      <p className="text-body p-4 rounded-lg" style={{ background: 'var(--surface-secondary)', color: 'var(--text-secondary)' }}>
                        {prompt.brand_elements}
                      </p>
                    </div>
                  )}

                  {prompt.product_focus && (
                    <div>
                      <p className="font-medium mb-2" style={{ color: 'var(--brand-gold)' }}>Product Focus:</p>
                      <p className="text-body p-4 rounded-lg" style={{ background: 'var(--surface-secondary)', color: 'var(--text-secondary)' }}>
                        {prompt.product_focus}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 pt-4 border-t flex gap-4" style={{ borderColor: 'var(--surface-elevated)' }}>
                  <button 
                    onClick={() => copyToClipboard(prompt.prompt)}
                    className="btn-secondary"
                  >
                    <Copy className="w-4 h-4" />
                    Copy {type.replace('_', ' ')} Prompt
                  </button>
                  <button 
                    onClick={() => copyToClipboard(JSON.stringify(prompt, null, 2))}
                    className="btn-ghost"
                  >
                    Copy Complete Spec
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Storyline Tab */}
        {activeTab === 'storyline' && briefData?.ad_storyline && (
          <div className="max-w-6xl mx-auto">
            <div className="card-luxury">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6" style={{ color: 'var(--brand-gold)' }} />
                <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                  Advertisement Storyline
                </h2>
              </div>
              
              <div className="space-y-6">
                {Object.entries(briefData.ad_storyline).map(([key, value]: [string, any]) => (
                  <div key={key}>
                    <h3 className="text-heading mb-3 capitalize" style={{ color: 'var(--brand-gold)' }}>
                      {key.replace('_', ' ')}
                    </h3>
                    <p className="text-body-large p-4 rounded-lg" style={{ background: 'var(--surface-secondary)', color: 'var(--text-secondary)' }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t flex gap-4" style={{ borderColor: 'var(--surface-elevated)' }}>
                <button 
                  onClick={() => copyToClipboard(JSON.stringify(briefData.ad_storyline, null, 2))}
                  className="btn-secondary"
                >
                  <Copy className="w-4 h-4" />
                  Copy Complete Storyline
                </button>
                <button 
                  onClick={() => copyToClipboard(briefData.ad_storyline.narrative_arc)}
                  className="btn-ghost"
                >
                  Copy Narrative Arc
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Premium Action Buttons */}
        <div className="flex justify-center gap-6 mt-16">
          <Link href="/questionnaire">
            <button className="btn-secondary px-8 py-4">
              ← Edit Intelligence Profile
            </button>
          </Link>
          
          <button 
            onClick={() => {
              const exportData = {
                product_assets: productAssets,
                audience_intelligence: audienceData,
                generated_content: briefData,
                generation_info: {
                  source: apiSource,
                  timestamp: new Date().toISOString(),
                  product_name: productAssets.name
                }
              }
              const dataStr = JSON.stringify(exportData, null, 2)
              const dataBlob = new Blob([dataStr], {type: 'application/json'})
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement('a')
              link.href = url
              link.download = `${productAssets.name || 'adgenius'}-complete-brief.json`
              link.click()
            }}
            className="btn-secondary px-8 py-4"
          >
            <Download className="w-4 h-4" />
            Export Complete Brief
          </button>
          
          <button className="btn-primary px-8 py-4">
            🚀 Generate Campaign Assets
          </button>
        </div>
      </div>
    </main>
  )
}