"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp, FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";

export default function VideoPlayer() {
  const router = useRouter();
  const [rating, setRating] = useState(3);
  const [openModule, setOpenModule] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [currentVideoUrl, setCurrentVideoUrl] = useState("https://youtu.be/1yorXvlZd6s"); // Estado para armazenar a URL do vídeo
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Índice da aula atual
  const [showContact, setShowContact] = useState(false);

  const modules = [
    {
      id: 1,
      title: "Fundamentos da Enfermagem",
      lessons: [
        { title: "Introdução à Enfermagem", url: "https://youtu.be/1yorXvlZd6s" },
        { title: "Ética e Responsabilidade Profissional", url: "https://www.youtube.com/embed/XziTBfKrMJE?si=1LRWRzKviQalv7KT" },
        { title: "A importância da Comunicação", url: "https://youtu.be/AMycd3y3Vns?si=41vmJoLqF0k2MU9O" },
        { title: "Cuidados com Pacientes Críticos", url: "https://youtu.be/wfFTSbxyI1M?si=YwPacX0jmlEB0xMQ" },
        { title: "Administração de Medicamentos", url: "https://youtu.be/63B6H9Dra_8?si=IuObVoU0dHL-4BwL" }
      ]
    },
    {
      id: 2,
      title: "Enfermagem em Cuidados Especiais",
      lessons: [
        { title: "Aula 1: Enfermagem Obstétrica", url: "https://youtu.be/6mnoMNO345" },
        { title: "Aula 2: Enfermagem Pediátrica", url: "https://youtu.be/7pqrPQR678" },
        { title: "Aula 3: Cuidados Intensivos e UTI", url: "https://youtu.be/8stuSTU901" },
        { title: "Aula 4: Enfermagem Oncológica", url: "https://youtu.be/9vwxVWX234" },
        { title: "Aula 5: Enfermagem Geriátrica", url: "https://youtu.be/0yzYZZ567" }
      ]
    }
  ];

  const toggleModule = (id) => {
    setOpenModule(openModule === id ? null : id);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback enviado:", feedback);
    setFeedback("");
  };

  // Função para alterar o vídeo
  const changeVideo = (url, index) => {
    setCurrentVideoUrl(url);
    setCurrentLessonIndex(index);
  };

  // Funções de navegação
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      const prevLesson = modules[0].lessons[currentLessonIndex - 1];
      setCurrentVideoUrl(prevLesson.url);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < modules[0].lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      const nextLesson = modules[0].lessons[currentLessonIndex + 1];
      setCurrentVideoUrl(nextLesson.url);
    }
  };

  return (
    <div className="p-8 bg-[#0A1F2C] text-white min-h-screen flex relative">
      {/* Seção de vídeo */}
      <div className="w-3/4 pr-8">
        <button
          onClick={() => router.back()}
          className="text-[#4A90E2] hover:text-white mb-6 flex items-center gap-2 transform hover:scale-105 transition"
        >
          <FaChevronLeft className="text-xl" /> Voltar
        </button>

        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 bg-gradient-to-br from-[#1A2635] to-[#0F1A27]">
          <ReactPlayer
            url={currentVideoUrl} // A URL do vídeo agora vem do estado
            controls
            width="100%"
            height="68vh"
            className="rounded-none"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0
                }
              }
            }}
          />
        </div>

        <div className="mt-6 border-b border-[#1A2635] pb-2 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-[#4A90E2]">{modules[0].lessons[currentLessonIndex].title}</h2>
          <div className="flex gap-6">
            <button
              onClick={goToPreviousLesson}
              className={`p-4 text-white rounded-lg text-xl flex items-center justify-center transition-all ${currentLessonIndex === 0 ? 'bg-[#4A90E2]/50 cursor-not-allowed' : 'bg-[#4A90E2] hover:bg-[#357ABD]'}`}
              disabled={currentLessonIndex === 0}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNextLesson}
              className={`p-4 text-white rounded-lg text-xl flex items-center justify-center transition-all ${currentLessonIndex === modules[0].lessons.length - 1 ? 'bg-[#4A90E2]/50 cursor-not-allowed' : 'bg-[#4A90E2] hover:bg-[#357ABD]'}`}
              disabled={currentLessonIndex === modules[0].lessons.length - 1}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-[#1A2635] to-[#0F1A27] rounded-2xl shadow-xl border border-[#4A90E2]/30">
          <h3 className="text-2xl font-bold text-[#4A90E2] mb-4 text-center">Deixe seu feedback sobre a aula</h3>
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 bg-[#0A1F2C] border border-[#4A90E2]/50 rounded-xl text-white text-lg resize-none focus:outline-none transition-all duration-300"
              rows="5"
              placeholder="Escreva seu feedback aqui..."
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#4A90E2] hover:bg-[#357ABD] active:scale-95 transition-all duration-300 text-white font-semibold rounded-xl text-lg shadow-md hover:shadow-lg"
            >
              Enviar Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Seção de módulos */}
      <div className="w-1/4 fixed right-0 top-0 h-full bg-[#1A2635] p-6 shadow-2xl overflow-y-auto rounded-l-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#357ABD] animate-pulse">
          Módulos
        </h1>

        {modules.map((module) => (
          <div key={module.id} className="mb-4">
            <button
              className="w-full flex justify-between items-center bg-[#4A90E2] hover:bg-[#357ABD] transition text-white p-4 rounded-lg font-bold text-lg"
              onClick={() => toggleModule(module.id)}
            >
              {module.title}
              {openModule === module.id ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openModule === module.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              {module.lessons.map((lesson, index) => (
                <div key={index} className="flex items-center gap-3 py-3 px-4 border-b border-[#4A90E2] hover:bg-[#4A90E2] hover:text-black rounded-lg transition-all">
                  <div className="w-10 h-10 bg-[#4A90E2] rounded-full flex items-center justify-center text-white text-xl">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-300">
                    <button onClick={() => changeVideo(lesson.url, index)} className="text-white">
                      {lesson.title}
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botão flutuante de atendimento */}
      <Link href="/atendimento">
        <button className="fixed bottom-8 right-8 bg-[#4A90E2] p-4 rounded-full text-white shadow-lg hover:bg-[#357ABD] transition">
          <FaPhoneAlt className="text-2xl" />
        </button>
      </Link>
    </div>
  );
}
