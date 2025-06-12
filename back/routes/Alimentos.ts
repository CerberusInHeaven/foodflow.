import { Pereciveis, PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: 'event',
//       level: 'query',
//     },
//     {
//       emit: 'stdout',
//       level: 'error',
//     },
//     {
//       emit: 'stdout',
//       level: 'info',
//     },
//     {
//       emit: 'stdout',
//       level: 'warn',
//     },
//   ],
// })

// prisma.$on('query', (e) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

const router = Router()

const alimentoSchema = z.object({
nome: z.string().min(2,
    { message: "artefato deve possuir, no mínimo, 2 caracteres" }),
peso: z.number(),
perecivel: z.nativeEnum(Pereciveis).optional()

 
})

router.get("/", async (req, res) => {
  try {
    const alimentos = await prisma.alimentos.findMany({
    
    })
    res.status(200).json(alimentos)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = alimentoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome, peso, perecivel = 'SIM',} = valida.data

  try {
    const carro = await prisma.alimentos.create({
      data: {
        nome, peso, perecivel
      }
    })
    res.status(201).json(carro)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const carro = await prisma.alimentos.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})





export default router
