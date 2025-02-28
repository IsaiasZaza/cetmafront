"use client";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import Header from "./Header";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PorqueEstudarCetma from "./PorqueEstudarCetma";
import { useRouter } from "next/navigation";
import Formulario from "./Formulario";

const CursosEmp = () => {
  const router = useRouter();

  const [courses, setCourses] = useState([]); // Estado para armazenar os cursos
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  // Função para buscar dados da API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");
        const data = await response.json();
        const mainCourses = data.filter((course) => !course.parentCourseId);
        setCourses(mainCourses);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <div>
      <Header /> {/* Componente Header */}

      {/* Banner Principal */}
      <div className="relative bg-mobile-padrao lg:bg-cursos-emp bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[50vh] lg:h-[55vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
        {/* Gradiente de sobreposição */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        {/* Conteúdo do banner */}
        <div className="relative w-full md:w-1/2 text-left space-y-6">
          <p className="text-2xl md:text-4xl lg:text-3xl xl:text-3xl 2xl:text-5xl font-semibold leading-tight">
            Quer impulsionar <br /> o <span className="font-extrabold text-blue-400">crescimento</span> da sua <br />
            <span className="font-extrabold"><span className="text-blue-400">Empresa?</span></span>
          </p>
          <p className="text-xm md:text-lg text-gray-200"></p>
        </div>
      </div>

      {/* Seção de Cursos */}
      <div className="py-16 px-8 mx-auto max-w-7xl">
        <h3 className="text-3xl text-gray-800 text-center">
          Cursos que podem ajudar na gestão da sua{" "}
          <span className="font-bold text-blue-500">empresa</span>
        </h3>
        <p className="text-center text-xl text-gray-600 mt-4">
          Cursos do mais básico ao avançado para ajudar você com a sua empresa
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <ImSpinner8 className="animate-spin text-blue-500 text-6xl" />
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-12 flex flex-col items-center">
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
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            autoplay={{ delay: 2500 }}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            loop={true}
            className="mt-12"
          >
            {courses.map((course, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col justify-between border rounded-xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition transform duration-300 h-[400px] bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
              >
                <div className="flex flex-col flex-grow h-[250px]">
                  <h4 className="text-2xl text-white mb-2">
                    {course.title}
                  </h4>
                  <p className="text-lg mt-2 text-white/90 flex-grow line-clamp-3">
                    {course.description}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    className="bg-white text-blue-600 py-3 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
                    onClick={() => handleRedirect(`/cursosAluno/${course.id}`)}
                  >
                    Saiba mais sobre
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Componentes adicionais */}
      <Formulario />
      <PorqueEstudarCetma />
      <Footer /> {/* Componente Footer */}
    </div>
  );
};

export default CursosEmp;
