"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleForm = () => {
    setShowRegister((prevState) => !prevState);
    setMessage(null); // Limpa a mensagem ao trocar de formulário
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Login bem-sucedido!" });
        console.log("Login bem-sucedido:", data);
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message });
        console.error("Erro ao fazer login:", response.status, errorData);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem." });
      return;
    }

    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          email,
          senha: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Cadastro realizado com sucesso!" });
        console.log("Cadastro bem-sucedido:", data);
        toggleForm(); // Volta para o login após o cadastro
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message });
        console.error("Erro ao fazer cadastro:", response.status, errorData);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    }
  };

  const handleForgotPassword = () => {
    setMessage({
      type: "info",
      text: "Um link de recuperação foi enviado para seu email (simulação).",
    });
  };

  const inputContainerStyle =
    "w-4/5 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400";

  const inputStyle = "w-full h-12 px-4 outline-none";

  return (
    <div
      className="min-h-screen flex justify-between items-stretch bg-cover bg-center"
      style={{ backgroundImage: "url('banner3.jpg')" }}
    >
      {/* Lado esquerdo */}
      <div className="w-1/2 p-10 flex flex-col justify-center">
        {/* Espaço reservado para conteúdo adicional */}
      </div>

      {/* Formulário */}
      <div className="w-2/5 h-[85vh] bg-white flex flex-col justify-center items-center px-8 shadow-lg rounded-bl-[40%] rounded-tl-lg">
        <div>
          <Image width={150} height={150} src="/logo.png" />
        </div>

        {!showRegister ? (
          <form
            onSubmit={handleLogin}
            className="w-full flex flex-col items-center text-gray-700 space-y-6"
          >
            <h1 className="text-2xl font-semibold text-blue-500">Login</h1>

            {/* Campo de email */}
            <div className={inputContainerStyle}>
              <FaEnvelope className="text-gray-400 ml-3" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Campo de senha */}
            <div className={inputContainerStyle}>
              <FaLock className="text-gray-400 ml-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputStyle}
              />
              {showPassword ? (
                <FaEye
                  className="text-gray-400 cursor-pointer mr-3"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEyeSlash
                  className="text-gray-400 cursor-pointer mr-3"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>

            {/* Botão de login */}
            <button
              type="submit"
              className="w-4/5 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-400"
            >
              Entrar
            </button>

            {/* Esqueci minha senha */}
            <div className="text-sm text-gray-500 flex justify-between w-4/5">
              <span>
                Não tem conta?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={toggleForm}
                >
                  Cadastre-se
                </span>
              </span>
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={handleForgotPassword}
              >
                Esqueci minha senha
              </span>

            </div>
          </form>
        ) : (
          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col items-center text-gray-700 space-y-6"
          >
            <h1 className="text-2xl font-semibold text-blue-500">Cadastro</h1>

            {/* Campo de nome */}
            <div className={inputContainerStyle}>
              <FaUser className="text-gray-400 ml-3" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Campo de email */}
            <div className={inputContainerStyle}>
              <FaEnvelope className="text-gray-400 ml-3" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Campo de senha */}
            <div className={inputContainerStyle}>
              <FaLock className="text-gray-400 ml-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Campo de confirmar senha */}
            <div className={inputContainerStyle}>
              <FaLock className="text-gray-400 ml-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={inputStyle}
              />
            </div>

            {/* Botão de cadastro */}
            <button
              type="submit"
              className="w-4/5 h-12 bg-gradient-to-r from-green-400 to-teal-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-teal-600 hover:to-green-400"
            >
              Cadastrar
            </button>

            {/* Alternar para login */}
            <p className="text-sm text-gray-500">
              Já tem conta?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={toggleForm}
              >
                Entrar
              </span>
            </p>
          </form>
        )}

        {/* Mensagens de erro/sucesso */}
        {message && (
          <div
            className={`mt-4 px-4 py-2 w-4/5 rounded-md ${message.type === "error"
              ? "bg-red-100 text-red-500 border border-red-500"
              : message.type === "success"
                ? "bg-green-100 text-green-500 border border-green-500"
                : "bg-blue-100 text-blue-500 border border-blue-500"
              }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
