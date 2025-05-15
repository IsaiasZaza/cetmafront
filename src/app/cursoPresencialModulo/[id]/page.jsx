"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuLateral from "@/components/MenuLateral";
import { FaWhatsapp } from "react-icons/fa";

import { FiMapPin, FiClock, FiBookOpen, FiDollarSign, FiUser, FiInstagram } from "react-icons/fi";
import { BsDownload } from "react-icons/bs";

export default function CursoPresencial() {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const whatsappNumber = "61992441951";

  useEffect(() => {
    async function fetchCurso() {
      try {
        const res = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar curso");
        const data = await res.json();
        setCurso(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCurso();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-500 animate-pulse">Carregando curso...</p>
      </div>
    );
  }

  if (!curso) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-lg">Curso não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">

      <MenuLateral />


      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-5xl mx-auto space-y-10">


          {/* Detalhes do Curso */}
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-lg space-y-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-800 border-b pb-2">Detalhes do Curso</h2>
            <h3 className="text-xl font-bold text-gray-700  pb-2">{curso.title}</h3>
            <div className="text-gray-700 space-y-4">
              {curso.description && <p>{curso.description}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                {curso.schedule && (
                  <DetailItem icon={<FiClock />} label="Data e Horário" value={curso.schedule} />
                )}
                {curso.durationHours && (
                  <DetailItem icon={<FiBookOpen />} label="Carga Horária" value={`${curso.durationHours} horas`} />
                )}
                {curso.location && (
                  <DetailItem icon={<FiMapPin />} label="Local" value={curso.location} />
                )}
                {curso.price !== undefined && (
                  <DetailItem icon={<FiDollarSign />} label="Valor" value={`R$ ${curso.price.toFixed(2)}`} />
                )}
                {curso.audience && (
                  <DetailItem icon={<FiUser />} label="Público-alvo" value={curso.audience} />
                )}
              </div>
            </div>

            {/* Instrutor */}
            {(curso.instructorName || curso.instructorTitle || curso.instructorCRM || curso.instructorRQE) && (
              <div className="pt-6 border-t space-y-1 text-black">
                <h3 className="text-lg font-semibold text-blue-800">Instrutor</h3>
                {curso.instructorName && <p><strong>Nome:</strong> {curso.instructorName}</p>}
                {curso.instructorTitle && <p><strong>Título:</strong> {curso.instructorTitle}</p>}
                {curso.instructorCRM && <p><strong>CRM:</strong> {curso.instructorCRM}</p>}
                {curso.instructorRQE && <p><strong>RQE:</strong> {curso.instructorRQE}</p>}
              </div>
            )}

            {/* Organização */}
            <div className="pt-6 border-t text-black">
              {curso.organizerInstagram && (
                <div className="flex justify-end">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Instagram */}
                    <a
                      href={`https://instagram.com/${curso.organizerInstagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition font-medium"
                    >
                      <FiInstagram href="curso.organizerInstagram" className="text-2xl" />
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white py-2 rounded-lg  transition text-base sm:text-lg"
                    >
                      <FaWhatsapp className="text-2xl text-green-500" />
                   
                    </a>
                  </div>
                </div>
              )}
            </div>



            {/* Material para download */}
            {curso.material && (
              <div className="pt-6 border-t">
                <a
                  href={curso.material}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition text-white font-medium py-3 px-6 rounded-lg w-full md:w-fit"
                >
                  <BsDownload size={18} />
                  Baixar material do curso
                </a>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

// Componente auxiliar para detalhamento
function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 shadow-sm">
      <div className="text-blue-600">{icon}</div>
      <div className="text-sm">
        <strong>{label}:</strong> {value}
      </div>
    </div>
  );
}
