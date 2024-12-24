import React from "react";

const Propaganda = () => {
  return (
    <div className=" py-10 bg-white flex justify-center">
      <div className="flex items-center justify-between w-full max-w-[1280px]">
        {/* Imagem à esquerda */}
        <div className="w-72 h-72 rounded-full overflow-hidden">
          <img
            src="/ppg4.png"
            alt="Profissional 1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto centralizado */}
        <div className="text-center flex-grow mx-8">
          <h2 className="text-4xl font-bold text-blue-600">
            MUDE SEU FUTURO <br /> E FAÇA PARTE <br /> DESSA EQUIPE
          </h2>
        </div>

        {/* Imagem à direita */}
        <div className="w-72 h-72 rounded-3xl overflow-hidden">
          <img
            src="/ppg3.png"
            alt="Profissional 2"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Propaganda;
