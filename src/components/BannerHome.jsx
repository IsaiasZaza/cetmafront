export default function BannerHome() {
  return (
    <section
      className="relative flex items-center justify-around bg-cover bg-center h-[80vh]"
      style={{
        backgroundImage: "url('/homeban.png')", // Substitua pelo caminho da sua imagem
      }}
    >
      {/* Overlay para conteúdo */}
      <div className="text-center text-gray-900 p-8 rounded-lg max-w-lg mb-20">
        <h1 className="text-3xl font-bold mb-4">
          Quer ser o melhor na área da saúde?
        </h1>
        <p className="text-lg mb-6">
          Nós da CETMA temos cursos gravados com os melhores professores e, no
          final, você ainda ganha um certificado de conclusão aprovado pelo
          MEI.
        </p>
        {/* Contêiner para vídeo e botão */}
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
              href="/login"
              className="bg-blue-500 text-white font-bold py-3 px-6 mt-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg w-full"
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
      <div></div>
    </section>
  );
}
