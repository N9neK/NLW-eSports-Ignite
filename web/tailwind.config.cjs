/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // '''./(dentro da pasta)''' src/ '''**(todas as outras pastas que tiverem aqui dentro)''' /'''*.tsx(todos os arquivos que terminarem com tsx)'''
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'nlw-grandient':
          'linear-gradient(90deg, #9572FC 0%, #43E7AD 50.00%, #E1D55D 100%)',
          'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(25,7,59,0.9) 67.08%)'
      }
    }
  },
  plugins: []
}
