import { FaHome, FaBook, FaCertificate, FaUser } from "react-icons/fa";
import { FiPhone, FiClock, FiCheckCircle } from "react-icons/fi";
import { BsFileText, BsPlayCircle } from "react-icons/bs";

const CardCurso = ({ status, titulo, progresso, aulasConcluidas, totalAulas, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className={`flex items-center gap-2 font-bold ${status === "Concluído" ? "text-green-500" : "text-blue-500"}`}>
        {status === "Concluído" ? <FiCheckCircle /> : <FiClock />}
        <p>{status}</p>
      </div>
      <h3 className="text-lg text-gray-900 font-bold border-b-2 pb-3 mt-2 border-gray-300">
        {titulo}
      </h3>
      <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
        <div className="bg-blue-500 h-2 rounded-full" style={{ width: progresso }}></div>
      </div>
      <div className="flex items-center justify-between mt-4 text-gray-700">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <BsFileText />
            <p>{progresso}</p>
          </div>
          <div className="flex items-center gap-1">
            <BsPlayCircle />
            <p>{`${aulasConcluidas}/${totalAulas}`}</p>
          </div>
        </div>
        <div>
          <a
            href={link}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-transform duration-200 hover:scale-105"
          >
            Continuar
          </a>
        </div>
      </div>
    </div>
  );
};

const Aluno = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu Lateral */}
      <aside className="w-1/6 bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col flex-shrink-0 overflow-y-auto">
        <div className="flex items-center justify-center">
          <img src="/logo_branca.png" alt="Logo" className="w-48 h-44" />
        </div>
        <nav className="flex-grow">
          <ul className="space-y-4 px-4">
            <li className="flex items-center gap-3">
              <FaHome />
              <a href="/home" className="hover:underline">Página Inicial</a>
            </li>
            <li className="flex items-center gap-3">
              <FaBook />
              <a href="/cursos" className="hover:underline">Cursos</a>
            </li>
            <li className="flex items-center gap-3">
              <FaCertificate />
              <a href="/certificados" className="hover:underline">Certificados</a>
            </li>
            <li className="flex items-center gap-3">
              <FaUser />
              <a href="/meus-dados" className="hover:underline">Meus Dados</a>
            </li>
          </ul>
        </nav>
        <div className="p-4 flex items-center justify-start gap-3 mb-8 border-t border-white">
          <FiPhone />
          <a href="/atendimento" className="hover:underline">Atendimento</a>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-grow p-8">
        {/* Perfil do Usuário */}
        <section className="p-6 flex flex-col md:flex-row items-center gap-6 mb-8 border-b-2 border-gray-300">
          <img src="/aluno.jpg" alt="Foto do usuário" className="w-32 h-32 rounded-full shadow-lg" />
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl text-gray-900 font-bold">Adam Elias</h1>
            <p className="text-gray-600">Brasília DF, Brasil</p>
            <p className="text-gray-500 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </section>

        {/* Lista de Cursos */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
            Meus Cursos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardCurso
              status="Progresso"
              titulo="Cardiologia e Hemodinâmica"
              progresso="30%"
              aulasConcluidas={1}
              totalAulas={10}
              link="#"
            />
            <CardCurso
              status="Concluído"
              titulo="Enfermagem em Pediatria"
              progresso="100%"
              aulasConcluidas={10}
              totalAulas={10}
              link="#"
            />
            <CardCurso
              status="Concluído"
              titulo="Introdução à Terapia Intensiva"
              progresso="100%"
              aulasConcluidas={8}
              totalAulas={8}
              link="#"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Aluno;
