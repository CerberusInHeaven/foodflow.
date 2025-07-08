'use client';

import { LucideUserPlus2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Modal from './modal';
import { ClienteItf } from '@/app/utils/types/ClienteItf';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

interface UserModalProps {
  dispensaId: number;
  onUserAdded?: (user: ClienteItf) => void;
}

export default function UserModal({ dispensaId, onUserAdded }: UserModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [clientes, setClientes] = useState<ClienteItf[]>([]);
  const [membros, setMembros] = useState<ClienteItf[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<ClienteItf[]>([]);
  const [usuarioLogadoId, setUsuarioLogadoId] = useState<string | null>(null);

  const getInitial = (name: string | undefined): string => {
    return name?.charAt(0).toUpperCase() || 'U';
  };

  useEffect(() => {
    const id = Cookies.get("usuarioID");
    setUsuarioLogadoId(id ?? null);
  }, []);

  useEffect(() => {
    if (!isOpen || !usuarioLogadoId) return;

    async function carregarDados() {
      try {
        const [clientesRes, dispensaRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`),
          fetch(`${process.env.NEXT_PUBLIC_URL_API}/dispensa/${dispensaId}`),
        ]);

        const todosClientes: ClienteItf[] = await clientesRes.json();
        const dadosDispensa = await dispensaRes.json();
        const membrosDaDispensa: ClienteItf[] = dadosDispensa?.membros || [];

        setClientes(todosClientes);
        setMembros(membrosDaDispensa);

        const idsExcluidos = new Set([
          ...membrosDaDispensa.map(m => m.id),
          usuarioLogadoId,
        ]);

        const disponiveis = todosClientes.filter(c => !idsExcluidos.has(c.id));
        setClientesFiltrados(disponiveis);
      } catch (err) {
        console.error('Erro ao buscar clientes ou membros:', err);
        toast.error('Erro ao carregar usuários.');
      }
    }

    carregarDados();
  }, [isOpen, dispensaId, usuarioLogadoId]);

  const handleSelecionarUsuario = async (user: ClienteItf) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dispensa/${dispensaId}/membro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (Cookies.get('token') || ''),
        },
        body: JSON.stringify({ usuarioID: user.id }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(`Erro ao adicionar usuário: ${error?.error || 'Erro desconhecido'}`);
        return;
      }

      const usuarioAdicionado = await res.json();
      if (onUserAdded) onUserAdded(usuarioAdicionado);

      toast.success(`Usuário "${user.nome}" adicionado à dispensa!`);
      setIsOpen(false);
    } catch (err) {
      console.error('Erro na requisição de membro:', err);
      toast.error('Erro de rede ao adicionar usuário.');
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium flex justify-between"
        onClick={() => setIsOpen(true)}
      >
        Adicione um usuário
        <LucideUserPlus2 size={16} />
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <section className="container mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Selecionar Usuário</h2>
          </div>

          {clientesFiltrados.length === 0 ? (
            <p className="text-gray-500">Todos os usuários já estão na dispensa.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientesFiltrados.map((cliente) => (
                <button
                  key={cliente.id}
                  onClick={() => handleSelecionarUsuario(cliente)}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-4">
                    <span className="text-5xl font-bold text-white select-none">
                      {getInitial(cliente?.nome)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {cliente?.nome || 'Nome do Usuário'}
                  </h3>
                </button>
              ))}
            </div>
          )}
        </section>
      </Modal>
    </>
  );
}
