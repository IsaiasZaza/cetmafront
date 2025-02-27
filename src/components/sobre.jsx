"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import WhatsappVoador from "./WhatsappVoador";
import Footer from "./Footer";

const SobreNos = () => {
  // Estado para armazenar a imagem de fundo
  const [bgImage, setBgImage] = useState("url('/sobre.png')");

  useEffect(() => {
    const updateBackground = () => {
      // Altere o breakpoint e os caminhos conforme necessário
      if (window.innerWidth < 1024) {
        setBgImage("url('/mobile-home.png')"); // Imagem para mobile
      } else {
        setBgImage("url('/sobre.png')"); // Imagem para telas maiores
      }
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);
    return () => window.removeEventListener("resize", updateBackground);
  }, []);

  return (
    <div>
      <Header />
      <WhatsappVoador />
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[50vh] lg:h-[55vh] text-white flex flex-col justify-center items-center md:items-start px-4 sm:px-8 md:px-16 lg:px-32"
        style={{ backgroundImage: bgImage }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
        <div className="relative w-full sm:w-3/4 lg:w-2/3  md:text-left space-y-4 sm:space-y-6">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-300">
            CENTRO EDUCACIONAL TÉCNICO MÉDICO ASSISTENCIAL
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight break-words">
            De um sonhador à <br /> enfermeiro renomado
          </h1>
          <p className="mt-4 text-md sm:text-md md:text-base text-gray-200">

          </p>
        </div>
      </section>


      {/* About Section */}
      <section className="bg-white py-8 sm:py-12 text-gray-800 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="max-w-6xl"> 
          <h2 className="text-2xl text-center md:text-left sm:text-3xl font-semibold mb-4 text-blue-500">Nossa História</h2>
          <p className="mb-6 text-base sm:text-base text-gray-600">
            Seja bem-vindo ao CETMA Educacional!
            <br /><br />
            A CETMA Educacional nasceu de um sonho. Um sonho que começou com a trajetória de um enfermeiro dedicado, com mais de 15 anos de experiência na área da saúde, que vivenciou os desafios e as demandas do dia a dia em grandes hospitais. Além de sua vivência prática como enfermeiro, ele atuou como professor e coordenador em renomadas instituições de ensino do Distrito Federal, o que lhe permitiu entender, de forma ampla, as lacunas e as oportunidades para transformar a formação dos profissionais de saúde.
          </p>
          <p className="mb-6 text-base sm:text-base text-gray-600">
            Combinando sua expertise assistencial com sua paixão pela educação, ele idealizou a CETMA Educacional para oferecer capacitações que vão além do conhecimento técnico. Nossa missão é promover o desenvolvimento de competências que transformem o mercado de saúde e apoiar grandes empresas na entrega de serviços cada vez mais qualificados.
          </p>
          <p className="mb-6 text-base sm:text-base text-gray-600">
            Com um olhar atento à realidade do setor e um compromisso com a excelência, a CETMA Educacional prepara profissionais para enfrentar os desafios da saúde com confiança, ética e dedicação.
          </p>

          <h2 className="text-2xl sm:text-3xl text-center md:text-left font-semibold mb-4 text-blue-500">Sobre Nós</h2>
          <p className="mt-6 text-base sm:text-base text-gray-600">
            Somos movidos pela paixão de potencializar o ensino de qualidade e pelo compromisso com a excelência na formação de profissionais que transformam vidas por meio do cuidado. Nosso propósito é oferecer cursos de alta qualidade, acessíveis e sempre atualizados, capacitando estudantes e profissionais de saúde a alcançarem o máximo de seu potencial.
          </p>
          <p className="mt-6 text-base sm:text-base text-gray-600">
            Com uma equipe formada por especialistas experientes e atuantes na área da saúde, desenvolvemos conteúdos que aliam teoria e prática, preparando você para enfrentar os desafios e atender às demandas do dia a dia em sua atividade profissional. Acreditamos que o conhecimento não apenas transforma carreiras, mas também salva vidas.
          </p>
          <h2 className="text-2xl sm:text-3xl text-center md:text-left font-semibold mt-4 mb-4 text-blue-500">O que você encontra no CETMA</h2>
          <ul className="mt-6 text-base sm:text-base text-gray-600 space-y-6">
            <li>
              <strong>Cursos Online:</strong> Aulas interativas e materiais exclusivos que você pode acessar no seu próprio ritmo, de qualquer lugar.
            </li>
            <li>
              <strong>Conteúdo Atualizado:</strong> Temas relevantes, alinhados às inovações e às necessidades do mercado de saúde.
            </li>
            <li>
              <strong>Certificação Reconhecida:</strong> Certificados que valorizam seu currículo e fortalecem sua trajetória profissional.
            </li>
            <li>
              <strong>Suporte Especializado:</strong> Uma equipe sempre pronta para esclarecer dúvidas e apoiar seu desenvolvimento.
            </li>
            <li>
              <strong>Compromisso com a Excelência:</strong> Nosso foco é oferecer uma educação de qualidade que impulsione sua carreira e contribua para um cuidado mais humano e eficiente. Junte-se a nós nessa jornada de aprendizado e crescimento. Porque cuidar é uma arte, e você merece estar preparado para exercê-la com confiança, competência e paixão.
            </li>
          </ul>
          <p className="mt-4 font-bold text-base sm:text-base text-gray-600">
            <span className="text-blue-500">CETMA Educacional</span> – Transformando a assistência à saúde.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SobreNos;
