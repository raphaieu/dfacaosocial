'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Instagram, Facebook, Send, Loader2, Heart, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Link from 'next/link'

const formSchema = z.object({
    name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
    email: z.string().email({ message: 'E-mail inválido.' }),
    phone: z.string().min(10, { message: 'Telefone inválido.' }),
    message: z.string().min(5, { message: 'A mensagem deve ter pelo menos 5 caracteres.' }),
    isVolunteer: z.boolean(),
})

type ContactFormValues = z.infer<typeof formSchema>

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
            isVolunteer: false,
        },
    })

    async function onSubmit(values: ContactFormValues) {
        setSubmitting(true)
        // Simulate API call
        console.log('Form values:', values)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSubmitting(false)
        setSuccess(true)
        form.reset()
    }

    return (
        <div className="pt-14 md:pt-16">
            {/* Header / Intro */}
            <section className="bg-gray-50 py-16 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                        Contato / Seja um Voluntário
                    </h1>
                    <div className="h-1.5 w-24 bg-primary mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Tem alguma dúvida, quer sugerir uma ação ou deseja fazer parte do nosso time de voluntários?
                        Utilize o formulário abaixo ou nossos canais diretos.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

                        {/* Contact Info Side */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8 flex items-center gap-2 italic">
                                    <span className="text-primary">#</span> Informações de Contato
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Phone className="h-6 w-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase text-xs text-gray-400 tracking-widest mb-1">WhatsApp / Telefone</p>
                                            <div className="space-y-1">
                                                <p className="text-lg font-medium text-gray-800">(71) 98142-9124 - Cris Freitas</p>
                                                <p className="text-lg font-medium text-gray-800">(71) 98859-9802 - Brisa Gisele</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                            <Mail className="h-6 w-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase text-xs text-gray-400 tracking-widest mb-1">E-mail</p>
                                            <p className="text-lg font-medium text-gray-800">d.f.acaosocial@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin className="h-6 w-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="font-bold uppercase text-xs text-gray-400 tracking-widest mb-1">Localização</p>
                                            <p className="text-lg font-medium text-gray-800">Salvador, BA - Brasil</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold uppercase tracking-tight mb-8 italic">Siga-nos</h2>
                                <div className="flex gap-4">
                                    <Link
                                        href="https://www.instagram.com/d.f.acaosocial/"
                                        target="_blank"
                                        className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                                    >
                                        <Instagram className="h-7 w-7" />
                                    </Link>
                                    <Link
                                        href="https://www.facebook.com/dfacaosocial"
                                        target="_blank"
                                        className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-primary hover:text-black transition-all"
                                    >
                                        <Facebook className="h-7 w-7" />
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-8 rounded-3xl border-2 border-primary/20">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Heart className="h-5 w-5 fill-primary text-primary" /> Faça a diferença
                                </h3>
                                <p className="text-gray-600 font-medium italic">
                                    "A judar é o maior presente que podemos receber."
                                </p>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="bg-white p-2 sm:p-4 rounded-3xl">
                            {success ? (
                                <Alert className="bg-green-50 border-green-200 py-12 flex flex-col items-center text-center">
                                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                                    <AlertTitle className="text-2xl font-bold text-green-900 mb-2">Mensagem Enviada!</AlertTitle>
                                    <AlertDescription className="text-green-700 text-lg">
                                        Obrigado por entrar em contato. Retornaremos o mais breve possível.
                                    </AlertDescription>
                                    <Button
                                        variant="outline"
                                        onClick={() => setSuccess(false)}
                                        className="mt-8 border-green-300 text-green-700 hover:bg-green-100"
                                    >
                                        Enviar outra mensagem
                                    </Button>
                                </Alert>
                            ) : (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 lg:p-10 lg:bg-gray-50 lg:rounded-3xl lg:border lg:border-gray-100">
                                        <div className="mb-8">
                                            <h2 className="text-2xl font-bold uppercase tracking-tight italic">Envie sua Mensagem</h2>
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome Completo</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Seu nome" {...field} className="h-11 bg-white" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>E-mail</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="seu@email.com" {...field} className="h-11 bg-white" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Telefone (WhatsApp)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="(00) 00000-0000" {...field} className="h-11 bg-white" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Mensagem</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Como podemos ajudar?"
                                                            className="min-h-[120px] bg-white"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="isVolunteer"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border p-4 bg-primary/10 border-primary/20">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                            className="h-5 w-5 data-[state=checked]:bg-black data-[state=checked]:text-white"
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel className="text-base font-bold uppercase tracking-tight cursor-pointer">
                                                            Quero ser voluntário
                                                        </FormLabel>
                                                        <FormDescription className="text-black/60">
                                                            Marque esta opção para se juntar à nossa rede de apoio.
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            className="w-full h-14 bg-primary text-black font-black uppercase tracking-[0.2em] hover:bg-primary/80 transition-all text-lg"
                                            disabled={submitting}
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-5 w-5" />
                                                    Enviar Mensagem
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
