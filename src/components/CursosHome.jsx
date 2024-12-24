"use client";

import React from "react";
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

const CursosHome = () => {
  return (
    <div className="bg-blue-500 flex flex-col items-center py-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-start px-4">
        <div className="text-white text-left mb-6 md:mb-0 md:mr-8 md:w-1/3">
          <h2 className="text-3xl font-bold">Cursos:</h2>
          <p className="text-lg mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
          </p>
        </div>

        <div className="relative w-full md:w-2/3">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="w-full h-80 flex items-center justify-center overflow-hidden rounded-lg shadow-md bg-white relative cursor-pointer group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-bold">{course.title}</h3>
                    <p className="text-sm">{course.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CursosHome;
