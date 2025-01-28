export default function BannerHome() {
  return (
    <section
      className="relative flex items-center bg-cover bg-center lg:h-[85vh]"
      style={{
        backgroundImage: "url('/bannerHome.png')",
      }}
    >
      {/* Gradiente de sobreposição */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-700/0 to-blue-500/20"></div>

      {/* Conteúdo principal */}
      <div className="relative text-center text-white p-4 sm:p-8 rounded-lg max-w-4xl z-100">
        <h1 className="text-3xl sm:text-4xl lg:text-4xl mb-4 font-extrabold font-poppins leading-tight lg:mt-12">
        Seja o Melhor na Enfermagem<br></br> com a <span className="font-extrabold text-blue-300">CETMA</span> 
        </h1>
        <p className="text-lg mb-6 lg:w-1/2 mx-auto md:w-full">
        Cursos online com os melhores especialistas em enfermagem. Conquiste seu certificado MEC e invista no seu futuro com o CETMA.
        </p>
        <div className="mb-6">
          <div className="w-full max-w-[480px] mx-auto">
            <iframe
              className="rounded-lg w-full h-[240px]" // Ajusta o tamanho do vídeo
              src="https://www.youtube.com/embed/338LKGdz6SY?si=wEGIW7tiHtWPquL8"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Botão ajustado à largura do vídeo */}
            <a
              href="/moduloCardio"
              className="bg-blue-500 text-white py-3 px-6 mt-4 rounded-lg font-extrabold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Matrícula-se
            </a>
          </div>
        </div>
      </div>

      {/* Imagem decorativa ou elemento adicional */}
      <div className="hidden lg:block relative z-10">
        {/* Adicione algo aqui, se necessário */}
      </div>
    </section>
  );
}
