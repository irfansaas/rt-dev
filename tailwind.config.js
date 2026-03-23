/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        nerdio: {
          // Primary - Nerdio Teal (aligned with tco-calc-dev)
          primary: {
            50: '#E6F5F8',
            100: '#CCE9F0',
            200: '#99D3E1',
            300: '#66BDD2',
            400: '#3AAEC6',
            500: '#1E9DB8',  // Main Primary — nerdio-teal
            600: '#187F96',  // Hover state
            700: '#136475',
            800: '#0D4453',
            900: '#062431',
          },
          // Secondary - Light Teal (aligned with tco-calc-dev)
          secondary: {
            50: '#F0F9FB',
            100: '#E1F3F7',
            200: '#C3E7EF',
            300: '#94CFD9',  // nerdio-light-teal
            400: '#7CC3D1',
            500: '#64B7C9',  // Main Secondary
            600: '#4DA5BA',
            700: '#3D8A9E',
            800: '#2E6B7B',
            900: '#1F4756',
          },
          // Dark - Nerdio Navy (aligned with tco-calc-dev)
          dark: '#042838',
          // Light background
          light: '#E6F5F8',
          // Accent - Nerdio Lime
          lime: '#CDFF4E',
          // Semantic colors for consistent UI states
          success: {
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            500: '#22C55E',
            600: '#16A34A',
            700: '#15803D',
          },
          error: {
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            500: '#EF4444',
            600: '#DC2626',
            700: '#B91C1C',
          },
          warning: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },
          info: {
            50: '#EFF6FF',
            100: '#DBEAFE',
            200: '#BFDBFE',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
          },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      // Add ring offset utilities for focus indicators
      ringOffsetWidth: {
        '3': '3px',
      },
      // Animation for skeleton loading
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for focus-visible utilities
    function({ addUtilities }) {
      addUtilities({
        '.focus-ring': {
          '@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-nerdio-primary-500 focus-visible:ring-offset-2': {},
        },
        '.focus-ring-inset': {
          '@apply focus:outline-none focus-visible:ring-2 focus-visible:ring-nerdio-primary-500 focus-visible:ring-inset': {},
        },
        // Utility to hide scrollbar but keep functionality
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        // Screen reader only utility
        '.sr-only-focusable': {
          '@apply sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-nerdio-primary-600': {},
        },
      })
    },
  ],
}
