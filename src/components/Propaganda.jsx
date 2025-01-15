import { BsCheckCircle } from "react-icons/bs";

export default function Propaganda() {
  return (
    <div
      className="relative bg-cover bg-center text-white h-[80vh] flex items-center"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0)), url('/Banner_teste_home.png')",
      }}
    >
      {/* Conteúdo principal */}
      <div className="w-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl text-center sm:text-3xl md:text-4xl font-bold leading-tight">
          Depois de um tempo planejando a{' '}
          <span className="text-blue-400">MELHOR </span>forma de entregar a{' '}
          <span className="text-blue-400">VOCÊ</span> cursos de{' '}
          <span className="bg-gradient-to-r text-blue-400 bg-clip-text ">
            QUALIDADE
          </span>.
        </h1>
        <p className="mt-4 text-lg text-center">
          Aqui vai os pontos que nós{' '}
          <span className="font-semibold text-blue-500">CETMA</span> prezamos para os nossos cursos:
        </p>
        {/* Lista de qualidades */}
        <div className="grid grid-cols-2 gap-4 mt-8 text-white font-medium">
          <div className="space-y-2">
            {["Qualidade 1", "Qualidade 2", "Qualidade 3", "Qualidade 4", "Qualidade 5"].map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
              >
                <BsCheckCircle className="text-yellow-300 mr-2" size={20} />
                {item}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {["Qualidade 6", "Qualidade 7", "Qualidade 8", "Qualidade 9", "Qualidade 10"].map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
              >
                <BsCheckCircle className="text-yellow-300 mr-2" size={20} />
                {item}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm sm:text-base">
          Quer saber mais sobre cada curso? Dá uma olhadinha aqui embaixo.
        </p>
        {/* Botão interativo */}
        <div className="mt-6 flex justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-base font-semibold rounded-md shadow-md hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition-transform">
            Saiba Mais
          </button>
        </div>
      </div>
      {/* Imagem lateral */}
      <div className="absolute inset-0 md:inset-y-0 md:left-auto md:right-0 hidden md:block w-1/2 h-full">

      </div>
    </div>
  );
}

