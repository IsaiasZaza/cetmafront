import React from "react";

const WhatsappVoador = () => {
  const whatsappNumber = "5511999999999"; // Substitua pelo número do WhatsApp com DDI e DDD
  const message = "Olá! Gostaria de saber mais informações."; // Mensagem padrão

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
      title="Fale conosco pelo WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.846.746 5.667 2.163 8.137L0 32l8.064-2.134C10.521 31.267 13.251 32 16 32c8.837 0 16-7.164 16-16S24.837 0 16 0zm0 29.36c-2.557 0-5.074-.654-7.296-1.893l-.523-.292-4.868 1.29 1.292-4.842-.305-.524C3.267 21.068 2.64 18.543 2.64 16c0-7.396 6.012-13.408 13.408-13.408S29.36 8.604 29.36 16 23.748 29.36 16 29.36zm8.047-10.144c-.451-.225-2.675-1.316-3.092-1.467-.412-.15-.71-.225-1.01.225-.297.451-1.16 1.467-1.421 1.763-.26.296-.525.337-.975.112-.451-.225-1.9-.7-3.621-2.23-1.34-1.187-2.24-2.654-2.503-3.104-.26-.451-.028-.696.195-.921.2-.196.451-.524.677-.786.225-.262.3-.45.451-.75.151-.301.075-.562-.037-.786-.112-.225-.986-2.462-1.352-3.371-.362-.9-.726-.775-1.01-.787l-.861-.012c-.3 0-.787.112-1.2.562-.412.451-1.575 1.537-1.575 3.744 0 2.208 1.612 4.341 1.837 4.637.225.3 3.175 4.85 7.705 6.8.75.326 1.337.52 1.795.663.754.24 1.44.206 1.984.125.605-.09 1.86-.757 2.123-1.486.262-.73.262-1.358.187-1.486-.075-.127-.262-.187-.525-.3z" />
      </svg>
    </a>
  );
};

export default WhatsappVoador;
