import { BsCheckCircle } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";


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
        <h1 className="text-2xl text-center sm:text-3xl md:text-4xl leading-tight">
          Depois de um tempo planejando a{' '}
          <span className="text-blue-400 font-bold">MELHOR </span>forma de entregar a{' '}
          <span className="text-blue-400 font-bold">VOCÊ</span> cursos de{' '}
          <span className="bg-gradient-to-r text-blue-400 bg-clip-text font-bold">
            QUALIDADE
          </span>.
        </h1>
        <p className="mt-4 text-lg text-center">
          Aqui vai os pontos que nós{' '}
          <span className="font-bold text-blue-400">CETMA</span> prezamos para os nossos cursos:
        </p>
        {/* Lista de qualidades */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 mt-8 text-white font-medium">
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
        <p className="mt-6 text-center text-2xl lg:text-2xl">
          Quer saber mais sobre cada curso?
        </p>
        {/* Botão interativo */}
        <div className="mt-4 flex justify-center">
          <a href="/meusCursos" className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-base font-semibold rounded-md shadow-md hover:scale-105 hover:from-blue-500 hover:to-blue-500 transition-transform">
            Acesse
            <FiArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </div>
      {/* Imagem lateral */}
      <div className="absolute inset-0 md:inset-y-0 md:left-auto md:right-0 hidden md:block w-1/2 h-full"></div>
    </div>
  );
}
