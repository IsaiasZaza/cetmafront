"use client";
import { useState, useEffect } from "react";
import { FaHome, FaBook, FaCertificate, FaUser } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { decodeJwt } from "jose";
import MenuLateral from "./MenuLateral";

const CardCurso = ({ titulo }) => {
  return (
    <div className="bg-gray-300 p-6 rounded-lg shadow-md w-64">
      <h3 className="text-lg text-gray-900 font-bold border-b-2 pb-2 mb-2">
        {titulo}
      </h3>
      <p className="text-sm text-gray-700">Un. vendidas:</p>
      <p className="text-sm text-gray-700">Preço investido:</p>
      <p className="text-sm text-gray-700">Preço de retorno:</p>
      <p className="text-sm text-gray-700">Lucro:</p>
    </div>
  );
};

const Admin = () => {
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    localizacao: "Carregando...",
    sobre: "Carregando...",
    courses: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = decodeJwt(token);
          const userId = decodedToken.id;
          const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}`);
          if (!response.ok) throw new Error("Erro ao buscar dados do usuário");
          const data = await response.json();
          setUserData({
            nome: data.user.nome || "Nome não disponível",
            localizacao: data.user.estado || "Localização não disponível",
            sobre: data.user.sobre || "Sobre não disponível",
            courses: data.user.courses || [],
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral />
      <main className="flex-grow p-8">
        <section className="p-6 flex flex-col md:flex-row items-center gap-6 mb-8 border-b-2 border-gray-300">
          <div className="w-40 h-40 rounded-lg overflow-hidden shadow-lg">
            <img src="https://via.placeholder.com/150" alt="Foto do usuário" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-3xl font-semibold">{userData.nome}</h1>
            <p className="text-xl text-gray-600">{userData.localizacao}</p>
            <p className="text-md text-gray-500">{userData.sobre}</p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Dados - Cursos Vendidos</h2>
          <div className="flex gap-4 flex-wrap">
            {userData.courses.length > 0 ? (
              userData.courses.map((course) => (
                <CardCurso key={course.id} titulo={course.title} />
              ))
            ) : (
              <p className="text-gray-600">Nenhum curso vendido ainda.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
