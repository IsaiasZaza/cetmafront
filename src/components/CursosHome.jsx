"use client";

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
  const [activeCourse, setActiveCourse] = useState(null);

  const toggleDescription = (id) => {
    setActiveCourse((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">Cursos</h1>
      <p className="text-lg mb-8 text-center text-gray-700 max-w-3xl">
        Explore nossos cursos e descubra como eles podem ajudá-lo a alcançar seus objetivos. Clique nas imagens para mais informações!
      </p>

      <div className="w-full max-w-6xl px-4">
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
          }}
          spaceBetween={20}
          slidesPerView={1}
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
            <SwiperSlide key={course.id}>
              <div
                className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => toggleDescription(course.id)}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  aria-label={`Curso: ${course.title}`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-80 text-white transform transition-transform duration-300 ${
                    activeCourse === course.id ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-sm mt-1">{course.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Novidades;
