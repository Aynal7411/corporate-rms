export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        brand: '#1f6f78',
        accent: '#e0a458',
        surface: '#f7f9fb'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(23, 32, 42, 0.08)'
      }
    }
  },
  plugins: []
};
