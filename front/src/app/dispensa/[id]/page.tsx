"use client";
import { User, Search, Settings } from "lucide-react";
import ItemModal from "../../components/modals/addItemmodal";
import EditItemModal from "@/app/components/modals/editItemmodal";
import { useEffect, useState } from "react";
import { AlimentosItf } from "../../utils/types/AlimentosItf";
import { useParams, useRouter } from "next/navigation";
import UserModal from "@/app/components/modals/userModal";
import { DispensaItf } from "@/app/utils/types/DispensaItf";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ClienteItf } from "@/app/utils/types/ClienteItf";
import Cookies from "js-cookie";
export default function InstanciaPage() {
    const [alimentos, setPropostas] = useState<AlimentosItf[]>([]);
    const [alimentoSelecionado, setAlimentoSelecionado] = useState<AlimentosItf | null>(null);
    const [dispensa, setDispensa] = useState<DispensaItf | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfigForm, setShowConfigForm] = useState(false);
    const [showGrafico, setShowGrafico] = useState(false);
    const [funcionario, setFuncionario] = useState<ClienteItf[]>([]);
    const params = useParams();
    const dispensaId = params?.id;
    const router = useRouter();
    const [logado, setLogado] = useState<boolean>(false)
    const [mostrarUso, setMostrarUso] = useState(false);
    const [mostrarHistorico, setMostrarHistorico] = useState(false);
    const [historico, setHistorico] = useState<any[]>([]);


async function buscarHistoricoUso() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/alimentos/relatorio/${dispensaId}`, {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    });

    const dados = await response.json();
    setHistorico(dados);
    setMostrarHistorico(true);
  } catch (error) {
    console.error("Erro ao buscar histórico:", error);
    alert("Erro ao buscar histórico de uso.");
  }
}


  useEffect(() => {
    if (Cookies.get("token")) {
      setLogado(true)
    } else {
      router.replace("/")
    }
  }, [])
    useEffect(() => {
        async function buscaDados() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/alimentos/dispensa/${dispensaId}/alimentos`);
                const dados = await response.json();
                setPropostas(dados);
            } catch (error) {
                console.error("Falha ao buscar alimentos:", error);
            }
        }

       async function buscaDispensa() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dispensa/${dispensaId}`);
            const dados = await response.json();
            setDispensa(dados);
            setFuncionario(dados.membros || []); 
        } catch (error) {
            console.error("Falha ao buscar dados da dispensa:", error);
        }
        }


        if (dispensaId) {
            buscaDados();
            buscaDispensa();
        }
    }, [dispensaId]);

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

    async function handleDeletePage(id: number) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dispensa/${id}`, {
                method: 'DELETE',
                headers: {
                "Content-Type": "application/json",
                 Authorization: "Bearer " + Cookies.get("token") || ""
        },
            });
            setDispensa(null);
            setShowConfigForm(false);
            router.push("/perfil");
        } catch (error) {
            console.error("Erro ao deletar dispensa:", error);
        }
    }


    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a28fd0", "#ffb6b9", "#c6e2ff"];

    return (
        <div className="min-h-screen bg-slate-100">
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80 mb-6">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-slate-800">Controle de Dispensa</h1>

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
                                <ItemModal dispensaId={Number(dispensaId)} />
                                
                                <button
                                    onClick={() => setShowConfigForm(true)}
                                    className="bg-slate-200 text-slate-700 hover:bg-slate-300 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium transition-colors"
                                >
                                    <Settings size={16} /> Config.
                                </button>

                                <button
                                    onClick={() => setShowGrafico(true)}
                                    className="bg-indigo-200 text-indigo-700 hover:bg-indigo-300 flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium transition-colors"
                                >
                                    📊 Gráfico
                                </button>

                                <button
                                    onClick={buscarHistoricoUso}
                                    className="bg-green-500 text-white hover:bg-black flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium transition-colors"
                                    >
                                    Histórico de Uso
                                    </button>


                               <UserModal
                                dispensaId={Number(dispensaId)}
                                onUserAdded={(user) => {
                                    setFuncionario((prev) => {
                                    if (prev.some(f => f.id === user.id)) return prev;
                                    return [...prev, user];
                                    });
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Funcionários</h2>
                        <div className="space-y-3">
                            {funcionario.length > 0 ? (
                                funcionario.map((cook, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">
                                        <div className="p-2 bg-slate-200 rounded-full">
                                            <User className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <span className="font-medium text-slate-700">{cook.nome}</span>
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
                                        <th className="p-3 text-sm font-semibold text-slate-500 text-right"></th>
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
                                                <td className="p-3 font-medium text-slate-700 text-right"><strong>{alimento.unidadeTipo}</strong> {alimento.peso}</td>
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
                            <p className="mb-2 text-slate-700"><strong>Peso:</strong> {alimentoSelecionado.peso} {alimentoSelecionado.unidadeTipo}</p>
                            <p className="mb-2 text-slate-700"><strong>tipoUnidade:</strong> {alimentoSelecionado.unidadeTipo} </p>
                            {alimentoSelecionado.perecivel && (
                                <p className="mb-4 text-slate-700"><strong>Perecível:</strong> {alimentoSelecionado.perecivel}</p>
                            )}

                            <div className="flex gap-3 mt-4">
                                <EditItemModal id={Number(alimentoSelecionado?.id)} dispensaId={Number(dispensaId)} />
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

                {showConfigForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl border border-slate-200/80">
                            <button
                                onClick={() => setShowConfigForm(false)}
                                className="float-right font-bold text-slate-500 hover:text-slate-700"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-bold text-slate-800 mb-4">Configurações da Dispensa</h2>

                            {dispensa ? (
                                <p className="text-slate-700 mb-4"><strong>Nome:</strong> {dispensa.nome}</p>
                            ) : (
                                <p className="text-slate-500 mb-4">Carregando nome da dispensa...</p>
                            )}

                            <button
                                onClick={() => {
                                    if (dispensaId) handleDeletePage(Number(dispensaId));
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                            >
                                Deletar Dispensa
                            </button>
                        </div>
                    </div>
                )}

               {showGrafico && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white p-6 rounded-2xl max-w-lg w-full shadow-xl border border-slate-200/80">
      <button
        onClick={() => setShowGrafico(false)}
        className="float-right font-bold text-slate-500 hover:text-slate-700"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Distribuição do Estoque</h2>

      <PieChart width={350} height={300}>
        <Pie
          data={alimentos.map(item => ({ name: item.nome, value: Number(item.peso) }))}

          dataKey="value"
          nameKey="name"
          cx={175}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {alimentos.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  </div>
    )}


<div className="flex justify-end mt-6">
  <button
    onClick={() => setMostrarUso((prev) => !prev)}
    className="bg-green-500 hover:bg-black text-white font-semibold py-2 px-6 rounded-xl transition-colors"
  >
    {mostrarUso ? "Fechar uso de alimentos" : "Registrar uso de alimentos"}
  </button>
</div>


{mostrarUso && (
  <section className="mt-6 bg-white p-6 rounded-2xl shadow-lg border border-slate-200/80">
    <h2 className="text-xl font-bold text-slate-800 mb-4">Registrar uso de alimentos</h2>
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const entradas = alimentos
          .map(alimento => {
            const valor = formData.get(`alimento-${alimento.id}`);
            const numero = Number(valor);
            return valor && !isNaN(numero) && numero > 0
              ? { id: alimento.id, quantidade: numero }
              : null;
          })
          .filter(Boolean);

        if (entradas.length === 0) return alert("Nenhuma quantidade válida informada.");

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/alimentos/relatorio`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + Cookies.get("token"),
            },
            body: JSON.stringify({
              alimentos: entradas,
              dispensaId: Number(dispensaId),
            }),
          });

          if (response.ok) {
            alert("Uso registrado com sucesso.");
            location.reload();
          } else {
            const erro = await response.json();
            console.error(erro);
            alert("Erro ao registrar uso: " + (erro?.error || "Erro desconhecido"));
          }
        } catch (error) {
          console.error(error);
          alert("Erro inesperado.");
        }
      }}
    >
      <div className="space-y-4">
        {alimentos.map(alimento => (
          <div key={alimento.id} className="flex items-center gap-4">
            <label className="w-48 font-medium text-slate-700">{alimento.nome}</label>
            <input
              type="number"
              step="0.01"
              name={`alimento-${alimento.id}`}
              placeholder={`em ${alimento.unidadeTipo.toLowerCase()}`}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-2 text-slate-700"
            />
            <span className="text-sm text-slate-500">Disponível: {alimento.peso}</span>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors"
      >
        Enviar
      </button>
    </form>
  </section>
)}

{mostrarHistorico && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white p-6 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-slate-200/80">
      <button
        onClick={() => setMostrarHistorico(false)}
        className="float-right font-bold text-slate-500 hover:text-slate-700"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold text-slate-800 mb-4">Histórico de Uso</h2>

      {historico.length === 0 ? (
        <p className="text-slate-600">Nenhum registro encontrado.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="p-2">Data</th>
              <th className="p-2">Usuário</th>
              <th className="p-2">Alimento</th>
              <th className="p-2">Quantidade</th>
              <th className="p-2">Unidade</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item, index) => (
              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-2">{new Date(item.data).toLocaleString()}</td>
                <td className="p-2">{item.usuario}</td>
                <td className="p-2">{item.alimento}</td>
                <td className="p-2">{item.quantidade}</td>
                <td className="p-2">{item.unidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)}





    </main>
            </div>
        );
    }
