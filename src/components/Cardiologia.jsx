import { FaCheckCircle } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";
import Header from "./Header";
import Footer from "./Footer";

export default function CardiologyCourse() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="relative bg-[url('/Fita_aprentacao_de_cada_curso.png')] bg-cover bg-center h-[45vh] text-white flex flex-col justify-center items-start px-6 md:px-20 lg:px-40">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative w-full md:w-1/2 text-left space-y-6">
          <h2 className="text-lg md:text-xl font-extrabold text-blue-400">Desconto de inauguração</h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Cardiologia e Hemodinâmica
            
          </p>
          <p className="text-md md:text-lg text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="max-w-screen-2xl mx-auto grid gap-x-60 grid-cols-1 lg:grid-cols-2 gap-6  ">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Por que estudar cardiologia e hemodinâmica pode impulsionar sua carreira na enfermagem?</h2>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 w-4/6">
            <img src="/logo.png" alt="Cetma Logo" className="w-24 h-24 " />
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Cardiologia e Hemodinâmica</h2>
            <ul className="mt-4 text-gray-700 text-left space-y-2">
              {[
                "Acesso vitalício",
                "Acesso imediato",
                "Professores para tirar dúvidas",
                "100% Online",
                "Certificados aprovados pelo MEC",
                "E muito mais"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-500" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-blue-900 text-center">
              <p className="line-through text-lg flex items-center justify-center gap-2">
                <IoMdPricetag className="text-red-500" /> de R$ 1299,99
              </p>
              <p className="text-4xl font-extrabold">R$ 999,99</p>
              <p className="text-sm font-medium">em até 6x sem juros</p>
            </div>
            <a
              href="#inscricao"
              className="mt-6 inline-block bg-gradient-to-r w-full from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
            >
              Aprenda Agora
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
