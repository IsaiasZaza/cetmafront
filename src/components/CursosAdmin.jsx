"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import MenuLateral from "./MenuLateral";

export default function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [formCurso, setFormCurso] = useState({ nome: "", imagem: "", precoAntigo: "", precoAtual: "" });

  const fetchCursos = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/cursos");
      if (!response.ok) throw new Error("Erro ao buscar cursos");

      const data = await response.json();
      console.log(data);
      // Filtra os cursos que não possuem subCursos
      const cursosPrincipais = data.filter((curso) => !curso.subCourses || curso.subCourses.length === 0);
      setCursos(cursosPrincipais);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setFormCurso((prev) => ({ ...prev, [name]: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setFormCurso((prev) => ({ ...prev, [name]: name.includes("preco") ? value.replace(/[^0-9.]/g, "") : value }));
    }
  };

  const handleAddCurso = async () => {
    try {
      const response = await fetch("https://sua-api.com/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formCurso),
      });
      if (!response.ok) throw new Error("Erro ao adicionar curso");

      const newCurso = await response.json();
      setCursos((prev) => [...prev, newCurso]);
      setFormCurso({ nome: "", imagem: "", precoAntigo: "", precoAtual: "" });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar curso:", error);
    }
  };

  const handleEditCurso = async () => {
    try {
      const response = await fetch(`https://sua-api.com/courses/${selectedCurso.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formCurso),
      });
      if (!response.ok) throw new Error("Erro ao editar curso");

      const updatedCurso = await response.json();
      setCursos((prev) => prev.map((curso) => (curso.id === updatedCurso.id ? updatedCurso : curso)));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao editar curso:", error);
    }
  };

  const handleDeleteCurso = async (id) => {
    try {
      const response = await fetch(`https://sua-api.com/courses/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erro ao deletar curso");

      setCursos((prev) => prev.filter((curso) => curso.id !== id));
    } catch (error) {
      console.error("Erro ao deletar curso:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <MenuLateral />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Cursos Disponíveis</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="relative bg-white shadow-lg rounded-xl p-6 overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100 mb-4 flex items-center justify-center">
                {curso.imagem ? (
                  <img src={curso.imagem} alt={curso.nome} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-gray-400 text-2xl">Imagem</span>
                )}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{curso.nome}</h2>
              <p className="text-gray-500 line-through">R$ {curso.precoAntigo}</p>
              <p className="text-xl font-bold text-green-600">R$ {curso.precoAtual}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => {
                    setSelectedCurso(curso);
                    setFormCurso(curso);
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg transition-all hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteCurso(curso.id)}
                  className="w-full bg-red-500 text-white font-bold py-2 rounded-lg transition-all hover:bg-red-600"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white mb-3">
              <Plus size={28} />
            </div>
            <span className="text-lg font-semibold text-gray-800 mt-2">Adicionar Curso</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {(isModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
              {isAddModalOpen ? "Adicionar Curso" : "Editar Curso"}
            </h2>
            <div className="space-y-5">
              {Object.keys(formCurso).map((field) => (
                <div key={field}>
                  <label className="block text-gray-800 font-semibold mb-1 capitalize">{field}</label>
                  {field === "imagem" ? (
                    <div className="flex items-center">
                      <input
                        type="file"
                        name={field}
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        id="upload-button"
                      />
                      <label
                        htmlFor="upload-button"
                        className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-blue-600"
                      >
                        Escolher Imagem
                      </label>
                      {formCurso.imagem && <span className="ml-4 text-sm text-gray-500">Imagem Selecionada</span>}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={formCurso[field] || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsAddModalOpen(false);
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg transition-all hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={isAddModalOpen ? handleAddCurso : handleEditCurso}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg transition-all hover:bg-blue-600"
              >
                {isAddModalOpen ? "Adicionar" : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
