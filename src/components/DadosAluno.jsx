"use client";

import React, { useState, useEffect } from "react";
import { FaEdit, FaCamera, FaTrash, FaLock } from "react-icons/fa";
import { decodeJwt } from "jose";
import MenuLateral from "./MenuLateral";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState(''); // 'sucesso' ou 'erro'

  const router = useRouter()

  const formatCPF = (cpf) => {
    if (!cpf) return "";
    const digits = cpf.replace(/\D/g, "");
    if (digits.length !== 11) return cpf;
    return `${digits.substring(0, 3)}.${digits.substring(3, 6)}.${digits.substring(6, 9)}-${digits.substring(9, 11)}`;
  };

  const handleEditField = (field) => {
    setEditingField(field);
    setModalValue(userData[field] || "");
  };

  useEffect(() => {
    const verificarToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("https://crud-usuario.vercel.app/api/api/validar-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          router.replace("/login");
        }
      } catch (error) {
        console.error("Erro ao validar token:", error);
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    verificarToken();
  }, [router]);

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
          profilePicture: "logo.png",
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

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");
    if (!token || !senhaAtual || !novaSenha) return;

    try {
      const response = await fetch(`https://crud-usuario.vercel.app/api/user/${userId}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          senhaAtual,
          novaSenha,
        }),
      });

      if (!response.ok) {
        const erro = await response.json();
        alert(erro.message || "Erro ao alterar a senha.");
        return;
      }

      alert("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setIsPasswordModalOpen(false);
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      alert("Erro ao alterar a senha.");
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
                src={`/${userData.profilePicture}`}
                alt="Foto do Perfil"
                className="w-full h-full object-cover"
              />

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
                    <p className="flex-grow text-gray-600">
                      {field === "cpf" ? formatCPF(value) : value}
                    </p>
                    {(field === "email" || field === "nome" || field === "cpf") ? (
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
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Alterar Senha</h2>

            {/* Mensagens de feedback */}
            {mensagem && (
              <div
                className={`mb-4 px-4 py-2 rounded text-sm ${tipoMensagem === 'erro'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
                  }`}
              >
                {mensagem}
              </div>
            )}

            <label className="block text-gray-700 mb-2">Senha Atual</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />

            <label className="block text-gray-700 mb-2">Nova Senha</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded mb-4 text-black"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 bg-red-600 rounded hover:bg-gray-300 text-white "
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  try {
                    await handleChangePassword(); // supondo que essa função lança erro se falhar
                    setMensagem('Senha alterada com sucesso!');
                    setTipoMensagem('sucesso');
                    setSenhaAtual('');
                    setNovaSenha('');
                    // Fechar o modal depois de um tempo, opcional:
                    setTimeout(() => {
                      setIsPasswordModalOpen(false);
                      setMensagem('');
                    }, 2000);
                  } catch (err) {
                    setMensagem('Erro ao alterar a senha. Verifique os dados e tente novamente.');
                    setTipoMensagem('erro');
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Salvar
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
                className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
