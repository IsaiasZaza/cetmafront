"use client"; // Adicione isso no início do arquivo

import React, { useState, useEffect } from "react";

const courses = [
  { id: 1, title: "Curso 1", description: "Descrição do curso 1.", image: "/teste-cursos.jpg" },
  { id: 2, title: "Curso 2", description: "Descrição do curso 2.", image: "/teste-cursos.jpg" },
  { id: 3, title: "Curso 3", description: "Descrição do curso 3.", image: "/teste-cursos.jpg" },
  { id: 4, title: "Curso 4", description: "Descrição do curso 4.", image: "/teste-cursos.jpg" },
  { id: 5, title: "Curso 5", description: "Descrição do curso 5.", image: "/teste-cursos.jpg" },
  { id: 6, title: "Curso 6", description: "Descrição do curso 6.", image: "/teste-cursos.jpg" },
  { id: 7, title: "Curso 7", description: "Descrição do curso 7.", image: "/teste-cursos.jpg" },
];

const CursosHome = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(null);
  const [startX, setStartX] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < courses.length - (windowWidth < 768 ? 1 : 3)) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const toggleDescription = (id) => {
    setShowDescription((prev) => (prev === id ? null : id));
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!startX) return;
    const endX = e.touches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setStartX(null);
  };

  return (
    <div className="bg-blue-500 flex flex-col items-center py-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl items-start px-4">
        <div className="text-white text-left mb-6 md:mb-0 md:mr-8 md:w-1/3">
          <h2 className="text-3xl font-bold">Cursos:</h2>
          <p className="text-lg mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
          </p>
        </div>

        <div
          className="relative w-full md:w-2/3"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div className="flex w-full overflow-hidden">
            {courses.slice(currentIndex, currentIndex + (windowWidth < 768 ? 1 : 3)).map((course) => (
              <div key={course.id} className="w-full md:w-1/3 p-2">
                <div
                  className="w-full h-80 flex items-center justify-center overflow-hidden rounded-lg shadow-md bg-white relative cursor-pointer"
                  onClick={() => toggleDescription(course.id)}
                >
                  {showDescription === course.id ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white">
                      <p className="text-center p-4">{course.description}</p>
                    </div>
                  ) : (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <button
              className={`bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              &#8592;
            </button>

            <button
              className={`bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 ${
                currentIndex === courses.length - (windowWidth < 768 ? 1 : 3) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleNext}
              disabled={currentIndex === courses.length - (windowWidth < 768 ? 1 : 3)}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursosHome;
