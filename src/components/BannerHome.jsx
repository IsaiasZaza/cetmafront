"use client";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";


export default function BannerHome() {
  const [bgImage, setBgImage] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);



  return (
    <section
      className="relative bg-home-mobile lg:bg-home lg: flex items-center bg-cover bg-center h-[85vh]"

    >
      {/* Gradiente de sobreposição */}
      <div className="absolute inset-0bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>

      {/* Conteúdo principal */}
      <div className="relative text-white p-4 sm:p-8 rounded-lg max-w-4xl z-10 text-start">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight font-poppins mb-4">
          Torne-se uma referência em <br className="hidden sm:block" />
          <span className="text-blue-400">Enfermagem Profissional</span>
        </h1>
        <p className="text-lg lg:text-xl mb-8 text-start">
          Aprimore sua carreira com os melhores <strong>cursos online de enfermagem. </strong><br />
          Tenha acesso a especialistas renomados e transforme seu futuro com a <strong className="text-blue-400">CETMA</strong>.
        </p>
        <div className="mb-6">
          <p className="text-xl font-bold mb-2">OFERTAS EXCLUSIVAS, SÓ HOJE!</p>
          <p className="text-3xl font-semibold tracking-widest text-blue-400">{timeLeft}</p>
        </div>
        <div className="mb-6">
          <div className="w-full max-w-[480px]">
            <a
              href="/login"
              className="uppercase bg-blue-500 text-white py-3 px-6 mt-4 rounded-lg font-extrabold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-lg w-full"
            >
              
              Garantir minha vaga <FaArrowRight className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
