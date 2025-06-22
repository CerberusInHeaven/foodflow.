import { Pereciveis, PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()


const router = Router()

const alimentoSchema = z.object({
  id  : z.number().optional(),
  nome: z.string().min(2,
    { message: "artefato deve possuir, no mínimo, 2 caracteres" }),
peso: z.number(),
perecivel: z.nativeEnum(Pereciveis).optional(),
dispensaId: z.number()
 
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

router.get("/dispensa/:dispensaId/alimentos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const alimento = await prisma.alimentos.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(alimento);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alimento" });
  }
});

router.post("/dispensa/:dispensaId/alimentos", async (req, res) => {

  const valida = alimentoSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  const { nome, peso, perecivel = 'NÃO', dispensaId} = valida.data

try {
  const carro = await prisma.alimentos.create({
    data: {
      nome, 
      peso, 
      perecivel,
      dispensa: { // add this property
        connect: {
          id: dispensaId, // replace with the actual dispensa id
        },
      },
    },
  })
  res.status(201).json(carro)
} catch (error) {
  res.status(400).json({ error })
}
})

router.patch("/dispensa/:dispensaId/alimentos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, peso, perecivel } = req.body;

  try {
    const alimentoAtualizado = await prisma.alimentos.update({
      where: { id: Number(id) },
      data: {
        nome,
        peso,
        perecivel,
      },
    });

    res.status(200).json(alimentoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar alimento:", error);
    res.status(500).json({ error: "Erro ao atualizar alimento." });
  }
});

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
