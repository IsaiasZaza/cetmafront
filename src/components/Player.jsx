"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function VideoPlayer() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Cria uma lista de aulas que inclui o vídeo introdutório (do curso) e os subcursos
  const lessons = course
    ? course.videoUrl
      ? [
        {
          id: course.id,
          title: `Introdução: ${course.title}`,
          description: course.description,
          videoUrl: course.videoUrl,
        },
        ...(course.subCourses || []),
      ]
      : (course.subCourses || [])
    : [];

  // Busca os dados do curso
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

  // Define o vídeo inicial quando a lista de aulas estiver pronta
  useEffect(() => {
    if (lessons.length > 0 && !currentVideoUrl) {
      setCurrentVideoUrl(lessons[0].videoUrl);
      setCurrentLessonIndex(0);
    }
  }, [lessons, currentVideoUrl]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback enviado:", feedback);
    setFeedback("");
  };

  // Muda o vídeo e atualiza o índice atual da aula
  const changeVideo = (url, index) => {
    setCurrentVideoUrl(url);
    setCurrentLessonIndex(index);
  };

  // Função para voltar para a aula anterior
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const newIndex = currentLessonIndex - 1;
      setCurrentLessonIndex(newIndex);
      setCurrentVideoUrl(lessons[newIndex].videoUrl);
    }
  };

  // Função para ir para a próxima aula
  const goToNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const newIndex = currentLessonIndex + 1;
      setCurrentLessonIndex(newIndex);
      setCurrentVideoUrl(lessons[newIndex].videoUrl);
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-[#0A1F2C] text-white min-h-screen">
        Carregando...
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#0A1F2C] text-white min-h-screen flex flex-col md:flex-row relative">
      {/* Seção de vídeo e feedback */}
      <div className="w-full md:w-3/4 pr-0 md:pr-8 mb-8 md:mb-0">
        <button
          href="/aluno"
          className="text-[#4A90E2] hover:text-white mb-6 flex items-center gap-2 transform hover:scale-105 transition"
        >
          <FaChevronLeft className="text-xl" /> Voltar
        </button>

        {/* Container animado para o player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 bg-gradient-to-br from-[#1A2635] to-[#0F1A27]"
        >
          <ReactPlayer
            url={currentVideoUrl}
            controls
            width="100%"
            height="68vh"
            className="rounded-none"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,   // Minimiza a marca do YouTube
                  rel: 0,              // Não exibe vídeos relacionados ao final
                  controls: 1,         // Mantém os controles básicos para o usuário
                  disablekb: 1,        // Desabilita atalhos de teclado que podem expor links ou opções
                  fs: 0,               // Remove o botão de tela cheia (que pode levar a outras interações)
                  iv_load_policy: 3,   // Desativa anotações sobre o vídeo
                  origin: window.location.origin, // Define a origem para reforçar a segurança
                },
              },
            }}
          />

        </motion.div>

        <div className="mt-6 flex items-center justify-between border-b border-[#1A2635] pb-2">
          <h2 className="text-3xl font-semibold text-[#4A90E2]">
            {lessons[currentLessonIndex]?.title}
          </h2>
          <div className="flex gap-6">
            <button
              onClick={goToPreviousLesson}
              disabled={currentLessonIndex === 0}
              className={`p-4 text-white rounded-lg text-xl flex items-center justify-center transition-all ${currentLessonIndex === 0 ? "bg-[#4A90E2]/50 cursor-not-allowed" : "bg-[#4A90E2] hover:bg-[#357ABD]"
                }`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNextLesson}
              disabled={currentLessonIndex === lessons.length - 1}
              className={`p-4 text-white rounded-lg text-xl flex items-center justify-center transition-all ${currentLessonIndex === lessons.length - 1 ? "bg-[#4A90E2]/50 cursor-not-allowed" : "bg-[#4A90E2] hover:bg-[#357ABD]"
                }`}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-[#1A2635] to-[#0F1A27] rounded-2xl shadow-xl border border-[#4A90E2]/30">
          <h3 className="text-2xl font-bold text-[#4A90E2] mb-4 text-center">
            Deixe seu feedback sobre a aula
          </h3>
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="5"
              placeholder="Escreva seu feedback aqui..."
              className="w-full p-4 bg-[#0A1F2C] border border-[#4A90E2]/50 rounded-xl text-white text-lg resize-none focus:outline-none transition-all duration-300"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#4A90E2] hover:bg-[#357ABD] active:scale-95 transition-all duration-300 text-white font-semibold rounded-xl text-lg shadow-md hover:shadow-lg"
            >
              Enviar Feedback
            </button>
          </form>
        </div>
      </div >

      {/* Seção de módulos (lista de aulas) com design aprimorado */}
      < div className="w-full md:w-1/4 md:fixed md:right-0 md:top-0 h-full bg-gradient-to-b from-[#16222A] to-[#3A6073] p-6 shadow-2xl overflow-y-auto rounded-l-2xl" >
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#357ABD] animate-pulse">
          Módulos
        </h1>
        {
          lessons.map((lesson, index) => (
            <motion.button
              key={lesson.id}
              onClick={() => changeVideo(lesson.videoUrl, index)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-start px-4 py-3 mb-4 rounded-xl font-bold text-lg transition transform ${currentLessonIndex === index
                ? "bg-gradient-to-r from-[#357ABD] to-[#4A90E2] ring-2 ring-[#4A90E2]"
                : "bg-[#1A3A55] hover:bg-[#357ABD]"
                } text-white`}
            >
              {lesson.title}
            </motion.button>
          ))
        }
      </div >

      {/* Botão flutuante de atendimento */}
      < Link href="/atendimento" >
        <button className="fixed bottom-8 right-8 bg-[#4A90E2] p-4 rounded-full text-white shadow-lg hover:bg-[#357ABD] transition">
          <FaPhoneAlt className="text-2xl" />
        </button>
      </Link >
    </div >
  );
}
