"use client"

import { FaHome, FaBook, FaCertificate, FaUser } from "react-icons/fa";
import { FiPhone, FiLogOut } from "react-icons/fi";

const MenuLateral = () => {

  const handleLogout = () => {
    try {
      // Remove o token do localStorage
      localStorage.removeItem("token");

      // Redireciona para a página de login após o logout
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };


  return (
    <nav className="sticky top-0 w-1/6 bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col flex-shrink-0 h-screen shadow-2xl">
      <div className="flex items-center justify-center">
        <img src="/logo_branca.png" alt="Logo" className="w-48 h-44" />
      </div>
      <ul className="flex-grow space-y-6 px-4">
        <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-1 px-4 transition-all duration-200">
          <FaHome className="text-2xl text-white" />
          <a href="/aluno" className="text-white font-medium hover:text-gray-200">
            Página Inicial
          </a>
        </li>
        <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-1 px-4 transition-all duration-200">
          <FaBook className="text-2xl text-white" />
          <a href="/cursos" className="text-white font-medium hover:text-gray-200">
            Cursos
          </a>
        </li>
        <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-1 px-4 transition-all duration-200">
          <FaCertificate className="text-2xl text-white" />
          <a href="/certificados" className="text-white font-medium hover:text-gray-200">
            Certificados
          </a>
        </li>
        <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-1 px-4 transition-all duration-200">
          <FaUser className="text-2xl text-white" />
          <a href="/dados" className="text-white font-medium hover:text-gray-200">
            Meus Dados
          </a>
        </li>
        <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-1 px-4 transition-all duration-200">
          <FaUser className="text-2xl text-white" />
          <a href="/admin" className="text-white font-medium hover:text-gray-200">
              Lista de Alunos
          </a>
        </li>
        <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-1 px-4 transition-all duration-200">
          <FaUser className="text-2xl text-white" />
          <a href="/cursosAdmin" className="text-white font-medium hover:text-gray-200">
            Cursos Admin
          </a>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 hover:text-black px-4 text-white py-2 rounded-lg transition-all duration-200"
      >
        <FiLogOut className="text-xl" />
        Sair
      </button>
      <div className="p-4 flex flex-col gap-4 mb-8 border-t border-white">
        <div className="flex items-center gap-3">
          <FiPhone />
          <a href="/atendimento" className="hover:underline">Atendimento</a>
        </div>
      </div>
    </nav>
  );
};

export default MenuLateral;
