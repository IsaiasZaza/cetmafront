"use client";
import { ImSpinner8 } from "react-icons/im";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

const Novidades = () => {
  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");

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

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <div className="flex flex-col items-center py-10 mb-4">
      <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold mb-4 text-blue-500 text-center">
        Cursos
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center w-full h-64">
          <ImSpinner8 className="animate-spin text-blue-500 text-4xl" />
        </div>
      ) : courses.length === 0 ? (
        <div className="mt-4 flex flex-col items-center">
          <div className="bg-blue-50 border border-blue-300 text-gray-950 px-4 sm:px-8 py-6 rounded-lg shadow-md max-w-full sm:max-w-md w-full mx-2">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center">
              Novos cursos em breve!
            </h2>
            <p className="text-center text-sm sm:text-base">
              Estamos preparando conteúdos incríveis para você. Fique atento às nossas novidades.
            </p>
            <p className="mt-4 text-center font-medium text-sm sm:text-base">
              Atenciosamente, Equipe CETMA
            </p>
          </div>
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
                  onMouseEnter={() => toggleDescription(course.id)}
                  onMouseLeave={() => toggleDescription(course.id)}
                  onClick={() => handleRedirect(`/cursosAluno/${course.id}`)}
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
                    <h2 className="text-lg font-semibold text-white mb-1">
                      {course.title}
                    </h2>
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
