"use client"
import { User, Search, Settings, Trash2, UserPlus } from "lucide-react";
import ItemModal from "../components/modals/addItemmodal";
import { useEffect, useState } from "react";
import { AlimentosItf } from "../utils/types/AlimentosItf";
import { useParams } from "next/navigation";

export default function InstanciaPage() {
    const [alimentos, setPropostas] = useState<AlimentosItf[]>([]);
    const [alimentoSelecionado, setAlimentoSelecionado] = useState<AlimentosItf | null>(null);
    const [showForm, setShowForm] = useState(false);
    const params = useParams();

    useEffect(() => {
        async function buscaDados() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/alimentos`);
                const dados = await response.json();
                setPropostas(dados);
            } catch (error) {
                console.error("Falha ao buscar dados da API:", error);
            }
        }
        buscaDados();
    }, []);

    function handleCloseDetails() {
        setAlimentoSelecionado(null);
    }

    async function handleDeleteItem(id: number) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_URL_API}/alimentos/${id}`, {
                method: 'DELETE',
            });
            setPropostas((prev) => prev.filter(item => item.id !== id));
            handleCloseDetails();
        } catch (error) {
            console.error("Erro ao deletar alimento:", error);
        }
    }

    const funcionarios: string[] = [];

    return (
        <div className="min-h-screen bg-slate-100">
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 mb-6">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-slate-800">Controle do Estoque</h1>

                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative w-full md:w-1/3">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar item..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 bg-slate-50 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 w-full sm:w-auto">
                                <ItemModal />
                                <button className="bg-red-100 text-red-700 hover:bg-red-200 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium transition-colors">
                                    <Trash2 size={16} /> Remover Item
                                </button>
                                <button className="bg-slate-200 text-slate-700 hover:bg-slate-300 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium transition-colors">
                                    <Settings size={16} /> Config.
                                </button>
                                <button className="bg-slate-200 text-slate-700 hover:bg-slate-300 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium transition-colors">
                                    <UserPlus size={16} /> Funcionário
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Funcionários</h2>
                        <div className="space-y-3">
                            {funcionarios.length > 0 ? (
                                funcionarios.map((cook, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                                        <div className="p-2 bg-slate-200 rounded-full">
                                            <User className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <span className="font-medium text-slate-700">{cook}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500 text-center py-4">Nenhum funcionário cadastrado.</p>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Seu estoque</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="p-3 text-sm font-semibold text-slate-500">ID</th>
                                        <th className="p-3 text-sm font-semibold text-slate-500 text-center">Nome</th>
                                        <th className="p-3 text-sm font-semibold text-slate-500 text-right">Kg</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alimentos.length > 0 ? (
                                        alimentos.map((alimento) => (
                                            <tr
                                                key={alimento.id}
                                                onClick={() => setAlimentoSelecionado(alimento)}
                                                className="hover:bg-slate-50 transition-colors cursor-pointer"
                                            >
                                                <td className="p-3 font-medium text-slate-700">{alimento.id}</td>
                                                <td className="p-3 text-slate-600 text-center">{alimento.nome || '-'}</td>
                                                <td className="p-3 font-medium text-slate-700 text-right">{alimento.peso}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="text-center py-8 text-slate-500">Nenhum item no estoque.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

               
                {alimentoSelecionado && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200/80">
                            <button 
                                onClick={handleCloseDetails}
                                className="float-right font-bold text-slate-500 hover:text-slate-700"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">{alimentoSelecionado.nome}</h2>
                            <p className="mb-2 text-slate-700"><strong>ID:</strong> {alimentoSelecionado.id}</p>
                            <p className="mb-2 text-slate-700"><strong>Peso:</strong> {alimentoSelecionado.peso} kg</p>
                            {alimentoSelecionado.perecivel && (
                                <p className="mb-4 text-slate-700"><strong>Perecível:</strong> {alimentoSelecionado.perecivel}</p>
                            )}

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        setAlimentoSelecionado(null);
                                        setShowForm(true);
                                    }}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => {
                                        if (alimentoSelecionado) handleDeleteItem(alimentoSelecionado.id);
                                    }}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
