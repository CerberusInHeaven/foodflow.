'use client';
import { LucideUserPlus2, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Modal from './modal';
import { ClienteItf } from '@/app/utils/types/ClienteItf';

export default function UserModal(cliente: ClienteItf) {
  const [isOpen, setIsOpen] = useState(false);
  const [clientes, setClientes] = useState<ClienteItf[]>([]);

  const getInitial = (name: string | undefined): string => {
    return name?.charAt(0).toUpperCase() || 'U';
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`)
      .then(res => res.json())
      .then(data => setClientes(Array.isArray(data) ? data : [data]));
  }, [cliente.id]);

  return (
    <>
    <button
  className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium flex justify-between"
  onClick={() => setIsOpen(true)}
   >
  Adicione um usuario 
  <LucideUserPlus2 size={16} />
  </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <section className="container mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Perfil do Usuário</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientes.map((cliente) => (
              <div
                key={cliente.id}
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
                
              </div>
            ))}
          </div>
        </section>
      </Modal>
    </>
  );
}
