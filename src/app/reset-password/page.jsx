"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando ícones

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Para alternar visibilidade da senha
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para alternar visibilidade da confirmação de senha

    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage('As senhas não coincidem.');
            return;
        }

        if (!token) {
            setMessage('Token inválido ou não encontrado.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Senha redefinida com sucesso!');
                setTimeout(() => {
                    router.push('/'); // Redireciona após sucesso
                }, 2000);
            } else {
                setMessage(data.message || 'Erro ao redefinir a senha.');
            }
        } catch (error) {
            console.error('Erro:', error);
            setMessage('Erro ao redefinir a senha. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="min-h-screen flex justify-between items-stretch bg-cover bg-center" style={{ backgroundImage: "url('banner3.jpg')" }}>
            <div className="w-1/2 p-10"></div>
            <div className="w-2/5 h-[85vh] bg-white flex flex-col justify-center items-center px-8 shadow-lg rounded-bl-[40%] rounded-tl-lg">
                <h1 className="text-3xl font-semibold text-gray-700 mb-6">Redefinir Senha</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center text-gray-700 space-y-6">
                    {/* Campo para Nova Senha */}
                    <div className="w-4/5 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
                        <FaLock className="text-gray-400 ml-3" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nova senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full h-12 px-4 outline-none"
                        />
                        {showPassword ? (
                            <FaEye className="text-gray-400 cursor-pointer mr-3" onClick={() => setShowPassword(!showPassword)} />
                        ) : (
                            <FaEyeSlash className="text-gray-400 cursor-pointer mr-3" onClick={() => setShowPassword(!showPassword)} />
                        )}
                    </div>
                    {/* Campo para Confirmar Nova Senha */}
                    <div className="w-4/5 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-400">
                        <FaLock className="text-gray-400 ml-3" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme a nova senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full h-12 px-4 outline-none"
                        />
                        {showConfirmPassword ? (
                            <FaEye className="text-gray-400 cursor-pointer mr-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        ) : (
                            <FaEyeSlash className="text-gray-400 cursor-pointer mr-3" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        )}
                    </div>
                    {/* Botão de Envio */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-4/5 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-md font-medium transform transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-cyan-400"
                    >
                        {loading ? 'Redefinindo...' : 'Redefinir'}
                    </button>
                </form>
                {/* Mensagem de Sucesso ou Erro */}
                {message && (
                    <p
                        className={`mt-4 px-4 py-2 w-4/5 rounded-md ${
                            message.includes("sucesso") ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
