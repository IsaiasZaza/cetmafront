import React from "react";
import Header from "./Header";
import MenuLateral from "./MenuLateral";

const Cardiologia = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-row relative min-h-screen">
        {/* Menu Lateral */}
        <div className=" bg-gray-200 fixed left-0 top-0 h-full">
          <MenuLateral />
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-grow ml-[20%] mr-[25%] overflow-y-auto">
          {/* Hero Section (Banner) */}
          <section
            className="text-white py-16 px-16 relative w-full"
            style={{
              backgroundImage: "url('/banner-curso.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full text-center">
              <h1 className="text-4xl font-bold">
                Cardiologia e Hemodinâmica
              </h1>
              <p className="mt-4 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </section>

          {/* Conteúdo Central */}
          <section className="py-16 px-6 md:px-16">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Porque estudar cardiologia e hemodinâmica ajudaria na sua carreira
              na enfermagem
            </h2>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </section>
        </div>

        {/* Card Flutuante */}
        <div
          className="w-1/4 h-auto bg-white shadow-lg rounded-lg p-6 fixed right-0 top-28"
          style={{ zIndex: 50 }}
        >
          <img src="/logo.png" alt="Cetma Logo" className="h-12 mx-auto" />
          <h3 className="text-xl font-bold text-gray-800 mt-6 text-center">
            Cardiologia e Hemodinâmica
          </h3>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>Acesso vitalício</li>
            <li>Acesso imediato</li>
            <li>Professores para tirar dúvidas</li>
            <li>100% Online</li>
            <li>Certificados aprovados pelo MEC</li>
            <li>E mais</li>
          </ul>
          <div className="mt-6 text-center">
            <p className="line-through text-gray-500">de R$ 1299,99</p>
            <p className="text-3xl font-bold text-blue-600">R$ 999,99</p>
            <p className="text-sm text-gray-500">em até 6x sem juros</p>
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded mt-6 w-full">
            APRENDA AGORA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cardiologia;
