"use client"
import React from 'react'
import { Plus, MessageSquareQuote, User } from "lucide-react"
import { useClienteStore } from "../context/ClienteContext"
import ClientModal from "../components/modals/clientModal"

// Componente da Página de Perfil
export default function Perfil() {
  const { cliente } = useClienteStore()

  // Função para pegar a primeira letra do nome para o avatar
  const getInitial = (name: string | undefined): string => {
    if (!name) return 'U' // 'U' de Usuário como fallback
    return name.charAt(0).toUpperCase()
  }

  // Dados mocados para os cards da dispensa (mantidos do seu código)
  const dispensas = [
    { id: 1, nome: 'Cozinha Principal', data: 'Atualizado em 12 de Jun' },
    { id: 2, nome: 'Estoque do Fim de Semana', data: 'Atualizado em 10 de Jun' },
    { id: 3, nome: 'Dispensa de Emergência', data: 'Atualizado em 5 de Jun' },
  ]

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      
      {/* Seção Superior: Perfil do Usuário */}
      <section className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
            
            {/* NOVO AVATAR DO PERFIL */}
            <div className="md:col-span-1 flex justify-center">
              <div className="w-40 h-40 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-6xl font-bold text-white select-none">
                  {getInitial(cliente?.nome)}
                </span>
              </div>
            </div>

            {/* Informações do Perfil */}
            <div className="md:col-span-2 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <p className="font-semibold text-green-600">Diretor(a) de Operações</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {cliente?.nome || 'Nome do Usuário'}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Inferior: Dispensas */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Suas Dispensas</h2>
          
          {/* O seu modal continua aqui, sem alterações na chamada */}
          <div>
            <ClientModal />
          </div>

        </div>

        {/* Grid de Cards das Dispensas */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dispensas.map((dispensa) => (
            <div key={dispensa.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{dispensa.nome}</h3>
                <p className="text-slate-500 text-sm">{dispensa.data}</p>
              </div>
              <a href="#" className="mt-6 inline-block text-green-600 font-semibold hover:underline self-start">
                Ver detalhes →
              </a>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}