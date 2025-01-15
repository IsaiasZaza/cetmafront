"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaCamera, FaTrash, FaLock } from "react-icons/fa";
import { decodeJwt } from "jose";
import MenuLateral from "./MenuLateral";

// Componente de Página de Perfil
const ProfilePage = () => {
  const [profilePhoto, setProfilePhoto] = useState("https://via.placeholder.com/150");
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    email: "Carregando...",
    estado: "Carregando...",
    sobre: "Carregando...",
  });
  const [userId, setUserId] = useState("");
  const [editingField, setEditingField] = useState(""); // Estado para o campo sendo editado
  const [modalValue, setModalValue] = useState(""); // Valor do campo no modal
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Carregar os dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          // Decodificando o token usando jose
          const decodedToken = decodeJwt(token);
          console.log("Decoded Token:", decodedToken);  // Verifica a estrutura do token decodificado

          const userId = decodedToken.id;  // Supondo que o id esteja no token
          setUserId(userId);  // Define o userId corretamente

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
            email: data.user.email || "Email não disponível",  // Garantindo que o email apareça
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

  // Iniciar edição de um campo
  const handleEditField = (field) => {
    setEditingField(field);
    setModalValue(userData[field]); // Carrega o valor atual no campo de edição
  };

  // Salvar alterações do campo
  const handleSaveField = async () => {
    const updatedData = { ...userData, [editingField]: modalValue };

    // Enviar dados atualizados via PUT
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Verifique se userId existe
        if (!userId) {
          console.error("Erro: userId não encontrado.");
          return;
        }

        const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Erro ao atualizar os dados do usuário");
        }

        const data = await response.json();
        console.log("Dados atualizados:", data);  // Verifica a resposta da API
        setUserData(data.user); // Atualiza o estado com os dados atualizados
        setEditingField(""); // Fecha a edição
      } catch (error) {
        console.error("Erro ao atualizar os dados do usuário:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.error("Token não encontrado.");
      setIsSubmitting(false);
    }
  };
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado.");

      const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}/change-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });

      if (!response.ok) throw new Error("Erro ao alterar a senha.");

      alert("Senha alterada com sucesso!");
      setIsPasswordModalOpen(false);
      setSenhaAtual("");
      setNovaSenha("");
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      alert("Erro ao alterar a senha. Verifique as informações e tente novamente.");
    }
  };

  // Alterar foto de perfil
  const handleRemovePhoto = () => {
    setProfilePhoto("https://via.placeholder.com/150");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <MenuLateral />

      <div className="flex-grow p-8 bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="rounded-lg shadow-xl p-6 bg-white">
          <div className="flex gap-6 items-center">
            <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg">
              <img
                src={profilePhoto || "https://via.placeholder.com/150"} // Foto padrão caso a foto esteja vazia
                alt="Foto do Perfil"
                className="w-full h-full object-cover"
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
                  onClick={handleRemovePhoto}
                >
                  <FaTrash /> Remover foto
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Excluindo o campo de senha para não exibi-lo na lista de campos */}
            {Object.entries(userData)
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
                <FaLock /> Alterar senha
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Alterar Senha</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Senha Atual</label>
                <input
                  type="password"
                  className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Nova Senha</label>
                <input
                  type="password"
                  className="w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={() => setIsPasswordModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleChangePassword}
              >
                Alterar
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
                  } transition-colors duration-300`}
                onClick={handleSaveField}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              onClick={() => setEditingField("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;
