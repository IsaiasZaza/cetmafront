import React from "react";
import { MdEmail, MdPhone, MdWhatsapp } from "react-icons/md";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsappVoador from "./WhatsappVoador";

const FaleConosco = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-[url('/sobre.png')] bg-cover bg-center h-[70vh] sm:h-[60vh] md:h-[50vh] lg:h-[45vh] text-white flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 lg:px-32"
        style={{
          backgroundImage: "url('/fale.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
        <div className="relative w-full sm:w-3/4 lg:w-2/3 text-left space-y-4 sm:space-y-6">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-400">
            Fale conosco
          </h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight break-words">
            Tire suas dúvidas com <br /> a equipe da <span className="font-extrabold text-blue-400">CETMA</span>
          </h1>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200">
            Nesta página você encontra os meios de <br /> falar com a equipe de atendimento <br /> CETMA.
          </p>
        </div>
      </section>
      <WhatsappVoador />
      {/* Contact Options */}
      <section className="bg-gray-100 pb-10">
        <p className="text-3xl text-gray-800 text-center py-16">Nossos canais de <span className="text-blue-500 font-bold">atendimento</span></p>
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <MdEmail className="text-blue-500 text-6xl mb-4" />,
              title: "Fale conosco através do nosso email.",
              buttonText: "Envie um e-mail",
              buttonColor: "bg-blue-500 hover:bg-blue-600",
            },
            {
              icon: <MdPhone className="text-blue-500 text-6xl mb-4" />,
              title: "Ligue e fale com a CETMA.",
              description: "Segunda a sexta das 08h às 17h.",
              buttonText: "Fale com a CETMA",
              buttonColor: "bg-blue-500 hover:bg-blue-600",
            },
            {
              icon: <MdWhatsapp className="text-green-500 text-6xl mb-4" />,
              title: "Mande mensagem através do nosso WhatsApp.",
              buttonText: "WhatsApp",
              buttonColor: "bg-green-500 hover:bg-green-600",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between h-auto sm:h-72 lg:h-70"
            >
              <div className="flex flex-col items-center text-center">
                {card.icon}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                {card.description && (
                  <p className="text-sm text-gray-600">{card.description}</p>
                )}
              </div>
              <button
                className={`${card.buttonColor} text-white px-6 py-2 rounded-lg transition mt-4`}
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaleConosco;
