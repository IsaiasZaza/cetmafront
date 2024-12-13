import React from "react";

const CeoSection = () => {
  return (
    <div className="flex justify-center items-center p-20 bg-zinc-200">
        <div className="flex flex-col items-center py-10 bg-blue-500 text-white">
        <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row items-center">
            <div className="flex flex-col items-center md:items-start w-full pl-10 md:w-1/3">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-4 ">
                <img
                src="/teste-cursos.jpg"
                alt="CEO"
                className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-xl font-bold mb-2">Qualificação:</h2>
            <ul className="list-disc pl-5 text-lg">
                <li>Primeira</li>
                <li>Segunda</li>
                <li>Terceira</li>
                <li>Quarta</li>
            </ul>
            </div>
            <div className="mt-6 md:mt-0 md:ml-8 w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-4 text-center">Biografia do CEO:</h2>
            <p className="text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis.
            </p>
            <p className="text-lg leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis.
            </p>
            <p className="text-lg leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis.
            </p>
            <p className="text-lg leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                accumsan lacus vel facilisis.
            </p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default CeoSection;
