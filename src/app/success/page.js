'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = () => {
  const router = useRouter();
  const [isRedirected, setIsRedirected] = useState(false);

  const handleRedirect = () => {
    setIsRedirected(true);
    router.push('/aluno');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#415A77] flex items-center justify-center p-8">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#0A1F2C] bg-opacity-90 backdrop-blur-sm p-8 rounded-lg text-center shadow-2xl max-w-md w-full border border-[#1A2635]"
        >
          <FaCheckCircle className="mx-auto mb-4 text-[#4CAF50]" size={60} />
          <h2 className="text-2xl font-semibold text-[#4CAF50] mb-4">
            Pagamento realizado com sucesso!
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Sua compra foi concluída com sucesso. Agora, basta clicar no botão abaixo para acessar a área do aluno.
          </p>

          <p className="text-lg">Obrigado por escolher nossos cursos! 🚀</p>

          <button
            onClick={handleRedirect}
            className="w-full flex items-center justify-center px-6 py-3 bg-[#4A90E2] hover:bg-[#357ABD] rounded-lg text-white text-xl font-semibold transition-all duration-300 mt-6"
          >
            Acessar área do aluno
          </button>
          <motion.div
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-4 text-sm">
              Se não for redirecionado automaticamente, <a href="/aluno" className="text-[#4A90E2]">clique aqui</a>.
            </p>
          </motion.div>
        </motion.div>
        
      </AnimatePresence>
    </div>
  );
};

export default SuccessModal;
