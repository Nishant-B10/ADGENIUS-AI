// src/lib/api-config.ts

export const API_CONFIG = {
  CLAUDE_API_URL: 'https://api.anthropic.com/v1/messages',
  CLAUDE_API_KEY: process.env.NEXT_PUBLIC_CLAUDE_API_KEY || process.env.CLAUDE_API_KEY || ''
};

// Debug function to check configuration
export function debugAPIConfig() {
  console.log('API Configuration Status:', {
    hasUrl: !!API_CONFIG.CLAUDE_API_URL,
    hasKey: !!API_CONFIG.CLAUDE_API_KEY,
    keyLength: API_CONFIG.CLAUDE_API_KEY?.length || 0,
    keyPrefix: API_CONFIG.CLAUDE_API_KEY?.substring(0, 8) + '...' || 'NONE'
  });
  
  return {
    isValid: !!(API_CONFIG.CLAUDE_API_URL && API_CONFIG.CLAUDE_API_KEY),
    url: API_CONFIG.CLAUDE_API_URL,
    hasKey: !!API_CONFIG.CLAUDE_API_KEY
  };
}