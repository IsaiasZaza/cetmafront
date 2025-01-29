"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaChevronDown } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);

  const handleMenuOpen = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (setAnchor) => {
    setAnchor(null);
  };

  return (
    <header className="bg-white mx-auto w-full">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <Image
              src="/logoNew.png"
              alt="Adam"
              width={150}
              height={60}
              className="lg:mr-3 md:mr-3 mr-0 w-28 md:w-[90px] lg:w-[100px]"
            />
          </a>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex space-x-6">
          <nav>
            <ul className="flex space-x-6 lg:text-lg md:text-base text-base">
              {/* Dropdown for 'A CETMA' */}
              <li
                onMouseEnter={(e) => handleMenuOpen(e, setAnchorEl)}
                onMouseLeave={() => handleMenuClose(setAnchorEl)}
                className="relative text-gray-900 hover:text-blue-400 cursor-pointer"
              >
                A CETMA
                <FaChevronDown className="inline ml-1 transition-transform duration-200 text-sm" />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleMenuClose(setAnchorEl)}
                  onMouseLeave={() => handleMenuClose(setAnchorEl)}
                >
                  <MenuItem onClick={() => (window.location.href = "/sobre")}>
                    Quem Somos
                  </MenuItem>
                </Menu>
              </li>

              {/* Dropdown for 'Ensino e Capacitação' */}
              <li
                onMouseEnter={(e) => handleMenuOpen(e, setAnchorEl2)}
                onMouseLeave={() => handleMenuClose(setAnchorEl2)}
                className="relative text-gray-900 hover:text-blue-400 cursor-pointer"
              >
                Ensino e Capacitação
                <FaChevronDown className="inline ml-1 transition-transform duration-200 text-sm" />
                <Menu
                  anchorEl={anchorEl2}
                  open={Boolean(anchorEl2)}
                  onClose={() => handleMenuClose(setAnchorEl2)}
                  onMouseLeave={() => handleMenuClose(setAnchorEl2)}
                >
                  <MenuItem onClick={() => (window.location.href = "/meusCursos")}>
                    Curso pra Você
                  </MenuItem>
                  <MenuItem onClick={() => (window.location.href = "/curso-pra-empresa")}>
                    Curso pra Empresa
                  </MenuItem>
                </Menu>
              </li>

              {/* Dropdown for 'Conteúdo Gratuito' */}
              <li
                onMouseEnter={(e) => handleMenuOpen(e, setAnchorEl3)}
                onMouseLeave={() => handleMenuClose(setAnchorEl3)}
                className="relative text-gray-900 hover:text-blue-400 cursor-pointer"
              >
                Conteúdo Gratuito
                <FaChevronDown className="inline ml-1 transition-transform duration-200 text-sm" />
                <Menu
                  anchorEl={anchorEl3}
                  open={Boolean(anchorEl3)}
                  onClose={() => handleMenuClose(setAnchorEl3)}
                  onMouseLeave={() => handleMenuClose(setAnchorEl3)}
                >
                  <MenuItem onClick={() => (window.location.href = "/ebookPage")}>
                    Ebook
                  </MenuItem>
                  <MenuItem onClick={() => (window.location.href = "/podcast")}>
                    Podcast
                  </MenuItem>
                </Menu>
              </li>

              {/* Dropdown for 'Área do Aluno' */}
              <li
                onMouseEnter={(e) => handleMenuOpen(e, setAnchorEl4)}
                onMouseLeave={() => handleMenuClose(setAnchorEl4)}
                className="relative text-gray-900 hover:text-blue-400 cursor-pointer"
              >
                Área do Aluno
                <FaChevronDown className="inline ml-1 transition-transform duration-200 text-sm" />
                <Menu
                  anchorEl={anchorEl4}
                  open={Boolean(anchorEl4)}
                  onClose={() => handleMenuClose(setAnchorEl4)}
                  onMouseLeave={() => handleMenuClose(setAnchorEl4)}
                >
                  <MenuItem onClick={() => (window.location.href = "/beneficios")}>
                    Porque ser um aluno?
                  </MenuItem>
                  <MenuItem onClick={() => (window.location.href = "/login")}>
                    Acesso Aluno
                  </MenuItem>
                  <MenuItem onClick={() => (window.location.href = "/feedback-alunos")}>
                    Feedback dos Alunos
                  </MenuItem>
                </Menu>
              </li>

              <li>
                <a href="/fale" className="text-gray-900 hover:text-blue-400">
                  Fale com a CETMA
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="/login"
            className="flex items-center text-gray-800 border border-black rounded px-3 py-1 hover:text-blue-400 hover:border-blue-400"
          >
            <FaUser className="text-xl mr-2" />
            Login
          </a>
        </div>

        {/* Menu Mobile */}
        <div className="flex items-center lg:hidden transition-all">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-yellow-500">
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4">
          <nav>
            <ul className="space-y-4 text-gray-900 text-center">
              <li>
                <a href="/sobre" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="/curso-pra-voce" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Curso pra Você
                </a>
              </li>
              <li>
                <a href="/curso-pra-empresa" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Curso pra Empresa
                </a>
              </li>
              <li>
                <a href="/ebook" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Ebook
                </a>
              </li>
              <li>
                <a href="/podcast" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Podcast
                </a>
              </li>
              <li>
                <a href="/acesso-aluno" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Acesso Aluno
                </a>
              </li>
              <li>
                <a href="/feedback-alunos" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Feedback dos Alunos
                </a>
              </li>
              <li>
                <a href="/fale" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
                  Fale com a CETMA
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center text-gray-800 border border-black rounded px-3 py-1 hover:text-blue-400 hover:border-blue-400"
                >
                  <FaUser className="text-xl mr-2" />
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
