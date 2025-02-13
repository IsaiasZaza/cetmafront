"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const ModulesSidebar = ({ currentLessonIndex, changeVideo }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("https://api.exemplo.com/lessons");
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error("Erro ao buscar as aulas:", error);
      }
    };

    fetchLessons();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-110"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      )}

      <div
        className={`w-full md:w-1/4 fixed top-0 right-0 h-full bg-gradient-to-b from-[#16222A] to-[#3A6073] p-6 shadow-2xl overflow-y-auto rounded-l-2xl transform transition-transform duration-500 ease-in-out z-40 ${
          isMobile ? (menuOpen ? "translate-x-0" : "translate-x-full") : ""
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white bg-clip-text text-transparent bg-gradient-to-r from-[#4A90E2] to-[#357ABD] animate-pulse">
          Módulos
        </h1>
        {lessons.length > 0 ? (
          lessons.map((lesson, index) => (
            <motion.button
              key={lesson.id}
              onClick={() => {
                changeVideo(lesson.videoUrl, index);
                if (isMobile) toggleMenu();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full flex items-center justify-start px-4 py-3 mb-4 rounded-xl font-bold text-lg transition-transform duration-200 ease-in-out transform ${
                currentLessonIndex === index
                  ? "bg-gradient-to-r from-[#357ABD] to-[#4A90E2] ring-2 ring-[#4A90E2]"
                  : "bg-[#1A3A55] hover:bg-[#357ABD]"
              } text-white`}
            >
              {lesson.title}
            </motion.button>
          ))
        ) : (
          <p className="text-white text-center">Nenhuma aula disponível</p>
        )}
      </div>
    </>
  );
};

export default ModulesSidebar;
