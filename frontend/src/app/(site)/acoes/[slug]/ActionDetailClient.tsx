'use client'

import { useState } from 'react'
import { ArrowLeft, Calendar, FileText, ChevronLeft, ChevronRight, Share2, Info, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ActionDetailClientProps {
    action: any;
    transparency: any;
}

export default function ActionDetailClient({ action, transparency }: ActionDetailClientProps) {
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        const shareData = {
            title: action.title,
            text: action.excerpt,
            url: window.location.href,
        }

        try {
            if (navigator.share) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(window.location.href)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            }
        } catch (err) {
            console.error('Error sharing:', err)
        }
    }

    // Parse gallery JSON and include thumbnail as the first image
    let gallery: string[] = []

    // Add thumbnail as first item if it exists
    if (action.thumbnail && action.thumbnail !== '') {
        gallery.push(action.thumbnail)
    }

    try {
        if (action.gallery) {
            const extraImages = typeof action.gallery === 'string' ? JSON.parse(action.gallery) : action.gallery
            if (Array.isArray(extraImages)) {
                // Add extra images, avoiding duplicating the thumbnail
                extraImages.forEach((img: string) => {
                    if (img && img !== '' && !gallery.includes(img)) {
                        gallery.push(img)
                    }
                })
            }
        }
    } catch (e) {
        console.error("Error parsing gallery:", e)
    }

    // If still empty, use fallback mock image
    if (gallery.length === 0) {
        gallery = ['https://images.unsplash.com/photo-1543599553-294715494d40?q=80&w=1200']
    }

    const nextImage = () => {
        setActiveImageIndex((prev) => (prev + 1) % gallery.length)
    }

    const prevImage = () => {
        setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
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
                        <Button onClick={handleShare} variant="ghost" size="icon" className="rounded-full">
                            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </div>

            <main className="py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Media Gallery Section */}
                        <div className="space-y-6">
                            <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 group cursor-default">
                                <Image
                                    src={gallery[activeImageIndex]}
                                    alt={action.title}
                                    fill
                                    className="object-cover transition-opacity duration-500"
                                />

                                {/* Gallery Nav Buttons */}
                                {gallery.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black cursor-pointer"
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black cursor-pointer"
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </button>

                                        <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                            {activeImageIndex + 1} / {gallery.length}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {gallery.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {gallery.map((img: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={cn(
                                                "relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ring-2 cursor-pointer",
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
                            )}

                            {/* Impact/Transparency Card */}
                            {transparency && (
                                <div className="pt-8">
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
                                            <Link href="/transparencia">
                                                <FileText className="mr-2 h-4 w-4" /> Acessar Transparência
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            )}
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
                                    {action.published_at ? new Date(action.published_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Data indisponível'}
                                </div>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                                <div
                                    className="leading-relaxed font-medium campaign-content"
                                    dangerouslySetInnerHTML={{ __html: action.content || action.excerpt || '' }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <style jsx global>{`
                 .campaign-content p { margin-bottom: 1.5rem; }
                 .campaign-content b, .campaign-content strong { font-weight: 800; }
                 .campaign-content h2, .campaign-content h3 { 
                     font-weight: 900; 
                     text-transform: uppercase; 
                     font-style: italic; 
                     margin-top: 2rem;
                     margin-bottom: 1rem;
                     color: black;
                 }
             `}</style>
        </div>
    )
}
