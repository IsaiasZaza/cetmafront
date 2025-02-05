"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaCamera, FaTrash, FaLock } from "react-icons/fa";
import { decodeJwt } from "jose";
import MenuLateral from "./MenuLateral";
import Image from "next/image";

// Componente de Página de Perfil
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
  const [editingField, setEditingField] = useState(""); // Estado para o campo sendo editado
  const [modalValue, setModalValue] = useState(""); // Valor do campo no modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const handleEditField = (field) => {
    setEditingField(field);
    setModalValue(userData[field] || ""); // Preenche o modal com o valor atual do campo
  };

  // Carregar os dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        if (token) {
          // Decodificando o token usando jose
          const decodedToken = decodeJwt(token);
          const userId = decodedToken.id;
          setUserId(userId);

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
            email: data.user.email || "Email não disponível",
            estado: data.user.estado || "Estado não disponível",
            sobre: data.user.sobre || "Sobre não disponível",
            cpf: data.user.cpf || "CPF não disponível",
            profissao: data.user.profissao || "Profissão não disponível",
            profilePicture: data.user.profilePicture || "https://via.placeholder.com/150",
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


  const handlePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file); // 'profilePicture' é o nome do campo
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token não encontrado.");
        return;
      }

      console.log('Enviando requisição com arquivo:', formData); // Adicione log para verificar os dados

      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}/profile-picture`, {
          method: "PUT", // Certifique-se de que o método está correto
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro ao atualizar foto de perfil");
        }

        const data = await response.json();
        setProfilePhoto(data.user.profilePicture);
        console.log(data.user.profilePicture) // Atualiza a foto de perfil com o caminho retornado
        localStorage.setItem("token", data.token); // Atualiza o token se necessário
        console.log("Foto de perfil atualizada com sucesso");
      } catch (error) {
        console.error("Erro ao atualizar foto de perfil:", error);
      }
    }
  };

  const handleSaveField = async () => {
    if (!editingField || isSubmitting) return;
  
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token não encontrado.");
      return;
    }
  
    try {
      const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ [editingField]: modalValue })
      });
  
      if (!response.ok) {
        throw new Error("Erro ao atualizar o campo.");
      }
  
      const data = await response.json();
  
      setUserData((prev) => ({
        ...prev,
        [editingField]: data.user[editingField] || modalValue
      }));
  
      setEditingField("");
      setModalValue("");
      console.log("Campo atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar campo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemovePhoto = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado.");
      return;
    }

    try {
      const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}/profile-picture`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao remover foto de perfil");
      }

      setUserData((prev) => ({ ...prev, profilePicture: "https://via.placeholder.com/150" })); // Voltar à imagem padrão
      console.log("Foto de perfil removida com sucesso");
    } catch (error) {
      console.error("Erro ao remover foto de perfil:", error);
    }
  };


  console.log(userData.profilePicture)
  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral />
      <div className="flex-grow p-8 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="rounded-lg shadow-xl p-6 bg-white">
          <div className="flex gap-6 items-center">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://crud-usuario.vercel.app${userData.profilePicture}`} // Foto padrão caso a foto esteja vazia
                alt="Foto do Perfil"
                className="w-full h-full object-cover"
                width={60}
                height={60}
              />
              <label
                htmlFor="photo-upload"
                className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full text-white shadow cursor-pointer hover:bg-blue-700"
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

            <div>
              <h1 className="text-3xl font-bold text-gray-800">{userData.nome}</h1>
              <p className="text-gray-600">{userData.estado}</p>
              <p className="text-gray-500 mt-2 text-sm">{userData.sobre}</p>
              <div className="mt-4 flex items-center gap-4">
                <button
                  className="text-blue-600 flex items-center gap-2 hover:underline"
                  onClick={FaCamera}
                >
                  <FaTrash onClick={handleRemovePhoto}
                  /> Remover foto
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {Object.entries(userData).filter(([field]) => field !== "profilePicture") // Filtra para não exibir a senha
              .filter(([field]) => field !== "senha") // Filtra para não exibir a senha
              .map(([field, value]) => (
                <div
                  key={field}
                  className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
                >
                  <span className="text-gray-500 text-lg mr-4">
                    {field === "nome" && <FaEdit />}
                    {field === "email" && <FaLock />}
                    {field === "estado" && <FaCamera />}
                    {field === "sobre" && <FaEdit />}
                    {field === "cpf" && <FaEdit />}
                    {field === "profissao" && <FaEdit />}
                  </span>
                  <label className="w-40 text-gray-700 font-medium capitalize">
                    {field === "bio" ? "Biografia" : field}
                  </label>
                  <p className="flex-grow text-gray-600">{value}</p>
                  {field === "email" ? (
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaLock />
                      <span>Inalterável</span>
                    </div>
                  ) : (
                    <button
                      className="ml-4 text-blue-600 hover:underline flex items-center gap-2"
                      onClick={() => handleEditField(field)} // Ativa o modo de edição
                    >
                      <FaEdit />
                    </button>
                  )}
                </div>
              ))}
            <div className="mt-4">
              <button
                className="text-blue-600 flex items-center gap-2 hover:underline bg-white px-4 py-2 rounded-lg shadow hover:shadow-lg border border-blue-500"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                <FaLock /> Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-xl font-semibold mb-4">Alterar Senha</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Senha Atual</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Nova Senha</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="text-red-600 hover:underline"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-lg"
                onClick={handleSaveField}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {editingField && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-opacity duration-300">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 mx-4 relative">
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
                className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
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
