import React from "react";
import { MdEmail, MdPhone, MdWhatsapp } from "react-icons/md";
import Swiper from "swiper";
import { Autoplay } from "swiper/modules";
import Header from "./Header";
import Footer from "./Footer"; 
import WhatsappVoador from "./WhatsappVoador";
import BeneficiosCards from "./BeneficiosCards";

const Beneficios = () => {
    

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-mobile-padrao lg:bg-beneficios-aluno bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[50vh] lg:h-[55vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40"
        style={{
          backgroundImage: "url('/Retangulo_22.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
        <div className="relative w-full sm:w-3/4 lg:w-2/3 text-left space-y-4 sm:space-y-6">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-400">
            Beneficios de alunos da CETMA
          </h2>
          <h1 className="text-2xl md:text-4xl lg:text-3xl xl:text-3xl 2xl:text-5xl font-extrabold leading-tight break-words">
            Pensa em se tornar aluno e <br /> quer saber mais sobre <br/> <span className="font-extrabold text-blue-400">SEUS BENEFICIOS?</span>
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200">
            Essa página é didicada para mostrar a você que quer  <br /> os beneficios dos alunoss da CETMA.<br />
          </p>
        </div>
      </section>
      <WhatsappVoador />
    <BeneficiosCards />

      <Footer />
    </div>
  );
};

export default Beneficios;
