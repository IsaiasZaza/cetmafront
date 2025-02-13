'use client';
import React, { useState } from "react";

const CeoSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center py-12 px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/Retangulo_20.png")',
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      {/* Container principal */}
      <div className="max-w-screen-xl w-full shadow-lg rounded-lg overflow-hidden bg-white relative">
        <div className="flex flex-wrap items-center">
          {/* Imagem e Qualificações do CEO */}
          <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-blue-900 text-white text-center py-8 px-6">
            <img
              src="/perfil.jpeg"
              alt="Foto de Adam Elias, CEO"
              className="w-3/5 md:w-4/5 h-auto rounded-lg mb-6 object-cover mx-auto"
            />
            <h3 className="text-xl md:text-2xl mb-4 font-bold">Qualificações</h3>
            <ul className="list-none text-left text-base md:text-lg">
              {[
                "16 anos de experiência em Terapia Intensiva",
                "Atuação em hospitais de excelência",
                "Docente no ensino superior",
                "Coordenador de Curso na UniLS",
              ].map((item, index) => (
                <li key={index} className="flex items-center mb-3">
                  <span className="w-5 h-5 md:w-6 md:h-6 bg-white text-blue-500 rounded-full flex justify-center items-center mr-3">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Biografia do CEO */}
          <div className="w-full md:w-2/3 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-500 mb-4">
              Adam Elias – Fundador da CETMA Educacional
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed">
              Enfermeiro com <strong className="text-blue-500">16 anos de experiência</strong> em Terapia Intensiva. Atuou em hospitais como o Sírio-Libanês, oferecendo cuidados de alta qualidade a pacientes críticos.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed">
              Docente no ensino superior e <strong className="text-blue-500">Coordenador de Curso</strong> na UniLS, contribuindo para a formação de profissionais de enfermagem.
            </p>

            {/* Versão para desktop */}
            <div className="hidden sm:block">
              <p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed">
                Adam fundou a CETMA Educacional com o objetivo de transformar a educação em saúde, capacitando profissionais para enfrentar desafios do setor com competência e paixão pelo cuidado.
              </p>
            </div>

            {/* Versão para mobile com "Ler mais" */}
            <div className="sm:hidden">
              <p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed">
                Enfermeiro com 16 anos de experiência. Atuou no Sírio-Libanês e é docente no ensino superior.
              </p>
              <button
                className="text-blue-500 hover:underline font-semibold"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? "Ler menos" : "Ler mais"}
              </button>
              {isOpen && (
                <p className="text-base md:text-lg text-gray-700 mt-3 leading-relaxed">
                  Como Coordenador de Curso na UniLS, Adam contribui para o crescimento da instituição. Fundou a CETMA Educacional com o objetivo de transformar a educação em saúde.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoSection;
