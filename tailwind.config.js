/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* teal border with low opacity */
        input: 'var(--color-input)', /* pure white with subtle warmth */
        ring: 'var(--color-ring)', /* deep teal */
        background: 'var(--color-background)', /* pure white with subtle warmth */
        foreground: 'var(--color-foreground)', /* deep blue-gray */
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep teal */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* lighter teal complement */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* clear red */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* barely-there teal tint */
          foreground: 'var(--color-muted-foreground)', /* medium gray */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm amber */
          foreground: 'var(--color-accent-foreground)', /* white */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* pure white with subtle warmth */
          foreground: 'var(--color-popover-foreground)', /* deep blue-gray */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* barely-there teal tint */
          foreground: 'var(--color-card-foreground)', /* deep blue-gray */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* calming green */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* gentle amber */
          foreground: 'var(--color-warning-foreground)', /* white */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* clear red */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        surface: 'var(--color-surface)', /* barely-there teal tint */
        'text-primary': 'var(--color-text-primary)', /* deep blue-gray */
        'text-secondary': 'var(--color-text-secondary)', /* medium gray */
      },
      fontFamily: {
        'sans': ['Source Sans Pro', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'gentle': '0 2px 4px rgba(45, 125, 125, 0.06)',
        'elevated': '0 8px 24px rgba(45, 125, 125, 0.12)',
        'soft': '0 4px 12px rgba(45, 125, 125, 0.08)',
      },
      animation: {
        'breathe': 'breathe 3s ease-in-out infinite',
        'gentle-pulse': 'gentlePulse 2s ease-in-out infinite',
        'voice-ripple': 'voiceRipple 1.8s ease-out infinite',
      },
      transitionTimingFunction: {
        'therapeutic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}