'use client'

import { useState, useEffect } from 'react'
import { Users, Mail, Phone, Clock, Trash2, Loader2, Heart, CheckCircle, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function VolunteersAdminPage() {
    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState<any[]>([])

    const fetchContacts = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`)
            if (response.ok) {
                const data = await response.json()
                setContacts(data)
            }
        } catch (error) {
            console.error('Error fetching contacts:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    const handleDelete = async (id: number) => {
        if (!confirm('Excluir este contato do banco de dados?')) return
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                fetchContacts()
            }
        } catch (error) {
            console.error('Error deleting contact:', error)
        }
    }

    const volunteerCount = contacts.filter((c: any) => c.is_volunteer).length

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black uppercase italic tracking-tighter">Mensagens & <span className="text-primary">Voluntários</span></h1>
                    <p className="text-gray-500">Acompanhe as pessoas interessadas e mensagens do site.</p>
                </div>
                <div className="flex gap-4">
                    <Badge variant="outline" className="px-4 py-2 rounded-xl border-gray-200 bg-white">
                        <Heart className="h-4 w-4 mr-2 text-primary fill-primary" /> {volunteerCount} Candidatos
                    </Badge>
                </div>
            </div>

            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                        </div>
                    ) : contacts.length === 0 ? (
                        <div className="text-center py-20">
                            <Users className="h-16 w-16 mx-auto text-gray-100 mb-4" />
                            <p className="text-gray-400 font-medium italic">Nenhum contato registrado ainda.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow className="hover:bg-transparent border-gray-100">
                                    <TableHead className="font-black uppercase text-[10px] tracking-widest p-6">Nome / Contato</TableHead>
                                    <TableHead className="font-black uppercase text-[10px] tracking-widest p-6">Interesse</TableHead>
                                    <TableHead className="font-black uppercase text-[10px] tracking-widest p-6">Mensagem</TableHead>
                                    <TableHead className="font-black uppercase text-[10px] tracking-widest p-6">Data</TableHead>
                                    <TableHead className="font-black uppercase text-[10px] tracking-widest p-6 text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.map((v) => (
                                    <TableRow key={v.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <TableCell className="p-6">
                                            <p className="font-bold text-gray-900">{v.name}</p>
                                            <div className="flex flex-col gap-1 mt-1">
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Mail className="h-3 w-3" /> {v.email}
                                                </span>
                                                {v.phone && (
                                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                                        <Phone className="h-3 w-3" /> {v.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-6">
                                            {v.is_volunteer ? (
                                                <Badge className="bg-primary/10 text-primary border-primary/20 shadow-none font-black uppercase text-[9px] tracking-widest">
                                                    <Heart className="h-3 w-3 mr-1 fill-primary" /> Voluntário
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-gray-100 text-gray-500 border-gray-200 shadow-none font-black uppercase text-[9px] tracking-widest">
                                                    <MessageSquare className="h-3 w-3 mr-1" /> Dúvida/Contato
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="p-6 max-w-xs">
                                            <p className="text-sm text-gray-500 line-clamp-2 italic">"{v.message}"</p>
                                        </TableCell>
                                        <TableCell className="p-6">
                                            <span className="text-xs text-gray-400 font-medium font-mono">
                                                {new Date(v.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                        </TableCell>
                                        <TableCell className="p-6 text-right">
                                            <Button onClick={() => handleDelete(v.id)} variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
