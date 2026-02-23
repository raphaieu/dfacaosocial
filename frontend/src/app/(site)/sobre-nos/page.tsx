'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Target, Eye, ShieldCheck, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
    return (
        <div className="pt-14 md:pt-16">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop"
                    alt="Crianças sorrindo"
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">
                        Sobre Nós
                    </h1>
                    <div className="mt-4 h-1.5 w-24 bg-primary mx-auto"></div>
                </div>
            </section>

            {/* Nossa História */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="text-primary">#</span> Nossa História
                        </h2>

                        <div className="prose prose-lg text-gray-600 space-y-6">
                            <p className="font-medium text-xl text-gray-800">
                                Há mais de 10 anos, um grupo de amigas se uniu com um único propósito: transformar sorrisos.
                            </p>
                            <p>
                                Movidas por carinho profundo, amizade verdadeira e uma saudade que nos une eternamente, decidimos multiplicar nosso tempo modificando vidas. Assim nasceu a <span className="text-black font-bold text-xl uppercase italic">D.F. Ação Social</span>.
                            </p>
                            <p>
                                Na primeira ação, entregamos tanto amor que o dia pareceu pequeno demais para conter tanta emoção. Os olhares gratos e os abraços sinceros nos mostraram: ajudar é o maior presente que podemos receber.
                            </p>
                            <p>
                                Para eternizar essa saudade e homenagear quem nos inspira, batizamos o grupo de <span className="font-bold">Daiane Freitas Ação Social</span>. O que começou como um gesto entre amigas virou missão de vida.
                            </p>
                        </div>

                        {/* Video Placeholder */}
                        <div className="mt-12 relative aspect-video bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center group cursor-pointer border-4 border-primary">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            <Button size="icon" className="w-20 h-20 rounded-full bg-primary text-black hover:scale-110 transition-transform relative z-10">
                                <Play className="h-10 w-10 fill-current" />
                            </Button>
                            <p className="absolute bottom-6 text-white font-bold uppercase tracking-widest z-10 flex items-center gap-2">
                                <span className="w-8 h-px bg-white"></span> Assista Nossa Trajetória
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lema e Manifesto */}
            <section className="py-20 bg-primary text-black overflow-hidden">
                <div className="container mx-auto px-4 relative">
                    <div className="absolute -top-10 -left-10 text-black/5 font-black text-[15rem] select-none pointer-events-none uppercase">
                        D.F.
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-black/60">Nosso Manifesto</h3>
                                <div className="space-y-2">
                                    <p className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9]">
                                        Onde tem dor, plantamos sorrisos.
                                    </p>
                                    <p className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.9]">
                                        Onde tem gente, existe D.F. Ação Social.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-10">
                                <Link href="/contato" className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-black/90 transition-colors">
                                    JUNTE-SE A NÓS
                                </Link>
                                <div className="flex flex-col justify-center text-sm font-bold uppercase tracking-widest pt-2">
                                    O bem se multiplica sem limites
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-8 border-4 border-black/10 rounded-2xl">
                                <h4 className="flex items-center gap-3 text-2xl font-black uppercase mb-2 italic">
                                    <Heart className="h-6 w-6" /> Nosso Lema
                                </h4>
                                <p className="text-xl font-medium">Transformar vidas.</p>
                            </div>
                            <div className="p-8 border-4 border-black/10 rounded-2xl">
                                <h4 className="flex items-center gap-3 text-2xl font-black uppercase mb-2 italic">
                                    <Target className="h-6 w-6" /> Nossa Missão
                                </h4>
                                <p className="text-xl font-medium">Abraçar pessoas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Missão Visão Valores */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Target className="h-8 w-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter italic">Missão</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Transformar realidades através do acolhimento, nutrição e cuidado com famílias em situação de vulnerabilidade, garantindo dignidade e esperança.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Eye className="h-8 w-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter italic">Visão</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Ser referência em impacto social na Bahia, construindo uma rede de solidariedade autossustentável que alcance as comunidades mais remotas do sertão.
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow group">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="h-8 w-8 text-black" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter italic">Valores</h3>
                            <ul className="text-gray-600 space-y-2 font-medium">
                                <li className="flex items-center gap-2 italic"> Amor ao próximo</li>
                                <li className="flex items-center gap-2 italic"> Amizade verdadeira</li>
                                <li className="flex items-center gap-2 italic"> Carinho profundo</li>
                                <li className="flex items-center gap-2 italic"> Transparência total</li>
                                <li className="flex items-center gap-2 italic"> Multiplicação do bem</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conselho de Idealizadores */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-16">
                        Conselho de Idealizadores
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {[
                            { name: "Cris Freitas", role: "Idealizadora" },
                            { name: "Brisa Gisele", role: "Idealizadora" },
                            { name: "Idealizadora 3", role: "Idealizadora" },
                            { name: "Idealizadora 4", role: "Idealizadora" },
                        ].map((member, i) => (
                            <div key={i} className="group">
                                <div className="aspect-[4/5] bg-gray-100 rounded-3xl mb-4 overflow-hidden relative border-4 border-transparent group-hover:border-primary transition-all">
                                    {/* Placeholder for real photo */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                        <Heart className="h-12 w-12 opacity-20" />
                                    </div>
                                    {/* i === 0 && <Image src="/images/conselho/cris.jpg" alt={member.name} fill className="object-cover" /> */}
                                </div>
                                <h3 className="font-bold text-lg uppercase tracking-tight">{member.name}</h3>
                                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
