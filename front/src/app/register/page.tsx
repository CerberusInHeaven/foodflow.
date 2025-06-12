"use client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useClienteStore } from "@/app/context/ClienteContext"
import { useRouter } from "next/navigation"

type Inputs = {
    nome: string
    email: string
    senha: string
    manter: boolean
}

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()    
    const { logaCliente } = useClienteStore()

    const router = useRouter()

    async function verificaLogin(data: Inputs) {
        // alert(`${data.email} ${data.senha} ${data.manter}`)
        const response = await 
          fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`, {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify({ nome: data.nome, email: data.email, senha: data.senha })
          })
        
        if (response.status == 200) {
           
            const dados = await response.json()

        } else {
            toast.error("Erro...")
        }
        router.push("/")
    }

    return (
       <div
  className="min-h-screen relative"
  style={{
    backgroundImage: "url(/pattern.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
  }}
>
  {/* Semi-transparent overlay */}
  <div className="absolute inset-0 bg-white/80" />

  {/* Login form container */}
  <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
    <div className="w-full max-w-sm space-y-6 bg-white/90 p-8 rounded-lg backdrop-blur-sm">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#2c2c2c] mb-8">Dados de Acesso do Cliente</h1>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit(verificaLogin)}>
        {/* Email */}
        
         <div className="space-y-2">
          <label htmlFor="text" className="block text-[#2c2c2c] font-medium">
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu e-mail"
            required
            {...register("nome")}
            className="w-full bg-[#f5f5f5] border border-[#b3b3b3] text-[#757575] placeholder:text-[#757575] rounded-md h-12 px-3 focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-[#2c2c2c] font-medium">
            Seu e-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            required
            {...register("email")}
            className="w-full bg-[#f5f5f5] border border-[#b3b3b3] text-[#757575] placeholder:text-[#757575] rounded-md h-12 px-3 focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-transparent"
          />
        </div>

        {/* Senha */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-[#2c2c2c] font-medium">
            Senha de Acesso
          </label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            required
            {...register("senha")}
            className="w-full bg-[#f5f5f5] border border-[#b3b3b3] text-[#757575] placeholder:text-[#757575] rounded-md h-12 px-3 focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:border-transparent"
          />
        </div>

        {/* Manter Conectado + Esqueceu a senha */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 text-[#2c2c2c]">
            <input
              id="remember"
              type="checkbox"
              {...register("manter")}
              className="w-4 h-4 border border-[#b3b3b3] rounded bg-[#f5f5f5] focus:ring-2 focus:ring-[#40E0D0]"
            />
            <span>Manter Conectado</span>
          </label>
          <a href="#" className="text-[#2c2c2c] hover:underline">
            Esqueceu sua senha?
          </a>
        </div>

        {/* Botão de Login */}
        <button
          type="submit"
          className="w-full bg-[#303030] hover:bg-[#1e1e1e] text-white font-medium h-12 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#40E0D0] focus:ring-offset-2"
        >
          Entrar
        </button>

        {/* Link de cadastro */}
        <p className="text-sm text-center text-[#757575]">
          Ainda não possui conta?{" "}
          <a href="#" className="font-medium text-[#2c2c2c] hover:underline">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  </div>
</div>

    )
}
