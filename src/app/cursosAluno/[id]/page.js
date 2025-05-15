"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
                const data = await response.json();
                console.log(data)
                setCourse(data);
            } catch (error) {
                console.error("Erro ao buscar curso:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-bold text-gray-600">Carregando curso...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-bold text-red-600">Curso não encontrado.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* Header */}
            <Header />
            {/* Hero Section */}
            <div className="relative bg-[url('/Fita_aprentacao_de_cada_curso.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start px-6 lg:px-20 2xl:px-40">
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="relative w-full md:full 2xl:w-1/2 text-left space-y-4">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        {course.title}
                    </p>
                    <p className="text-md md:text-lg text-gray-200">
                        {course.description}
                    </p>
                </div>
            </div>

            {/* About Section */}
            {/* About Section */}
            {/* About Section */}
            <section className="py-16 lg:px-20 px-4 bg-gray-100">
                <div className="max-w-screen-2xl gap-x-60 mx-auto grid xl:grid-cols-2 grid-cols-1 gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-900">
                            Por que estudar {course.title} pode impulsionar sua carreira?
                        </h2>

                        <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
                            <p className="text-xl font-semibold text-blue-900">
                                🚀 Curso Presencial CETMA
                            </p>
                            <p>
                                Do Básico ao Clínico: Como o ECG Guia o Raciocínio Médico.
                                Se você busca crescimento profissional e deseja se destacar na medicina, este curso é a oportunidade ideal! A CETMA oferece formação de alta qualidade, com foco prático e direcionada por especialistas reconhecidos.
                            </p>

                            <p className="font-semibold text-blue-900 mt-6">🎯 Objetivo do Curso</p>
                            <p>
                                Aprimorar o conhecimento médico na avaliação assertiva do ECG, conectando o traçado eletrocardiográfico com o raciocínio clínico e a tomada de decisão diagnóstica.
                            </p>

                            <p className="font-semibold text-blue-900 mt-6">✅ Por que escolher a CETMA?</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>👨‍🏫 Especialistas com reconhecimento (RQE):</strong> Curso ministrado por {course.instructorName}, {course.instructorTitle} ({course.instructorCRM}).</li>
                                <li><strong>📘 Material exclusivo:</strong> Acompanhamento presencial com guia de aprendizagem prático.</li>
                                <li><strong>🎓 Certificação reconhecida nacionalmente:</strong> Você recebe um certificado válido no mercado de trabalho.</li>
                                <li><strong>💡 Conteúdo clínico de verdade:</strong> Aulas teóricas integradas a casos clínicos reais, reforçando a avaliação holística do paciente e o papel central do ECG no diagnóstico.</li>
                            </ul>
                            <p className="mx-auto font-bold text-lg text-center mt-8">Invista na sua carreira médica. Inscreva-se agora!</p>
                        </div>
                    </div>

                    {/* Card de Informações */}
                    <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 
      w-full lg:w-[350px]  xl:w-[400px] xl:h-[80vh] 2xl:h-[70vh] sticky top-20 mx-auto">
                        <img src="/logo.png" alt="Cetma Logo" className="w-24 h-24" />
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">{course.title}</h2>
                        <ul className="mt-4 text-gray-700 text-left space-y-2">
                            {[
                                "Curso Presencial",
                                "Instrutor especializado",
                                "Disponibilização de material de apoio ",
                                "Certificado validado",
                                
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <FaCheckCircle className="text-blue-500" /> {item}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 text-blue-900 text-center">
                            <p className="line-through text-lg flex items-center justify-center gap-2">
                                <IoMdPricetag className="text-red-500" /> {`de R$ ${(course.price * 1.2).toFixed(2)}`}
                            </p>
                            <p className="text-4xl font-extrabold">R$ {course.price}</p>
                            <p className="text-sm font-medium">em até 12x</p>
                        </div>

                        <a
                            href="/login"
                            className="mt-6 inline-block bg-gradient-to-r w-full from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
                        >
                            Inscreva-se Agora
                        </a>
                    </div>
                </div>
            </section>



            {/* Footer */}
            <Footer />
        </div>
    );
};

export default CourseDetail;
