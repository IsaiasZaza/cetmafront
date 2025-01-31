"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-gray-600">Carregando curso...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-bold text-red-600">Curso não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <motion.div
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h2>

        <div className="relative overflow-hidden rounded-lg aspect-video bg-gray-200 mb-6">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-lg text-gray-700 mb-4">{course.description}</p>
        <p className="text-2xl font-bold text-blue-600">{`R$ ${course.price.toFixed(2)}`}</p>
      </motion.div>
    </div>
  );
};

export default CourseDetail;
