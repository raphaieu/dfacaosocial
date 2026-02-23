'use client'

import { useState } from 'react'
import { ArrowLeft, Calendar, FileText, ChevronLeft, ChevronRight, Share2, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

// Enhanced Mock Data for Details
const MOCK_ACTIONS = {
    '1': {
        title: 'Natal Solidário 2025',
        date: '2025-12-20',
        description: 'O Natal Solidário de 2025 foi um marco para a D.F. Ação Social. Conseguimos reunir doações de diversas empresas e pessoas físicas para compor 500 cestas básicas repletas de itens de qualidade. Além disso, arrecadamos mais de 800 brinquedos, garantindo que cada criança das comunidades atendidas recebesse um presente. O evento contou com a participação de 40 voluntários que ajudaram na logística de entrega e na organização de uma pequena ceia comunitária em Itapuã.',
        transparencyLink: 'https://transparencia.dfacaosocial.org.br/natal-2025',
        category: 'Alimentos',
        gallery: [
            'https://images.unsplash.com/photo-1543599553-294715494d40?q=80&w=1200',
            'https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1200',
            'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200',
            'https://images.unsplash.com/photo-1481132821982-59e9d770ad15?q=80&w=1200'
        ]
    },
    // Fallback for other IDs (using generic data)
    'default': {
        title: 'Ação Social D.F.',
        date: '2025-01-01',
        description: 'Esta é uma ação social realizada pela nossa instituição para impactar positivamente a vida de centenas de famílias. Através do voluntariado e de doações, conseguimos levar esperança e recursos para quem mais precisa.',
        transparencyLink: '#',
        category: 'Geral',
        gallery: [
            'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200',
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200',
            'https://images.unsplash.com/photo-1472162072142-d544e73eebfb?q=80&w=1200'
        ]
    }
}

export default function ActionDetailPage() {
    const params = useParams()
    const id = params.id as string
    const action = MOCK_ACTIONS[id as keyof typeof MOCK_ACTIONS] || MOCK_ACTIONS.default

    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % action.gallery.length)
    }

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + action.gallery.length) % action.gallery.length)
    }

    return (
        <div className="pt-14 md:pt-16 min-h-screen bg-white">
            {/* Navigation/Header Bar */}
            <div className="bg-gray-50 border-b border-gray-100 py-4">
                <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
                    <Button asChild variant="ghost" className="text-gray-500 hover:text-black font-bold uppercase tracking-widest text-[10px]">
                        <Link href="/acoes" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Voltar para Ações
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <main className="py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Media Gallery Section */}
                        <div className="space-y-6">
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 group">
                                <Image
                                    src={action.gallery[activeImageIndex]}
                                    alt={action.title}
                                    fill
                                    className="object-cover transition-opacity duration-500"
                                />

                                {/* Gallery Nav Buttons */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>

                                <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                    {activeImageIndex + 1} / {action.gallery.length}
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-4">
                                {action.gallery.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={cn(
                                            "relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ring-2",
                                            activeImageIndex === idx ? "ring-primary scale-95" : "ring-transparent hover:ring-gray-300"
                                        )}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col">
                            <div className="mb-8">
                                <span className="inline-block bg-primary text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6 italic">
                                    {action.category}
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter mb-4 leading-none">
                                    {action.title}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-xs">
                                    <Calendar className="h-4 w-4 text-primary" />
                                    {new Date(action.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                                <p className="leading-relaxed font-medium">
                                    {action.description}
                                </p>
                            </div>

                            {/* Impact/Transparency Card */}
                            <div className="mt-auto space-y-6">
                                <div className="bg-gray-50 border border-gray-100 p-8 rounded-[40px] shadow-sm">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-primary/20 p-3 rounded-2xl">
                                            <Info className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-black uppercase tracking-tight italic text-lg mb-1">Impacto e Transparência</h3>
                                            <p className="text-sm text-gray-500 font-medium">Veja todos os recibos, notas fiscais e relatórios desta ação.</p>
                                        </div>
                                    </div>

                                    <Button asChild className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-2xl font-black uppercase tracking-widest text-xs italic">
                                        <Link href={action.transparencyLink} target="_blank">
                                            <FileText className="mr-2 h-4 w-4" /> Acessar Transparência
                                        </Link>
                                    </Button>
                                </div>

                                <p className="text-center text-xs text-gray-400 italic font-medium">
                                    Esta galeria será integrada ao Google Drive na V2 da plataforma.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}
