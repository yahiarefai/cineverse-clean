export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cineBg: '#111111',
        cineCard: '#222222',
        cineAccent: '#E53935',
        cineSurface: '#1a1a1a',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(229, 57, 53, 0.25)',
      },
    },
  },
  plugins: [],
};
