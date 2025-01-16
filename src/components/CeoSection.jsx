'use client';
import React from "react";

const CeoSection = () => {
  return (
    <div className="flex justify-center py-12 px-4 relative overflow-hidden cursor-default">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/Retangulo_20.png")',
          zIndex: -1,
        }}
      />
      <div className="max-w-screen-xl w-full shadow-lg rounded-lg overflow-hidden bg-white relative">
        <div className="flex flex-wrap">
          {/* CEO Image and Qualifications */}
          <div className="w-full md:w-1/3 bg-gradient-to-r from-blue-500 to-blue-900 text-white text-center py-8 px-4">
            <img
              src="/perfil.jpeg"
              alt="Foto do CEO"
              className="w-4/5 h-auto rounded-lg mb-6 object-cover mx-auto"
            />
            <h3 className="text-xl mb-4">Qualificações</h3>
            <ul className="list-none p-0 m-0 text-left text-lg">
              {["16 anos de experiência em Terapia Intensiva",
                "Atuação em hospitais de excelência",
                "Docente no ensino superior",
                "Coordenador de Curso na UniLS"
              ].map((item, index) => (
                <li key={index} className="flex items-center mb-4">
                  <span className="w-6 h-6 bg-white text-blue-500 rounded-full flex justify-center items-center mr-3">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CEO Biography */}
          <div className="w-full md:w-2/3 p-8 cursor-default">
            <h2 className="text-3xl font-extrabold text-blue-500 mb-6">Adam Elias CEO</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Enfermeiro com <strong className="text-blue-500">16 anos de experiência</strong> em Terapia Intensiva, atuando em hospitais de excelência, como o Sírio-Libanês.
              Dedica-se a promover cuidados de alta qualidade para pacientes em estado crítico.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Docente no ensino superior, contribui para a formação de futuros profissionais de enfermagem por meio de ensino qualificado e inspirador.
              Sua experiência acadêmica é marcada pelo impacto positivo no desenvolvimento de alunos e colegas.
            </p>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Como <strong className="text-blue-500">Coordenador de Curso</strong> na UniLS, colaborou para o crescimento e sucesso educacional da instituição, unindo prática clínica e ensino
              para transformar a saúde e a educação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoSection;
