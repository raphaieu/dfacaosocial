import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
                    <Link href="/">
                        <Image
                            src="/images/logo-white.svg"
                            alt="D.F. Ação Social"
                            width={150}
                            height={50}
                            className="h-12 w-auto"
                        />
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        D.F. Ação Social é uma organização sem fins lucrativos dedicada a transformar vidas através de ações sociais de impacto.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-primary transition-colors">
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            <Facebook className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-bold mb-6 text-primary">Links Rápidos</h3>
                    <ul className="flex flex-col gap-4 text-sm text-gray-400">
                        <li><Link href="/sobre-nos" className="hover:text-white transition-colors">Quem Somos</Link></li>
                        <li><Link href="/acoes" className="hover:text-white transition-colors">Nossas Ações</Link></li>
                        <li><Link href="/como-doar" className="hover:text-white transition-colors">Como Doar</Link></li>
                        <li><Link href="/transparencia" className="hover:text-white transition-colors">Transparência</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-bold mb-6 text-primary">Contato</h3>
                    <ul className="flex flex-col gap-4 text-sm text-gray-400">
                        <li className="flex gap-3">
                            <Phone className="h-4 w-4 text-primary shrink-0" />
                            <span>(61) 98765-4321</span>
                        </li>
                        <li className="flex gap-3">
                            <Mail className="h-4 w-4 text-primary shrink-0" />
                            <span>contato@dfacaosocial.org.br</span>
                        </li>
                        <li className="flex gap-3">
                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                            <span>Brasília, DF - Brasil</span>
                        </li>
                    </ul>
                </div>

                {/* Newsletter / CTA */}
                <div>
                    <h3 className="text-lg font-bold mb-6 text-primary">Apoie nossa causa</h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Sua contribuição faz a diferença. Junte-se a nós nessa jornada.
                    </p>
                    <Link
                        href="/como-doar"
                        className="inline-block bg-primary text-black px-6 py-3 rounded-md font-bold text-sm hover:bg-primary/90 transition-all uppercase"
                    >
                        Seja um Doador
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-500 text-xs text-balance">
                    © {new Date().getFullYear()} D.F. Ação Social. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    )
}
