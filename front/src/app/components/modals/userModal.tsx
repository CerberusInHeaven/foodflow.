'use client';

import { useEffect, useState } from 'react';
import Modal from './modal';
import { ClienteItf } from '@/app/utils/types/ClienteItf';



export default function UserModal(cliente: ClienteItf) {
    const [isOpen, setIsOpen] = useState(false);
    const [clientes, setClientes] = useState<ClienteItf[]>([]);

    const getInitial = (name: string | undefined): string => {
        return name?.charAt(0).toUpperCase() || 'U'
    }
    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`)
            .then(res => res.json())
            .then(data => setClientes(data))

    }, [])

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <>
            <button className="px-4 py-2 bg-[#2c2c2c] text-[#ffffff] rounded-md hover:bg-[#1e1e1e] font-medium" onClick={() => setIsOpen(true)}>Criar sua Dispensa</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

                <div className="flex flex-col gap-6 mb-6">
                    {clientes.map((cliente: ClienteItf) => (
                        <><div key={cliente?.id} className="md:col-span-1 flex">
                            <div className="w-40 h-40 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                                <span className="text-6xl font-bold text-white select-none">
                                    {getInitial(cliente?.nome)}
                                </span>
                            </div>
                        </div><div className="md:col-span-3 space-y-6 text-center md:text-left">
                                <div className="space-y-2">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                        {cliente?.nome || 'Nome do Usuário'}
                                    </h1>
                                </div>
                            </div></>

                    ))}
                    <div className="md:col-span-1 flex">
                        <div className="w-40 h-40 bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                            <span className="text-6xl font-bold text-white select-none">
                                {getInitial(cliente?.id)}
                            </span>
                        </div>
                    </div>
                    <div className="md:col-span-3 space-y-6 text-center md:text-left">
                        <div className="space-y-2">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                {cliente?.id || 'Nome do Usuário'}
                            </h1>
                        </div>
                    </div>

                </div>

            </Modal >
        </>
    );
}
