import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-center px-6 py-16">
      {/* Elementos decorativos flutuantes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute animate-ping-slow w-72 h-72 bg-purple-300 rounded-full opacity-30 top-20 left-10 blur-2xl" />
        <div className="absolute animate-ping-slower w-96 h-96 bg-blue-200 rounded-full opacity-20 bottom-0 right-0 blur-2xl" />
      </div>

      {/* Conteúdo principal */}
      <div className="z-10 flex flex-col items-center">
        <div className="text-blue-600 animate-bounce mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>
        <h1 className="text-6xl font-extrabold text-gray-800 drop-shadow-sm mb-4">404</h1>
        <p className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-2">
          Página não encontrada
        </p>
        <p className="text-gray-600 mb-6 text-lg max-w-xl">
          Ops! Parece que você tentou acessar uma página que não existe ou foi removida.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4m-6 0H5a2 2 0 01-2-2V10z" />
          </svg>
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
