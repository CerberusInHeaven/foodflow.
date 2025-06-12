"use client"
import Link from "next/link"
import { useClienteStore } from "../context/ClienteContext"
import { useRouter } from "next/navigation"

export function Header() {
    const { cliente, deslogaCliente } = useClienteStore()
    const router = useRouter()

    function clienteSair() {
        if (confirm("Confirma saída do sistema?")) {
            deslogaCliente()
            if (localStorage.getItem("clienteKey")) {
                localStorage.removeItem("clienteKey")
            }
            router.push("/login")
        }
    }

    return (
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
  <Link href="/" className="flex items-center space-x-3">
    <img src="./horde.png" className="h-12" alt="FOR THE HORRDEEEE" />
    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
      foodflow - prod
    </span>
  </Link>

  <div className="flex items-center space-x-2 md:space-x-8">
    <nav className="hidden md:flex space-x-8">
      <Link href="#" className="text-black hover:text-gray-600">
        Solutions
      </Link>
      <Link href="#" className="text-black hover:text-gray-600">
        Pricing
      </Link>
      <Link href="#" className="text-black hover:text-gray-600">
        Contact
      </Link>
      <Link href="/perfil" className="text-black hover:text-gray-600">
        perfil
      </Link>
    </nav>

    <div className="flex items-center space-x-2">
      {cliente.id ? (
        <>
          <span className="text-black font-semibold">{cliente.nome}</span>
          <Link
            href="/dispensa"
            className="px-4 py-2 rounded-md bg-[#d9d9d9] text-black hover:bg-[#e3e3e3] transition-colors"
          >
            Minhas dispensas
          </Link>
          <span
            className="cursor-pointer font-semibold text-black hover:text-gray-600 transition-colors"
            onClick={clienteSair}
          >
            Sair
          </span>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-[#d9d9d9] text-black hover:bg-[#e3e3e3] transition-colors"
          >
            Identifique-se
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-md bg-[#1e1e1e] text-white hover:bg-[#2c2c2c] transition-colors"
          >
            Cadastre-se
          </Link>
        </>
      )}
    </div>
  </div>
</nav>

    )
}