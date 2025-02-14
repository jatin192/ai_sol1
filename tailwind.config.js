/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
        },
        dark: {
          DEFAULT: '#0f172a',
        },
      },
      animation: {
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'float-slow-reverse': 'float 15s ease-in-out infinite reverse',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 20s linear infinite reverse',
        'grid-move': 'gridMove 60s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'message-slide-up': 'messageSlideUp 0.6s ease-out forwards',
        'message-slide-left': 'messageSlideLeft 0.6s ease-out forwards',
        'message-slide-right': 'messageSlideRight 0.6s ease-out forwards',
        'avatar-pop': 'avatarPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'typing-dot': 'typingDot 1.4s infinite',
        'line-appear': 'lineAppear 0.4s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-slide-up': 'fadeSlideUp 0.6s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 10s linear infinite',
        'float-slow': 'float-slow 20s ease-in-out infinite',
        'grid-slow': 'grid-slow 60s linear infinite',
        'message-slide-in': 'message-slide-in 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(100px, 50px) rotate(10deg)' },
        },
        gridMove: {
          '0%': { transform: 'rotate(45deg) translateY(0)' },
          '100%': { transform: 'rotate(45deg) translateY(-50%)' },
        },
        pulse: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.1)',
          },
        },
        messageSlideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        messageSlideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        messageSlideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        avatarPop: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        typingDot: {
          '0%, 60%, 100%': {
            transform: 'translateY(0)',
          },
          '30%': {
            transform: 'translateY(-4px)',
          },
        },
        lineAppear: {
          '0%': {
            transform: 'scaleX(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scaleX(1)',
            opacity: '1',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeSlideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        glow: {
          '0%': {
            opacity: '0.5',
            filter: 'brightness(100%) blur(20px)',
          },
          '100%': {
            opacity: '0.8',
            filter: 'brightness(120%) blur(20px)',
          },
        },
        particle: {
          '0%': {
            transform: 'translateY(0) scale(0)',
            opacity: '0',
          },
          '10%': {
            transform: 'translateY(-10px) scale(1)',
            opacity: '0.6',
          },
          '90%': {
            transform: 'translateY(-100px) scale(0.8)',
            opacity: '0.4',
          },
          '100%': {
            transform: 'translateY(-120px) scale(0)',
            opacity: '0',
          },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(20px, 20px) rotate(5deg)' },
        },
        'grid-slow': {
          '0%': { transform: 'translateX(0) rotate(45deg)' },
          '100%': { transform: 'translateX(-50%) rotate(45deg)' },
        },
        'message-slide-in': {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transformStyle: {
        '3d': '3d',
      },
      perspective: {
        '1000px': '1000px',
        '2000px': '2000px',
      },
      rotate: {
        'y-12': 'rotateY(12deg)',
        'y-[-12deg]': 'rotateY(-12deg)',
        'x-12': 'rotateX(12deg)',
        'x-[-12deg]': 'rotateX(-12deg)',
      },
      translate: {
        'z-[-50px]': 'translateZ(-50px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
