"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

import MenuLateral from "./MenuLateral";

export default function Cursos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [cursos, setCursos] = useState([
    {
      nome: "Enfermagem em Pediatria",
      imagem: "",
      precoAntigo: "1299.99",
      precoAtual: "999.99",
    },
  ]);
  const [cursoEdit, setCursoEdit] = useState(null);
  const [novoCurso, setNovoCurso] = useState({
    nome: "",
    imagem: "",
    precoAntigo: "",
    precoAtual: "",
  });

  const openEditModal = (curso) => {
    setCursoEdit(curso);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCursoEdit({ ...cursoEdit, imagem: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCursoEdit({ ...cursoEdit, [name]: name.includes("preco") ? value.replace(/[^0-9.]/g, "") : value });
    }
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNovoCurso({ ...novoCurso, imagem: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setNovoCurso({ ...novoCurso, [name]: name.includes("preco") ? value.replace(/[^0-9.]/g, "") : value });
    }
  };

  const handleAddCurso = () => {
    setCursos([...cursos, novoCurso]);
    setNovoCurso({ nome: "", imagem: "", precoAntigo: "", precoAtual: "" });
    closeModal();
  };

  const handleSaveEdit = () => {
    setCursos(
      cursos.map((curso) =>
        curso === cursoEdit ? cursoEdit : curso
      )
    );
    closeModal();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <MenuLateral />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Cursos Disponíveis</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cursos.map((curso, index) => (
            <div
              key={index}
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
              <button onClick={() => openEditModal(curso)} className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg transition-all hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                Editar
              </button>
            </div>
          ))}
          <button onClick={openAddModal} className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-200">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full text-white mb-3">
              <Plus size={28} />
            </div>
            <span className="text-lg font-semibold text-gray-800 mt-2">Adicionar Curso</span>
          </button>
        </div>
      </div>

      {/* Modal Adicionar Curso */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Adicionar Curso</h2>
            <div className="space-y-5">
              {Object.keys(novoCurso).map((field) => (
                <div key={field}>
                  <label className="block text-gray-800 font-semibold mb-1 capitalize">{field}</label>
                  {field === "imagem" ? (
                    <div className="flex items-center">
                      <input
                        type="file"
                        name={field}
                        accept="image/*"
                        onChange={handleAddChange}
                        className="hidden text-gray-600"
                        id="upload-button"
                      />
                      <label htmlFor="upload-button" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-blue-600 focus:ring focus:ring-blue-300">
                        Escolher Imagem
                      </label>
                      {novoCurso.imagem && <span className="ml-4 text-sm text-gray-500">Imagem Selecionada</span>}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={novoCurso[field]}
                      onChange={handleAddChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-5 py-2 rounded-lg transition-all hover:bg-gray-600">Cancelar</button>
              <button onClick={handleAddCurso} className="bg-blue-500 text-white px-5 py-2 rounded-lg transition-all hover:bg-blue-600">Adicionar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Curso */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Editar Curso</h2>
            <div className="space-y-5">
              {Object.keys(cursoEdit || {}).map((field) => (
                <div key={field}>
                  <label className="block text-gray-800 font-semibold mb-1 capitalize">{field}</label>
                  {field === "imagem" ? (
                    <div className="flex items-center">
                      <input
                        type="file"
                        name={field}
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden text-gray-700"
                        id="edit-upload-button"
                      />
                      <label htmlFor="edit-upload-button" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all hover:bg-blue-600 focus:ring focus:ring-blue-300">
                        Alterar Imagem
                      </label>
                      {cursoEdit.imagem && <span className="ml-4 text-sm text-gray-500">Imagem Selecionada</span>}
                    </div>
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={cursoEdit[field] || ""}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button onClick={closeModal} className="bg-gray-500 text-white px-5 py-2 rounded-lg transition-all hover:bg-gray-600">Cancelar</button>
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-5 py-2 rounded-lg transition-all hover:bg-blue-600">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
