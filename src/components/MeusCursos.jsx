import React from "react";
import { FiArrowRight } from "react-icons/fi";
import Header from "./Header";
import Footer from "./Footer";

const HomePage = () => {
  // Dados individuais dos cards
  const courses = [
    {
      title: "Cardiologia e Hemodinâmica",
      description:
        "Curso completo para se especializar em cardiologia. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    },
    {
      title: "Enfermagem em UTI",
      description:
        "Aprenda técnicas avançadas de enfermagem em UTI. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      title: "Radiologia Médica",
      description:
        "Torne-se um especialista em radiologia e exames de imagem. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetu",
    },
    {
      title: "Fisioterapia Respiratória",
      description:
        "Capacitação completa em fisioterapia respiratória. Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
  ];

  return (
    <div className="font-sans">
        {/* Banner Principal */}
        <div className="relative bg-[url('/bannerCursos.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
            {/* Gradiente de sobreposição */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
            {/* Conteúdo do banner */}
            <div className="relative w-full md:w-1/2 text-left space-y-6">
            <h2 className="text-lg md:text-xl font-extrabold">
                Desconto de inauguração
            </h2>
            <p className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Na compra de 2 cursos, <br /> o segundo sai com <br /> <span className="font-extrabold"> 30% de desconto </span>
            </p>
            <p className="text-md md:text-lg text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do eiusmod tempor incididunt ut labore et <br /> dolore magna aliqua.
            </p>
            </div>
        </div>

        {/* Seção de Cursos */}
        <div className="py-24 px-8">
            <h3 className="text-3xl font-bold text-gray-800 text-center">
                Conheça todos os cursos que nós CETMA oferecemos:
            </h3>
            <p className="text-center text-xl text-gray-600 mt-4">
                Todos os cursos são técnicos, com rápida conclusão e certificado
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {courses.map((course, index) => (
                    <div
                        key={index}
                        className="border rounded-lg p-8 text-center shadow hover:shadow-2xl hover:-translate-y-1 transition transform duration-200 min-h-[350px]"
                    >
                        <h4 className="text-2xl font-bold text-gray-800">{course.title}</h4>
                        <p className="text-lg mt-4 text-gray-600">{course.description}</p>
                        <button className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 w-full text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition">
                            Saiba mais sobre
                        </button>
                    </div>
                ))}
            </div>
        </div>


        {/* Seção Final */}
        <div className="relative bg-[url('/Banner.png')] bg-cover bg-center h-[55vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
            {/* Gradiente de sobreposição */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
            {/* Conteúdo do banner */}
            <div className="relative w-full md:w-1/2 text-left space-y-6">
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold">
                Ainda tem alguma <br /> dúvida se deve <br />
                aprender com a CETMA?
            </h3>
            <button
                aria-label="Conheça mais sobre a CETMA"
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 py-3 px-8 text-white rounded-lg hover:scale-105 transform transition duration-200 ease-in-out"
            >
                Conheça mais sobre a CETMA
                <FiArrowRight className="ml-2" />
            </button>
            </div>
        </div>
        </div>
  );
};

export default HomePage;
