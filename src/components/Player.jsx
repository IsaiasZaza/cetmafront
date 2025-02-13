"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ModulesBar from "./ModulesBar";

export default function VideoPlayer() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
        const data = await response.json();
        setCourse(data);
        console.log("Curso:", data);
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  useEffect(() => {
    if (course && course.videoUrl) {
      setCurrentVideoUrl(course.videoUrl);
    }
  }, [course]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback enviado:", feedback);
    setFeedback("");
  };

  if (loading) {
    return <div className="p-8 bg-[#0A1F2C] text-white min-h-screen flex items-center justify-center text-lg">Carregando...</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-[#0A1F2C] text-white min-h-screen flex flex-col md:flex-row relative">
      <div className="w-full md:w-3/4 pr-0 md:pr-8 mb-8 md:mb-0">
        <Link href="/aluno">
          <button className="text-[#4A90E2] hover:text-white mb-4 flex items-center gap-2 transform hover:scale-105 transition text-lg">
            <FaChevronLeft className="text-xl" /> Voltar
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl overflow-hidden shadow-lg border border-gray-700/50 bg-gradient-to-br from-[#1A2635] to-[#0F1A27]"
        >
          <ReactPlayer
            url={currentVideoUrl}
            controls
            width="100%"
            height="50vh"
            className="rounded-none"
          />
        </motion.div>

        <div className="mt-6 p-4 md:p-6 bg-gradient-to-br from-[#1A2635] to-[#0F1A27] rounded-xl shadow-xl border border-[#4A90E2]/30">
          <h3 className="text-xl md:text-2xl font-bold text-[#4A90E2] mb-4 text-center">
            Deixe seu feedback sobre a aula
          </h3>
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="4"
              placeholder="Escreva seu feedback aqui..."
              className="w-full p-3 md:p-4 bg-[#0A1F2C] border border-[#4A90E2]/50 rounded-lg text-white text-lg resize-none focus:outline-none transition-all duration-300"
            />
            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-3 bg-[#4A90E2] hover:bg-[#357ABD] active:scale-95 transition-all duration-300 text-white font-semibold rounded-lg text-lg shadow-md hover:shadow-lg"
            >
              Enviar Feedback
            </button>
          </form>
        </div>
      </div>

      <ModulesBar course={course} setCurrentVideoUrl={setCurrentVideoUrl} setCurrentLessonIndex={setCurrentLessonIndex} />

      <Link href="/atendimento">
        <button className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-[#4A90E2] p-4 rounded-full text-white shadow-lg hover:bg-[#357ABD] transition">
          <FaPhoneAlt className="text-2xl" />
        </button>
      </Link>
    </div>
  );
}
