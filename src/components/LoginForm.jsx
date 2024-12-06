"use client";
import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleForm = () => {
    setShowRegister((prevState) => !prevState);
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">CETMA</h1>

        {showRegister ? (
          <form className="w-full flex flex-col items-center text-gray-700 space-y-6">
            <h1 className="text-2xl font-semibold text-blue-500">Cadastro</h1>

            {/* Campo de nome */}
            <div className={inputContainerStyle}>
              <FaUser className="text-gray-400 ml-3" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
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

            {/* Campo de confirmação de senha */}
            <div className={inputContainerStyle}>
              <FaLock className="text-gray-400 ml-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua senha"
                required
                className={inputStyle}
              />
            </div>
            {password !== confirmPassword && confirmPassword && (
              <p className="text-red-500 text-xs">As senhas não coincidem.</p>
            )}

            {/* Botão de cadastro */}
            <button
              type="submit"
              className="w-4/5 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-400"
              disabled={password !== confirmPassword || !password}
            >
              Criar Conta
            </button>

            {/* Alternar para login */}
            <p className="text-sm text-gray-500">
              Já tem uma conta?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={toggleForm}
              >
                Faça login
              </span>
            </p>
          </form>
        ) : (
          <form className="w-full flex flex-col items-center text-gray-700 space-y-6">
            <h1 className="text-2xl font-semibold text-blue-500">Login</h1>

            {/* Campo de email */}
            <div className={inputContainerStyle}>
              <FaEnvelope className="text-gray-400 ml-3" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu email"
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

            {/* Alternar para cadastro */}
            <p className="text-sm text-gray-500">
              Não tem conta?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={toggleForm}
              >
                Cadastre-se
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
