import { BsCheckCircle } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";

export default function Propaganda() {
  return (
    <div
      className="relative bg-cover bg-center text-white h-[100vh] min-h-[70vh] 2xl:h-[60vh] flex flex-col md:flex-row items-center"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url('/Banner_teste_home.png')",
      }}
    >
      {/* Conteúdo principal */}
      <div className="w-full md:w-1/2 p-4 sm:p-10 lg:p-16 flex flex-col items-center md:items-start justify-center h-full">
        <h1 className="text-xl md:text-2xl lg:text-3xl leading-tight text-center md:text-left">
          Depois de um tempo planejando a{" "}
          <span className="text-blue-400 font-bold">MELHOR </span>
          forma de entregar a{" "}
          <span className="text-blue-400 font-bold">VOCÊ</span> cursos de{" "}
          <span className="bg-gradient-to-r text-blue-400 bg-clip-text font-bold">
            QUALIDADE
          </span>.
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-center md:text-left">
          Aqui vai os pontos que nós{" "}
          <span className="font-bold text-blue-400">CETMA</span> prezamos para
          os nossos cursos:
        </p>
        {/* Lista de qualidades */}
        <div className="grid grid-cols-2 gap-4 lg:mt-8 mt-4 text-white font-medium">
          {[
            "Conteúdo Atualizado",
            "Instrutores Experientes",
            "Certificação Reconhecida",
            "Aulas Interativas",
            "Flexibilidade de Horários",
            "Suporte ao Aluno",
            "Acessibilidade",
            "Material Complementar",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white/20 p-2 rounded-lg hover:bg-white/30 transition"
            >
              <BsCheckCircle className="text-blue-300 mr-2" size={20} />
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 text-center md:text-left text-base sm:text-xl md:text-2xl">
          Quer saber mais sobre cada curso?
        </p>
        {/* Botão interativo */}
        <div className="mt-4 flex justify-center md:justify-start">
          <a
            href="/meusCursos"
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-base font-semibold rounded-md shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-500 transition-transform"
          >
            Acesse
            <FiArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </div>
      {/* Imagem lateral (opcional em dispositivos maiores) */}
      <div className="absolute inset-0 md:relative md:inset-y-0 md:left-auto md:right-0 hidden md:block w-1/2 h-full"></div>
    </div>
  );
}
