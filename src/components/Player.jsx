"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp, FaPhoneAlt  } from "react-icons/fa";
import Link from "next/link";

export default function VideoPlayer() {
  const router = useRouter();
  const [rating, setRating] = useState(3);
  const [openModule, setOpenModule] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showContact, setShowContact] = useState(false);  // Controla a visibilidade da seção de atendimento
  const videoUrl = "https://youtu.be/1yorXvlZd6s?si=CcjqUCqB82RuDjDQ";

  const modules = [
    { id: 1, title: "Módulo 1", lessons: ["Aula 1", "Aula 2", "Aula 3", "Aula 4", "Aula 5"] },
    { id: 2, title: "Módulo 2", lessons: ["Aula 1", "Aula 2", "Aula 3", "Aula 4", "Aula 5"] },
    
  ];

  const toggleModule = (id) => {
    setOpenModule(openModule === id ? null : id);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback enviado:", feedback);
    setFeedback("");
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

        <div className="rounded-2xl overflow-hidden bg-[#1A2635] shadow-xl border border-gray-700">
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="70vh"
            className="rounded-lg"
          />
        </div>

        <div className="mt-6 border-b border-[#1A2635] pb-2 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-[#4A90E2]">Aula 1 - Introdução</h2>
          <div className="flex gap-6">
            <button className="p-4 bg-[#4A90E2] hover:bg-[#357ABD] transition text-white rounded-lg text-xl flex items-center justify-center">
              <FaChevronLeft />
            </button>
            <button className="p-4 bg-[#4A90E2] hover:bg-[#357ABD] transition text-white rounded-lg text-xl flex items-center justify-center">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-[#1A2635] rounded-lg shadow-lg border border-[#1A2635]">
          <h3 className="text-xl font-bold text-[#4A90E2] mb-4">Deixe seu feedback sobre a aula</h3>
          <form onSubmit={handleFeedbackSubmit}>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-4 bg-[#0A1F2C] border border-[#4A90E2] rounded-lg text-white text-lg resize-none"
              rows="5"
              placeholder="Escreva seu feedback aqui..."
            />
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-[#4A90E2] hover:bg-[#357ABD] transition text-white rounded-lg text-lg"
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
                  <span className="font-medium text-gray-300">{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botão flutuante de atendimento */}
       {/* Botão flutuante de ajuda */}
       <Link href="/atendimento">
        <button className="fixed bottom-8 right-8 bg-[#4A90E2] p-4 rounded-full text-white shadow-lg hover:bg-[#357ABD] transition">
          <FaPhoneAlt className="text-2xl" />
        </button>
      </Link>
      
    </div>
  );
}
