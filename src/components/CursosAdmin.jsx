"use client"

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import MenuLateral from "./MenuLateral";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [formCurso, setFormCurso] = useState({
    title: "",
    description: "",
    price: "",
    coverImage: "",
    subCourses: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddParentModalOpen, setIsAddParentModalOpen] = useState(false);
  const [parentCursos, setParentCursos] = useState([]);

  useEffect(() => {
    async function fetchCursos() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("https://crud-usuario.vercel.app/api/cursos");
        if (!response.ok) throw new Error("Erro ao buscar cursos");

        const data = await response.json();
        const cursosPrincipais = data.filter((curso) => !curso.parentCourseId);
        setCursos(cursosPrincipais);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    fetchCursos();
  }, []);

  const handleEditCurso = async () => {
    if (!selectedCurso) return;

    try {
      const response = await fetch(`http://localhost:3001/api/curso/${selectedCurso.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCurso),
      });

      if (!response.ok) throw new Error("Erro ao editar curso");

      const updatedCurso = await response.json();
      setCursos((prevCursos) =>
        prevCursos.map((curso) => (curso.id === updatedCurso.id ? updatedCurso : curso))
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar curso:", error);
    }
  };

  const handleDeleteCurso = async (id) => {
    try {
      await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`, { method: "DELETE" });
      setCursos((prevCursos) => prevCursos.filter((curso) => curso.id !== id));
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
    }
  };

  const handleAddCurso = async () => {
    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/cursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCurso),
      });

      if (!response.ok) throw new Error("Erro ao adicionar curso");

      const newCurso = await response.json();
      setCursos((prevCursos) => [...prevCursos, newCurso]);
      setIsAddModalOpen(false);
      setFormCurso({});
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
    }
  };

  const handleAddParentCurso = async () => {
    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCurso),
      });

      if (!response.ok) throw new Error("Erro ao adicionar curso parente");

      const newParentCurso = await response.json();
      setParentCursos((prevCursos) => [...prevCursos, newParentCurso]);
      setIsAddParentModalOpen(false);
      setFormCurso({});
    } catch (error) {
      console.error("Erro ao adicionar curso parente:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <MenuLateral />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">Cursos Disponíveis</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="bg-white shadow-md hover:shadow-lg rounded-xl p-6 border border-gray-200 transition-all"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100 mb-4 flex items-center justify-center">
                {curso.coverImage ? (
                  <img src={curso.coverImage} alt={curso.title} className="object-cover w-full h-full rounded-lg" />
                ) : (
                  <span className="text-gray-400 text-xl">Sem imagem</span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{curso.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{curso.description || "Sem descrição disponível"}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-700">R$ {curso.price}</span>
                {curso.oldPrice && <span className="text-gray-500 line-through text-sm">R$ {curso.oldPrice}</span>}
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedCurso(curso);
                    setFormCurso(curso);
                    setIsModalOpen(true);
                  }}
                  className="w-1/2 bg-blue-600 text-white font-medium py-2 rounded-lg transition-all hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteCurso(curso.id)}
                  className="w-1/2 bg-red-500 text-white font-medium py-2 rounded-lg transition-all hover:bg-red-600"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex flex-col items-center justify-center bg-white shadow-md hover:shadow-lg rounded-xl p-6 border border-gray-200 transition-all"
          >
            <div className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full text-white mb-3">
              <Plus size={26} />
            </div>
            <span className="text-lg font-medium text-gray-800">Adicionar Curso</span>
          </button>
        </div>
      </div>

      {/* Modal de Edição */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-5 text-gray-900 text-center">Editar Curso</h2>
            <div className="space-y-4">
              {Object.keys(formCurso).filter(field => ["title", "description", "price", "videoUrl", "coverImage"].includes(field)).map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                  {field === "imagem" ? (
                    <div className="flex items-center">
                      <input
                        type="file"
                        name={field}
                        accept="image/*"
                        onChange={(e) => setFormCurso({ ...formCurso, imagem: e.target.files[0] })}
                        className="hidden"
                        id="upload-button"
                      />
                      <label
                        htmlFor="upload-button"
                        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                      >
                        Escolher Imagem
                      </label>
                      {formCurso.imagem && <span className="ml-3 text-sm text-gray-500">Imagem Selecionada</span>}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formCurso[field] || ""}
                      onChange={(e) => setFormCurso({ ...formCurso, [field]: e.target.value })}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditCurso}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Curso */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-5 text-gray-900 text-center">Adicionar Curso</h2>
            <div className="space-y-4">
              {Object.keys(formCurso).filter(field => ["title", "description", "price", "videoUrl", "coverImage", "SubCourses"].includes(field)).map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                  {field === "imagem" ? (
                    <div className="flex items-center">
                      <input
                        type="file"
                        name={field}
                        accept="image/*"
                        onChange={(e) => setFormCurso({ ...formCurso, imagem: e.target.files[0] })}
                        className="hidden"
                        id="upload-button"
                      />
                      <label
                        htmlFor="upload-button"
                        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                      >
                        Escolher Imagem
                      </label>
                      {formCurso.imagem && <span className="ml-3 text-sm text-gray-500">Imagem Selecionada</span>}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formCurso[field] || ""}
                      onChange={(e) => setFormCurso({ ...formCurso, [field]: e.target.value })}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddCurso}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Parente */}
      {isAddParentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-5 text-gray-900 text-center">Adicionar Curso Parente</h2>
            <div className="space-y-4">
              {Object.keys(formCurso).filter(field => ["title", "description", "price", "videoUrl", "coverImage", "SubCourses"].includes(field)).map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                  {field === "imagem" ? (
                    <div className="flex items-center">
                      <input
                        type="file"
                        name={field}
                        accept="image/*"
                        onChange={(e) => setFormCurso({ ...formCurso, imagem: e.target.files[0] })}
                        className="hidden"
                        id="upload-button"
                      />
                      <label
                        htmlFor="upload-button"
                        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                      >
                        Escolher Imagem
                      </label>
                      {formCurso.imagem && <span className="ml-3 text-sm text-gray-500">Imagem Selecionada</span>}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formCurso[field] || ""}
                      onChange={(e) => setFormCurso({ ...formCurso, [field]: e.target.value })}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setIsAddParentModalOpen(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddParentCurso}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}