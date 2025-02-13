"use client";

import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";

const menuItems = [
  {
    label: "A CETMA",
    href: "/sobre",
    subItems: [{ label: "Quem Somos", href: "/sobre" }],
  },
  {
    label: "Ensino e Capacitação",
    href: "#",
    subItems: [
      { label: "Curso para Você", href: "/meusCursos" },
      { label: "Cursos para Empresa", href: "/CursosEmpresa" },
    ],
  },
  {
    label: "Conteúdo Gratuito",
    href: "#",
    subItems: [{ label: "Ebook", href: "/ebookPage" }],
  },
  {
    label: "Área do Aluno",
    href: "#",
    subItems: [
      { label: "Porque ser um aluno?", href: "/beneficios" },
      { label: "Acesso Aluno", href: "/login" },
    ],
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center">
        <a href="/">
          <Image
            src="/logoNew.png"
            alt="Adam"
            width={100}
            height={50}
            className="lg:mr-3 md:mr-3 mr-0 w-28 md:w-[90px] lg:w-[130px]"
          />
        </a>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.label)}
              onMouseLeave={() => {
                setTimeout(() => {
                  setActiveMenu(null);
                }, 5000);
              }}
            >
              <a
                href={item.href}
                className="flex items-center text-gray-900 hover:text-blue-500 transition-all cursor-pointer font-semibold"
              >
                {item.label} {item.subItems && <FaChevronDown className="ml-1 text-sm" />}
              </a>

              {/* Dropdown */}
              {item.subItems && activeMenu === item.label && (
                <div
                  className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50 border border-gray-200"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {item.subItems.map((subItem) => (
                    <a
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a href="/fale" className="text-gray-900 hover:text-blue-500 font-semibold">
            Fale com a CETMA
          </a>
        </nav>

        {/* Botão Login */}
        <div className="hidden lg:flex">
          <a
            href="/login"
            className="flex items-center text-gray-800 border border-black rounded px-3 py-1 hover:text-blue-500 hover:border-blue-500"
          >
            <FaUser className="text-xl mr-2" /> Login
          </a>
        </div>

        {/* Menu Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes className="h-6 w-6 text-blue-500" /> : <FaBars className="h-6 w-6 text-blue-500" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4 transition-all duration-300">
          <nav className="space-y-4 text-left">
            {menuItems.map((item) => (
              <div key={item.label} className="px-6">
                <button
                  className="w-full flex justify-between items-center text-gray-900 hover:text-blue-500 font-semibold focus:outline-none"
                  onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                >
                  {item.label}
                  {item.subItems && (
                    mobileDropdown === item.label ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />
                  )}
                </button>

                {/* Dropdown Mobile */}
                {item.subItems && mobileDropdown === item.label && (
                  <div className="mt-2 space-y-2 transition-all duration-300">
                    {item.subItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-gray-700 hover:text-blue-500 text-sm px-6 py-2"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <a href="/fale" className="block text-gray-900 hover:text-blue-500 font-semibold px-6">
              Fale com a CETMA
            </a>
            <a
              href="/login"
              className="block text-gray-800 border border-black rounded px-6 py-2 mt-2 hover:text-blue-500 hover:border-blue-500 w-fit mx-auto"
            >
              <FaUser className="text-xl mr-2 inline" /> Login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
