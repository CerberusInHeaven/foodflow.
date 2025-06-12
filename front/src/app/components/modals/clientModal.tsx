'use client';

import { useState } from 'react';
import Modal from './modal';

export default function ClientModal() {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <button className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium"onClick={() => setIsOpen(true)}>Criar sua Instancia</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nome do alimento
          </label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          <label className="block text-sm font-medium text-gray-700">
            Qtd\Kg
          </label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enviar item
        </button>
      </Modal>
    </>
  );
}
