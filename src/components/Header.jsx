"use client"

import Image from 'next/image';
import { useState } from 'react';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white mx-auto w-full z-50 py-1">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <Image
              src="/logo.png"
              alt="Logo Vaga Lume"
              width={150}
              height={60}
              className="mr-3 w-2/3 md:w-[90px] lg:w-[100px]"
            />
          </a>
        </div>

        <div className="hidden lg:flex space-x-6">
          <nav>
            <ul className="flex space-x-6 lg:text-lg md:text-base text-base">
              <li><a href="/LoginForm.jsx" className="text-gray-900 hover:text-blue-400">Cursos</a></li>
              <li><a href="" className="text-gray-900 hover:text-blue-400">Quem Somos</a></li>
              <li><a href="" className="text-gray-900 hover:text-blue-400">Aluno</a></li>
              <li><a href="" className="text-gray-900 hover:text-blue-400">Contato</a></li>
            </ul>
          </nav>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <a href="/login" className="flex items-center text-gray-800 border border-black rounded px-3 py-1 hover:text-blue-400 hover:border-blue-400">
            <FaUser className="text-xl mr-2" />
            Login
          </a>
        </div>

        <div className="flex items-center lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-yellow-500">
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white text-gray-800 flex flex-col items-center">
          <nav>
            <ul className="space-y-4 px-4 py-2 text-center">
              <li><a href="/comoDoar" className="text-gray-900 hover:text-blue-400">Cursos</a></li>
              <li><a href="/quemSomos" className="text-gray-900 hover:text-blue-400">Quem Somos</a></li>
              <li><a href="/oQueFazemos" className="text-gray-900 hover:text-blue-400">Aluno</a></li>
              <li><a href="/nossa-equipe" className="text-gray-900 hover:text-blue-400">Contato</a></li>
              <li>
                <a href="/login" className="flex items-center justify-center px-4 py-2 text-gray-900 rounded hover:bg-blue-400">
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
}

export default Header;
