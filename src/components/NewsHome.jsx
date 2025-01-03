"use client"; // Adicione isso no início do arquivo

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const courses = [
  { id: 1, title: "Curso 1", description: "Descrição do curso 1.", image: "/teste-cursos.jpg" },
  { id: 2, title: "Curso 2", description: "Descrição do curso 2.", image: "/teste-cursos.jpg" },
  { id: 3, title: "Curso 3", description: "Descrição do curso 3.", image: "/teste-cursos.jpg" },
  { id: 4, title: "Curso 4", description: "Descrição do curso 4.", image: "/teste-cursos.jpg" },
  { id: 5, title: "Curso 5", description: "Descrição do curso 5.", image: "/teste-cursos.jpg" },
  { id: 6, title: "Curso 6", description: "Descrição do curso 6.", image: "/teste-cursos.jpg" },
  { id: 7, title: "Curso 7", description: "Descrição do curso 7.", image: "/teste-cursos.jpg" },
];

const Novidades = () => {
  const [showDescription, setShowDescription] = useState(null);

  const toggleDescription = (id) => {
    setShowDescription((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">Novidades</h1>
      <p className="text-lg mb-8 text-center text-gray-700 max-w-3xl">
        Explore nossos cursos mais recentes e descubra como eles podem ajudá-lo a alcançar seus objetivos. Clique nas imagens para mais informações!
      </p>

      <div className="w-full max-w-6xl px-4">
      <Swiper
          navigation={true}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Autoplay, Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="w-full"
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id} className="p-2">
              <div
                className="w-full h-80 flex items-center justify-center overflow-hidden rounded-lg shadow-md bg-white relative cursor-pointer"
                onClick={() => toggleDescription(course.id)}
              >
                {showDescription === course.id ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white">
                    <p className="text-center p-4">{course.description}</p>
                  </div>
                ) : (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Novidades;