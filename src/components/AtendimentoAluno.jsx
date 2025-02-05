"use client";

import React from "react";
import { FaEnvelope, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import MenuLateral from "./MenuLateral";
import { motion } from "framer-motion";


const AtendimentoAluno = () => {
  const email = "contato@example.com";
  const whatsappNumber = "+559199999999";
  const phoneNumber = "+55 (91) 99999-9999";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu lateral sem animação */}
      <MenuLateral />

      <motion.div
        className="flex-grow flex flex-col justify-center items-center p-12"
        style={{ background: "linear-gradient(120deg, #f8fafc 0%, #e7ebf0 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Glassmorphism Card */}
        <motion.div
          className="rounded-xl shadow-2xl p-12 bg-white/60 backdrop-blur-lg text-center max-w-4xl relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Shape */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-500 via-purple-400 to-pink-300 opacity-10 pointer-events-none"></div>

          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black mb-8"
          >
            Fale Conosco
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg text-gray-600 mb-12 leading-relaxed"
          >
            Nossa equipe está sempre disponível para ajudar você! Escolha uma das opções abaixo para entrar em contato
            e resolver suas dúvidas de forma rápida e eficiente.
          </motion.p>

          {/* Buttons */}
          <div className="space-y-8">
            <motion.a
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 rounded-lg shadow-lg text-xl hover:scale-105 transform transition"
              whileHover={{ scale: 1.1 }}
            >
              <FaEnvelope size={24} />
              Enviar E-mail
            </motion.a>
            <motion.a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-gradient-to-r from-green-400 to-green-600 text-white py-4 px-6 rounded-lg shadow-lg text-xl hover:scale-105 transform transition"
              whileHover={{ scale: 1.1 }}
            >
              <FaWhatsapp size={24} />
              Chamar no WhatsApp
            </motion.a>
            <motion.a
              href={`tel:${phoneNumber.replace(/\D/g, "")}`}
              className="flex items-center justify-center gap-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white py-4 px-6 rounded-lg shadow-lg text-xl hover:scale-105 transform transition"
              whileHover={{ scale: 1.1 }}
            >
              <FaPhoneAlt size={24} />
              Ligar para Nós
            </motion.a>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-tr from-blue-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-gradient-to-tr from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default AtendimentoAluno;
