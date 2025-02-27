"use client"

import React, { useEffect, useState } from "react";
import { MdEmail, MdPhone, MdWhatsapp } from "react-icons/md";
import Header from "./Header";
import Footer from "./Footer";
import WhatsappVoador from "./WhatsappVoador";

const Ebook = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await fetch("https://crud-usuario.vercel.app/api/ebooks");
        if (!response.ok) {
          throw new Error("Erro ao buscar os e-books");
        }
        const data = await response.json();
        setEbooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEbooks();
  }, []);

  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="relative bg-mobile-padrao lg:bg-ebooks bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-[50vh] lg:h-[60vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
        <div className="relative w-full sm:w-3/4 lg:w-2/3 space-y-4">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-400">
            E-books gratuitos pra você
          </h2>
          <h1 className="text-2xl md:text-4xl lg:text-3xl xl:text-3xl 2xl:text-5xl font-extrabold leading-tight w-full">
            Pensando no <span className="text-blue-400">MELHOR</span><br/> para você
            preparamos
            E-books
          </h1>
        </div>
      </section>

      <WhatsappVoador />

      {/* Ebook Cards */}
      <section className="bg-gray-100 py-20 px-6 sm:px-12 lg:px-24">
        <h2 className="text-2xl lg:text-4xl text-center mb-12 text-gray-800">
          Confira alguns benefícios que nossos alunos têm:
        </h2>
        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : error ? (
          <p className="text-center text-red-600">Erro: {error}</p>
        ) : (
          <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ebooks.map((ebook, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 h-80 flex flex-col justify-between items-center text-center transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold text-gray-900">{ebook.title}</h3>
                <p className="text-gray-600 flex-grow flex items-center">{ebook.description}</p>
                <a
                  href={ebook.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-2 rounded-lg font-medium transition-all"
                >
                  Baixe aqui
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Ebook;
