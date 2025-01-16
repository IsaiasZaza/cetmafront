"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/autoplay';
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

const NewsHome = () => {
  const [activeCourse, setActiveCourse] = useState(null);

  const toggleDescription = (id) => {
    setActiveCourse((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center py-10 bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-blue-500 text-center">Novidades</h1>
      <p className="text-lg mb-8 text-center text-gray-700 max-w-3xl">
        Descubra as últimas novidades dos nossos cursos e atualizações.
      </p>

      <div className="w-full max-w-6xl px-4">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={1}
          modules={[Navigation, Autoplay, Pagination]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
          className="w-full"
        >
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <div
                className="relative w-full h-80 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transition-transform duration-300"
                onClick={() => toggleDescription(course.id)}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  aria-label={`Curso: ${course.title}`}
                />
                <div
                  className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-4 transition-opacity duration-300 ${activeCourse === course.id ? "opacity-100" : "opacity-0 hover:opacity-100"}`}
                >
                  <h2 className="text-lg font-semibold text-white mb-1">{course.title}</h2>
                  <p className="text-sm text-gray-200">{course.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewsHome;
