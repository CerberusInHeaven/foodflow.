'use client'

import { useState } from 'react';
import Modal from './modal';
import {useForm} from "react-hook-form"


type inputs = {
  nome: string
  peso: number
  
}



export default function ItemModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<inputs>()    
 

  

  async function tryinput(data: inputs) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/alimentos`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ nome: data.nome, peso: data.peso }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao enviar:", errorData);
      } else {
        console.log("Item enviado com sucesso!");
      }
    } catch (error) {
      console.error("Erro de rede ou outra falha:", error);
    }
  }
  


return (
    <>
    
      <button className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium"onClick={() => setIsOpen(true)}>Adicione um item</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        
    <form onSubmit={handleSubmit(tryinput)}>
      <label className="block text-sm font-medium text-gray-700">
        Nome do alimento
      </label>
      <input
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        id='nome'
        type='text'
        required {...register('nome')}
      />
      <label className="block text-sm font-medium text-gray-700">
        Qtd\Kg
      </label>
      <input
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        id='peso'
        type='number'
        required {...register('peso')}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Enviar item
      </button>
    </form>
      </Modal>
     
    </>
  );
}
