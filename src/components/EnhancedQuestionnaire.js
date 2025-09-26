import React, { useState } from 'react';
import { ChevronRight, Check, Zap, Target, Palette, Users, TrendingUp, DollarSign, Brain, Package, Upload, MapPin, Heart, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

// Define proper TypeScript interfaces
interface QuestionOption {
  value: string;
  label: string;
  positioning?: string;
  preview?: string;
}

interface Question {
  id: number;
  category: string;
  title: string;
  question: string;
  type: string;
  icon: React.ReactElement;
  options?: QuestionOption[];
  max_selections?: number;
  placeholder?: string;
  followUp?: string;
}

interface AnswerData {
  [key: number]: string | string[] | {
    product_name?: string;
    product_description?: string;
    product_category?: string;
    product_image?: string;
    primary_color?: string;
    secondary_color?: string;
    accent_color?: string;
    brand_font?: string;
    age_ranges?: string[];
    income_levels?: string[];
    core_values?: string[];
    research_behavior?: string;
    media_consumption?: string[];
  };
}

interface EnhancedData {
  product_assets: {
    name: string;
    category: string;
    description: string;
    image: string | null;
    brand_colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    typography: string;
  };
  audience_intelligence: {
    demographics: {
      age_ranges: string[];
      income_levels: string[];
      lifestyle_profile: string;
    };
    psychographics: {
      core_values: string[];
      lifestyle_stage: string;
    };
    behavioral: {
      research_behavior: string;
      media_consumption: string[];
    };
  };
  brand_strategy: {
    personality: string;
    competitive_position: string;
    visual_style: string;
    campaign_objective: string;
  };
  psychology_insights: {
    purchase_process: string;
    value_proposition: string;
  };
}

const EnhancedQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<AnswerData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      category: "Product Intelligence",
      title: "Product & Brand Assets",
      question: "Let's capture your product details for precise AI generation...",
      type: "comprehensive_product",
      icon: <Package className="w-6 h-6" />
    },
    {
      id: 2,
      category: "Brand DNA",
      title: "Brand Personality",
      question: "At a networking event, your brand would be the one that...",
      type: "single_choice",
      icon: <Zap className="w-6 h-6" />,
      options: [
        { value: 'thought_leader', label: 'Everyone turns to for the latest industry insights' },
        { value: 'trusted_advisor', label: 'People seek out for reliable, proven solutions' },
        { value: 'creative_disruptor', label: 'Challenges conventions with bold, innovative ideas' },
        { value: 'empathetic_guide', label: 'Makes complex problems feel manageable' },
        { value: 'results_driver', label: 'Focuses on delivering measurable outcomes' }
      ]
    },
    {
      id: 3,
      category: "Target Audience Intelligence",
      title: "Customer Demographics & Psychology",
      question: "Your ideal customers are...",
      type: "audience_profiling",
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 4,
      category: "Value Proposition",
      title: "Problem & Solution",
      question: "The core problem your product solves is...",
      type: "text_with_choices",
      icon: <Target className="w-6 h-6" />,
      placeholder: "Describe the specific problem customers struggle with, your solution, and any proof that validates your approach...",
      followUp: "What alternatives are customers currently using that fall short?",
      options: [
        { value: 'time_efficiency', label: 'Saves significant time' },
        { value: 'cost_reduction', label: 'Reduces costs measurably' },
        { value: 'quality_improvement', label: 'Improves quality/results' },
        { value: 'risk_mitigation', label: 'Reduces risk/uncertainty' },
        { value: 'experience_enhancement', label: 'Enhances user experience' }
      ]
    },
    {
      id: 5,
      category: "Customer Psychology",
      title: "Purchase Decision Process",
      question: "When customers decide to buy, they typically...",
      type: "single_choice",
      icon: <Brain className="w-6 h-6" />,
      options: [
        { value: 'high_involvement', label: 'Research extensively, compare options, and make calculated decisions' },
        { value: 'medium_involvement', label: 'Do moderate research but rely heavily on recommendations' },
        { value: 'low_involvement', label: 'Buy quickly based on emotion, impulse, or immediate need' }
      ]
    },
    {
      id: 6,
      category: "Competitive Landscape",
      title: "Market Position",
      question: "Compared to your main competitors, you're the...",
      type: "multiple_choice",
      icon: <TrendingUp className="w-6 h-6" />,
      max_selections: 2,
      options: [
        { value: 'premium_leader', label: 'Premium choice worth paying more for', positioning: 'Premium Quality Leader' },
        { value: 'innovative_challenger', label: 'Innovative disruptor changing the game', positioning: 'Innovation Leader' },
        { value: 'value_optimizer', label: 'Smart choice that optimizes value', positioning: 'Value Leader' },
        { value: 'specialist_expert', label: 'Specialized expert in a specific niche', positioning: 'Specialist Authority' },
        { value: 'accessible_alternative', label: 'Accessible alternative to expensive options', positioning: 'Accessible Quality' }
      ],
      followUp: "What unique territory do you own that competitors cannot easily claim?"
    },
    {
      id: 7,
      category: "Visual Identity",
      title: "Brand Aesthetic",
      question: "Your brand's visual personality should feel...",
      type: "visual_choice",
      icon: <Palette className="w-6 h-6" />,
      options: [
        { value: 'premium_sophisticated', label: 'Premium & Sophisticated', preview: 'bg-gradient-to-br from-slate-900 to-slate-700 text-white' },
        { value: 'innovative_dynamic', label: 'Innovative & Dynamic', preview: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white' },
        { value: 'trustworthy_professional', label: 'Trustworthy & Professional', preview: 'bg-gradient-to-br from-blue-700 to-blue-900 text-white' },
        { value: 'approachable_warm', label: 'Approachable & Warm', preview: 'bg-gradient-to-br from-orange-400 to-red-400 text-white' },
        { value: 'bold_confident', label: 'Bold & Confident', preview: 'bg-gradient-to-br from-red-600 to-pink-600 text-white' }
      ]
    },
    {
      id: 8,
      category: "Campaign Strategy",
      title: "Strategic Focus",
      question: "This campaign's primary mission is to...",
      type: "single_choice",
      icon: <DollarSign className="w-6 h-6" />,
      options: [
        { value: 'brand_awareness', label: 'Build brand recognition and market presence' },
        { value: 'lead_generation', label: 'Generate qualified leads and prospects' },
        { value: 'sales_conversion', label: 'Drive immediate sales and revenue' },
        { value: 'market_education', label: 'Educate market about solution/category' },
        { value: 'competitive_differentiation', label: 'Establish clear differentiation from competitors' }
      ],
      followUp: "What has worked best in your previous marketing efforts?"
    }
  ];

  const currentQuestionData = questions[currentQuestion - 1];

  const handleResponse = (questionId: number, value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestionData.type === 'text_with_choices' && typeof value === 'string' && value.length > 50 && !showFollowUp) {
      setShowFollowUp(true);
    }
  };

  const handleFieldChange = (questionId: number, fieldName: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...(typeof prev[questionId] === 'object' && !Array.isArray(prev[questionId]) ? prev[questionId] : {}),
        [fieldName]: value
      }
    }));
  };

  const handleMultiSelectChange = (questionId: number, fieldName: string, optionValue: string, maxSelections?: number) => {
    const currentAnswer = answers[questionId];
    const currentField = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.[fieldName as keyof typeof currentAnswer]) || [];
    const currentSelections = Array.isArray(currentField) ? currentField : [];
    const isSelected = currentSelections.includes(optionValue);
    let newSelections: string[];
    
    if (isSelected) {
      newSelections = currentSelections.filter((item: string) => item !== optionValue);
    } else if (currentSelections.length < (maxSelections || 10)) {
      newSelections = [...currentSelections, optionValue];
    } else {
      return;
    }
    
    handleFieldChange(questionId, fieldName, newSelections as unknown as string);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        handleFieldChange(1, 'product_image', imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFollowUp(false);
    } else {
      // Process and save data
      console.log('🔍 DEBUG - Raw answers before processing:', answers);
      
      const productAssets = (typeof answers[1] === 'object' && !Array.isArray(answers[1])) ? answers[1] : {};
      const audienceData = (typeof answers[3] === 'object' && !Array.isArray(answers[3])) ? answers[3] : {};
      
      const productName = productAssets?.product_name || 'Product Name Missing';
      const productDescription = productAssets?.product_description || 'Description Missing';
      const productCategory = productAssets?.product_category || 'Category Missing';
      
      console.log('🏷️ DEBUG - Extracted product name:', productName);
      
      if (!productAssets?.product_name) {
        alert('Product name is required. Please go back and fill it in.');
        return;
      }
      
      if (!productAssets?.product_description) {
        alert('Product description is required. Please go back and fill it in.');
        return;
      }
      
      const enhancedAnswers = {
        // Legacy compatibility
        1: productDescription,
        2: answers[2] || '',
        3: answers[5] || '',
        4: answers[4] || '',
        5: Array.isArray(answers[6]) ? answers[6].join(', ') : answers[6] || '',
        6: audienceData,
        7: answers[7] || '',
        8: answers[8] || '',
        
        // Enhanced structure
        enhanced_data: {
          product_assets: {
            name: productName,
            category: productCategory,
            description: productDescription,
            image: productAssets?.product_image || null,
            brand_colors: {
              primary: productAssets?.primary_color || '#000000',
              secondary: productAssets?.secondary_color || '#FFFFFF',
              accent: productAssets?.accent_color || '#D4AF37'
            },
            typography: productAssets?.brand_font || 'Default Typography'
          },
          audience_intelligence: {
            demographics: {
              age_ranges: (typeof audienceData === 'object' && audienceData?.age_ranges) ? audienceData.age_ranges : [],
              income_levels: (typeof audienceData === 'object' && audienceData?.income_levels) ? audienceData.income_levels : [],
              lifestyle_profile: 'Not specified'
            },
            psychographics: {
              core_values: (typeof audienceData === 'object' && audienceData?.core_values) ? audienceData.core_values : [],
              lifestyle_stage: 'Not specified'
            },
            behavioral: {
              research_behavior: (typeof audienceData === 'object' && audienceData?.research_behavior) ? audienceData.research_behavior : 'Not specified',
              media_consumption: (typeof audienceData === 'object' && audienceData?.media_consumption) ? audienceData.media_consumption : []
            }
          },
          brand_strategy: {
            personality: typeof answers[2] === 'string' ? answers[2] : 'Not specified',
            competitive_position: typeof answers[6] === 'string' ? answers[6] : 'Not specified',
            visual_style: typeof answers[7] === 'string' ? answers[7] : 'Not specified',
            campaign_objective: typeof answers[8] === 'string' ? answers[8] : 'Not specified'
          },
          psychology_insights: {
            purchase_process: typeof answers[5] === 'string' ? answers[5] : 'Not specified',
            value_proposition: typeof answers[4] === 'string' ? answers[4] : 'Not specified'
          }
        } as EnhancedData
      };
      
      try {
        localStorage.setItem('questionnaireAnswers', JSON.stringify(enhancedAnswers));
        localStorage.setItem('questionnaireCompleted', 'true');
        console.log('✅ DEBUG - Data saved to localStorage successfully');
      } catch (error) {
        console.error('❌ DEBUG - Failed to save to localStorage:', error);
        alert('Failed to save questionnaire data. Please try again.');
        return;
      }
      
      setIsComplete(true);
      setTimeout(() => {
        window.location.href = '/brief';
      }, 2000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFollowUp(false);
    }
  };

  const isFormValid = () => {
    if (currentQuestionData.type === 'comprehensive_product') {
      const currentAnswer = answers[currentQuestion];
      const currentAnswers = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer)) ? currentAnswer : {};
      return currentAnswers.product_name && currentAnswers.product_description && currentAnswers.product_category;
    }
    if (currentQuestionData.type === 'audience_profiling') {
      const currentAnswer = answers[currentQuestion];
      const currentAnswers = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer)) ? currentAnswer : {};
      return (currentAnswers.age_ranges as string[] | undefined)?.length && 
             (currentAnswers.income_levels as string[] | undefined)?.length && 
             (currentAnswers.core_values as string[] | undefined)?.length;
    }
    return !!answers[currentQuestion];
  };

  // Enhanced Completion Screen
  if (isComplete) {
    return (
      <main className="min-h-screen center-luxury" style={{ background: 'var(--surface-primary)' }}>
        <div className="text-center fade-in-luxury">
          <div className="w-32 h-32 rounded-full center-luxury mx-auto mb-8"
               style={{ 
                 background: 'linear-gradient(135deg, var(--brand-gold), #F4D03F)',
                 boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)'
               }}>
            <Check className="w-16 h-16" style={{ color: 'var(--brand-charcoal)' }} />
          </div>
          <h2 className="text-display mb-6" style={{ color: 'var(--text-primary)' }}>
            Strategic Intelligence Captured
          </h2>
          <p className="text-subheading mb-8" style={{ color: 'var(--text-secondary)' }}>
            Generating comprehensive marketing brief with brand assets...
          </p>
          <div className="progress-luxury max-w-lg mx-auto">
            <div className="progress-fill" style={{ width: '100%' }}></div>
          </div>
          <p className="text-caption mt-4" style={{ color: 'var(--brand-gold)' }}>
            Including product imagery and brand colors for AI generation
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen center-luxury px-8" style={{ background: 'var(--surface-primary)' }}>
      <div className="container-luxury">
        
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="flex-luxury justify-center mb-8">
            <div className="w-20 h-20 rounded-full center-luxury"
                 style={{ 
                   background: 'linear-gradient(135deg, var(--brand-gold), #F4D03F)',
                   boxShadow: 'var(--shadow-gold)'
                 }}>
              {currentQuestionData.icon}
            </div>
            <div className="ml-6 text-left">
              <h1 className="text-hero" style={{ color: 'var(--text-primary)' }}>
                {currentQuestionData.category}
              </h1>
              <p className="text-subheading mt-2" style={{ color: 'var(--brand-gold)' }}>
                {currentQuestionData.title}
              </p>
            </div>
          </div>
          
          {/* Premium Progress Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="flex justify-between text-caption mb-4" style={{ color: 'var(--text-tertiary)' }}>
              <span>Question {currentQuestion} of {questions.length}</span>
              <span>{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
            </div>
            <div className="progress-luxury">
              <div 
                className="progress-fill"
                style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Premium Question Card */}
        <div className="card-question max-w-5xl mx-auto fade-in-luxury">
          <div className="text-center mb-12">
            <h2 className="text-title mb-6" style={{ color: 'var(--text-primary)' }}>
              {currentQuestionData.question}
            </h2>
          </div>

          {/* Comprehensive Product Form */}
          {currentQuestionData.type === 'comprehensive_product' && (
            <div className="space-y-8">
              {/* Product Name */}
              <div className="space-y-3">
                <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300"
                  style={{
                    background: 'var(--surface-secondary)',
                    borderColor: 'var(--surface-elevated)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-base)'
                  }}
                  placeholder="e.g., TaskMaster Pro, Colgate Total Advanced, Marketing Mastery Course"
                  value={
                    (typeof answers[1] === 'object' && !Array.isArray(answers[1]) && answers[1]?.product_name) || ''
                  }
                  onChange={(e) => handleFieldChange(1, 'product_name', e.target.value)}
                />
              </div>

              {/* Product Image Upload */}
              <div className="space-y-3">
                <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>
                  Product Image/Logo
                </label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center transition-colors"
                     style={{ 
                       borderColor: 'var(--surface-elevated)',
                       background: 'var(--surface-secondary)'
                     }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="product-image-upload"
                  />
                  <label htmlFor="product-image-upload" className="cursor-pointer">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <Image 
                          src={uploadedImage} 
                          alt="Product preview" 
                          width={128}
                          height={128}
                          className="object-cover rounded-lg mx-auto border-2"
                          style={{ borderColor: 'var(--brand-gold)' }}
                        />
                        <p className="text-body font-medium" style={{ color: 'var(--brand-gold)' }}>
                          ✓ Image uploaded successfully
                        </p>
                        <p className="text-caption" style={{ color: 'var(--text-tertiary)' }}>
                          This will be included in AI generation
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 mx-auto" style={{ color: 'var(--text-tertiary)' }} />
                        <div>
                          <p className="text-body-large font-medium" style={{ color: 'var(--text-primary)' }}>
                            Click to upload product image
                          </p>
                          <p className="text-caption mt-2" style={{ color: 'var(--text-tertiary)' }}>
                            Upload for AI to generate realistic product visuals
                          </p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Brand Colors */}
              <div className="space-y-3">
                <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>
                  Brand Colors
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'primary_color', label: 'Primary', default: '#000000' },
                    { name: 'secondary_color', label: 'Secondary', default: '#FFFFFF' },
                    { name: 'accent_color', label: 'Accent', default: '#D4AF37' }
                  ].map((colorField) => {
                    const currentAnswer = answers[1];
                    const colorValue = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.[colorField.name as keyof typeof currentAnswer]) || colorField.default;
                    
                    return (
                      <div key={colorField.name} className="space-y-2">
                        <label className="text-body font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {colorField.label}
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={typeof colorValue === 'string' ? colorValue : colorField.default}
                            onChange={(e) => handleFieldChange(1, colorField.name, e.target.value)}
                            className="w-12 h-12 rounded-lg border-2 cursor-pointer"
                            style={{ borderColor: 'var(--surface-elevated)' }}
                          />
                          <input
                            type="text"
                            value={typeof colorValue === 'string' ? colorValue : colorField.default}
                            onChange={(e) => handleFieldChange(1, colorField.name, e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg border-2"
                            style={{
                              background: 'var(--surface-secondary)',
                              borderColor: 'var(--surface-elevated)',
                              color: 'var(--text-primary)',
                              fontSize: 'var(--font-size-sm)'
                            }}
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Brand Typography */}
              <div className="space-y-3">
                <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>
                  Brand Typography
                </label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300"
                  style={{
                    background: 'var(--surface-secondary)',
                    borderColor: 'var(--surface-elevated)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-base)'
                  }}
                  placeholder="e.g., Helvetica Bold, Montserrat, or describe your logo font style"
                  value={
                    (typeof answers[1] === 'object' && !Array.isArray(answers[1]) && answers[1]?.brand_font) || ''
                  }
                  onChange={(e) => handleFieldChange(1, 'brand_font', e.target.value)}
                />
              </div>

              {/* Specific Product Category */}
              <div className="space-y-3">
                <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>
                  Specific Product Type
                </label>
                <div className="relative">
                  <select
                    className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 appearance-none"
                    style={{
                      background: 'var(--surface-secondary)',
                      borderColor: 'var(--surface-elevated)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--font-size-base)',
                      backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23D4AF37' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                      backgroundPosition: 'right 16px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '20px',
                      paddingRight: '50px',
                      height: '56px'
                    }}
                    value={
                      (typeof answers[1] === 'object' && !Array.isArray(answers[1]) && answers[1]?.product_category) || ''
                    }
                    onChange={(e) => handleFieldChange(1, 'product_category', e.target.value)}
                  >
                    <option value="">Select specific product type...</option>
                    <optgroup label="🖥️ Technology">
                      <option value="saas_platform">SaaS/Software Platform</option>
                      <option value="mobile_app">Mobile Application</option>
                      <option value="software_tool">Software Tool/Utility</option>
                      <option value="ai_service">AI/Machine Learning Service</option>
                    </optgroup>
                    <optgroup label="🧴 Health & Beauty">
                      <option value="skincare">Skincare Product</option>
                      <option value="oral_care">Oral Care/Toothpaste</option>
                      <option value="supplement">Health Supplement/Vitamin</option>
                      <option value="cosmetic">Cosmetic/Makeup Product</option>
                      <option value="personal_care">Personal Care Product</option>
                    </optgroup>
                    <optgroup label="🛍️ Consumer Products">
                      <option value="fashion_apparel">Fashion/Apparel</option>
                      <option value="home_kitchen">Home/Kitchen Product</option>
                      <option value="electronics">Electronics/Gadget</option>
                      <option value="food_beverage">Food/Beverage Product</option>
                      <option value="automotive">Automotive Product</option>
                    </optgroup>
                    <optgroup label="💼 Professional Services">
                      <option value="business_consulting">Business Consulting</option>
                      <option value="personal_coaching">Personal/Business Coaching</option>
                      <option value="marketing_agency">Marketing/Design Agency</option>
                      <option value="legal_financial">Legal/Financial Service</option>
                    </optgroup>
                    <optgroup label="📚 Education">
                      <option value="online_course">Online Course/Training</option>
                      <option value="certification">Certification Program</option>
                      <option value="educational_content">Educational Content/Books</option>
                      <option value="workshop_seminar">Workshop/Seminar</option>
                    </optgroup>
                    <optgroup label="🔄 Subscription">
                      <option value="subscription_box">Subscription Box</option>
                      <option value="membership_community">Membership/Community</option>
                      <option value="software_subscription">Software Subscription</option>
                      <option value="content_subscription">Content Subscription</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-3">
                <label className="text-subheading font-medium" style={{ color: 'var(--brand-gold)' }}>
                  Product Description *
                </label>
                <textarea
                  className="input-luxury w-full"
                  placeholder="Brief description of what your product does and key benefits..."
                  value={
                    (typeof answers[1] === 'object' && !Array.isArray(answers[1]) && answers[1]?.product_description) || ''
                  }
                  onChange={(e) => handleFieldChange(1, 'product_description', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Audience Profiling */}
          {currentQuestionData.type === 'audience_profiling' && (
            <div className="space-y-10">
              {/* Demographics Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6" style={{ color: 'var(--brand-gold)' }} />
                  <h3 className="text-heading" style={{ color: 'var(--brand-gold)' }}>Demographics</h3>
                </div>
                
                {/* Age Ranges */}
                <div className="space-y-3">
                  <label className="text-subheading font-medium" style={{ color: 'var(--text-primary)' }}>
                    Age Groups (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "gen_z", label: "Gen Z (18-26): Digital natives, socially conscious" },
                      { value: "millennial", label: "Millennials (27-42): Career-focused, tech-savvy" },
                      { value: "gen_x", label: "Gen X (43-58): Established, family-oriented" },
                      { value: "boomer", label: "Boomers (59+): Experienced, value-conscious" }
                    ].map((option) => {
                      const currentAnswer = answers[3];
                      const ageRanges = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.age_ranges) || [];
                      const isSelected = Array.isArray(ageRanges) && ageRanges.includes(option.value);

                      return (
                        <button
                          key={option.value}
                          onClick={() => handleMultiSelectChange(3, 'age_ranges', option.value, 4)}
                          className={`choice-option scale-luxury text-left ${isSelected ? 'selected' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-body font-medium">{option.label}</span>
                            {isSelected && (
                              <Check className="w-5 h-5" style={{ color: 'var(--brand-charcoal)' }} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-caption text-center" style={{ color: 'var(--text-tertiary)' }}>
                    Selected: {
                      (() => {
                        const currentAnswer = answers[3];
                        const ageRanges = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.age_ranges) || [];
                        return Array.isArray(ageRanges) ? ageRanges.length : 0;
                      })()
                    } age groups
                  </p>
                </div>

                {/* Income Levels - Multiple Selection */}
                <div className="space-y-3">
                  <label className="text-subheading font-medium" style={{ color: 'var(--text-primary)' }}>
                    Income Brackets (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "budget_conscious", label: "Budget-Conscious ($25-50k)" },
                      { value: "middle_market", label: "Middle Market ($50-100k)" },
                      { value: "affluent", label: "Affluent ($100-200k)" },
                      { value: "luxury", label: "Luxury Market ($200k+)" }
                    ].map((option) => {
                      const currentAnswer = answers[3];
                      const incomeLevels = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.income_levels) || [];
                      const isSelected = Array.isArray(incomeLevels) && incomeLevels.includes(option.value);

                      return (
                        <button
                          key={option.value}
                          onClick={() => handleMultiSelectChange(3, 'income_levels', option.value, 4)}
                          className={`choice-option scale-luxury text-left ${isSelected ? 'selected' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-body font-medium">{option.label}</span>
                            {isSelected && (
                              <Check className="w-5 h-5" style={{ color: 'var(--brand-charcoal)' }} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-caption text-center" style={{ color: 'var(--text-tertiary)' }}>
                    Selected: {
                      (() => {
                        const currentAnswer = answers[3];
                        const incomeLevels = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.income_levels) || [];
                        return Array.isArray(incomeLevels) ? incomeLevels.length : 0;
                      })()
                    } income brackets
                  </p>
                </div>
              </div>

              {/* Psychographics Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6" style={{ color: 'var(--brand-gold)' }} />
                  <h3 className="text-heading" style={{ color: 'var(--brand-gold)' }}>Values & Motivations</h3>
                </div>
                
                <div className="space-y-3">
                  <label className="text-subheading font-medium" style={{ color: 'var(--text-primary)' }}>
                    They care most about... (select top 3)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "family_first", label: "Family wellbeing and safety" },
                      { value: "career_success", label: "Professional achievement and growth" },
                      { value: "health_wellness", label: "Health and personal wellness" },
                      { value: "financial_security", label: "Financial stability and smart spending" },
                      { value: "social_impact", label: "Making a positive social impact" },
                      { value: "convenience_efficiency", label: "Convenience and time efficiency" },
                      { value: "creativity_expression", label: "Creative expression and uniqueness" },
                      { value: "innovation_technology", label: "Latest technology and innovation" }
                    ].map((option) => {
                      const currentAnswer = answers[3];
                      const coreValues = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.core_values) || [];
                      const isSelected = Array.isArray(coreValues) && coreValues.includes(option.value);
                      const isDisabled = !isSelected && Array.isArray(coreValues) && coreValues.length >= 3;

                      return (
                        <button
                          key={option.value}
                          onClick={() => handleMultiSelectChange(3, 'core_values', option.value, 3)}
                          className={`choice-option scale-luxury text-left ${isSelected ? 'selected' : ''}`}
                          disabled={isDisabled}
                          style={{
                            opacity: isDisabled ? 0.5 : 1
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-body font-medium">{option.label}</span>
                            {isSelected && (
                              <Check className="w-5 h-5" style={{ color: 'var(--brand-charcoal)' }} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-caption text-center" style={{ color: 'var(--text-tertiary)' }}>
                    Selected: {
                      (() => {
                        const currentAnswer = answers[3];
                        const coreValues = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.core_values) || [];
                        return Array.isArray(coreValues) ? coreValues.length : 0;
                      })()
                    }/3 core values
                  </p>
                </div>
              </div>

              {/* Behavioral Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="w-6 h-6" style={{ color: 'var(--brand-gold)' }} />
                  <h3 className="text-heading" style={{ color: 'var(--brand-gold)' }}>Shopping & Media Behavior</h3>
                </div>
                
                <div className="space-y-3">
                  <label className="text-subheading font-medium" style={{ color: 'var(--text-primary)' }}>
                    Research Approach
                  </label>
                  <div className="grid gap-3">
                    {[
                      { value: "extensive_researcher", label: "Research extensively across multiple sources" },
                      { value: "review_reader", label: "Read reviews and compare a few options" },
                      { value: "recommendation_follower", label: "Follow trusted recommendations quickly" },
                      { value: "impulse_buyer", label: "Buy quickly when they see value" }
                    ].map((option) => {
                      const currentAnswer = answers[3];
                      const researchBehavior = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.research_behavior);
                      const isSelected = researchBehavior === option.value;

                      return (
                        <button
                          key={option.value}
                          onClick={() => handleFieldChange(3, 'research_behavior', option.value)}
                          className={`choice-option scale-luxury ${isSelected ? 'selected' : ''}`}
                        >
                          <span className="text-body font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-subheading font-medium" style={{ color: 'var(--text-primary)' }}>
                    Primary Media Channels (select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "social_media", label: "Social Media (Instagram, TikTok, Facebook)" },
                      { value: "google_search", label: "Google Search & YouTube" },
                      { value: "email_newsletters", label: "Email newsletters and blogs" },
                      { value: "word_of_mouth", label: "Word-of-mouth and referrals" },
                      { value: "traditional_media", label: "TV, radio, print media" },
                      { value: "podcast_audio", label: "Podcasts and audio content" },
                      { value: "linkedin_professional", label: "LinkedIn and professional networks" }
                    ].map((option) => {
                      const currentAnswer = answers[3];
                      const mediaConsumption = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.media_consumption) || [];
                      const isSelected = Array.isArray(mediaConsumption) && mediaConsumption.includes(option.value);

                      return (
                        <button
                          key={option.value}
                          onClick={() => handleMultiSelectChange(3, 'media_consumption', option.value, 7)}
                          className={`choice-option scale-luxury text-left ${isSelected ? 'selected' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-body font-medium">{option.label}</span>
                            {isSelected && (
                              <Check className="w-5 h-5" style={{ color: 'var(--brand-charcoal)' }} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-caption text-center" style={{ color: 'var(--text-tertiary)' }}>
                    Selected: {
                      (() => {
                        const currentAnswer = answers[3];
                        const mediaConsumption = (typeof currentAnswer === 'object' && !Array.isArray(currentAnswer) && currentAnswer?.media_consumption) || [];
                        return Array.isArray(mediaConsumption) ? mediaConsumption.length : 0;
                      })()
                    } media channels
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Single Choice Questions */}
          {currentQuestionData.type === 'single_choice' && (
            <div className="grid gap-4">
              {currentQuestionData.options?.map((option: QuestionOption) => (
                <button
                  key={option.value}
                  onClick={() => handleResponse(currentQuestionData.id, option.value)}
                  className={`choice-option scale-luxury group ${answers[currentQuestionData.id] === option.value ? 'selected' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-body-large font-medium">{option.label}</span>
                    <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Multiple Choice */}
          {currentQuestionData.type === 'multiple_choice' && (
            <div className="grid gap-4">
              {currentQuestionData.options?.map((option: QuestionOption) => {
                const currentSelections = answers[currentQuestionData.id] as string[] || [];
                const isSelected = currentSelections.includes(option.value);
                
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      let newSelections: string[];
                      
                      if (isSelected) {
                        newSelections = currentSelections.filter((item: string) => item !== option.value);
                      } else if (currentSelections.length < (currentQuestionData.max_selections || 3)) {
                        newSelections = [...currentSelections, option.value];
                      } else {
                        return;
                      }
                      
                      handleResponse(currentQuestionData.id, newSelections);
                    }}
                    className={`choice-option scale-luxury ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-body-large font-semibold mb-1">{option.label}</div>
                        <div className="text-caption" style={{ color: 'var(--text-tertiary)' }}>
                          {option.positioning}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-6 h-6" style={{ color: 'var(--brand-charcoal)' }} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Visual Choice */}
          {currentQuestionData.type === 'visual_choice' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentQuestionData.options?.map((option: QuestionOption) => (
                <button
                  key={option.value}
                  onClick={() => handleResponse(currentQuestionData.id, option.value)}
                  className={`visual-choice ${option.preview} ${answers[currentQuestionData.id] === option.value ? 'selected' : ''}`}
                >
                  <div className="text-center">
                    <div className="text-heading font-bold mb-4">{option.label}</div>
                    {answers[currentQuestionData.id] === option.value && (
                      <div className="w-8 h-8 rounded-full center-luxury mx-auto"
                           style={{ background: 'var(--brand-gold)' }}>
                        <Check className="w-5 h-5" style={{ color: 'var(--brand-charcoal)' }} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Text with Choices */}
          {currentQuestionData.type === 'text_with_choices' && (
            <div className="space-y-8">
              <textarea
                className="input-luxury w-full"
                placeholder={currentQuestionData.placeholder}
                value={typeof answers[currentQuestionData.id] === 'string' ? answers[currentQuestionData.id] : ''}
                onChange={(e) => handleResponse(currentQuestionData.id, e.target.value)}
              />
              
              {currentQuestionData.options && (
                <div>
                  <p className="text-subheading text-center mb-6" style={{ color: 'var(--brand-gold)' }}>
                    Primary impact area:
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {currentQuestionData.options.map((option: QuestionOption) => (
                      <button
                        key={option.value}
                        className="btn-ghost px-6 py-3"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Follow-up Question */}
          {showFollowUp && currentQuestionData.followUp && (
            <div className="mt-8 p-6 rounded-xl fade-in-luxury"
                 style={{ 
                   background: 'var(--brand-gold)', 
                   color: 'var(--brand-charcoal)' 
                 }}>
              <p className="text-body font-bold mb-2">Follow-up:</p>
              <p className="text-body-large">{currentQuestionData.followUp}</p>
            </div>
          )}

          {/* Premium Navigation */}
          <div className="flex justify-between items-center mt-16 pt-8"
               style={{ borderTop: `1px solid var(--surface-elevated)` }}>
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 1}
              className="btn-secondary"
              style={{
                opacity: currentQuestion === 1 ? 0.4 : 1,
                cursor: currentQuestion === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isFormValid()}
              className="btn-primary scale-luxury"
              style={{
                opacity: !isFormValid() ? 0.5 : 1,
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)'
              }}
            >
              <span>{currentQuestion === questions.length ? 'Generate Brief' : 'Next Question'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Premium Question Dots */}
        <div className="flex justify-center mt-12 gap-4">
          {questions.map((q: Question, index: number) => (
            <div
              key={q.id}
              className={`question-dot ${
                index + 1 === currentQuestion ? 'active' : 
                index + 1 < currentQuestion ? 'complete' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default EnhancedQuestionnaire;



