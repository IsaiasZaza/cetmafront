import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { SiVisa, SiMastercard, SiElo } from "react-icons/si";
import FAQ from "./Faq"; // Importando o componente FAQ

const Footer = () => {
  return (
    <div>
      {/* Seção FAQ adicionada acima do footer */}
      <FAQ />

      {/* Início do Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-black text-white py-10">
        <div className="container mx-auto px-4">
          {/* Seção principal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-white pb-8">
            {/* Logo e slogan */}
            <div className="flex flex-col items-center md:items-start border-b sm:border-b-0 border-white md:col-span-1">
              <img src="/logo_branca.png" alt="CETMA Logo" className="h-48 w-48 -mt-14 mb-4" />
              <p className="text-gray-300 text-center md:text-left">
                Mudando a forma que <br /> você olhará a enfermagem
              </p>
              <div className="mt-6 md:mt-10">
                <h4 className="text-white font-bold border-b pb-1 border-blue-500 mb-4 text-center md:text-left">
                  Acompanhe a CETMA
                </h4>
                <div className="flex justify-center md:justify-start mb-4 gap-4">
                  <a href="#" className="text-blue-500 hover:text-white text-2xl">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="text-blue-500 hover:text-white text-2xl">
                    <FaInstagram />
                  </a>
                  <a href="#" className="text-blue-500 hover:text-white text-2xl">
                    <FaWhatsapp />
                  </a>
                  <a href="#" className="text-blue-500 hover:text-white text-2xl">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </div>

            {/* Links principais */}
            <div className="md:col-span-1">
              <h4 className="text-blue-500 font-bold mb-4 text-center md:text-left">CETMA</h4>
              <ul className="text-center md:text-left">
                <li className="mb-2">
                  <a href="/" className="text-gray-300 hover:text-white">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/cursos" className="text-gray-300 hover:text-white">
                    Cursos
                  </a>
                </li>
                <li>
                  <a href="/sobre-nos" className="text-gray-300 hover:text-white">
                    Sobre nós
                  </a>
                </li>
              </ul>
            </div>

            {/* Cursos */}
            <div className="md:col-span-1">
              <h4 className="text-blue-500 font-bold mb-4 text-center md:text-left">Cursos</h4>
              <ul className="text-center md:text-left">
                <li className="mb-2">
                  <a href="/cursos-em-geral" className="text-gray-300 hover:text-white">
                    Cursos em geral
                  </a>
                </li>
                <li>
                  <a href="/cardiologia-hemodinamica" className="text-gray-300 hover:text-white">
                    Cardiologia e Hemodinâmica
                  </a>
                </li>
              </ul>
            </div>

            {/* Atendimento */}
            <div className="md:col-span-1">
              <h4 className="text-blue-500 font-bold mb-4 text-center md:text-left">Atendimento</h4>
              <ul className="text-center md:text-left">
                <li className="mb-2">
                  <a href="/cursos-em-geral" className="text-gray-300 hover:text-white">
                    Fale Conosco
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="flex flex-col sm:flex-row justify-center items-center mt-8 pt-8">
            {/* Compra segura */}
            <div className="flex flex-col sm:mr-10 items-center mb-6 sm:mb-0">
              <h4 className="text-blue-500 font-bold mb-4">Compra segura</h4>
              <img src="/compra-segura.png" alt="Compra Segura" className="h-10" />
            </div>

            {/* Formas de Pagamento */}
            <div className="flex flex-col sm:mr-10 items-center mb-6 sm:mb-0">
              <h4 className="text-blue-500 font-bold mb-4">Formas de pagamento</h4>
              <div className="flex gap-4">
                <SiVisa className="text-blue-500 text-3xl" />
                <SiMastercard className="text-blue-500 text-3xl" />
              </div>
            </div>

            {/* Ícone adicional */}
            <div className="flex flex-col items-center">
              <img src="/LOGO_EMBLEMA_BRANCA.png" alt="Estetoscópio" className="h-16" />
            </div>
          </div>

          {/* Direitos reservados */}
          <div className="mt-8 text-center text-gray-400 text-sm">
            Todos os direitos reservados aos <a className="text-blue-500">3 Jovens</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
