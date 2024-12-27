"use client";
import { useState, useEffect } from "react";
import { FaHome, FaBook, FaCertificate, FaUser } from "react-icons/fa";
import { FiPhone, FiClock, FiCheckCircle } from "react-icons/fi";
import { BsFileText, BsPlayCircle } from "react-icons/bs";
import { decodeJwt } from 'jose';
import MenuLateral from "./MenuLateral";

// Componente CardCurso
const CardCurso = ({ status, titulo, progresso, aulasConcluidas, totalAulas, link }) => {
  return (
    <div className="bg p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className={`flex items-center gap-2 font-bold ${status === "Concluído" ? "text-green-500" : "text-blue-500"}`}>
        {status === "Concluído" ? <FiCheckCircle /> : <FiClock />}
        <p>{status}</p>
      </div>
      <h3 className="text-lg text-gray-900 font-bold border-b-2 pb-3 mt-2 border-gray-300">
        {titulo}
      </h3>
      <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: progresso }}></div>
      </div>
      <div className="flex items-center justify-between mt-4 text-gray-700">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <BsFileText />
            <p>{progresso}</p>
          </div>
          <div className="flex items-center gap-1">
            <BsPlayCircle />
            <p>{`${aulasConcluidas}/${totalAulas}`}</p>
          </div>
        </div>
        <div>
          <a
            href={link}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-transform duration-200 hover:scale-105"
          >
            Continuar
          </a>
        </div>
      </div>
    </div>
  );
};

const Aluno = () => {
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    estado: "Carregando...",
    sobre: "Carregando...",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Decodificando o token usando jose
          const decodedToken = decodeJwt(token);
          console.log("Decoded Token:", decodedToken);  // Verifica a estrutura do token decodificado

          const userId = decodedToken.id;  // Supondo que o id esteja no token

          // Fazendo a requisição para a API com o id
          const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Erro ao buscar dados do usuário");
          }

          const data = await response.json();

          setUserData({
            nome: data.user.nome || "Nome não disponível",
            estado: data.user.estado || "Estado não disponível",
            sobre: data.user.sobre || "Sobre não disponível",
          });
        } else {
          console.warn("Token não encontrado no localStorage.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className="flex h-screen"
      style={{ background: "linear-gradient(120deg, #f8fafc 0%, #e7ebf0 100%)" }}
    >

      {/* Menu Lateral */}
      <MenuLateral />

      {/* Conteúdo Principal */}
      <main className="flex-grow p-8">
        {/* Perfil do Usuário */}
        <section className="p-6 flex flex-col md:flex-row items-center gap-6 mb-8 border-b-2 border-gray-300">
          {/* Imagem do Usuário */}
          <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://via.placeholder.com/150"
              alt="Foto do usuário"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informações do Usuário */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-3xl text-gray-900 font-semibold">{userData.nome}</h1>
            <p className="text-xl text-gray-600">{userData.estado}</p>
            <p className="text-md text-gray-500 mt-2">{userData.sobre}</p>

            {/* Ações ou Links adicionais */}

          </div>
        </section>

        {/* Lista de Cursos */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Meus Cursos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardCurso
              status="Progresso"
              titulo="Cardiologia e Hemodinâmica"
              progresso="30%"
              aulasConcluidas={1}
              totalAulas={10}
              link="#"
            />
            <CardCurso
              status="Concluído"
              titulo="Enfermagem em Pediatria"
              progresso="100%"
              aulasConcluidas={10}
              totalAulas={10}
              link="#"
            />
            <CardCurso
              status="Concluído"
              titulo="Introdução à Terapia Intensiva"
              progresso="100%"
              aulasConcluidas={8}
              totalAulas={8}
              link="#"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Aluno;
