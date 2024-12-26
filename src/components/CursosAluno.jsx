import React from "react";
import { FaHome, FaBook, FaCertificate, FaUser } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

const CoursesPage = () => {
  const courses = Array(8).fill({
    title: "Enfermagem em Pediatria",
    oldPrice: "R$ 1299,99",
    price: "R$ 999,99",
    installment: "em 6x sem juros",
  });

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col">
        <div className="flex items-center justify-center py-8">
          <img src="/logo_branca.png" alt="Logo Cetma" className="w-40 h-auto" />
        </div>
        <nav className="flex-grow">
          <ul className="space-y-6 px-6">
            <li>
              <a
                href="/home"
                className="flex items-center gap-4 hover:bg-blue-600 rounded-lg py-2 px-4 transition-all duration-200"
              >
                <FaHome className="text-2xl" />
                <span className="text-lg font-medium">Página Inicial</span>
              </a>
            </li>
            <li>
              <a
                href="/cursos"
                className="flex items-center gap-4 hover:bg-blue-600 rounded-lg py-2 px-4 transition-all duration-200"
              >
                <FaBook className="text-2xl" />
                <span className="text-lg font-medium">Cursos</span>
              </a>
            </li>
            <li>
              <a
                href="/certificados"
                className="flex items-center gap-4 hover:bg-blue-600 rounded-lg py-2 px-4 transition-all duration-200"
              >
                <FaCertificate className="text-2xl" />
                <span className="text-lg font-medium">Certificados</span>
              </a>
            </li>
            <li>
              <a
                href="/meus-dados"
                className="flex items-center gap-4 hover:bg-blue-600 rounded-lg py-2 px-4 transition-all duration-200"
              >
                <FaUser className="text-2xl" />
                <span className="text-lg font-medium">Meus Dados</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-6 border-t border-blue-600">
          <a
            href="/atendimento"
            className="flex items-center gap-3 text-lg hover:underline"
          >
            <FiPhone className="text-2xl" />
            Atendimento
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        {/* Section: Cursos mais comprados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Cursos mais comprados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 transition hover:shadow-lg"
              >
                <div className="h-40 bg-gray-300 rounded mb-4"></div>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500 line-through">
                  {course.oldPrice}
                </p>
                <p className="text-xl font-bold text-blue-600">{course.price}</p>
                <p className="text-sm text-gray-500">{course.installment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Todos os cursos */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Todos os cursos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 transition hover:shadow-lg"
              >
                <div className="h-40 bg-gray-300 rounded mb-4"></div>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-500 line-through">
                  {course.oldPrice}
                </p>
                <p className="text-xl font-bold text-blue-600">{course.price}</p>
                <p className="text-sm text-gray-500">{course.installment}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;
