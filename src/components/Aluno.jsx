import { FaHome, FaBook, FaCertificate, FaUser } from "react-icons/fa";
import { FiPhone, FiClock, FiCheckCircle } from "react-icons/fi";
import { BsFileText, BsPlayCircle } from "react-icons/bs";

const Aluno = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu Lateral */}
      <aside className="w-1/5 bg-blue-500 text-white flex flex-col">
        <div className="flex items-center justify-center">
          <img
            src="/logo_branca.png"
            alt="Logo"
            className="w-48 h-44"
          />
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
        <section className="bg-white p-6 rounded shadow-md flex items-center gap-6 mb-8">
          <img
            src="/aluno.jpg"
            alt="Foto do usuário"
            className="w-32 h-32 rounded-full"
          />
          <div>
            <h1 className="text-2xl text-gray-900 font-bold">Adam Elias</h1>
            <p className="text-gray-600">Brasília DF, Brasil</p>
            <p className="text-gray-500 mt-2">
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
          <div className="grid grid-cols-3 gap-4 ">
            {/* Curso em Progresso */}
            <div className="bg-gray-200 p-6 rounded shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 text-blue-500 font-bold">
                <FiClock />
                <p>Progresso</p>
            </div>
            <h3 className="text-lg text-gray-700 font-bold border-b-2 pb-3 mt-2 border-gray-900">
                Cardiologia e Hemodinâmica
            </h3>
            <div className="flex items-center justify-between mt-4 text-gray-700">
                <div className="flex gap-4">
                <div className="flex items-center gap-1">
                    <BsFileText />
                    <p>0%</p>
                </div>
                <div className="flex items-center gap-1">
                    <BsPlayCircle />
                    <p>1/10</p>
                </div>
                </div>
                <div>
                <a
                    href="#"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow inline-block text-center"
                >
                    Assistir
                </a>
                </div>
            </div>
            </div>


            {/* Curso Concluído */}
            <div className="bg-gray-200 p-6 rounded shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 text-green-500 font-bold">
                <FiCheckCircle />
                <p>Concluído</p>
              </div>
              <h3 className="text-lg text-gray-700 font-bold border-b-2 pb-3 mt-2 border-gray-900">
                Enfermagem em Pediatria
              </h3>
              <div className="flex items-center justify-between mt-4 text-gray-700">
                <div className="flex items-center gap-1">
                  <BsFileText />
                  <p>100%</p>
                </div>
                <div className="flex items-center gap-1">
                  <BsPlayCircle />
                  <p>10/10</p>
                </div>
              </div>
            </div>

            {/* Repetir os cursos conforme necessário */}
            <div className="bg-gray-200 p-6 rounded shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 text-green-500 font-bold">
                <FiCheckCircle />
                <p>Concluído</p>
              </div>
              <h3 className="text-lg text-gray-700 font-bold border-b-2 pb-3 mt-2 border-gray-900">
                Enfermagem em Pediatria
              </h3>
              <div className="flex items-center justify-between mt-4 text-gray-700">
                <div className="flex items-center gap-1">
                  <BsFileText />
                  <p>100%</p>
                </div>
                <div className="flex items-center gap-1">
                  <BsPlayCircle />
                  <p>10/10</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Aluno;
