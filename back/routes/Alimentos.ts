import { Pereciveis, PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()


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

router.get("/dispensa/:dispensaId/alimentos", async (req, res) => {
  const { dispensaId } = req.params;

  try {
    const alimentos = await prisma.alimentos.findMany({
      where: {
        dispensaId: Number(dispensaId),
      },
    });
    res.status(200).json(alimentos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alimentos da dispensa" });
  }
});

router.post("/", async (req, res) => {

  const valida = alimentoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome, peso, perecivel = 'NÃO',} = valida.data

try {
  const carro = await prisma.alimentos.create({
    data: {
      nome, 
      peso, 
      perecivel,
      dispensa: { // add this property
        connect: {
          id: 1, // replace with the actual dispensa id
        },
      },
    },
  })
  res.status(201).json(carro)
} catch (error) {
  res.status(400).json({ error })
}
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params

  const valida = alimentoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const carro = await prisma.alimentos.update({
      where: { id: Number(id) },
      data: valida.data
    })
    res.status(200).json(carro)
  } catch (error) {
    res.status(400).json({ erro: error })
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
