import Link from "next/link";
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export function footerzinho() {
    const socialLinks = [
        { href: "#", icon: Twitter, name: "Twitter" },
        { href: "#", icon: Instagram, name: "Instagram" },
        { href: "#", icon: Youtube, name: "YouTube" },
        { href: "#", icon: Linkedin, name: "LinkedIn" },
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Seção principal com logo e links essenciais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
                    {/* Coluna 1 Logo e Descrição */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center space-x-3">
                            <img src="./horde.png" className="h-10 w-auto" alt="Logo foodflow" />
                            <span className="text-xl font-bold text-gray-800">
                                foodflow
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-gray-600">
                            Sua plataforma de gestão de propostas e clientes.
                        </p>
                    </div>

                    {/* Coluna do footer 2 */}
                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Desenvolvido por</h3>
                            <ul className="space-y-3">
                                <li><img src="" alt="" /><Link href="/sobre" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sobre Nós</Link></li>
                            
                            </ul>
                        </div>
                        
                    </div>
                </div>

               
                <div className="flex flex-col sm:flex-row items-center **justify-center sm:justify-between** py-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2 sm:mb-0 text-center sm:text-left">© {new Date().getFullYear()} foodflow. Todos os direitos reservados.</p>
                    <div className="flex space-x-5">
                        {socialLinks.map(social => (
                            <Link key={social.name} href={social.href} className="text-gray-500 hover:text-gray-900 transition-colors">
                                <social.icon size={20} /><span className="sr-only">{social.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}