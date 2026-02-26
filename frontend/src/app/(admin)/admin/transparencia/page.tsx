'use client'

import { useState, useEffect } from 'react'
import { FileText, Plus, Search, Calendar, DollarSign, Loader2, Save, Trash2, Link as LinkIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function TransparencyAdminPage() {
    const [loading, setLoading] = useState(true)
    const [transparencies, setTransparencies] = useState<any[]>([])
    const [campaigns, setCampaigns] = useState<any[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        campaign_id: '',
        title: '',
        description: '',
        amount_collected: '0',
        resources_collected: '',
        date_reported: new Date().toISOString().split('T')[0]
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [transResponse, campResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/transparencies`),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
                ])

                if (transResponse.ok) setTransparencies(await transResponse.json())
                if (campResponse.ok) setCampaigns(await campResponse.json())
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transparencies`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    amount_collected: parseFloat(formData.amount_collected),
                    campaign_id: formData.campaign_id ? parseInt(formData.campaign_id) : null
                })
            })

            if (response.ok) {
                // Refresh list
                const transResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transparencies`)
                if (transResponse.ok) setTransparencies(await transResponse.json())
                setIsDialogOpen(false)
                setFormData({
                    campaign_id: '',
                    title: '',
                    description: '',
                    amount_collected: '0',
                    resources_collected: '',
                    date_reported: new Date().toISOString().split('T')[0]
                })
            }
        } catch (error) {
            console.error('Error creating transparency:', error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">Gestão de <span className="text-primary">Transparência</span></h1>
                    <p className="text-gray-500">Publique prestações de contas e anexos.</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-black text-white hover:bg-gray-800 rounded-2xl px-6 h-12 font-bold uppercase tracking-widest text-xs">
                            <Plus className="mr-2 h-4 w-4" /> Novo Relatório
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-[32px]">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black uppercase italic italic">Novo Relatório</DialogTitle>
                                <DialogDescription>Preencha as informações para a prestação de contas.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Campanha Relacionada</label>
                                        <Select onValueChange={(val) => setFormData({ ...formData, campaign_id: val })}>
                                            <SelectTrigger className="rounded-xl border-gray-200">
                                                <SelectValue placeholder="Selecione uma campanha" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">Ação Geral (Nenhuma)</SelectItem>
                                                {campaigns.map(c => (
                                                    <SelectItem key={c.id} value={c.id.toString()}>{c.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Data do Relatório</label>
                                        <Input
                                            type="date"
                                            value={formData.date_reported}
                                            onChange={(e) => setFormData({ ...formData, date_reported: e.target.value })}
                                            className="rounded-xl border-gray-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Título do Relatório</label>
                                    <Input
                                        placeholder="Ex: Resumo Final de Arrecadação"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="rounded-xl border-gray-200"
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Valor Arrecadado (R$)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                type="number"
                                                step="0.01"
                                                value={formData.amount_collected}
                                                onChange={(e) => setFormData({ ...formData, amount_collected: e.target.value })}
                                                className="pl-10 rounded-xl border-gray-200"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Outros Recursos (Kilos, Peças, etc)</label>
                                        <Input
                                            placeholder="Ex: 500kg de alimentos"
                                            value={formData.resources_collected}
                                            onChange={(e) => setFormData({ ...formData, resources_collected: e.target.value })}
                                            className="rounded-xl border-gray-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Descrição / Resumo</label>
                                    <Textarea
                                        placeholder="Descreva o que foi feito com os recursos..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="rounded-xl border-gray-200 min-h-[100px]"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-primary text-black hover:bg-primary/80 font-black uppercase tracking-[0.2em] rounded-2xl w-full h-12"
                                >
                                    {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save className="mr-2 h-4 w-4" /> Salvar Relatório</>}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : transparencies.length === 0 ? (
                    <Card className="border-none shadow-sm rounded-3xl p-12 text-center">
                        <FileText className="h-16 w-16 mx-auto text-gray-100 mb-4" />
                        <p className="text-gray-400">Nenhum relatório publicado.</p>
                    </Card>
                ) : (
                    transparencies.map((t) => (
                        <Card key={t.id} className="border-none shadow-lg rounded-[32px] overflow-hidden bg-white">
                            <CardContent className="p-8">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Badge className="bg-primary/10 text-primary border-none font-bold">
                                                {t.campaign_title || 'Geral'}
                                            </Badge>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" /> {new Date(t.date_reported).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black uppercase italic tracking-tight">{t.title}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 italic">{t.description}</p>

                                        <div className="flex flex-wrap gap-4">
                                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                                <DollarSign className="h-3 w-3 text-green-500" />
                                                <span className="text-xs font-bold text-gray-700">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount_collected)}</span>
                                            </div>
                                            {t.resources_collected && (
                                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                                    <span className="text-xs font-bold text-gray-700">{t.resources_collected}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-[200px]">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Anexos ({t.files?.length || 0})</h4>
                                        <div className="space-y-2">
                                            {t.files?.map((f: any) => (
                                                <div key={f.id} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded-lg border border-gray-100">
                                                    <span className="truncate max-w-[120px] font-medium">{f.file_name || 'Documento'}</span>
                                                    <LinkIcon className="h-3 w-3 text-gray-300" />
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest h-8 rounded-lg border-dashed">
                                                + Adicionar link
                                            </Button>
                                        </div>
                                        <div className="pt-4 mt-auto flex gap-2">
                                            <Button variant="ghost" size="sm" className="flex-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl">
                                                <Trash2 className="h-4 w-4 mr-2" /> Excluir
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
