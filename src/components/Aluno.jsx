"use client";
import { useState, useEffect } from "react";
import { decodeJwt } from "jose";
import { FaCheckCircle } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { BsFileText, BsPlayCircle } from "react-icons/bs";
import MenuLateral from "./MenuLateral";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const useAutoLogout = () => {
  const router = useRouter();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (!authData) return;

    const { expiresAt } = authData;
    const now = Date.now();

    if (now >= expiresAt) {
      localStorage.removeItem("auth");
      router.replace("/login");
      return;
    }

    const timeoutId = setTimeout(() => {
      localStorage.removeItem("auth");
      router.replace("/login");
    }, expiresAt - now); // Tempo restante até expiração

    return () => clearTimeout(timeoutId); // Limpa timeout se o componente desmontar
  }, []);
};


// Componente de cartão de curso
const CardCurso = ({ status, titulo, progresso, aulasConcluidas, totalAulas, link, tipo, id }) => {
  const router = useRouter();

  const handleRedirect = () => {
    if (tipo === "PRESENTIAL") {
      router.push(`/cursoPresencialModulo/${id}`);
    } else {
      router.push(link); // Online
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className={`flex items-center gap-2 font-bold ${status === "Concluído" ? "text-green-500" : "text-blue-500"}`}>
        {status === "Concluído" ? <FaCheckCircle /> : <FiClock />}
        <p>{status}</p>
      </div>

      <h3 className="text-lg text-gray-900 font-bold border-b-2 pb-3 mt-2 border-gray-300">{titulo}</h3>

      <p className="text-sm text-gray-600 mt-1 italic">
        Tipo: {tipo === "ONLINE" ? "Curso Online" : tipo === "PRESENTIAL" ? "Curso Presencial" : "Não informado"}
      </p>

      <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: progresso }}></div>
      </div>

      <div className="flex items-center justify-between mt-4 text-gray-700">
        <div className="flex gap-4">

          <div className="flex items-center gap-1">
            <BsPlayCircle />

          </div>
        </div>
        <button
          onClick={handleRedirect}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-transform duration-200 hover:scale-105"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

// Página do Aluno
const Aluno = () => {
  const [userData, setUserData] = useState({
    nome: "Carregando...",
    estado: "Carregando...",
    sobre: "Carregando...",
    courses: [],
  });

  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
        const data = await response.json();
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar curso:", error);
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const decodedToken = decodeJwt(token);

        if (!decodedToken || !decodedToken.id) {
          router.push("/login");
          return;
        }

        const response = await fetch(`https://crud-usuario.vercel.app/api/user/${decodedToken.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do usuário");

        const data = await response.json();

        setUserData({
          nome: data.user.nome || "Nome não disponível",
          estado: data.user.estado || "Estado não disponível",
          sobre: data.user.sobre || "Sobre não disponível",
          profilePicture: "logo.png",
          courses: data.user.courses || [],
        });

        console.log(data.user.courses);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        router.push("/login");
      }
    };

    fetchUserData();
  }, []);

  return (
    useAutoLogout(),
    <div className="flex flex-col md:flex-row h-auto min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <MenuLateral />

      <main className="flex-grow p-6">
        <section className="p-4 flex flex-col md:flex-row items-center gap-6 mb-8 border-b-2 border-gray-300">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg">
            <img
              src={`/${userData.profilePicture}`}
              alt="Foto do usuário"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left space-y-2">
            <h1 className="text-2xl md:text-3xl text-gray-900 font-semibold">{userData.nome}</h1>
            <p className="text-lg text-gray-600">{userData.estado}</p>
            <p className="text-md text-gray-500">{userData.sobre}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-blue-900">Meus Cursos</h2>
          {userData.courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.courses.map((course) => (
                <CardCurso
                  key={course.id}
                  id={course.id}
                  status="Progresso"
                  titulo={course.title}
                  progresso="0%"
                  aulasConcluidas={0}
                  totalAulas={10}
                  link={`/moduloCurso/${course.id}`}
                  tipo={course.type}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6 mt-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                Você ainda não está matriculado em nenhum curso.
              </h3>
              <p className="text-gray-500 mt-2 text-sm md:text-base">
                Explore nossos cursos disponíveis e comece a aprender hoje mesmo!
              </p>
              <a
                href="/cursos"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-transform duration-200 hover:scale-105"
              >
                Explorar Cursos
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Aluno;
