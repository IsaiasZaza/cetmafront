"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa o roteador do Next.js
import MenuLateral from "./MenuLateral";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const CoursesPage = () => {
  const router = useRouter(); // Inicializa o roteador

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Cursos mais comprados
  const bestSellingCourses = [
    {
      title: "Cardiologia e Hemodinâmica",
      oldPrice: "R$ 1299,99",
      price: "R$ 999,99",
      installment: "em 6x sem juros",
      image: "/curso1.jpg",
      discount: "-20%",
      url: "/cardiologia",
    },
    {
      title: "Nutrição Esportiva",
      oldPrice: "R$ 1499,99",
      price: "R$ 1099,99",
      installment: "em 6x sem juros",
      image: "/curso2.jpg",
      discount: "-25%",
      url: "/courses/nutricao-esportiva",
    },
    {
      title: "Primeiros Socorros",
      oldPrice: "R$ 899,99",
      price: "R$ 649,99",
      installment: "em 3x sem juros",
      image: "/curso3.jpg",
      discount: "-30%",
      url: "/courses/primeiros-socorros",
    },
    {
      title: "Saúde Mental para Profissionais",
      oldPrice: "R$ 1199,99",
      price: "R$ 899,99",
      installment: "em 5x sem juros",
      image: "/curso04.jpg",
      discount: "-15%",
      url: "/courses/saude-mental",
    },
  ];

  // Todos os cursos
  const allCourses = [
    {
      title: "Medicina Alternativa",
      oldPrice: "R$ 1799,99",
      price: "R$ 1399,99",
      installment: "em 7x sem juros",
      image: "/todos01.jpg",
      discount: "-20%",
      url: "/courses/medicina-alternativa",
    },
    {
      title: "Terapias Holísticas",
      oldPrice: "R$ 1299,99",
      price: "R$ 999,99",
      installment: "em 5x sem juros",
      image: "/todos01.jpg",
      discount: "-23%",
      url: "/courses/terapias-holisticas",
    },
    {
      title: "Gestão de Saúde",
      oldPrice: "R$ 2499,99",
      price: "R$ 1999,99",
      installment: "em 10x sem juros",
      image: "/todos01.jpg",
      discount: "-20%",
      url: "/courses/gestao-saude",
    },
    {
      title: "Farmacologia",
      oldPrice: "R$ 1699,99",
      price: "R$ 1299,99",
      installment: "em 6x sem juros",
      image: "/todos01.jpg",
      discount: "-24%",
      url: "/courses/farmacologia",
    },
    {
      title: "Psicologia Clínica",
      oldPrice: "R$ 2199,99",
      price: "R$ 1699,99",
      installment: "em 8x sem juros",
      image: "/todos01.jpg",
      discount: "-23%",
      url: "/courses/psicologia-clinica",
    },
    {
      title: "Bioética na Saúde",
      oldPrice: "R$ 899,99",
      price: "R$ 649,99",
      installment: "em 4x sem juros",
      image: "/todos01.jpg",
      discount: "-28%",
      url: "/courses/bioetica-saude",
    },
    {
      title: "Cuidados Paliativos",
      oldPrice: "R$ 1299,99",
      price: "R$ 999,99",
      installment: "em 5x sem juros",
      image: "/todos01.jpg",
      discount: "-20%",
      url: "/courses/cuidados-paliativos",
    },
    {
      title: "Administração Hospitalar",
      oldPrice: "R$ 1599,99",
      price: "R$ 1199,99",
      installment: "em 6x sem juros",
      image: "/todos01.jpg",
      discount: "-25%",
      url: "/courses/administracao-hospitalar",
    },
  ];

  const handleRedirect = (url) => {
    router.push(url); // Redireciona para a URL do curso
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(120deg, #f8fafc 0%, #e7ebf0 100%)" }}
    >
      <MenuLateral />

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Section: Cursos mais comprados */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Cursos mais comprados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingCourses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 relative transition hover:shadow-2xl hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {course.discount}
                </span>

                <div className="w-full aspect-square bg-gray-300 rounded mb-4 flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 line-through">
                  {course.oldPrice}
                </p>
                <p className="text-xl font-bold text-blue-600">{course.price}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {course.installment}
                </p>
                <button
                  className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => handleRedirect(course.url)}
                >
                  Saiba mais
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section: Todos os cursos */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Todos os cursos
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-aos="fade-up"
          >
            {allCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 relative transition hover:shadow-2xl hover:scale-105"
              >
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {course.discount}
                </span>

                <div className="w-full aspect-square bg-gray-300 rounded mb-4 flex items-center justify-center">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 line-through">
                  {course.oldPrice}
                </p>
                <p className="text-xl font-bold text-blue-600">{course.price}</p>
                <p className="text-sm text-gray-500 mb-4">
                  {course.installment}
                </p>
                <button
                  className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => handleRedirect(course.url)}
                >
                  Saiba Mais
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;
