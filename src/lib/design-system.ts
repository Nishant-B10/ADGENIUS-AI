// Premium Design System - Linear-inspired with Psychology Focus
export const DesignSystem = {
  // LCH Color Space (Linear approach) - Premium Psychology-Focused Palette
  colors: {
    // Surface levels (elevation hierarchy)
    surface: {
      primary: 'lch(8% 0 0)',      // Neural black - deepest background
      secondary: 'lch(12% 2 260)',  // Slightly elevated panels  
      tertiary: 'lch(16% 4 260)',   // Cards and modals
      elevated: 'lch(20% 6 260)',   // Hover states and highlights
      interactive: 'lch(24% 8 260)' // Active selection states
    },
    
    // Text hierarchy
    text: {
      primary: 'lch(96% 0 0)',      // Main content - pure white
      secondary: 'lch(78% 0 0)',    // Supporting text
      tertiary: 'lch(58% 0 0)',     // Muted text
      accent: 'lch(70% 75 45)',     // Creative/psychology highlights
      warning: 'lch(65% 70 25)',    // Attention states
      success: 'lch(75% 60 140)',   // Success states
      error: 'lch(65% 70 15)'       // Error states
    },
    
    // Psychology-focused accent colors
    psychology: {
      trust: 'lch(55% 85 260)',     // Cognition blue - reliability  
      creativity: 'lch(70% 75 45)', // Conversion orange - energy
      influence: 'lch(65% 90 300)', // Authority purple - power
      social: 'lch(75% 60 140)',    // Social green - community
      urgency: 'lch(65% 70 15)',    // Urgency red - scarcity
      premium: 'lch(85% 20 85)'     // Premium gold - luxury
    },
    
    // Interactive states
    interaction: {
      hover: 'lch(55% 85 260 / 0.1)',
      active: 'lch(55% 85 260 / 0.2)',
      focus: 'lch(55% 85 260)',
      disabled: 'lch(40% 5 260)'
    }
  },
  
  // Typography system (Inter Variable)
  typography: {
    display: {
      fontSize: '3rem',      // 48px
      lineHeight: '3.5rem',  // 56px
      fontWeight: '700',
      letterSpacing: '-0.02em'
    },
    h1: {
      fontSize: '2.25rem',   // 36px
      lineHeight: '2.75rem', // 44px
      fontWeight: '600',
      letterSpacing: '-0.015em'
    },
    h2: {
      fontSize: '1.5rem',    // 24px
      lineHeight: '2rem',    // 32px
      fontWeight: '600',
      letterSpacing: '-0.01em'
    },
    body: {
      fontSize: '1rem',      // 16px
      lineHeight: '1.5rem',  // 24px
      fontWeight: '400',
      letterSpacing: 'normal'
    },
    caption: {
      fontSize: '0.875rem',  // 14px
      lineHeight: '1.25rem', // 20px
      fontWeight: '500',
      letterSpacing: '0.005em'
    }
  },
  
  // Animation system (GPU-optimized)
  motion: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms'
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
  },
  
  // Spacing system (8px grid)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px  
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem'    // 96px
  },
  
  // Shadow system (elevation)
  shadows: {
    sm: '0 1px 2px lch(0% 0 0 / 0.05)',
    md: '0 4px 6px lch(0% 0 0 / 0.07), 0 2px 4px lch(0% 0 0 / 0.06)',
    lg: '0 10px 15px lch(0% 0 0 / 0.1), 0 4px 6px lch(0% 0 0 / 0.05)',
    xl: '0 20px 25px lch(0% 0 0 / 0.1), 0 8px 10px lch(0% 0 0 / 0.04)',
    glow: '0 0 20px lch(55% 85 260 / 0.3)',
    psychologyGlow: '0 0 30px lch(70% 75 45 / 0.2)'
  }
} as const;

// Psychology-specific design tokens
export const PsychologyTokens = {
  triggers: {
    trust: {
      color: DesignSystem.colors.psychology.trust,
      icon: '🛡️',
      description: 'Builds confidence and reliability'
    },
    creativity: {
      color: DesignSystem.colors.psychology.creativity,
      icon: '✨',
      description: 'Sparks innovation and imagination'
    },
    influence: {
      color: DesignSystem.colors.psychology.influence,
      icon: '👑',
      description: 'Establishes authority and leadership'
    },
    social: {
      color: DesignSystem.colors.psychology.social,
      icon: '👥',
      description: 'Leverages social proof and community'
    },
    urgency: {
      color: DesignSystem.colors.psychology.urgency,
      icon: '⚡',
      description: 'Creates scarcity and immediate action'
    },
    premium: {
      color: DesignSystem.colors.psychology.premium,
      icon: '💎',
      description: 'Conveys luxury and exclusivity'
    }
  }
} as const;

// CSS Custom Property Generator
export const generateCSSVariables = () => {
  const vars: Record<string, string> = {};
  
  // Generate surface variables
  Object.entries(DesignSystem.colors.surface).forEach(([key, value]) => {
    vars[`--surface-${key}`] = value;
  });
  
  // Generate text variables
  Object.entries(DesignSystem.colors.text).forEach(([key, value]) => {
    vars[`--text-${key}`] = value;
  });
  
  // Generate psychology variables
  Object.entries(DesignSystem.colors.psychology).forEach(([key, value]) => {
    vars[`--psychology-${key}`] = value;
  });
  
  return vars;
};

// Component style generators
export const createButtonStyles = (variant: 'primary' | 'secondary' | 'psychology' = 'primary') => {
  const baseStyles = {
    padding: `${DesignSystem.spacing.sm} ${DesignSystem.spacing.md}`,
    borderRadius: '0.5rem',
    fontWeight: DesignSystem.typography.body.fontWeight,
    fontSize: DesignSystem.typography.body.fontSize,
    transition: `all ${DesignSystem.motion.duration.fast} ${DesignSystem.motion.easing.ease}`,
    cursor: 'pointer',
    border: 'none',
    outline: 'none'
  };
  
  switch (variant) {
    case 'primary':
      return {
        ...baseStyles,
        backgroundColor: DesignSystem.colors.psychology.trust,
        color: DesignSystem.colors.surface.primary,
        boxShadow: DesignSystem.shadows.md
      };
    case 'psychology':
      return {
        ...baseStyles,
        backgroundColor: DesignSystem.colors.psychology.creativity,
        color: DesignSystem.colors.surface.primary,
        boxShadow: DesignSystem.shadows.psychologyGlow
      };
    default:
      return {
        ...baseStyles,
        backgroundColor: DesignSystem.colors.surface.tertiary,
        color: DesignSystem.colors.text.primary,
        border: `1px solid ${DesignSystem.colors.surface.elevated}`
      };
  }
};