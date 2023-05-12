/** @type {import('tailwindcss').Config} */
export default {
  // tailwind应用
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      // 修改默认字体大小
      fontSize: {
        xs: ['0.25rem', '0.35rem'],
        sm: ['0.35rem', '0.45rem'],
        base: ['0.42rem', '0.52rem'],
        lg: ['0.55rem', '0.65rem'],
        xl: ['0.65rem', '0.75rem']
      },
      boxShadow: {
        'l-white': '-10px 0 10px white',
        'l-zinc': '-10px 0 10px #18181b'
      }
    }
  },
  plugins: []
}
