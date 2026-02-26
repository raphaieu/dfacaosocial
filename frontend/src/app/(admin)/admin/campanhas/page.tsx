'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Search, Calendar, Heart, Loader2, Save, Trash2, Edit, ExternalLink, Image as ImageIcon, Upload, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

export default function CampaignsAdminPage() {
    const supabase = createClient()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const galleryInputRef = useRef<HTMLInputElement>(null)

    const [loading, setLoading] = useState(true)
    const [campaigns, setCampaigns] = useState<any[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadingGallery, setUploadingGallery] = useState(false)
    const [editingCampaign, setEditingCampaign] = useState<any>(null)

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        thumbnail: '',
        gallery: [] as string[],
        featured: false,
        published_at: new Date().toISOString().split('T')[0]
    })

    const fetchCampaigns = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns`)
            if (response.ok) {
                const data = await response.json()
                setCampaigns(data)
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCampaigns()
    }, [])

    useEffect(() => {
        if (editingCampaign) {
            let galleryArr = []
            try {
                if (editingCampaign.gallery) {
                    galleryArr = typeof editingCampaign.gallery === 'string'
                        ? JSON.parse(editingCampaign.gallery)
                        : editingCampaign.gallery
                }
            } catch (e) {
                console.error("Error parsing gallery:", e)
            }

            setFormData({
                title: editingCampaign.title || '',
                slug: editingCampaign.slug || '',
                excerpt: editingCampaign.excerpt || '',
                content: editingCampaign.content || '',
                category: editingCampaign.category || '',
                thumbnail: editingCampaign.thumbnail || '',
                gallery: Array.isArray(galleryArr) ? galleryArr : [],
                featured: Boolean(editingCampaign.featured),
                published_at: editingCampaign.published_at ? editingCampaign.published_at.split(' ')[0] : new Date().toISOString().split('T')[0]
            })
            setIsDialogOpen(true)
        } else {
            setFormData({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                category: '',
                thumbnail: '',
                gallery: [],
                featured: false,
                published_at: new Date().toISOString().split('T')[0]
            })
        }
    }, [editingCampaign])

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (isGallery) setUploadingGallery(true)
        else setUploading(true)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `campaigns/${fileName}`

            const { data, error } = await supabase.storage
                .from('media')
                .upload(filePath, file)

            if (error) throw error

            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath)

            if (isGallery) {
                setFormData(prev => ({ ...prev, gallery: [...prev.gallery, publicUrl] }))
            } else {
                setFormData(prev => ({ ...prev, thumbnail: publicUrl }))
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Erro ao fazer upload. Verifique o bucket "media" no Supabase.')
        } finally {
            if (isGallery) setUploadingGallery(false)
            else setUploading(false)
        }
    }

    const removeGalleryImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        const url = editingCampaign
            ? `${process.env.NEXT_PUBLIC_API_URL}/campaigns/${editingCampaign.id}`
            : `${process.env.NEXT_PUBLIC_API_URL}/campaigns`

        const method = editingCampaign ? 'PUT' : 'POST'

        const payload = {
            ...formData,
            gallery: JSON.stringify(formData.gallery)
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                await fetchCampaigns()
                setIsDialogOpen(false)
                setEditingCampaign(null)
            } else {
                const err = await response.json()
                alert(`Erro: ${err.error || 'Falha ao salvar'}`)
            }
        } catch (error) {
            console.error('Error saving campaign:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta campanha?')) return

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                await fetchCampaigns()
            }
        } catch (error) {
            console.error('Error deleting campaign:', error)
        }
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">Gerenciar <span className="text-primary">Campanhas</span></h1>
                    <p className="text-gray-500">Crie e edite as ações exibidas no site.</p>
                </div>

                <Button
                    onClick={() => {
                        setEditingCampaign(null);
                        setFormData({
                            title: '',
                            slug: '',
                            excerpt: '',
                            content: '',
                            category: '',
                            thumbnail: '',
                            gallery: [],
                            featured: false,
                            published_at: new Date().toISOString().split('T')[0]
                        });
                        setIsDialogOpen(true);
                    }}
                    className="bg-black text-white hover:bg-gray-800 rounded-2xl px-6 h-12 font-black uppercase tracking-widest text-[10px] cursor-pointer"
                >
                    <Plus className="mr-2 h-4 w-4" /> Nova Campanha
                </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingCampaign(null); }}>
                <DialogContent className="max-w-4xl rounded-[32px] max-h-[90vh] overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase italic">{editingCampaign ? 'Editar Campanha' : 'Nova Campanha'}</DialogTitle>
                            <DialogDescription>Preencha os dados da ação social.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-6 font-medium">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Título</label>
                                    <Input
                                        placeholder="Ex: Natal Solidário 2026"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                        className="rounded-xl border-gray-200"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Slug (URL)</label>
                                    <Input
                                        placeholder="natal-solidario-2026"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="rounded-xl border-gray-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 items-end">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Categoria</label>
                                    <Input
                                        placeholder="Ex: Alimentos, Educação"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="rounded-xl border-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Data da Ação</label>
                                    <Input
                                        type="date"
                                        value={formData.published_at}
                                        onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
                                        className="rounded-xl border-gray-200"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 h-10 px-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <Switch
                                        id="featured"
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                                    />
                                    <Label htmlFor="featured" className="text-xs font-black uppercase tracking-widest text-gray-500 cursor-pointer">Destaque</Label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Resumo (Chamada)</label>
                                <Input
                                    placeholder="Um pequeno texto que aparece na listagem..."
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="rounded-xl border-gray-200"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Conteúdo Completo (Aceita HTML)</label>
                                <Textarea
                                    placeholder="Descrição detalhada da ação... (Você pode colar tags HTML aqui)"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="rounded-xl border-gray-200 min-h-[150px]"
                                />
                            </div>

                            {/* Main Thumbnail */}
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Imagem Principal (Thumbnail)</label>

                                {formData.thumbnail && (
                                    <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                                        <img src={formData.thumbnail} alt="Preview" className="object-cover w-full h-full" />
                                        <Button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, thumbnail: '' })}
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            placeholder="URL da imagem principal..."
                                            value={formData.thumbnail}
                                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                            className="rounded-xl border-gray-200"
                                        />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={(e) => handleUploadImage(e, false)}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={uploading}
                                            onClick={() => fileInputRef.current?.click()}
                                            className="rounded-xl border-gray-200 cursor-pointer"
                                        >
                                            {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : <Upload className="h-4 w-4 mr-2" />}
                                            Upload
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Photo Gallery */}
                            <div className="space-y-4 mt-4 p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Galeria de Fotos (Thumbs)</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            ref={galleryInputRef}
                                            onChange={(e) => handleUploadImage(e, true)}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            disabled={uploadingGallery}
                                            onClick={() => galleryInputRef.current?.click()}
                                            className="rounded-full bg-white border-gray-200 font-bold text-[10px] uppercase tracking-widest px-4 cursor-pointer"
                                        >
                                            {uploadingGallery ? <Loader2 className="animate-spin h-3 w-3 mr-2" /> : <Plus className="h-3 w-3 mr-2" />}
                                            Adicionar Foto
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
                                    {formData.gallery.map((url, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-white border border-gray-200 group">
                                            <img src={url} alt={`Gallery ${index}`} className="object-cover w-full h-full" />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(index)}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {formData.gallery.length === 0 && !uploadingGallery && (
                                        <div className="col-span-full py-4 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                                            Nenhuma foto na galeria.
                                        </div>
                                    )}
                                    {uploadingGallery && (
                                        <div className="aspect-square rounded-xl bg-gray-200 animate-pulse flex items-center justify-center">
                                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={submitting || uploading || uploadingGallery}
                                className="bg-primary text-black hover:bg-primary/80 font-black uppercase tracking-[0.2em] rounded-2xl w-full h-14 cursor-pointer"
                            >
                                {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save className="mr-2 h-5 w-5" /> {editingCampaign ? 'Atualizar' : 'Salvar'} Campanha</>}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : campaigns.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed text-gray-400 font-medium">
                        Nenhuma campanha cadastrada.
                    </div>
                ) : (
                    campaigns.map((c) => (
                        <Card key={c.id} className="group border-none shadow-lg rounded-[32px] overflow-hidden bg-white hover:shadow-2xl transition-all duration-500">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={c.thumbnail || 'https://images.unsplash.com/photo-1543599553-294715494d40?q=80&w=800'}
                                    alt={c.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className="bg-black/50 backdrop-blur-md text-white border-none py-1.5 px-3">
                                        {c.category}
                                    </Badge>
                                    {c.featured && (
                                        <Badge className="bg-primary text-black border-none py-1.5 px-3">
                                            Destaque
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-black uppercase italic tracking-tight mb-2 line-clamp-1">{c.title}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10 italic">{c.excerpt}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex gap-2">
                                        <Button onClick={() => setEditingCampaign(c)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button onClick={() => handleDelete(c.id)} variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button asChild variant="ghost" size="sm" className="font-black text-[10px] uppercase tracking-widest italic">
                                        <Link href={`/acoes/${c.slug}`} target="_blank">Ver Site <ExternalLink className="ml-1 h-3 w-3" /></Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
