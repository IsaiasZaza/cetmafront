import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsappVoador from "./WhatsappVoador";

const FaleConosco = () => {
  return (
    <div>
      <Header />

      {/* Seção Hero */}
      <section
        className="relative bg-mobile-padrao lg:bg-fale bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[50vh] lg:h-[55vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
        <div className="relative w-full sm:w-3/4 lg:w-2/3 text-left space-y-4 sm:space-y-6">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-400">
            Fale conosco
          </h2>
          <h1 className="text-2xl sm:text-4xl  lg:text-3xl 2xl:text-5xl font-extrabold leading-tight font-poppins mb-4 break-words">
            Tire suas dúvidas com <br /> a equipe da <span className="font-extrabold text-blue-400">CETMA</span>
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200">
            Estamos aqui para ajudá-lo. Entre em contato conosco através dos canais abaixo.
          </p>
        </div>
      </section>
      <WhatsappVoador />
      {/* Opções de Contato */}
      <section className="bg-gray-100 pb-10">
        <p className="text-3xl text-gray-800 text-center py-16">
          Nossos canais de <span className="text-blue-500 font-bold">atendimento</span>
        </p>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-items-center items-center">
          {[
            {
              icon: <MdEmail className="text-blue-500 text-5xl mb-4" />,
              title: "Fale conosco através do nosso email.",
              buttonText: "Envie um e-mail",
              buttonColor: "bg-blue-500 w-full py-3 hover:bg-blue-600",
              link: "mailto:cetmacetma7@gmail.com",
            },
            {
              icon: <FaWhatsapp className="text-green-500 text-5xl mb-4" />,
              title: "Mande mensagem no nosso WhatsApp.",
              buttonText: "WhatsApp",
              buttonColor: "bg-green-500 w-full py-3 hover:bg-green-600",
              link: "https://wa.link/wggbtg",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between text-center h-auto sm:h-72 lg:h-70"
            >
              <div className="flex flex-col items-center">
                {card.icon}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              </div>
              <a
                className={`${card.buttonColor} text-white px-6 py-2 rounded-lg transition mt-4`}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {card.buttonText}
              </a>
            </div>
          ))}
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default FaleConosco;
