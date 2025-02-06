"use client";

import { useState, useEffect } from "react";
import { Plus, X, Pencil, Trash, BookOpen } from "lucide-react";
import MenuLateral from "@/components/MenuLateral";
import  {decodeJwt } from 'jose';


export default function EbookAdmin() {
    const [ebooks, setEbooks] = useState([]);
    const [selectedEbook, setSelectedEbook] = useState(null);
    const [formEbook, setFormEbook] = useState({
        title: "",
        autor: "",
        description: "",
        price: "",
        coverImage: "",
        fileUrl: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        async function fetchEbooks() {
            try {
                const response = await fetch("https://crud-usuario.vercel.app/api/ebooks");
                if (!response.ok) throw new Error("Erro ao buscar ebooks");
                const data = await response.json();
                setEbooks(data);
            } catch (error) {
                console.error("Erro ao buscar ebooks:", error);
            }
        }
        fetchEbooks();
    }, []);

    const handleAddEbook = async () => {
        try {
            const response = await fetch("http://localhost:3001/api/ebook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formEbook),
            });
            if (!response.ok) throw new Error("Erro ao adicionar eBook");
            const newEbook = await response.json();
            setEbooks([...ebooks, newEbook]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Erro ao adicionar eBook:", error);
        }
    };

    const handleEditEbook = async () => {
        const token = localStorage.getItem("token");
        const decodedToken = decodeJwt(token);


        if (!selectedEbook) return;
        try {
            const response = await fetch(`http://localhost:3001/api/ebook/${decodedToken.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formEbook),
            });
            if (!response.ok) throw new Error("Erro ao editar eBook");
            const updatedEbook = await response.json();
            setEbooks(ebooks.map(e => (e.id === updatedEbook.id ? updatedEbook : e)));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao editar eBook:", error);
        }
    };

    const handleDeleteEbook = async (id) => {
        try {
            await fetch(`https://crud-usuario.vercel.app/api/ebook/${id}`, { method: "DELETE" });
            setEbooks(ebooks.filter(e => e.id !== id));
        } catch (error) {
            console.error("Erro ao deletar eBook:", error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <MenuLateral />
            <div className="flex-1 p-8">
                <h1 className="text-4xl font-bold mb-6 text-center text-blue-900 flex items-center justify-center gap-2">
                    Gerenciamento de eBooks
                    <BookOpen size={36} className="text-blue-600" />
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ebooks.map((ebook) => (
                        <div key={ebook.id} className="bg-white shadow-xl rounded-xl p-6 border border-gray-300 transition-all hover:shadow-2xl">
                            <div className="relative w-full h-56 rounded-lg overflow-hidden bg-gray-200">
                                {ebook.coverImage ? (
                                    <img src={ebook.coverImage} alt={ebook.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">Sem imagem</div>
                                )}
                            </div>
                            <h2 className="text-xl font-semibold mt-4 text-gray-800 truncate">{ebook.title}</h2>
                            <p className="text-gray-600 text-sm mt-2">{ebook.description || "Sem descrição disponível"}</p>
                            <p className="text-gray-700 text-sm font-medium mt-2">Autor: {ebook.autor}</p>
                            <span className="block text-lg font-bold text-green-700 mt-4">R$ {ebook.price}</span>
                            <div className="flex justify-between mt-4">
                                <button onClick={() => { setSelectedEbook(ebook); setFormEbook(ebook); setIsModalOpen(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
                                    <Pencil size={16} className="mr-2" /> Editar
                                </button>
                                <button onClick={() => handleDeleteEbook(ebook.id)} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center">
                                    <Trash size={16} className="mr-2" /> Deletar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={() => setIsAddModalOpen(true)} className="fixed bottom-4 right-4 flex flex-col items-center justify-center border-none rounded-xl border border-gray-200 transition-all">
                    <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full text-white mb-3">
                        <Plus size={30} />
                    </div>
                    <span className="text-lg font-medium text-gray-800"></span>
                </button>
                {isAddModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Adicionar eBook</h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-red-500">
                                    <X size={20} />
                                </button>
                            </div>
                            <input type="text" placeholder="Título" className="w-full p-2 border rounded mb-2" onChange={(e) => setFormEbook({ ...formEbook, title: e.target.value })} />
                            <input type="text" placeholder="Autor" className="w-full p-2 border rounded mb-2" onChange={(e) => setFormEbook({ ...formEbook, autor: e.target.value })} />
                            <textarea placeholder="Descrição" className="w-full p-2 border rounded mb-2" onChange={(e) => setFormEbook({ ...formEbook, description: e.target.value })} />
                            <input type="text" placeholder="Preço" className="w-full p-2 border rounded mb-2" onChange={(e) => setFormEbook({ ...formEbook, price: e.target.value })} />
                            <button onClick={handleAddEbook} className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg transition-all hover:bg-blue-700">Adicionar</button>
                        </div>
                    </div>
                )}
                {isModalOpen && selectedEbook && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Editar eBook</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500">
                                    <X size={20} />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Título"
                                value={formEbook.title || ""}
                                className="w-full p-2 border rounded mb-2"
                                onChange={(e) => setFormEbook({ ...formEbook, title: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Autor"
                                value={formEbook.autor || ""}
                                className="w-full p-2 border rounded mb-2"
                                onChange={(e) => setFormEbook({ ...formEbook, autor: e.target.value })}
                            />
                            <textarea
                                placeholder="Descrição"
                                value={formEbook.description || ""}
                                className="w-full p-2 border rounded mb-2"
                                onChange={(e) => setFormEbook({ ...formEbook, description: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Preço"
                                value={formEbook.price || ""}
                                className="w-full p-2 border rounded mb-2"
                                onChange={(e) => setFormEbook({ ...formEbook, price: e.target.value })}
                            />
                            <button
                                onClick={handleEditEbook}
                                className="w-full bg-green-600 text-white font-medium py-2 rounded-lg transition-all hover:bg-green-700"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}