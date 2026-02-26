'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, Calendar, LayoutGrid, List, ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function ActionsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [actions, setActions] = useState<any[]>([])

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
                if (response.ok) {
                    const data = await response.json()
                    setActions(data)
                }
            } catch (error) {
                console.error('Error fetching actions:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchActions()
    }, [])

    // Filter Logic
    const filteredActions = useMemo(() => {
        return actions.filter(action =>
            action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (action.category && action.category.toLowerCase().includes(searchQuery.toLowerCase()))
        ).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    }, [searchQuery, actions])

    const loadMore = () => {
        // Mock Lazy Loading logic if needed
    }

    return (
        <div className="pt-14 md:pt-16 min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <section className="bg-black py-16 text-white relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                            Nossas <span className="text-primary italic">Ações</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-medium italic">
                            Confira o impacto de cada doação e voluntariado transformado em realidade.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 bg-white border-b border-gray-100 shadow-sm sticky top-14 md:top-16 z-30">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="Pesquisar por nome ou categoria..."
                                className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-primary focus:border-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button className="h-12 px-6 rounded-xl bg-black text-white hover:bg-gray-800 font-bold uppercase tracking-widest text-xs">
                            <Filter className="mr-2 h-4 w-4" /> Todos os Filtros
                        </Button>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {loading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20">
                                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">Buscando ações...</p>
                            </div>
                        ) : filteredActions.map((action) => (
                            <Link key={action.id} href={`/acoes/${action.slug}`}>
                                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-[32px] h-full bg-white flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={action.thumbnail || 'https://images.unsplash.com/photo-1543599553-294715494d40?q=80&w=800'}
                                            alt={action.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-primary text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                                {action.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="p-6">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {action.published_at ? new Date(action.published_at).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Data indisponível'}
                                        </div>
                                        <CardTitle className="text-xl font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">
                                            {action.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-6 pb-6 mt-auto flex flex-col">
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium italic">
                                            {action.excerpt || action.description || 'Sem resumo disponível.'}
                                        </p>
                                        <div className="flex items-center gap-2 text-black font-black uppercase tracking-[0.2em] text-[10px] italic">
                                            Ver Detalhes <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {!loading && filteredActions.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-gray-400 text-xl font-medium italic">Nenhuma ação encontrada para sua busca.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
