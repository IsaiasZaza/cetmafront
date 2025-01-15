"use client";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import Header from "./Header";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PorqueEstudarCetma from "./PorqueEstudarCetma";

const HomePage = () => {
    const [courses, setCourses] = useState([]); // Estado para armazenar os cursos
    const [loading, setLoading] = useState(true); // Estado para indicar carregamento

    // Função para buscar dados da API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/cursos"); // URL da API
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
        <div className="font-sans">
            <Header /> {/* Componente Header */}

            {/* Banner Principal */}
            <div className="relative bg-[url('/bannerCursos.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
                {/* Gradiente de sobreposição */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                {/* Conteúdo do banner */}
                <div className="relative w-full md:w-1/2 text-left space-y-6">
                    <h2 className="text-lg md:text-xl font-extrabold">
                        Desconto de inauguração
                    </h2>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        Na compra de 2 cursos, <br /> o segundo sai com <br />{" "}
                        <span className="font-extrabold">30% de desconto</span>
                    </p>
                    <p className="text-md md:text-lg text-gray-200">
                        Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed
                        do eiusmod tempor incididunt ut labore et <br /> dolore magna
                        aliqua.
                    </p>
                </div>
            </div>
            <div className="py-24 px-8 mx-auto max-w-7xl">
                <h3 className="text-3xl font-bold text-gray-800 text-center">
                    Conheça todos os cursos que nós CETMA oferecemos:
                </h3>
                <p className="text-center text-xl text-gray-600 mt-4">
                    Todos os cursos são técnicos, com rápida conclusão e certificado
                </p>

                {loading ? (
                    <div className="flex flex-col items-center justify-center mt-12">
                        <ImSpinner8 className="animate-spin text-blue-500 text-6xl" />
                        <p className="text-lg text-gray-600 mt-4">Carregando cursos...</p>
                    </div>
                ) : (
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
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
                        className="mt-12"
                    >
                        {courses.map((course, index) => (
                            <SwiperSlide
                                key={index}
                                className="flex flex-col justify-between border rounded-lg p-8 text-center shadow hover:shadow-2xl hover:-translate-y-1 transition transform duration-200 h-[300px]"
                            >
                                <div className="flex flex-col flex-grow">
                                    <h4 className="text-2xl font-bold text-gray-800">
                                        {course.title}
                                    </h4>
                                    <p className="text-lg mt-4 text-gray-600 flex-grow line-clamp-3">
                                        {course.description}
                                    </p>
                                </div>
                                <button className="bg-gradient-to-r from-blue-500 to-blue-600 w-full text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition mt-4">
                                    Saiba mais sobre
                                </button>
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
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        Ainda tem alguma <br /> dúvida se deve <br />
                        aprender com a CETMA?
                    </h3>
                    <button
                        aria-label="Conheça mais sobre a CETMA"
                        className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 py-3 px-8 text-white rounded-lg hover:scale-105 transform transition duration-200 ease-in-out"
                    >
                        <a href="/sobre">Conheça mais sobre a CETMA</a>
                        <FiArrowRight className="ml-2" />
                    </button>
                </div>
            </div>
            <PorqueEstudarCetma />
            <Footer /> {/* Componente Footer */}
        </div>
    );
};

export default HomePage;
