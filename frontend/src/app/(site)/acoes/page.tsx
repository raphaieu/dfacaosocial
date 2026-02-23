'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, Calendar, LayoutGrid, List, ArrowRight, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Mock Data for Actions
const MOCK_ACTIONS = [
    {
        id: '1',
        title: 'Natal Solidário 2025',
        date: '2025-12-20',
        description: 'Distribuição de 500 cestas básicas e brinquedos para famílias carentes em Salvador.',
        thumbnail: 'https://images.unsplash.com/photo-1543599553-294715494d40?q=80&w=600&h=400&auto=format&fit=crop',
        category: 'Alimentos'
    },
    {
        id: '2',
        title: 'Campanha Volta às Aulas',
        date: '2025-01-15',
        description: 'Entrega de kits escolares completos para crianças de comunidades quilombolas.',
        thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&h=400&auto=format&fit=crop',
        category: 'Educação'
    },
    {
        id: '3',
        title: 'Ação Inverno: Aquecendo Vidas',
        date: '2024-07-10',
        description: 'Distribuição de agasalhos, cobertores e sopas para pessoas em situação de rua.',
        thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&h=400&auto=format&fit=crop',
        category: 'Saúde/Bem-estar'
    },
    {
        id: '4',
        title: 'Dia das Crianças Especial',
        date: '2024-10-12',
        description: 'Uma tarde cheia de brincadeiras, lanches e presentes para 200 crianças.',
        thumbnail: 'https://images.unsplash.com/photo-1472162072142-d544e73eebfb?q=80&w=600&h=400&auto=format&fit=crop',
        category: 'Outros'
    },
    {
        id: '5',
        title: 'Mutirão de Higiene Pessoal',
        date: '2024-05-22',
        description: 'Distribuição de kits de higiene e corte de cabelo gratuito em comunidades.',
        thumbnail: 'https://images.unsplash.com/photo-1574607383476-f517f220d356?q=80&w=600&h=400&auto=format&fit=crop',
        category: 'Higiene'
    },
    {
        id: '6',
        title: 'Sábado do Bem: Almoço Comunitário',
        date: '2024-03-05',
        description: 'Servimos mais de 300 marmitas preparadas com muito carinho por nossos voluntários.',
        thumbnail: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=600&h=400&auto=format&fit=crop',
        category: 'Alimentos'
    }
]

export default function ActionsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [displayedActions, setDisplayedActions] = useState(MOCK_ACTIONS)

    // Filter Logic
    const filteredActions = useMemo(() => {
        return MOCK_ACTIONS.filter(action =>
            action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            action.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [searchQuery])

    // Mock Lazy Loading
    const loadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            // In a real app, we would append more data here
        }, 1200)
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
                        {filteredActions.map((action) => (
                            <Link key={action.id} href={`/acoes/${action.id}`}>
                                <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-[32px] h-full bg-white">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={action.thumbnail}
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
                                            {new Date(action.date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <CardTitle className="text-xl font-black uppercase italic tracking-tight group-hover:text-primary transition-colors">
                                            {action.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-6 pb-6 mt-auto">
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium">
                                            {action.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-black font-black uppercase tracking-[0.2em] text-[10px] italic">
                                            Ver Detalhes <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {filteredActions.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-gray-400 text-xl font-medium italic">Nenhuma ação encontrada para sua busca.</p>
                        </div>
                    )}

                    {/* Infinite Scroll Trigger Mock */}
                    {filteredActions.length > 0 && (
                        <div className="mt-16 text-center">
                            <Button
                                onClick={loadMore}
                                disabled={loading}
                                variant="ghost"
                                className="font-black uppercase tracking-widest text-xs italic hover:bg-primary/10 py-8 px-12 rounded-3xl"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando...
                                    </>
                                ) : (
                                    "Carregar mais ações"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
