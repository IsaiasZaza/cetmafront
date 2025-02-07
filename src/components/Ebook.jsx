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
      <section className="relative bg-[url('/Retangulo_23.png')] bg-cover bg-center h-[50vh] text-white flex flex-col justify-center items-start px-6 sm:px-12 md:px-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
        <div className="relative w-full sm:w-3/4 lg:w-2/3 space-y-4">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-400">
            E-books gratuitos pra você
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Pensando no <span className="text-blue-400">MELHOR</span> para você,
            <br /> nós da CETMA preparamos
            <br /> E-books <span className="text-blue-400">TOTALMENTE GRATUITOS</span>
          </h1>
          <p className="text-gray-200 text-base md:text-lg">
            Aqui você encontra os meios de falar com a equipe de atendimento CETMA.
          </p>
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
