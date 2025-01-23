import React from "react";
import MenuLateral from "./MenuLateral"; // Importação do menu lateral

// Componente de Card individual
const Card = ({ title, description }) => {
  return (
    <div className="bg-gray-300 rounded-lg h-80 flex flex-col items-center justify-center text-center font-semibold shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
};

const ModuloCardiologia = () => {
  return (
    <div className="flex h-screen">
      {/* Menu Lateral Fixo */}
      <MenuLateral />

      {/* Conteúdo Principal */}
      <div className="flex-grow  flex flex-col overflow-y-auto">
        {/* Banner */}
        <section
          className="relative bg-[url('/banner_pag_topicos_dos_cursos.png')] py-32 bg-cover bg-center h-[85vh] sm:h-[75vh] md:h-[65vh] lg:h-[60vh] text-white flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 lg:px-32"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
          <div className="relative w-full sm:w-3/4 lg:w-2/3 text-left space-y-4 sm:space-y-6">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-300">
              CENTRO EDUCACIONAL TÉCNICO MÉDICO ASSISTENCIAL
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight break-words">
              Cardiologia e <br /> enfermeiro renomado
            </h1>
          </div>
        </section>

        {/* Conteúdo Principal */}
        <div className="flex-grow p-8 bg-gray-50">
          {/* Tópico 1 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tópico 1:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <Card title="Aula 1" description="Introdução à Cardiologia" />
              <Card title="Aula 2" description="Anatomia do Coração" />
              <Card title="Aula 3" description="Doenças Cardiovasculares" />
              <Card title="Aula 4" description="Exames Hemodinâmicos" />
              <Card title="Aula 5" description="Tratamentos e Cirurgias" />
            </div>
          </div>

          {/* Tópico 2 */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tópico 2:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <Card title="Aula 1" description="Emergências Cardiológicas" />
              <Card title="Aula 2" description="Monitoramento Intensivo" />
              <Card title="Aula 3" description="Medicações Cardiológicas" />
              <Card title="Aula 4" description="Protocolos Hospitalares" />
              <Card title="Aula 5" description="Encerramento e Avaliação" />
            </div>
          </div>

          {/* Tire suas dúvidas */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tire dúvidas</h2>
            <div className="bg-gray-300 rounded-lg h-40 flex items-center justify-center text-center font-semibold shadow-md">
              Fale com o professor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuloCardiologia;
