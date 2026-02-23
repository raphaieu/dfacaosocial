'use client'

import { useState } from 'react'
import {
    Heart,
    Copy,
    Check,
    Apple,
    BookOpen,
    ShowerHead,
    Users,
    Share2,
    MapPin,
    ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const PIX_KEY = 'd.f.acaosocial@gmail.com'

const donationTypes = [
    {
        title: "Doando Alimentos Não Perecíveis",
        description: "Sua doação ajuda a compor cestas básicas para famílias em situação de vulnerabilidade.",
        icon: Apple,
        color: "bg-orange-500",
    },
    {
        title: "Doando Material Escolar",
        description: "Contribua para o futuro de nossas crianças fornecendo os itens necessários para o estudo.",
        icon: BookOpen,
        color: "bg-blue-500",
    },
    {
        title: "Doando Itens de Higiene",
        description: "Kits de higiene são essenciais para manter a dignidade e saúde de quem mais precisa.",
        icon: ShowerHead,
        color: "bg-cyan-500",
    },
    {
        title: "Doando seu tempo sendo voluntário",
        description: "Sua força de trabalho e seu carinho são as doações mais valiosas que podemos receber.",
        icon: Users,
        color: "bg-purple-500",
        link: "/contato"
    },
    {
        title: "Compartilhando e divulgando",
        description: "Ajude nossas ações a alcançarem mais pessoas compartilhando nosso trabalho nas redes sociais.",
        icon: Share2,
        color: "bg-pink-500",
    }
]

const collectionPoints = [
    "Itapuã", "Piatã", "Stella Maris", "Lauro de Freitas",
    "Cajazeiras", "Pituba", "Vila Laura", "São Rafael"
]

export default function DonatePage() {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(PIX_KEY)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="pt-14 md:pt-16 pb-20">
            {/* Hero Section - Enhanced Black Header with Vibrant Glow */}
            <section className="bg-black py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    {/* Top Left Glow */}
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />

                    {/* Bottom Right Glow */}
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />

                    {/* Subtle Center Glow for Depth */}
                    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-primary text-sm md:text-base font-black uppercase tracking-[0.3em] mb-6 italic">
                        Como Doar / Apoiar
                    </h1>

                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 text-white leading-tight max-w-4xl mx-auto">
                        SUA CONTRIBUIÇÃO É MUITO IMPORTANTE, <br className="hidden md:block" />
                        <span className="text-primary">SEJA UM VOLUNTÁRIO</span>.
                    </h2>

                    <div className="h-1.5 w-24 bg-primary mx-auto mb-8" />

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium italic italic">
                        "Ajudar é o maior presente que podemos receber."
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Financial Donation Section */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-gray-50 p-8 rounded-[40px] border-2 border-primary/20 sticky top-24">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
                                    <span className="text-primary italic">#</span> Doação Financeira
                                </h2>

                                <p className="text-gray-600 mb-8 font-medium">
                                    A forma mais rápida de ajudar nossas ações emergenciais é através do PIX.
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-white p-6 rounded-3xl border border-gray-200 text-center shadow-sm">
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Chave PIX (E-mail)</p>
                                        <p className="text-lg font-bold text-gray-900 break-all mb-4">{PIX_KEY}</p>

                                        <Button
                                            onClick={copyToClipboard}
                                            className={cn(
                                                "w-full h-12 font-black uppercase tracking-widest transition-all",
                                                copied ? "bg-green-500 hover:bg-green-600" : "bg-primary text-black"
                                            )}
                                        >
                                            {copied ? (
                                                <><Check className="mr-2 h-4 w-4" /> Copiado!</>
                                            ) : (
                                                <><Copy className="mr-2 h-4 w-4" /> Copiar Chave</>
                                            )}
                                        </Button>
                                    </div>

                                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                        <p className="text-sm text-gray-500 italic">
                                            * Em breve teremos integração direta com cartão, boleto e pix via Mercado Pago.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <h3 className="text-xl font-bold uppercase italic tracking-tight mb-6 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" /> Pontos de Doação
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {collectionPoints.map((point) => (
                                            <div
                                                key={point}
                                                className="bg-white px-4 py-2 rounded-xl text-sm font-bold border border-gray-100 flex items-center gap-2 shadow-sm"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {point}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-sm text-gray-500 italic font-medium">
                                        Entre em contato para saber o endereço exato do ponto mais próximo de você.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Other Ways to Help */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                                    Outras 05 formas de contribuir
                                </h2>

                                <div className="grid gap-8">
                                    {donationTypes.map((type, index) => (
                                        <Card key={index} className="overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group rounded-[32px] bg-white">
                                            <CardContent className="p-0">
                                                <div className="flex flex-col md:flex-row items-center md:items-stretch">
                                                    <div className="w-full md:w-48 flex items-center justify-center p-8">
                                                        <div className={cn(
                                                            "w-24 h-24 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg",
                                                            type.color
                                                        )}>
                                                            <type.icon className="h-10 w-10 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 p-8 md:p-10 text-center md:text-left">
                                                        <div className="mb-3">
                                                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight italic leading-tight">
                                                                {type.title}
                                                            </h3>
                                                        </div>
                                                        <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                                            {type.description}
                                                        </p>
                                                        {type.link && (
                                                            <Button asChild variant="link" className="px-0 mt-6 text-orange-600 hover:text-orange-700 h-auto font-black uppercase tracking-[0.2em] text-sm italic group/link">
                                                                <Link href={type.link} className="flex items-center gap-2 mx-auto md:mx-0">
                                                                    Quero participar <ArrowRight className="h-4 w-4 group-hover/link:translate-x-2 transition-transform" />
                                                                </Link>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
