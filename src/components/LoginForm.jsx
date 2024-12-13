"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";


const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState("login"); // 'login', 'register', 'forgotPassword'
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFormSwitch = (type) => {
    setFormType(type);
    setMessage(null); // Limpa mensagens ao trocar de formulário
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Verifique seu e-mail para redefinir a senha." });
        console.log("Solicitação de recuperação enviada:", data);
        handleFormSwitch("login"); // Volta ao login após sucesso
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message });
        console.error("Erro ao solicitar recuperação:", response.status, errorData);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
  
    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem. Tente novamente." });
      return;
    }
  
    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          nome: name, // Nome em português
          email: email, // Email
          senha: password // Senha
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Cadastro realizado com sucesso!" });
        console.log("Cadastro realizado:", data);
        handleFormSwitch("login"); // Voltar para a tela de login após sucesso
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message });
        console.error("Erro ao cadastrar:", response.status, errorData);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    }
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
        body: JSON.stringify({ email, senha: password }), // Altere 'password' para 'senha'
      });
  
      if (response.ok) {
        const data = await response.json();
        setMessage({ type: "success", text: "Login realizado com sucesso!" });
        console.log("Login bem-sucedido:", data);
      } else {
        const errorData = await response.json();
        setMessage({ type: "error", text: errorData.message });
        console.error("Erro ao realizar login:", response.status, errorData);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    }
  };

  const inputContainerStyle =
    "w-4/5 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400";

  const inputStyle = "w-full h-12 px-4 outline-none";

  const renderForm = () => {
    if (formType === "login") {
      return (
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center text-gray-700 space-y-6"
        >
          {/* Campo de email */}
          <div className={inputContainerStyle}>
            <FaEnvelope className="text-gray-400 ml-3" />
            <input
              type="email"
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputStyle}
            />
            {showPassword ? (
              <FaEye className="text-gray-400 cursor-pointer mr-3" onClick={togglePasswordVisibility} />
            ) : (
              <FaEyeSlash className="text-gray-400 cursor-pointer mr-3" onClick={togglePasswordVisibility} />
            )}
          </div>
          {/* Botão de login */}
          <button
            type="submit"
            className="w-4/5 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-400"
          >
            Entrar
          </button>
          <div className="text-sm text-gray-500 flex justify-between w-4/5">
            <span>
              Não tem conta?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => handleFormSwitch("register")}
              >
                Cadastre-se
              </span>
            </span>
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => handleFormSwitch("forgotPassword")}
            >
              Esqueci minha senha
            </span>
          </div>
        </form>
      );
    }

    if (formType === "register") {
      return (
        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col items-center text-gray-700 space-y-6"
        >
          {/* Campo de nome */}
          <div className={inputContainerStyle}>
            <FaUser className="text-gray-400 ml-3" />
            <input
              type="text"
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputStyle}
            />
            {showPassword ? (
              <FaEye className="text-gray-400 cursor-pointer mr-3" onClick={togglePasswordVisibility} />
            ) : (
              <FaEyeSlash className="text-gray-400 cursor-pointer mr-3" onClick={togglePasswordVisibility} />
            )}
          </div>
          {/* Campo de confirmação de senha */}
          <div className={inputContainerStyle}>
            <FaLock className="text-gray-400 ml-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={inputStyle}
            />
          </div>
          <button
            type="submit"
            className="w-4/5 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-400"
          >
            Cadastrar
          </button>
          <p className="text-sm text-gray-500">
            Já tem uma conta?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => handleFormSwitch("login")}
            >
              Entrar
            </span>
          </p>
        </form>
      );
    }

    if (formType === "forgotPassword") {
      return (
        <form
          onSubmit={handleForgotPassword}
          className="w-full flex flex-col items-center text-gray-700 space-y-6"
        >
          <div className={inputContainerStyle}>
            <FaEnvelope className="text-gray-400 ml-3" />
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputStyle}
            />
          </div>
          <button
            type="submit"
            className="w-4/5 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-400"
          >
            Recuperar senha
          </button>
          <p className="text-sm text-gray-500">
            Lembrou a senha?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => handleFormSwitch("login")}
            >
              Entrar
            </span>
          </p>
        </form>
      );
    }
  };

  return (
    <div
      className="min-h-screen flex justify-between items-stretch bg-cover bg-center"
      style={{ backgroundImage: "url('banner3.jpg')" }}
    >
      <a href="/"><FaArrowAltCircleLeft className="text-4xl m-6"/> </a>
      <div className="w-1/2 p-10"></div>
      <div className="w-2/5 h-[85vh] bg-white flex flex-col justify-center items-center px-8 shadow-lg rounded-bl-[40%] rounded-tl-lg pb-24">
        <a href="/"><Image width={250} height={150} src="/logoOficial.png" /></a>
        {renderForm()}
        {message && (
          <div
            className={`mt-4 px-4 py-2 w-4/5 rounded-md ${
              message.type === "error"
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
