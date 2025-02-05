"use client";
import { ImSpinner8 } from "react-icons/im";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Novidades = () => {
  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Função para buscar cursos da API
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");

        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }
        
        if (!response.ok) {
          throw new Error("Erro ao buscar os cursos.");
        }
        const data = await response.json();

        // Filtrar para exibir apenas os cursos principais
        const mainCourses = data.filter((course) => !course.parentCourseId);
        setCourses(mainCourses);
      } catch (error) {
        console.error("Erro ao carregar os cursos:", error.message);
      } finally {
        setIsLoading(false); // Conclui o carregamento
      }
    };

    fetchCourses();
  }, []);

  const toggleDescription = (id) => {
    setActiveCourse((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4 text-blue-500 text-center">Cursos</h1>
      <p className="lg:text-lg text-base mb-8 text-center text-gray-700 max-w-3xl px-4">
        Explore nossos cursos e descubra como eles podem ajudá-lo a alcançar seus objetivos. Clique nas imagens para mais informações!
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center w-full h-64">
          <ImSpinner8 className="animate-spin text-blue-500 text-4xl" />
        </div>
      ) : (
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
                    src={course.coverImage || "/default-image.jpg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    aria-label={`Curso: ${course.title}`}
                  />
                  <div
                    className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-4 transition-opacity duration-300 ${activeCourse === course.id
                      ? "opacity-100"
                      : "opacity-0 hover:opacity-100"
                      }`}
                  >
                    <h2 className="text-lg font-semibold text-white mb-1">{course.title}</h2>
                    <p className="text-sm text-gray-200">{course.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Novidades;
