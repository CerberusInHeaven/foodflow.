import { DispensaItf } from "./DispensaItf"

export interface AlimentosItf {
    perecivel: any
    id: number
    nome: string
    peso: number
    dispensaId: number
    dispensa: DispensaItf
}