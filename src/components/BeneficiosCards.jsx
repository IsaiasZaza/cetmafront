import React from "react";
import { FaBook, FaRocket, FaCertificate, FaClock, FaGraduationCap, FaDollarSign } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center items-center text-4xl mb-4 text-blue-500">
      {icon}
    </div>
    <h3 className="text-lg text-gray-900 font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const BeneficiosCards = () => {
  const features = [
    {
      icon: <FaBook />,
      title: "Horas Complementares",
      description: "Horas de curso válidas para atividades complementares.",
    },
    {
      icon: <FaRocket />,
      title: "Suporte 24/7",
      description: "Tire suas dúvidas a qualquer momento com o professor!",
    },
    {
      icon: <FaCertificate />,
      title: "Certificação Reconhecida",
      description: "Certificados aprovados pelo MEC!",
    },
    {
      icon: <FaClock />,
      title: "Acesso Ilimitado",
      description: "Aulas disponíveis 24 horas por dia!",
    },
    {
      icon: <FaGraduationCap />,
      title: "Material de Qualidade",
      description: "Conteúdo completo para a sua formação.",
    },
    {
      icon: <FaDollarSign />,
      title: "Preço Acessível",
      description: "Valores acessíveis para todos!",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl lg:text-4xl text-center mb-12 text-gray-800">
          Confira alguns benefícios que nossos alunos têm:
        </h2>

        {/* Grid responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-default">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Botão Torne-se Aluno */}
        <div className="mt-12 text-center">
          <a
            href="/login"
            className="px-6 py-4 w-full bg-blue-500 text-white text-lg font-bold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
          >
            Torne-se Aluno
          </a>
        </div>
      </div>
    </section>
  );
};

export default BeneficiosCards;
