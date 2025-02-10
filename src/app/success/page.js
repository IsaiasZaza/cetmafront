'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessModal = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/aluno');
    }, 3000); // Redireciona após 3 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-lg text-center shadow-lg max-w-md w-full"
        >
          <FaCheckCircle className="mx-auto mb-4 text-green-500" size={60} />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Pagamento realizado com sucesso!
          </h2>
          <p className="text-gray-600">
            Você será redirecionado em instantes...
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessModal;
