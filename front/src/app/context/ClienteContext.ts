import { ClienteItf } from '../utils/types/ClienteItf'
import { create } from 'zustand'

type ClienteStore = {
    cliente: ClienteItf
    logaCliente: (clienteLogado: ClienteItf) => void
    deslogaCliente: () => void
}

export const useClienteStore = create<ClienteStore>((set) => ({
    cliente: {} as ClienteItf,
    logaCliente: (clienteLogado) => set({cliente: clienteLogado}),
    deslogaCliente: () => set({cliente: {} as ClienteItf})
}))