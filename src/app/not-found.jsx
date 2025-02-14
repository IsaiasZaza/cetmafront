import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404 - Página Não Encontrada</h1>
      <p className="text-xl text-gray-600 mb-8">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
      >
        Página Inicial
      </Link>
    </div>
  );
}
