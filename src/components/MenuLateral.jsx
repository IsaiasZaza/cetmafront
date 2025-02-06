"use client"

import { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { FaBars, FaTimes, FaHome, FaBook, FaCertificate, FaUser } from "react-icons/fa";
import { FiPhone, FiLogOut } from "react-icons/fi";

const MenuLateral = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  return (
    <div className="flex">
      {isMobile ? (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700"
          >
            <FaBars size={24} />
          </button>

          <Menu
            isOpen={menuOpen}
            onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
            width={"300px"}
            className="bg-blue-600 text-white"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white text-blue-500 rounded-full hover:bg-gray-200"
            >
              <FaTimes size={24} />
            </button>
            <MenuContent handleLogout={handleLogout} />
          </Menu>
        </>
      ) : (
        <nav className="w-[300px] sticky top-0 h-screen bg-gradient-to-b from-blue-600 to-blue-700 text-white flex flex-col left-0 shadow-2xl">
          <MenuContent handleLogout={handleLogout} />
        </nav>
      )}

      <main className={`flex-1 ${isMobile ? "ml-0" : "ml-[0px]"} transition-all`}>
        {children}
      </main>
    </div>
  );
};

const MenuContent = ({ handleLogout }) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-center py-4">
      <img src="/logo_branca.png" alt="Logo" className="w-52 h-48 " />
    </div>
    
    <ul className="space-y-6 px-4 flex-1">
      <MenuItem href="/aluno" icon={<FaHome />} text="Página Inicial" />
      <MenuItem href="/cursos" icon={<FaBook />} text="Cursos" />
      <MenuItem href="/certificados" icon={<FaCertificate />} text="Certificados" />
      <MenuItem href="/dados" icon={<FaUser />} text="Meus Dados" />
      <MenuItem href="/admin" icon={<FaUser />} text="Lista de Alunos" />
      <MenuItem href="/cursosAdmin" icon={<FaUser />} text="Cursos Admin" />
    </ul>

    {/* Essa parte agora fica no final */}
    <div className="p-4 border-t border-white mt-auto">
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 hover:text-black px-4 text-white py-2 rounded-lg transition-all duration-200 hover:bg-red-700"
      >
        <FiLogOut className="text-xl" />
        Sair
      </button>
      <div className="flex items-center gap-3 mt-4">
        <FiPhone />
        <a href="/atendimento" className="hover:underline">Atendimento</a>
      </div>
    </div>
  </div>
);


const MenuItem = ({ href, icon, text }) => (
  <li className="flex items-center gap-4 hover:bg-blue-700 rounded-lg py-1 px-4 transition-all duration-200">
    <span className="text-2xl">{icon}</span>
    <a href={href} className="text-white font-medium hover:text-gray-200">
      {text}
    </a>
  </li>
);

export default MenuLateral;
