"use client";
import { useState, useEffect, useRef } from "react";
import MenuLateral from "./MenuLateral";
import { HiOutlineDotsVertical } from "react-icons/hi"; // Ícone de três pontos
import { decodeJwt } from 'jose';

const Admin = () => {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleAddCourse = async () => {
    if (!selectedUser || !courseId) {
      setFeedback("Preencha o ID do curso.");
      return;
    }

    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/adicionarCurso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.id, courseId }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback("Curso adicionado com sucesso!");
      } else {
        setFeedback(data.message || "Erro ao adicionar curso.");
      }
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
      setFeedback("Erro ao adicionar curso.");
    }
  };

  const handleRemoveCourse = async () => {
    if (!selectedUser || !courseId) {
      setFeedback("Preencha o ID do curso.");
      return;
    }
    const token = localStorage.getItem("token");

    const decodedToken = decodeJwt(token);

    try {
      const response = await fetch(`https://api-only-mu.vercel.app/api/removerCurso`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.id, courseId }),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback("Curso removido com sucesso!");
      } else {
        setFeedback(data.message || "Erro ao remover curso.");
      }
    } catch (error) {
      console.error("Erro ao remover curso:", error);
      setFeedback("Erro ao remover curso.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <MenuLateral />
      <main className="flex-grow p-6 relative">
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
                      <th className="px-6 py-3 text-left font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((data, index) => (
                      <tr
                        key={data.id || index}
                        className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-100`}
                      >
                        <td className="px-6 py-3 border-b text-gray-700">{data.id}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.nome}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.email}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.estado}</td>
                        <td className="px-6 py-3 border-b text-gray-700">{data.profissao}</td>
                        <td className="px-6 py-3 border-b text-gray-700">
                          {new Date(data.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-6 py-3 border-b relative">
                          <button
                            onClick={() => setIsDropdownOpen(isDropdownOpen === data.id ? null : data.id)}
                            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                          >
                            <HiOutlineDotsVertical className="text-gray-700 text-lg" />
                          </button>

                          {isDropdownOpen === data.id && (
                            <div
                              ref={dropdownRef}
                              className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg z-50 dropdown-menu"
                              style={{
                                top: dropdownRef.current && dropdownRef.current.getBoundingClientRect().bottom > window.innerHeight ? '-100%' : 'auto',
                                bottom: dropdownRef.current && dropdownRef.current.getBoundingClientRect().bottom > window.innerHeight ? '100%' : 'auto',
                              }}
                            >
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedUser(data);
                                  setIsAddModalOpen(true);
                                  setIsDropdownOpen(null);
                                  setFeedback("");
                                }}
                              >
                                ➕ Adicionar Curso
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedUser(data);
                                  setIsRemoveModalOpen(true);
                                  setIsDropdownOpen(null);
                                  setFeedback("");
                                }}
                              >
                                ❌ Remover Curso
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600 text-center mt-10">Nenhum aluno encontrado.</p>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Modal de Remover Curso */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Remover Curso</h2>
            <p className="mb-2 text-black">Aluno: <strong>{selectedUser?.nome}</strong></p>
            <input
              type="text"
              className="border p-2 w-full mb-4"
              placeholder="Digite o ID do curso"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
            {feedback && <p className="text-red-500">{feedback}</p>}
            <div className="flex justify-end gap-2">
              <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500" onClick={() => setIsRemoveModalOpen(false)}>Cancelar</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={handleRemoveCourse}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Curso */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Adicionar Curso</h2>
            <p className="mb-2 text-gray-700">Aluno: <strong>{selectedUser?.nome}</strong></p>
            <input
              type="text"
              className="border p-2 w-full mb-4 text-black"
              placeholder="Digite o ID do curso"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
            />
            {feedback && <p className="text-green-500">{feedback}</p>}
            <div className="flex justify-end gap-2">
              <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500" onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleAddCourse}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;