"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewsHome = () => {
  // Array de feedbacks com comentários positivos de alunos
  const feedbacks = [
    {
      id: 1,
      name: "Maria Silva",
      rating: 5,
      comment:
        "Curso excelente, conteúdo bem didático e professores muito atenciosos!",
    },
    {
      id: 3,
      name: "Ana Oliveira",
      rating: 5,
      comment:
        "Transformou minha carreira, recomendo para todos que querem ingressar na enfermagem.",
    },
    {
      id: 4,
      name: "Carlos Almeida",
      rating: 5,
      comment:
        "A metodologia do curso é inovadora e super fácil de acompanhar. Recomendo para todos!",
    },
    {
      id: 5,
      name: "Fernanda Lima",
      rating: 5,
      comment:
        "O curso me preparou para os desafios da área de enfermagem com muita confiança.",
    },
  ];

  // Função para renderizar as estrelas com base na avaliação
  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-blue-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título da seção de feedback */}
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          O que nossos alunos dizem
        </h2>
        {/* Componente Swiper para exibição dos feedbacks */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10" // Espaço extra para a paginação
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback.id}>
              {/* Card com tamanho fixo, hover e transição */}
              <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col w-88 h-64 mx-auto transform transition-all duration-300">
                <div className="flex items-center mb-4">
                  {renderStars(feedback.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {feedback.rating}/5
                  </span>
                </div>
                <p className="text-gray-700 flex-grow italic">
                  “{feedback.comment}”
                </p>
                <p className="mt-6 text-gray-900 font-semibold text-right">
                  - {feedback.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Estilos globais customizados para os elementos do Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #3b82f6;
        }
      `}</style>
    </section>
  );
};

export default NewsHome;
