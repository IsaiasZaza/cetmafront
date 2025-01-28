import React from "react";
import { MdMenuBook, MdRocketLaunch, MdWork, MdAccessTime, MdLibraryBooks, MdAttachMoney } from "react-icons/md";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
    <div className="text-4xl mb-4 text-blue-600 flex justify-center">{icon}</div>
    <h3 className="text-lg text-gray-950 font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const PorqueEstudarCetma = () => {
  const features = [
    {
      icon: <MdMenuBook />, 
      title: "Inclusão e acessibilidade",
      description:
        "Ferramentas de inclusão e acessibilidade para que pessoas com necessidades especiais tenham a oportunidade de cursar uma graduação.",
    },
    {
      icon: <MdRocketLaunch />, 
      title: "Aprendizado acelerado",
      description:
        "Plataforma de ensino que acelera o aprendizado com recursos intuitivos e tecnológicos, permitindo estudar a qualquer hora e lugar.",
    },
    {
      icon: <MdWork />, 
      title: "Conexão com o mercado",
      description:
        "Conteúdo útil para o mercado de trabalho, unindo teoria à prática, ajudando a desenvolver profissionais completos.",
    },
    {
      icon: <MdAccessTime />, 
      title: "Agilidade no estudo",
      description:
        "Disciplinas cursadas uma por vez para proporcionar um estudo com mais agilidade, foco e rendimento.",
    },
    {
      icon: <MdLibraryBooks />, 
      title: "Biblioteca inovadora",
      description:
        "Biblioteca digital dinâmica e acessível, com um acervo multidisciplinar integrado aos cursos oferecidos.",
    },
    {
      icon: <MdAttachMoney />, 
      title: "Valores acessíveis",
      description:
        "Valores que cabem no seu bolso, para estudar o que quer, não o que dá.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl lg:text-4xl text-center mb-8 text-gray-800">
          Por que estudar com o método{" "}
          <span className="text-blue-500 font-extrabold">CETMA de ensino?</span>
        </h2>

        {/* Grid para todos os dispositivos */}
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
      </div>
    </section>
  );
};

export default PorqueEstudarCetma;
