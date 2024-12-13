const Footer = () => {
    return (
      <footer className="bg-black text-blue-500 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Texto principal */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-semibold">
              Construído com muito café e amor por 3 jovens
            </p>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
  
          {/* Links sociais */}
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition duration-300"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  