"use client";
import { useState, useEffect } from "react";
import MenuLateral from "./MenuLateral";

const Admin = () => {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlunos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar a lista de alunos");

        const data = await response.json();
        setAlunos(data || []);
      } catch (error) {
        console.error("Erro ao buscar a lista de alunos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <MenuLateral />
      <main className="flex-grow p-6">
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Lista de Alunos</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {alunos.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="px-6 py-3 text-left font-semibold">Id</th>
                      <th className="px-6 py-3 text-left font-semibold">Nome</th>
                      <th className="px-6 py-3 text-left font-semibold">Email</th>
                      <th className="px-6 py-3 text-left font-semibold">Localização</th>
                      <th className="px-6 py-3 text-left font-semibold">Profissão</th>
                      <th className="px-6 py-3 text-left font-semibold">Data de Cadastro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((data, index) => (
                      <tr
                        key={data.id || index}
                        className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } hover:bg-blue-100`}
                      >
                        <td className="px-6 py-3 border-b text-gray-700">{data.id}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.nome}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.email}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.estado}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.profissao}</td>
                        <td className="px-6 py-3 border-b text-gray-700">
                          {new Date(data.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600 text-center mt-10">
                  Nenhum aluno encontrado.
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
