"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuLateral from "./MenuLateral";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const CoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }
        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");
        const data = await response.json();
        setCourses(data); // Assuming the API returns an array of courses
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleRedirect = (url) => {
    router.push(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-gray-600">Carregando cursos...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(120deg, #f8fafc 0%, #e7ebf0 100%)" }}
    >
      <MenuLateral />

      <main className="flex-grow p">
        <div className="relative bg-[url('/bannerCursos.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
          {/* Gradiente de sobreposição */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          {/* Conteúdo do banner */}
          <div className="relative w-full md:w-1/2 text-left space-y-6">
            <h2 className="text-lg md:text-xl font-extrabold text-blue-400">
              Desconto de inauguração
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Na compra de 2 cursos, <br /> o segundo sai com <br />{" "}
              <span className="font-extrabold"><span className="text-blue-400">30%</span> de desconto</span>
            </p>
            <p className="text-md md:text-lg text-gray-200">
              Aproveite esta oferta especial para começar a sua jornada <br /> de aprendizado com os melhores cursos do mercado. <br /> Invista no seu futuro hoje mesmo!
            </p>
          </div>
        </div>
        <section className="mb-12">
          <h2 className="text-3xl font-bold my-6 text-center text-gray-800">
            Cursos Disponíveis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="relative bg-gradient-to-b to-white shadow-lg rounded-xl p-6 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Imagem do curso */}
                <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200 mb-4">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform transform hover:scale-110"
                  />
                </div>

                {/* Título */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {course.title}
                </h3>

                {/* Preço */}
                <p className="text-xl font-bold text-blue-700 mb-2">{`R$ ${course.price.toFixed(
                  2
                )}`}</p>

                {/* Descrição */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                {/* Botão de "Saiba Mais" */}
                <button
                  className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring focus:ring-blue-300"
                  onClick={() => handleRedirect(`/VendasAluno`)}
                >
                  Saiba Mais
                </button>

                {/* Decoração no canto inferior direito */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-200 opacity-70 rounded-full blur-lg pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;
