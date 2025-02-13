"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaEye, FaEyeSlash, FaUser, FaLock, FaArrowAltCircleLeft, FaBriefcase, FaIdCard } from "react-icons/fa";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState("login"); // 'login', 'register', 'forgotPassword'
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("ALUNO");
  const [name, setName] = useState("");
  const [profissao, setProfissao] = useState(""); // Estado para profissão
  const [cpf, setCpf] = useState(""); // Estado para CPF
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFormSwitch = (type) => {
    setFormType(type);
    setMessage(null);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(null);



    useEffect(() => {
      async function checkTokenAndFetchCursos() {
        try {
          const token = localStorage.getItem("token");
          // Se existir o token, redireciona para "/aluno" e não busca os cursos.
          if (token) {
            window.location.href = "/aluno";
            return;
          }
          
          // Se não houver token, realiza a chamada para buscar os cursos.
          const response = await fetch("https://crud-usuario.vercel.app/api/cursos", {
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          if (!response.ok) throw new Error("Erro ao buscar cursos");
    
          const data = await response.json();
          // Filtra para exibir somente os cursos principais (sem parentCourseId)
          const cursosPrincipais = data.filter((curso) => !curso.parentCourseId);
          setCursos(cursosPrincipais);
        } catch (error) {
          console.error("Erro ao buscar cursos:", error);
        }
      }
      checkTokenAndFetchCursos();
    }, []);

    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Verifique seu e-mail para redefinir a senha." });
        handleFormSwitch("login");
      } else {
        setMessage({ type: "error", text: data.message });
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
      setMessage({ type: "error", text: "As senhas não coincidem. Tente novamente." });
      return;
    }

    try {
      const response = await fetch("https://crud-usuario.vercel.app/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, email, senha: password, profissao, cpf }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Cadastro realizado com sucesso!" });
        setTimeout(() => {
          handleFormSwitch("login");
        }, 3000);

      } else {
        setMessage({ type: "error", text: data.message });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({ type: "success", text: "Login realizado com sucesso!" });
        localStorage.setItem("token", data.token);
        router.replace("/aluno");
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro inesperado. Tente novamente." });
      console.error("Erro inesperado:", error);
    }
  };

  const inputContainerStyle = "w-4/5 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400";
  const inputStyle = "w-full h-12 px-4 outline-none";

  const renderForm = () => {
    switch (formType) {
      case "login":
        return (
          <form onSubmit={handleLogin} className="w-full flex flex-col items-center text-gray-700 space-y-6">
            {/* Email */}
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
            {/* Senha */}
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
            {/* Função */}

            {/* Botão */}
            <button
              type="submit"
              className="w-4/5 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-400"
            >
              Entrar
            </button>
            <div className="text-xs text-gray-500 flex justify-between w-4/5">
              <span>
                Não tem conta? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => handleFormSwitch("register")}>Cadastre-se</span>
              </span>
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => handleFormSwitch("forgotPassword")}>Esqueci minha senha</span>
            </div>
          </form>
        );
      case "register":
        return (
          <form onSubmit={handleRegister} className="w-full flex flex-col items-center text-gray-700 space-y-6">
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
            {/* Campo de profissão */}
            <div className={inputContainerStyle}>
              <FaBriefcase className="text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Digite sua profissão"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
                required
                className={inputStyle}
              />
            </div>
            {/* Campo de CPF */}
            <div className={inputContainerStyle}>
              <FaIdCard className="text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
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
      case "forgotPassword":
        return (
          <form onSubmit={handleForgotPassword} className="w-full flex flex-col items-center text-gray-700 space-y-6">
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex justify-between items-stretch">
      {/* Banner (aparece só no desktop) */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url('banner3.jpg')" }}
      ></div>

      {/* Conteúdo (sempre visível) */}
      <div className="relative z-10 w-full flex justify-between">
        <a className="absolute" href="/">
          <FaArrowAltCircleLeft className="lg:text-4xl text-3xl m-6 lg:text-white text-blue-600" />
        </a>
        <div className="lg:block hidden lg:w-1/2 w-full lg:p-10"></div>
        <div className="lg:w-2/5 w-full lg:h-[85vh] bg-white flex flex-col justify-center items-center px-8 shadow-lg lg:rounded-bl-[40%] lg:rounded-tl-lg pb-24">
          <a href="/">
            <Image width={250} height={150} src="/logoOficial.png" alt="Logo" />
          </a>
          {renderForm()}
          {message && (
            <div
              className={`mt-4 px-4 py-2 w-4/5 rounded-md ${message.type === "error"
                ? "bg-red-100 text-red-500 border border-red-500"
                : "bg-green-100 text-green-500 border border-green-500"
                }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
