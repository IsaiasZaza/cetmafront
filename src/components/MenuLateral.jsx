import { useState } from "react";
import { FaHome, FaBook, FaCertificate, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

const MenuLateral = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white flex items-center justify-between px-4 py-2 md:hidden">
        <img src="/logo_branca.png" alt="Logo" className="w-16 h-16" />
        <button onClick={toggleMenu} className="text-white text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu */}
      <nav
        className={`bg-gradient-to-b from-blue-500 to-blue-700 text-white ${
          menuOpen ? "flex" : "hidden"
        } flex-col absolute top-0 left-0 w-full h-screen md:static md:flex md:w-1/6 md:h-screen md:flex-col z-50`}
      >
        {/* Logo para Desktop */}
        <div className="hidden md:flex items-center justify-center p-4">
          <img src="/logo_branca.png" alt="Logo" className="w-48 h-44" />
        </div>

        {/* Menu Links */}
        <ul className="flex flex-col space-y-6 px-4 py-6 md:py-0">
          <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-200">
            <FaHome className="text-2xl text-white" />
            <a
              href="/aluno"
              className="text-white font-medium hover:text-gray-200"
            >
              Página Inicial
            </a>
          </li>
          <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-200">
            <FaBook className="text-2xl text-white" />
            <a
              href="/cursos"
              className="text-white font-medium hover:text-gray-200"
            >
              Cursos
            </a>
          </li>
          <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-200">
            <FaCertificate className="text-2xl text-white" />
            <a
              href="/certificados"
              className="text-white font-medium hover:text-gray-200"
            >
              Certificados
            </a>
          </li>
          <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-2 px-4 transition-all duration-200">
            <FaUser className="text-2xl text-white" />
            <a
              href="/dados"
              className="text-white font-medium hover:text-gray-200"
            >
              Meus Dados
            </a>
          </li>
        </ul>

        {/* Atendimento */}
        <div className="p-4 flex items-center gap-3 border-t border-white mt-auto">
          <FiPhone />
          <a href="/atendimento" className="hover:underline">
            Atendimento
          </a>
        </div>
      </nav>
    </>
  );
};

export default MenuLateral;
