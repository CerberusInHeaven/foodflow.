"use client"
import Image from "next/image"
import { Heart, Twitter, Instagram, Youtube, Linkedin } from "lucide-react"
import { useClienteStore } from "../context/ClienteContext"

import ClientModal from "../components/modals/clientModal"
export default function perfil() {
  const { cliente } = useClienteStore()
  return (
    <div className="min-h-screen bg-[#ffffff]">
    
     <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-300 to-orange-500">
                <div className="absolute top-4 left-4 z-10">
                  <div className="w-10 h-10 bg-[#2c2c2c] rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#ffffff]" />
                  </div>
                </div>
                <Image
                  src="/fieri.jpg"
                  alt="Hero image"
                  width={500}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-[#000000] leading-tight">
                {cliente?.nome}
                <br />
                CARGOAQUI
              </h1>
              <div className="bg-[#f5f5f5] rounded-lg p-4">
                <p className="text-[#757575] text-sm">To aqui pq ta muito dificil organizar as coisas em FLAVORTOWN™</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* aqui fica as instancias heinnnnnnn*/}
      <section
        className="px-6 py-12"
        style={{
          backgroundImage: `url("pattern.png")`,
          backgroundSize: "center",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#000000]">Suas Dispensas</h2>
            <div className="">
              <ClientModal/>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#ffffff] border border-[#e3e3e3] rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#000000] mb-4">Cozinha {i}</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#d9d9d9] rounded-full"></div>
                    <span className="text-[#757575] text-sm">Date</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
