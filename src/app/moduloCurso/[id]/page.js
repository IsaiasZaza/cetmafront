"use client";

import { useEffect, useState } from "react";
import MenuLateral from "@/components/MenuLateral";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const moduloCurso = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Definir router dentro do componente

    const handleRedirect = (url) => {
        router.push(url);
    };

    const Card = ({ title, description, videoUrl }) => (
        <div className="bg-gray-300 rounded-lg h-80 flex flex-col items-center justify-center text-center font-semibold shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
            {videoUrl && (
                <button
                    onClick={() => handleRedirect(`/playerVideo/${course.id}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-blue-500 underline"
                >
                    Assistir Aula
                </button>
            )}
        </div>
    );

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`https://crud-usuario.vercel.app/api/curso/${id}`);
                const data = await response.json();

                // Cria um array de subcursos com o curso principal como "Introdução"
                const formattedCourse = {
                    ...data,
                    subCourses: [
                        {
                            id: data.id,
                            title: `Introdução: ${data.title}`,
                            description: data.description,
                            videoUrl: data.videoUrl, // Usa o course.videoUrl retornado pela API
                        },
                        ...(data.subCourses || []),
                    ],
                };

                setCourse(formattedCourse);
            } catch (error) {
                console.error("Erro ao buscar curso:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCourse();
    }, [id]);

    console.log(course);
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
        <div className="flex h-screen">
            <MenuLateral />

            <div className="flex-grow flex flex-col overflow-y-auto">
                <section className="relative bg-[url('/banner_pag_topicos_dos_cursos.png')] py-32 bg-cover bg-center h-[60vh] text-white flex flex-col justify-center items-start px-4 sm:px-8 md:px-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-transparent"></div>
                    <div className="relative w-full sm:w-3/4 lg:w-2/3 text-left space-y-4 sm:space-y-6">
                        <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-wider uppercase text-blue-300">
                            CENTRO EDUCACIONAL TÉCNICO MÉDICO ASSISTENCIAL
                        </h2>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight break-words">
                            {course.title}
                        </h1>
                        <p className="text-lg">{course.description}</p>
                    </div>
                </section>

                <div className="flex-grow p-8 bg-gray-50">
                    {/* Exibe todas as aulas (curso principal + subcursos) em um único tópico */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tópico 1: Aulas do Curso</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {course.subCourses?.map((subCourse) => (
                                <Card
                                    key={subCourse.id}
                                    title={subCourse.title}
                                    description={subCourse.description}
                                    videoUrl={subCourse.videoUrl}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Tire suas dúvidas */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tire dúvidas</h2>
                        <div className="bg-gray-300 rounded-lg h-40 flex items-center justify-center text-center font-semibold shadow-md">
                            Fale com o professor
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default moduloCurso;
