import React from "react";
import Header from "./Header";
import WhatsappVoador from "./WhatsappVoador";
import Footer from "./Footer";

const SobreNos = () => {
  return (
    <div>
      <Header />
      <WhatsappVoador />
      {/* Hero Section */}
      <section
        className="relative bg-[url('/sobre.png')] bg-cover bg-center h-[70vh] sm:h-[60vh] md:h-[50vh] lg:h-[45vh] text-white flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 lg:px-32"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
        <div className="relative w-full sm:w-3/4 lg:w-2/3 text-left space-y-4 sm:space-y-6">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-300">
            CENTRO EDUCACIONAL TÉCNICO MÉDICO ASSISTENCIAL
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight break-words">
            De um sonhador à <br /> enfermeiro renomado
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do <br />
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis <br />
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas <br />
            accumsan lacus vel facilisis.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-8 sm:py-12 text-gray-800 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="max-w-6xl "> 
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-500">Sobre Nós</h2>
          <p className="mb-6 text-sm sm:text-base text-gray-600">
            Seja bem-vindo ao CETMA!
            <br />
            <br />
            Somos apaixonados pela enfermagem e comprometidos com a formação de
            profissionais que fazem a diferença na saúde e no cuidado das
            pessoas. Nosso objetivo é oferecer cursos de alta qualidade,
            acessíveis e atualizados, que capacitem enfermeiros e estudantes de
            enfermagem a alcançarem seu máximo potencial.
          </p>
          <p className="mb-6 text-sm sm:text-base text-gray-600">
            Com uma equipe composta por especialistas experientes e atuantes na
            área da saúde, desenvolvemos conteúdos que unem teoria e prática,
            preparando você para enfrentar os desafios do dia a dia na
            enfermagem. Acreditamos que o conhecimento transforma vidas e que
            profissionais bem preparados salvam vidas.
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-500">O que oferecemos:</h3>
          <ul className="list-disc pl-5 sm:pl-8 text-sm sm:text-base text-gray-600">
            <li className="mb-2">
              <strong>Cursos Online:</strong> Aulas interativas e materiais
              exclusivos que você pode acessar no seu próprio ritmo, de qualquer
              lugar.
            </li>
            <li className="mb-2">
              <strong>Conteúdo Atualizado:</strong> Temas relevantes e alinhados
              às demandas do mercado e às inovações na área da saúde.
            </li>
            <li className="mb-2">
              <strong>Certificação:</strong> Certificados reconhecidos que
              valorizam seu currículo e sua carreira.
            </li>
            <li className="mb-2">
              <strong>Suporte Especializado:</strong> Uma equipe pronta para
              tirar suas dúvidas e ajudar no seu desenvolvimento.
            </li>
            <li className="mb-2">
              <strong>Compromisso com a Excelência:</strong> Nosso compromisso é
              com a excelência na educação em enfermagem, ajudando você a
              conquistar seus objetivos profissionais e contribuir com
              dedicação ao bem-estar de cada paciente.
            </li>
          </ul>
          <p className="mt-6 text-sm sm:text-base text-gray-600">
            Junte-se a nós nessa jornada de aprendizado e crescimento. Porque
            cuidar é uma arte, e você merece estar preparado para exercê-la com
            confiança e competência.
          </p>
          <p className="mt-4 font-bold text-sm sm:text-base text-gray-600">
            <span className="text-blue-500">CETMA</span> – Transformando a Enfermagem, Transformando Vidas.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SobreNos;
