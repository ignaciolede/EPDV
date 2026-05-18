/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ── BRAND COLORS ─────────────────────────────────────────────────
      colors: {
        brand: {
          // Core
          blue:        '#006EFF', // Digital Blue — primary
          'blue-dark': '#1B2E4D', // Twilight Indigo — deep navy
          parchment:   '#F7F3EB', // Parchment — neutral background
          // Accent / Emotion
          coral:       '#FF7345', // Coral Glow — CTA warm
          'frost-blue':'#A1E2F0', // Frosted Blue — light sky
          peach:       '#FEC281', // Peach Glow — warm highlight
        },
      },

      // ── TYPOGRAPHY ───────────────────────────────────────────────────
      fontFamily: {
        // Roc Grotesk Condensed Bold → main headings (always UPPERCASE)
        heading:   ['"Roc Grotesk Condensed"', 'ui-sans-serif', 'system-ui'],
        // Roc Grotesk Bold → subtitles (always UPPERCASE)
        subheading:['"Roc Grotesk"', 'ui-sans-serif', 'system-ui'],
        // Inter → body copy
        body:      ['Inter', 'ui-sans-serif', 'system-ui'],
      },

      // ── FONT SIZES ───────────────────────────────────────────────────
      fontSize: {
        'display-xl': ['clamp(3rem, 7vw, 7rem)',    { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 5rem)', { lineHeight: '1',    letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 3rem)',{ lineHeight: '1.05' }],
        'display-sm': ['clamp(1.25rem, 2.5vw, 2rem)',{ lineHeight: '1.1'  }],
      },

      // ── SPACING SCALE (8pt grid) ─────────────────────────────────────
      spacing: {
        18:  '4.5rem',
        22:  '5.5rem',
        30:  '7.5rem',
        section: '6rem',
      },

      // ── BORDER RADIUS ────────────────────────────────────────────────
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // ── SHADOWS ──────────────────────────────────────────────────────
      boxShadow: {
        'card':    '0 4px 24px 0 rgba(0, 110, 255, 0.08)',
        'card-lg': '0 8px 40px 0 rgba(27, 46, 77, 0.14)',
        'glow-blue':'0 0 32px 0 rgba(0, 110, 255, 0.22)',
      },

      // ── TRANSITIONS ──────────────────────────────────────────────────
      transitionDuration: {
        250: '250ms',
        350: '350ms',
      },

      // ── Z-INDEX SCALE ────────────────────────────────────────────────
      zIndex: {
        navbar:  '50',
        modal:   '100',
        tooltip: '200',
      },

      // ── BACKGROUND IMAGES ────────────────────────────────────────────
      backgroundImage: {
        'gradient-hero':
          'linear-gradient(135deg, #1B2E4D 0%, #006EFF 60%, #A1E2F0 100%)',
        'gradient-brand':
          'linear-gradient(90deg, #006EFF 0%, #1B2E4D 100%)',
        'gradient-warm':
          'linear-gradient(135deg, #FF7345 0%, #FEC281 100%)',
        'gradient-parchment':
          'linear-gradient(180deg, #F7F3EB 0%, #ffffff 100%)',
      },

      // ── ANIMATION ────────────────────────────────────────────────────
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Hero dynamics
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-22px) rotate(4deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(3deg)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.9' },
          '50%':      { transform: 'translateY(7px)', opacity: '0.3' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(0.85)', opacity: '0.6' },
          '100%': { transform: 'scale(1.5)',  opacity: '0' },
        },
        'ken-burns': {
          '0%':   { transform: 'scale(1) translate(0px, 0px)' },
          '50%':  { transform: 'scale(1.06) translate(-8px, -4px)' },
          '100%': { transform: 'scale(1) translate(0px, 0px)' },
        },
      },
      animation: {
        'float':       'float 8s ease-in-out infinite',
        'float-slow':  'float-slow 13s ease-in-out infinite',
        'spin-slow':   'spin-slow 60s linear infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
        'marquee':     'marquee 22s linear infinite',
        'pulse-ring':  'pulse-ring 2.4s ease-out infinite',
        'fade-up':        'fade-up 0.6s ease-out both',
        'fade-in':        'fade-in 0.4s ease-out both',
        'slide-in-right': 'slide-in-right 0.5s ease-out both',
        'ken-burns':      'ken-burns 20s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
