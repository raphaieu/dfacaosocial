'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Utensils, TrendingUp, Loader2 } from "lucide-react"

export default function AdminPage() {
    const [stats, setStats] = useState({
        volunteers: 0,
        campaigns: 0,
        loading: true
    })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [campaignsRes, contactsRes] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`)
                ])

                if (campaignsRes.ok && contactsRes.ok) {
                    const campaigns = await campaignsRes.json()
                    const contacts = await contactsRes.json()

                    const volunteersCount = contacts.filter((c: any) => c.is_volunteer).length

                    setStats({
                        volunteers: volunteersCount,
                        campaigns: campaigns.length,
                        loading: false
                    })
                }
            } catch (error) {
                console.error("Error fetching stats:", error)
                setStats(s => ({ ...s, loading: false }))
            }
        }

        fetchStats()
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">Bem-vindo, <span className="text-primary">Administrador</span></h1>
                <p className="text-gray-500 font-medium italic text-sm">Aqui está o resumo das atividades em tempo real da D.F. Ação Social.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-400">Voluntários Cadastrados</CardTitle>
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic">
                            {stats.loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.volunteers}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 mt-1">Interessados via site</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-400">Ações Publicadas</CardTitle>
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Heart className="h-4 w-4 text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic">
                            {stats.loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.campaigns}
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-gray-400 mt-1">Impactando comunidades</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-400">Refeições Dadas</CardTitle>
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Utensils className="h-4 w-4 text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic">12.450</div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-green-500 mt-1">Histórico da organização</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-400">Crescimento Social</CardTitle>
                        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-black" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic">+24%</div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-primary mt-1">Engajamento orgânico</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-none shadow-lg rounded-[32px] overflow-hidden bg-white col-span-1">
                    <CardHeader className="border-b border-gray-50 pb-6">
                        <CardTitle className="text-lg font-black uppercase italic tracking-tight">Status do Sistema</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-green-50 flex items-center justify-center border border-green-100">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold uppercase tracking-tight">API Backend</p>
                                    <p className="text-xs text-gray-400 italic">Operacional em PHP Slim</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100">
                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold uppercase tracking-tight">Integração Supabase</p>
                                    <p className="text-xs text-gray-400 italic">Bucket 'media' ativo</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-lg rounded-[32px] overflow-hidden bg-primary/5 border-2 border-primary/10 col-span-1">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase italic tracking-tight">Painel de Acesso Rápido</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 font-medium italic">Seu sistema está conectado ao banco de dados PostgreSQL. Todas as métricas de voluntários e campanhas acima já refletem dados reais.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
