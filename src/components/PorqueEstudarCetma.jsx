import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col justify-between h-[270px]">
      <div className="text-center mb-4 text-4xl">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const PorqueEstudarCetma = () => {
  const features = [
    {
      icon: "📖",
      title: "Inclusão e acessibilidade",
      description:
        "Ferramentas de inclusão e acessibilidade para que pessoas com necessidades especiais tenham a oportunidade de cursar uma graduação.",
    },
    {
      icon: "🚀",
      title: "Aprendizado acelerado",
      description:
        "Plataforma de ensino que acelera o aprendizado com recursos intuitivos e tecnológicos, permitindo estudar a qualquer hora e lugar.",
    },
    {
      icon: "💼",
      title: "Conexão com o mercado",
      description:
        "Conteúdo útil para o mercado de trabalho, unindo teoria à prática, ajudando a desenvolver profissionais completos.",
    },
    {
      icon: "⏱",
      title: "Agilidade no estudo",
      description:
        "Disciplinas cursadas uma por vez para proporcionar um estudo com mais agilidade, foco e rendimento.",
    },
    {
      icon: "📚",
      title: "Biblioteca inovadora",
      description:
        "Biblioteca digital dinâmica e acessível, com um acervo multidisciplinar integrado aos cursos oferecidos.",
    },
    {
      icon: "💰",
      title: "Valores acessíveis",
      description:
        "Valores que cabem no seu bolso, para estudar o que quer, não o que dá.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8 text-black">
          Por que estudar com o método <span className="text-blue-500">Cetma de ensino?</span>
        </h2>

        {/* Swiper para mobile */}
        <div className="block sm:hidden">
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            modules={Autoplay}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Grid para desktop */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
