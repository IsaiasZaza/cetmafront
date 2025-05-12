"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuLateral from "@/components/MenuLateral";
import { Dialog } from "@headlessui/react";
import { FiMapPin, FiClock, FiBookOpen, FiDollarSign, FiX } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";

const CursoPresencial = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar curso");
        const data = await response.json();

        console.log("Curso Presencial:", data);
        setCurso(data);
      } catch (error) {
        console.error("Erro ao carregar o curso:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCurso();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) return <p className="p-10 text-xl">Carregando curso presencial...</p>;
  if (!curso) return <p className="p-10 text-xl text-red-600">Curso não encontrado.</p>;

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <MenuLateral />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          {/* Banner */}
          <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 p-6 rounded-xl shadow mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">
              🎉 Parabéns! Você está inscrito no curso <br />
              <span className="text-green-900 text-xl">"{curso.title}"</span>
            </h1>
            <p className="text-lg">Prepare-se pra mergulhar de cabeça no conteúdo!</p>
          </div>

          {/* Card do curso */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{curso.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{curso.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 mb-8">
              <div className="flex items-center gap-3">
                <FiClock className="text-blue-600" size={20} />
                <span><strong>Duração:</strong> {curso.periodoCurso || "Não informado"}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiBookOpen className="text-blue-600" size={20} />
                <span><strong>Carga Horária:</strong> {curso.durationHours || "Não informado"}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-blue-600" size={20} />
                <span><strong>Local:</strong> {curso.location || "Não informado"}</span>
              </div>
              <div className="flex items-center gap-3">
                <FiDollarSign className="text-blue-600" size={20} />
                <span><strong>Valor investido:</strong> R$ {curso.price || "0,00"}</span>
              </div>
            </div>

            {curso.material && (
              <div className="mb-8">
                <a
                  href={curso.material}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-5 py-2.5 rounded-lg shadow"
                >
                  <BsDownload size={18} />
                  Baixar Material Complementar
                </a>
              </div>
            )}

            <button
              onClick={openModal}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all"
            >
              Entrar em contato com o professor
            </button>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

        <div className="relative bg-white rounded-2xl shadow-lg max-w-md w-full p-6 z-50">
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
          <Dialog.Title className="text-xl font-bold text-blue-800 mb-4">Contato com o Professor</Dialog.Title>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Seu nome</label>
              <input type="text" className="w-full border rounded-lg p-2 mt-1" placeholder="Digite seu nome" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Seu email</label>
              <input type="email" className="w-full border rounded-lg p-2 mt-1" placeholder="Digite seu email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea className="w-full border rounded-lg p-2 mt-1" rows="4" placeholder="Digite sua dúvida..." />
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default CursoPresencial;
