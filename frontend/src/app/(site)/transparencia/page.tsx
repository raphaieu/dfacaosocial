'use client'

import { useState, useEffect } from 'react'
import { FileText, Download, Calendar, DollarSign, Package, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function TransparencyPage() {
    const [loading, setLoading] = useState(true)
    const [transparencies, setTransparencies] = useState<any[]>([])

    useEffect(() => {
        const fetchTransparencies = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transparencies`)
                if (response.ok) {
                    const data = await response.json()
                    setTransparencies(data)
                }
            } catch (error) {
                console.error('Error fetching transparencies:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTransparencies()
    }, [])

    return (
        <div className="pt-14 md:pt-16 min-h-screen bg-gray-50 pb-20">
            <section className="bg-black py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                        Portal da <span className="text-primary italic">Transparência</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Prestação de contas detalhada de cada real e recurso arrecadado em nossas campanhas.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : transparencies.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border shadow-sm">
                            <FileText className="h-16 w-16 mx-auto text-gray-200 mb-4" />
                            <p className="text-gray-500 font-medium italic">Nenhum relatório de transparência publicado ainda.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {transparencies.map((t) => (
                                <Card key={t.id} className="overflow-hidden border-none shadow-lg rounded-3xl bg-white">
                                    <CardHeader className="p-8 border-b border-gray-50">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge className="bg-primary text-black hover:bg-primary font-bold">
                                                        {t.campaign_title || 'Ação Geral'}
                                                    </Badge>
                                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(t.date_reported).toLocaleDateString('pt-BR')}
                                                    </span>
                                                </div>
                                                <CardTitle className="text-2xl font-black uppercase italic tracking-tight">
                                                    {t.title}
                                                </CardTitle>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-100 text-center">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-1">Arrecadado</p>
                                                    <p className="text-xl font-black text-green-700">
                                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount_collected)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <div className="grid md:grid-cols-2 gap-12">
                                            <div>
                                                <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-4 flex items-center gap-2">
                                                    <FileText className="h-3.5 w-3.5" /> Descrição do Impacto
                                                </h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {t.description}
                                                </p>

                                                {t.resources_collected && (
                                                    <div className="mt-6">
                                                        <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-3 flex items-center gap-2">
                                                            <Package className="h-3.5 w-3.5" /> Recursos Físicos
                                                        </h4>
                                                        <p className="text-gray-700 font-medium">
                                                            {t.resources_collected}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-4">Comprovantes e Anexos</h4>
                                                {t.files && t.files.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {t.files.map((file: any) => (
                                                            <a
                                                                key={file.id}
                                                                href={file.file_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-primary/5 hover:border-primary/20 transition-all group"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100">
                                                                        <FileText className="h-5 w-5 text-gray-400" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-bold text-gray-800 line-clamp-1">{file.file_name || 'Documento'}</p>
                                                                        <p className="text-[10px] text-gray-400 uppercase font-black">{file.file_type || 'PDF'}</p>
                                                                    </div>
                                                                </div>
                                                                <Download className="h-4 w-4 text-gray-300 group-hover:text-primary" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-400 text-sm italic">Nenhum anexo disponível para este relatório.</p>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
