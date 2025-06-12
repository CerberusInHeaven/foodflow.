"use client"
import Image from "next/image"
import { User, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"
import ItemModal from "../components/modals/addItemmodal"
import { useClienteStore } from "../context/ClienteContext"
import { useEffect, useState } from "react"
import { AlimentosItf } from "../utils/types/AlimentosItf"
import { useParams } from "next/navigation"


export default function instancia() {
  const [alimentos, setPropostas] = useState<AlimentosItf[]>([])
  const params = useParams()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/alimentos`)
      const dados = await response.json()
      setPropostas(dados)
    }
    buscaDados()
  }, [])


  return (
    <div className="min-h-screen bg-[#ffffff]">
     
{/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left side - Image */}
          <div>
            <Image
              src="/donald.jpg"
              alt="McDonald's Restaurant"
              width={200}
              height={150}
              className="w-[400px] h-auto rounded-lg"
            />
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-[#000000]">Totalmente não é um MC</h1>

            <input
              type="text"
              placeholder="Isso aqui não é um mcdonalds... eu juro"
              className="w-full px-3 py-2 border border-[#d9d9d9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-transparent"
            />

            <div className="grid grid-cols-2 gap-4">
            <ItemModal />
              <button className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium">
                Remover Item
              </button>
              <button className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium">
                Config Instancia
              </button>
              <button className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium">
                Adicionar Funcionário
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-lg"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23cff7d3' fillOpacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundColor: "#cff7d3",
          }}
        >
          {/* Left Column - Funcionários */}
          <div>
            <h2 className="text-2xl font-bold text-[#02542d] mb-6">Funcionários</h2>
            <div className="space-y-4">
              {["Cozinheiro1", "Cozinheiro2", "Cozinheiro3", "Cozinheiro4", "Cozinheiro5"].map((cook, index) => (
                <div key={index} className="flex items-center space-x-3 bg-[#ffffff] p-3 rounded-lg">
                  <User className="w-5 h-5 text-[#757575]" />
                  <span className="text-[#000000] font-medium">{cook}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Seu estoque */}
          <div>
            <h2 className="text-2xl font-bold text-[#02542d] mb-6">Seu estoque</h2>
            <div className="bg-[#ffffff] p-4 rounded-lg">
           <div className="grid grid-cols-3 gap-2 text-sm font-semibold text-[#000000] mb-3 border-b border-[#e3e3e3] pb-2">
          <span>items</span>
          <span className="text-center">qtd/Kg</span>
          <span className="text-right">Kg</span>
        </div>
             
             <div className="space-y-1 text-sm">
            {alimentos.map((alimento) => (
            <div key={alimento.id} className="grid grid-cols-3 gap-2 py-1">
              <span className="text-[#000000]">{alimento.nome}</span>
              <span className="text-center text-[#757575]"></span>
              <span className="text-right text-[#000000]">{alimento.peso}Kg</span>
            </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      </div>
  )
}
