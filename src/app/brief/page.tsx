'use client';

import React, { useState, useEffect } from 'react';
import { Download, Copy, Zap, Target, Palette, Users, Film, Image as ImageIcon, FileText, Play } from 'lucide-react';

interface BriefData {
  storyboard?: {
    title?: string;
    product_name?: string;
    scenes?: Array<{
      scene_number: number;
      duration: string;
      shot_type: string;
      action: string;
      lighting: string;
      subject: string;
      brand_integration?: string;
      product_reference?: string;
    }>;
  };
  photo_ad_prompts?: {
    [key: string]: {
      prompt: string;
      brand_elements?: string;
      technical_specs?: string;
      product_focus?: string;
    };
  };
  client_brief?: {
    product_overview?: string;
    target_audience_profile?: string;
    psychology_strategy?: string;
    creative_guidelines?: string;
    [key: string]: string | undefined;
  };
  ad_storyline?: {
    [key: string]: string;
  };
}

const BriefPage = () => {
  const [briefData, setBriefData] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedSection, setCopiedSection] = useState('');

  useEffect(() => {
    const savedAnswers = localStorage.getItem('questionnaireAnswers');
    const isCompleted = localStorage.getItem('questionnaireCompleted');

    if (!savedAnswers || !isCompleted) {
      window.location.href = '/questionnaire';
      return;
    }

    generateBrief(JSON.parse(savedAnswers));
  }, []);

  const generateBrief = async (answers: unknown) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-prompts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      const result = await response.json();

      if (result.success) {
        setBriefData(result.data);
      } else {
        setError(result.error || 'Failed to generate brief');
        if (result.data) {
          setBriefData(result.data);
        }
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Brief generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(''), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const downloadAsJSON = () => {
    const dataStr = JSON.stringify(briefData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${briefData?.storyboard?.product_name || 'AdGenius'}_marketing_brief.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <main className="min-h-screen center-luxury" style={{ background: 'var(--surface-primary)' }}>
        <div className="text-center fade-in-luxury">
          <div className="w-32 h-32 rounded-full center-luxury mx-auto mb-8"
               style={{ 
                 background: 'linear-gradient(135deg, var(--brand-gold), #F4D03F)',
                 animation: 'spin 2s linear infinite'
               }}>
            <Zap className="w-16 h-16" style={{ color: 'var(--brand-charcoal)' }} />
          </div>
          <h2 className="text-display mb-6" style={{ color: 'var(--text-primary)' }}>
            Generating Your Marketing Brief
          </h2>
          <p className="text-subheading mb-8" style={{ color: 'var(--text-secondary)' }}>
            Processing brand intelligence with advanced psychology...
          </p>
          <div className="progress-luxury max-w-lg mx-auto">
            <div className="progress-fill" style={{ width: '75%' }}></div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !briefData) {
    return (
      <main className="min-h-screen center-luxury px-8" style={{ background: 'var(--surface-primary)' }}>
        <div className="text-center max-w-2xl">
          <div className="w-24 h-24 rounded-full center-luxury mx-auto mb-8 bg-red-600">
            <Target className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-title mb-6" style={{ color: 'var(--text-primary)' }}>
            Generation Error
          </h2>
          <p className="text-body mb-8" style={{ color: 'var(--text-secondary)' }}>
            {error}
          </p>
          <button 
            onClick={() => window.location.href = '/questionnaire'}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!briefData) {
    return (
      <main className="min-h-screen center-luxury">
        <div className="text-center">
          <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
            No brief data available. Please complete the questionnaire first.
          </p>
          <button 
            onClick={() => window.location.href = '/questionnaire'}
            className="btn-primary mt-4"
          >
            Start Questionnaire
          </button>
        </div>
      </main>
    );
  }

  const productName = briefData.storyboard?.product_name || briefData.client_brief?.product_overview?.split(' ')[0] || 'Your Product';

  return (
    <main className="min-h-screen px-8 py-12" style={{ background: 'var(--surface-primary)' }}>
      <div className="container-luxury">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex-luxury justify-center mb-8">
            <div className="w-20 h-20 rounded-full center-luxury mr-6"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--brand-gold), #F4D03F)',
                   boxShadow: 'var(--shadow-gold)'
                 }}>
              <Zap className="w-10 h-10" style={{ color: 'var(--brand-charcoal)' }} />
            </div>
            <div className="text-left">
              <h1 className="text-display mb-2" style={{ color: 'var(--text-primary)' }}>
                {productName} Marketing Brief
              </h1>
              <p className="text-subheading" style={{ color: 'var(--brand-gold)' }}>
                AI-Generated Campaign Assets Ready for Production
              </p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={downloadAsJSON}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Brief
            </button>
            <button 
              onClick={() => window.location.href = '/questionnaire'}
              className="btn-ghost"
            >
              Create New Brief
            </button>
          </div>
        </div>

        <div className="grid gap-8 max-w-7xl mx-auto">

          {/* Video Storyboard */}
          {briefData.storyboard && (
            <section className="card-question">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Film className="w-8 h-8" style={{ color: 'var(--brand-gold)' }} />
                  <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                    Video Storyboard - {briefData.storyboard.title}
                  </h2>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(briefData.storyboard, null, 2), 'storyboard')}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copiedSection === 'storyboard' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="grid gap-6">
                {briefData.storyboard.scenes?.map((scene, index) => (
                  <div key={index} className="bg-slate-700 p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full center-luxury bg-yellow-400 text-slate-900 font-bold">
                        {scene.scene_number}
                      </div>
                      <div>
                        <h3 className="text-heading font-semibold" style={{ color: 'var(--text-primary)' }}>
                          Scene {scene.scene_number}
                        </h3>
                        <p className="text-body" style={{ color: 'var(--brand-gold)' }}>
                          {scene.duration}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong style={{ color: 'var(--brand-gold)' }}>Shot:</strong>
                        <p style={{ color: 'var(--text-secondary)' }}>{scene.shot_type}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--brand-gold)' }}>Action:</strong>
                        <p style={{ color: 'var(--text-secondary)' }}>{scene.action}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--brand-gold)' }}>Lighting:</strong>
                        <p style={{ color: 'var(--text-secondary)' }}>{scene.lighting}</p>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--brand-gold)' }}>Subject:</strong>
                        <p style={{ color: 'var(--text-secondary)' }}>{scene.subject}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Photo Ad Prompts */}
          {briefData.photo_ad_prompts && (
            <section className="card-question">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <ImageIcon className="w-8 h-8" style={{ color: 'var(--brand-gold)' }} />
                  <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                    Photo Advertisement Prompts
                  </h2>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(briefData.photo_ad_prompts, null, 2), 'photos')}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copiedSection === 'photos' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(briefData.photo_ad_prompts).map(([key, prompt], index) => (
                  <div key={key} className="bg-slate-700 p-6 rounded-xl">
                    <h3 className="text-heading capitalize mb-4" style={{ color: 'var(--brand-gold)' }}>
                      {key.replace(/_/g, ' ')}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong style={{ color: 'var(--text-primary)' }}>Prompt:</strong>
                        <p style={{ color: 'var(--text-secondary)' }} className="mt-1">
                          {prompt.prompt}
                        </p>
                      </div>
                      {prompt.brand_elements && (
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Brand Elements:</strong>
                          <p style={{ color: 'var(--text-secondary)' }} className="mt-1">
                            {prompt.brand_elements}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Client Brief */}
          {briefData.client_brief && (
            <section className="card-question">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8" style={{ color: 'var(--brand-gold)' }} />
                  <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                    Strategic Brief
                  </h2>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(briefData.client_brief, null, 2), 'brief')}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copiedSection === 'brief' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="space-y-6">
                {Object.entries(briefData.client_brief).map(([key, value]) => (
                  <div key={key} className="bg-slate-700 p-6 rounded-xl">
                    <h3 className="text-heading capitalize mb-3" style={{ color: 'var(--brand-gold)' }}>
                      {key.replace(/_/g, ' ')}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Ad Storyline */}
          {briefData.ad_storyline && (
            <section className="card-question">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Play className="w-8 h-8" style={{ color: 'var(--brand-gold)' }} />
                  <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                    Campaign Storyline
                  </h2>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(briefData.ad_storyline, null, 2), 'storyline')}
                  className="btn-ghost flex items-center gap-2 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  {copiedSection === 'storyline' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="space-y-6">
                {Object.entries(briefData.ad_storyline).map(([key, value]) => (
                  <div key={key} className="bg-slate-700 p-6 rounded-xl">
                    <h3 className="text-heading capitalize mb-3" style={{ color: 'var(--brand-gold)' }}>
                      {key.replace(/_/g, ' ')}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-16 pt-12" style={{ borderTop: `1px solid var(--surface-elevated)` }}>
          <h3 className="text-heading mb-4" style={{ color: 'var(--brand-gold)' }}>
            Ready to Generate Content?
          </h3>
          <p className="text-body mb-8" style={{ color: 'var(--text-secondary)' }}>
            Copy these prompts to Veo 3 and Nano Banana for professional content generation
          </p>
          <button 
            onClick={() => window.location.href = '/questionnaire'}
            className="btn-primary"
          >
            Create Another Brief
          </button>
        </div>
      </div>
    </main>
  );
};

export default BriefPage;