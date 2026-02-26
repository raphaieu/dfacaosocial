'use client'

import { useState } from 'react'
import { Settings, CreditCard, Shield, Globe, Save, Loader2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function SettingsPage() {
    const [submitting, setSubmitting] = useState(false)
    const [mpConfig, setMpConfig] = useState({
        publicKey: 'APP_USR-xxxxxx',
        accessToken: 'APP_USR-xxxxxx',
        testMode: true
    })

    const handleSave = async () => {
        setSubmitting(true)
        // In a real app, this would save to backend/database
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSubmitting(false)
        alert('Configurações salvas com sucesso (demonstração)')
    }

    return (
        <div className="p-8 space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-black uppercase italic tracking-tighter">Configurações do <span className="text-primary">Sistema</span></h1>
                <p className="text-gray-500">Gerencie chaves de API e preferências globais.</p>
            </div>

            <Alert className="bg-primary/10 border-primary/20 rounded-[32px] p-6">
                <AlertCircle className="h-5 w-5 text-primary" />
                <AlertTitle className="font-black uppercase tracking-widest text-xs mb-1">Dica de Segurança</AlertTitle>
                <AlertDescription className="text-sm font-medium">
                    As chaves do Mercado Pago também podem ser definidas diretamente no arquivo <code className="bg-white/50 px-1 rounded">.env</code> para maior segurança em produção.
                </AlertDescription>
            </Alert>

            <div className="grid gap-6">
                <Card className="border-none shadow-xl rounded-[32px] bg-white overflow-hidden">
                    <CardHeader className="p-8 bg-gray-50/50 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                                <CreditCard className="h-6 w-6 text-black" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tight">Checkout Mercado Pago</CardTitle>
                                <CardDescription>Integração para recebimento de doações automáticas.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Public Key</label>
                                <Input
                                    value={mpConfig.publicKey}
                                    onChange={(e) => setMpConfig({ ...mpConfig, publicKey: e.target.value })}
                                    className="rounded-xl border-gray-200 font-mono text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Access Token</label>
                                <Input
                                    type="password"
                                    value={mpConfig.accessToken}
                                    onChange={(e) => setMpConfig({ ...mpConfig, accessToken: e.target.value })}
                                    className="rounded-xl border-gray-200 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="space-y-0.5">
                                <p className="font-bold text-sm uppercase tracking-tight">Modo Sandbox (Teste)</p>
                                <p className="text-xs text-gray-500">Use este modo para simular pagamentos sem cobrança real.</p>
                            </div>
                            <Switch
                                checked={mpConfig.testMode}
                                onCheckedChange={(val) => setMpConfig({ ...mpConfig, testMode: val })}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[32px] bg-white overflow-hidden">
                    <CardHeader className="p-8 bg-gray-50/50 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center">
                                <Globe className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tight">SEO & Global</CardTitle>
                                <CardDescription>Informações exibidas para os buscadores e redes sociais.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Título do Site</label>
                            <Input defaultValue="D.F. Ação Social - Transformando o futuro de famílias baianas" className="rounded-xl border-gray-200" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Meta Descrição</label>
                            <Textarea defaultValue="Atuamos na linha de frente para levar dignidade e esperança para quem mais precisa em Salvador e Região Metropolitana." className="rounded-xl border-gray-200" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end pt-4">
                    <Button
                        onClick={handleSave}
                        disabled={submitting}
                        className="bg-black text-white hover:bg-gray-800 font-black uppercase tracking-[0.2em] rounded-2xl px-12 h-14"
                    >
                        {submitting ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save className="mr-2 h-5 w-5" /> Salvar Tudo</>}
                    </Button>
                </div>
            </div>
        </div>
    )
}
