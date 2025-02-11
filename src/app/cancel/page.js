'use client';  // Garante que esse código será executado apenas no cliente

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaTimesCircle } from 'react-icons/fa'; // Ícone de cancelamento
import { motion } from 'framer-motion';

const CancelPage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/meusCursos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#415A77] flex items-center justify-center p-8">
      <motion.div
        className="max-w-lg w-full text-center p-8 bg-[#0A1F2C] bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700"
        initial={{ opacity: 0, y: 50 }} // Card começa invisível e abaixo
        animate={{ opacity: 1, y: 0 }} // Card aparece e sobe para sua posição
        transition={{ duration: 0.6 }} // Duração da animação
      >
        {/* Ícone de cancelamento */}
        <div className="mb-6">
          <FaTimesCircle className="w-16 h-16 mx-auto text-[#FF4C4C] animate-bounce" />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-semibold text-[#FF4C4C] mb-4">
          Pedido Não Concluído
        </h1>

        {/* Descrição */}
        <p className="text-lg text-gray-300 mb-6">
          O processo de compra foi interrompido e não foi concluído com sucesso. Não se preocupe! Você pode continuar explorando nossos cursos e fazer sua compra novamente a qualquer momento.
        </p>
        
        <p className="text-lg text-gray-300 mb-6">
          Para continuar, clique no botão abaixo e acesse a página de cursos para escolher os que mais te interessam.
        </p>

        {/* Botão de redirecionamento */}
        <button 
          onClick={handleRedirect} 
          className="w-full flex items-center justify-center px-6 py-3 bg-[#4A90E2] hover:bg-[#357ABD] rounded-lg text-white text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Ir para Meus Cursos
        </button>

        {/* Texto de assistência */}
        <p className="mt-4 text-sm text-gray-400">
          Caso precise de assistência, nossa equipe está disponível para ajudar. <a href="/atendimento" className="text-[#4A90E2] hover:underline">clique aqui</a>.
        </p>
      </motion.div>
    </div>
  );
};

export default CancelPage;
