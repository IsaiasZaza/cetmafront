"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaCamera, FaTrash, FaLock } from "react-icons/fa";
import { decodeJwt } from "jose";
import MenuLateral from "./MenuLateral";
import Image from "next/image";

const ProfilePage = () => {
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    email: "Carregando...",
    estado: "Carregando...",
    sobre: "Carregando...",
    cpf: "Carregando...",
    profissao: "Carregando...",
  });
  const [userId, setUserId] = useState("");
  const [editingField, setEditingField] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleEditField = (field) => {
    setEditingField(field);
    setModalValue(userData[field] || "");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }
        const decodedToken = decodeJwt(token);
        const userId = decodedToken.id;
        setUserId(userId);

        const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await response.json();
        setUserData({
          nome: data.user.nome || "Nome não disponível",
          email: data.user.email || "Email não disponível",
          estado: data.user.estado || "Estado não disponível",
          sobre: data.user.sobre || "Sobre não disponível",
          cpf: data.user.cpf || "CPF não disponível",
          profissao: data.user.profissao || "Profissão não disponível",
          profilePicture: data.user.profilePicture || "https://via.placeholder.com/150",
        });
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchUserData();
  }, []);

  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}/profile-picture`, {
          method: "PUT",
          body: formData,
        });
        if (!response.ok) throw new Error("Erro ao atualizar foto de perfil");
        const data = await response.json();
        setProfilePhoto(data.user.profilePicture);
        localStorage.setItem("token", data.token);
      } catch (error) {
        console.error("Erro ao atualizar foto de perfil:", error);
      }
    }
  };

  const handleSaveField = async () => {
    if (!editingField || isSubmitting) return;
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ [editingField]: modalValue }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar o campo.");

      const data = await response.json();
      setUserData((prev) => ({
        ...prev,
        [editingField]: data.user[editingField] || modalValue,
      }));
      setEditingField("");
      setModalValue("");
    } catch (error) {
      console.error("Erro ao salvar campo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemovePhoto = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}/profile-picture`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erro ao remover foto de perfil");
      setUserData((prev) => ({
        ...prev,
        profilePicture: "https://via.placeholder.com/150",
      }));
    } catch (error) {
      console.error("Erro ao remover foto de perfil:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <MenuLateral />
      <div className="flex-grow p-4 sm:p-8 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="max-w-4xl mx-auto rounded-lg shadow-2xl p-6 bg-white">
          {/* Seção de Foto e Dados */}
          <div className="flex flex-col md:flex-row gap-6 items-center border-b pb-6">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden shadow-xl">
              <img
                src={`https://crud-usuario.vercel.app${userData.profilePicture}`}
                alt="Foto do Perfil"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white shadow-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <FaCamera />
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{userData.nome}</h1>
              <p className="text-gray-600">{userData.estado}</p>
              <p className="text-gray-500 mt-2 text-sm">{userData.sobre}</p>
              <div className="mt-4 flex justify-center md:justify-start items-center gap-4">
                <button
                  className="text-blue-600 flex items-center gap-2 hover:underline transition-colors"
                  onClick={handleRemovePhoto}
                >
                  <FaTrash /> Remover foto
                </button>
              </div>
            </div>
          </div>

          {/* Seção de Dados do Usuário */}
          <div className="mt-8 space-y-6">
            {Object.entries(userData)
              .filter(([field]) => field !== "profilePicture" && field !== "senha")
              .map(([field, value]) => (
                <div key={field} className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow">
                  {/* Layout Mobile: Rótulo acima do valor sem ícones */}
                  <div className="block md:hidden">
                    <label className="text-gray-700 font-medium capitalize mb-1 block">
                      {field === "bio" ? "Biografia" : field}
                    </label>
                    <p className="text-gray-600 mb-2">{value}</p>
                    {field === "email" ? (
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaLock />
                        <span>Inalterável</span>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          className="text-blue-600 hover:underline flex items-center gap-1 transition-colors"
                          onClick={() => handleEditField(field)}
                        >
                          <FaEdit /> Editar
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Layout Desktop: Ícones à esquerda */}
                  <div className="hidden md:flex items-center">
                    <span className="text-gray-900 text-lg mr-4">
                      {field === "nome" && <FaEdit />}
                      {field === "email" && <FaLock />}
                      {field === "estado" && <FaEdit />}
                      {field === "sobre" && <FaEdit />}
                      {field === "cpf" && <FaEdit />}
                      {field === "profissao" && <FaEdit />}
                    </span>
                    <label className="w-full md:w-40 text-gray-900 font-medium capitalize">
                      {field === "bio" ? "Biografia" : field}
                    </label>
                    <p className="flex-grow text-gray-500">{value}</p>
                    {field === "email" ? (
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaLock />
                        <span>Inalterável</span>
                      </div>
                    ) : (
                      <button
                        className="ml-4 text-blue-600 hover:underline flex items-center gap-2 transition-colors"
                        onClick={() => handleEditField(field)}
                      >
                        <FaEdit />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            <div className="mt-4">
              <button
                className="text-blue-600 flex items-center gap-2 hover:underline bg-white px-4 py-2 rounded-lg shadow border border-blue-500 transition-colors"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                <FaLock /> Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Alteração de Senha */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 max-w-sm">
            <h3 className="text-xl font-semibold mb-4 text-center">Alterar Senha</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Senha Atual</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Nova Senha</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="text-red-600 hover:underline transition-colors"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-xl transition-colors"
                onClick={handleSaveField}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição de Campo */}
      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white w-full max-w-md rounded-lg shadow-2xl p-6 mx-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {editingField === "senha"
                ? "Alterar Senha"
                : `Editar ${editingField === "bio" ? "Biografia" : editingField}`}
            </h2>
            <input
              type={editingField === "senha" ? "password" : "text"}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
            />
            <div className="flex justify-end mt-6 gap-4">
              <button
                className="bg-gray-100 px-6 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-300"
                onClick={() => setEditingField("")}
              >
                Cancelar
              </button>
              <button
                className={`px-6 py-2 rounded-lg text-white ${
                  isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } transition-colors`}
                onClick={handleSaveField}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
