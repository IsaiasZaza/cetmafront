/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "home": "url('/banner-home2.png')",
        "home-mobile": "url('/Retangulo_20.png')",
        "propaganda": "url('/propaganda.png')",
        "banner-cursos": "url('/bannerCursos.png')",
        "mobile-padrao": "url('/mobile-home.png')",
        "cursos-emp": "url('/cursos-emp.png')",
        "ebooks": "url('/Retangulo_23.png')",
        "beneficios-aluno": "url('/Retangulo_22.png')",
        "fale": "url('/fale.png')",
      },
    },
  },
  plugins: [],
};
