'use client';
import React, { useState } from "react";

const CeoSection = () => {
  const [isOpen, setIsOpen] = useState(false);  // Adicionando o estado isOpen

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
      
      {/* Conteúdo principal */}
      <div className="max-w-screen-xl w-full shadow-lg rounded-lg overflow-hidden bg-white relative">
        <div className="flex flex-wrap">
          {/* Imagem e Qualificações do CEO */}
          <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-blue-900 text-white text-center py-8 px-4">
            <img
              src="/perfil.jpeg"
              alt="Foto de Adam Elias, CEO"
              className="w-4/5 h-auto rounded-lg mb-6 object-cover mx-auto"
            />
            <h3 className="text-2xl mb-4 font-bold">Qualificações</h3>
            <ul className="list-none p-0 m-0 text-left text-lg">
              {[
                "16 anos de experiência em Terapia Intensiva",
                "Atuação em hospitais de excelência",
                "Docente no ensino superior",
                "Coordenador de Curso na UniLS",
              ].map((item, index) => (
                <li key={index} className="flex items-center mb-4">
                  <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex justify-center items-center mr-3">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Biografia do CEO */}
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-3xl font-extrabold text-blue-500 mb-6">Adam Elias – Fundador da CETMA Educacional</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Enfermeiro com <strong className="text-blue-500">16 anos de experiência</strong> em Terapia Intensiva. Atuou em hospitais como o Sírio-Libanês, oferecendo cuidados de alta qualidade a pacientes críticos.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Docente no ensino superior e <strong className="text-blue-500">Coordenador de Curso</strong> na UniLS, contribui para a formação de profissionais de enfermagem e para o sucesso educacional da instituição.
            </p>

            <div className="text-lg text-gray-700 mb-4 leading-relaxed hidden sm:block">
              Adam fundou a CETMA Educacional com o objetivo de transformar a educação em saúde, capacitando profissionais para enfrentar desafios do setor com competência e paixão pelo cuidado.
            </div>

            {/* Mobile View */}
            <div className="sm:hidden">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Enfermeiro com 16 anos de experiência em Terapia Intensiva. Atuou em hospitais como o Sírio-Libanês e é docente no ensino superior.
              </p>
              <button className="text-blue-500 hover:underline" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Ler menos" : "Ler mais"}
              </button>
              {isOpen && (
                <p className="text-lg text-gray-700 mt-4">
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
