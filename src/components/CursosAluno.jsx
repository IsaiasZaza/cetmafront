"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MenuLateral from "./MenuLateral";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";

const CoursesPage = () => {
  const router = useRouter();
  const [onlineCourses, setOnlineCourses] = useState([]);
  const [presentialCourses, setPresentialCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);


  const handleRedirect = (url) => {
    router.push(url);
  };

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("https://crud-usuario.vercel.app/api/api/validar-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.replace("/login");
          return;
        }

      } catch (error) {
        console.error("Erro ao validar token:", error);
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    verificarToken();
  }, [router]);


  useEffect(() => {
    AOS.init({ duration: 1000 });

    const validateTokenAndFetchCourses = async () => {
      const token = localStorage.getItem("token");

      // Se não houver token, redireciona para o login
      if (!token) {
        setMessage({ type: "error", text: "Você precisa estar logado para acessar os cursos." });
        router.replace("/login");
        return;
      }

      try {
        // Valida o token
        const res = await fetch("https://crud-usuario.vercel.app/api/api/validar-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          setMessage({ type: "error", text: "Sessão expirada. Faça login novamente." });
          router.replace("/login");
          return;
        }

        // Token válido, agora busca os cursos
        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");

        if (!response.ok) throw new Error("Erro ao buscar cursos");

        const data = await response.json();

        const mainCourses = data.filter((course) => !course.parentCourseId);
        const online = mainCourses.filter((course) => course.type === "ONLINE");
        const presential = mainCourses.filter((course) => course.type === "PRESENTIAL");

        setOnlineCourses(online);
        setPresentialCourses(presential);

      } catch (err) {
        console.error("Erro:", err);
        setError("Erro ao carregar os cursos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    validateTokenAndFetchCourses();
  }, []);


  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(120deg, #f8fafc 0%, #e7ebf0 100%)" }}>
      <MenuLateral />

      <main className="flex-grow">
        {/* Banner */}
        <div className="relative xl:bg-banner-cursos bg-mobile-padrao bg-cover bg-center h-[60vh] lg:h-[50vh] text-white flex flex-col justify-center items-start px-6 md:px-12">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="relative w-full md:w-1/2 text-left space-y-6">
            <p className="text-2xl sm:text-4xl lg:text-2xl 2xl:text-5xl  font-bold leading-tight">
              Chegou a hora de mudar <span className="text-blue-500">sua vida</span>
              <p> junto com a CETMA. </p>
            </p>
          </div>
        </div>

        {/* Cursos Online */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold my-6 text-center text-gray-800">Cursos Online</h2>
          {loading ? (
            <p className="text-center text-gray-600">Carregando cursos...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : onlineCourses.length === 0 ? (
            <div className="text-center text-gray-600">Nenhum curso online disponível no momento.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
              {onlineCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="relative bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200 mb-4">
                    <img
                      src={course.coverImage || "/placeholder.jpg"}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 truncate">{course.title}</h3>
                  <p className="text-sm text-gray-900">
                    de <span className="line-through">{`R$ ${(course.price * 1.5).toFixed(2).replace('.', ',')}`}</span>
                  </p>
                  <p className="text-xl font-bold text-blue-700">{`R$ ${course.price.toFixed(2).replace('.', ',')}`}</p>
                  <p className="text-sm text-gray-600">À vista</p>
                  <button
                    className="w-full mt-3 bg-blue-600 text-white font-bold py-2 rounded-full hover:bg-blue-700 flex items-center justify-center gap-2"
                    onClick={() => handleRedirect(`/courses/${course.id}`)}
                  >
                    Saiba Mais <FaArrowRight />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Cursos Presenciais */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold my-6 text-center text-gray-800">Cursos Presenciais</h2>
          {loading ? (
            <p className="text-center text-gray-600">Carregando cursos presenciais...</p>
          ) : presentialCourses.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum curso presencial disponível no momento.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
              {presentialCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="relative bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-200 mb-4">
                    <img
                      src={course.coverImage || "/placeholder.jpg"}
                      alt={course.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 truncate">{course.title}</h3>
                  <p className="text-sm text-gray-900">Local: <span className="font-medium">{course.location || "Presencial"}</span></p>
                  <p className="text-xl font-bold text-blue-700">{`R$ ${course.price.toFixed(2).replace('.', ',')}`}</p>
                  <button
                    className="w-full mt-3 bg-blue-600 text-white font-bold py-2 rounded-full hover:bg-blue-700 flex items-center justify-center gap-2"
                    onClick={() => handleRedirect(`/courses/${course.id}`)}
                  >
                    Saiba Mais <FaArrowRight />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;
