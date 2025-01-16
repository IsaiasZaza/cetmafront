"use client";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import Header from "./Header";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PorqueEstudarCetma from "./PorqueEstudarCetma";

const HomePage = () => {
    const [courses, setCourses] = useState([]); // Estado para armazenar os cursos
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento

    // Função para buscar dados da API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("https://crud-usuario.vercel.app/api/cursos");
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error("Erro ao carregar cursos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <Header /> {/* Componente Header */}

            {/* Banner Principal */}
            <div className="relative bg-[url('/bannerCursos.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
                {/* Gradiente de sobreposição */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                {/* Conteúdo do banner */}
                <div className="relative w-full md:w-1/2 text-left space-y-6">
                    <h2 className="text-lg md:text-xl font-extrabold text-blue-400">
                        Desconto de inauguração
                    </h2>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        Na compra de 2 cursos, <br /> o segundo sai com <br />{" "}
                        <span className="font-extrabold"><span className="text-blue-400">30%</span> de desconto</span>
                    </p>
                    <p className="text-md md:text-lg text-gray-200">
                        Aproveite esta oferta especial para começar a sua jornada <br /> de aprendizado com os melhores cursos do mercado. <br /> Invista no seu futuro hoje mesmo!
                    </p>
                </div>
            </div>

            {/* Seção de Cursos */}
            <div className="py-24 px-8 mx-auto max-w-7xl">
                <h3 className="text-3xl text-blue-500 text-center">
                    Conheça todos os cursos que nós <span className="font-extrabold">CETMA</span> oferecemos:
                </h3>
                <p className="text-center text-xl text-gray-600 mt-4">
                    Todos os cursos são técnicos, com rápida conclusão e certificado
                </p>

                {loading ? (
                    <div className="flex flex-col items-center justify-center mt-12">
                        <ImSpinner8 className="animate-spin text-blue-500 text-6xl" />
                    </div>
                ) : (
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        autoplay={{ delay: 2500 }}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        loop={true}
                        className="mt-12"
                    >
                        {courses.map((course, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex flex-col justify-between border rounded-xl p-6 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition transform duration-300 h-[400px] bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
                            >
                                <div className="flex flex-col flex-grow h-[250px]">
                                    <h4 className="text-2xl text-white mb-2">
                                        {course.title}
                                    </h4>
                                    <p className="text-lg mt-2 text-white/90 flex-grow line-clamp-3">
                                        {course.description}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <button className="bg-white text-blue-600 py-3 px-6 rounded-lg shadow hover:bg-blue-500 hover:text-white hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out">
                                        Saiba mais sobre
                                    </button>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            {/* Seção Final */}
            <div className="relative bg-[url('/Banner.png')] bg-cover bg-center h-[55vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
                {/* Gradiente de sobreposição */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
                {/* Conteúdo do banner */}
                <div className="relative w-full md:w-1/2 text-left space-y-6">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl ">
                        Ainda tem alguma <br /> dúvida se deve <br />
                        aprender com a <span className="font-extrabold text-blue-400">CETMA?</span>
                    </h3>
                    <a
                        aria-label="Conheça mais sobre a CETMA"
                        href="/sobre"
                        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 py-3 px-8 text-white rounded-lg hover:bg-blue-700 hover:shadow-lg hover:opacity-90 transition duration-200 ease-in-out w-1/2"
                    >
                        Conheça mais sobre a CETMA
                        <FiArrowRight className="ml-2" />
                    </a>
                </div>
            </div>

            {/* Componentes adicionais */}
            <PorqueEstudarCetma />
            <Footer /> {/* Componente Footer */}
        </div>
    );
};

export default HomePage;
