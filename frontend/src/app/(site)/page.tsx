"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Utensils, Calendar, ArrowRight, Loader2 } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"

const slides = [
  {
    title: "Transformando o futuro de famílias baianas",
    description: "Atuamos na linha de frente para levar dignidade e esperança para quem mais precisa.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    cta: "Saiba Mais",
    link: "/sobre-nos"
  },
  {
    title: "Sua doação garante alimento na mesa",
    description: "Milhares de famílias dependem da nossa união. Contribua com cestas básicas hoje.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
    cta: "Quero Doar",
    link: "/como-doar"
  },
  {
    title: "Juntos somos mais fortes",
    description: "Seja um voluntário e dedique um pouco do seu tempo para mudar uma realidade.",
    image: "https://images.unsplash.com/photo-1761839256601-e768233e25e7?q=80&w=2070&auto=format&fit=crop",
    cta: "Ser Voluntário",
    link: "/contato"
  }
]

export default function HomePage() {
  const [actions, setActions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  const featuredActions = useMemo(() => {
    return actions
      .filter(a => Boolean(a.featured))
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, 3)
  }, [actions])

  return (
    <div className="flex flex-col w-full">
      {/* Hero Carousel */}
      <section className="relative w-full overflow-hidden">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[600px] w-full flex items-center">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover brightness-[0.4]"
                  />
                  <div className="container mx-auto px-4 relative z-10 text-white max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold font-outfit mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                      {slide.description}
                    </p>
                    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold px-8">
                        <Link href={slide.link}>{slide.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-8 bg-white/20 border-white/40 text-white hover:bg-white/40" />
            <CarouselNext className="right-8 bg-white/20 border-white/40 text-white hover:bg-white/40" />
          </div>
        </Carousel>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Utensils className="h-10 w-10 text-black mb-2" />
              <span className="text-4xl font-bold font-outfit">15.000+</span>
              <span className="text-black font-medium uppercase tracking-wider text-sm">Refeições Distribuídas</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="h-10 w-10 text-black mb-2" />
              <span className="text-4xl font-bold font-outfit">500+</span>
              <span className="text-black font-medium uppercase tracking-wider text-sm">Famílias Atendidas</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart className="h-10 w-10 text-black mb-2" />
              <span className="text-4xl font-bold font-outfit">100+</span>
              <span className="text-black font-medium uppercase tracking-wider text-sm">Voluntários Engajados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <Badge className="bg-primary text-black hover:bg-primary mb-4">NOSSAS AÇÕES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit">Campanhas em Destaque</h2>
              <p className="text-gray-600 mt-4 italic">
                Acompanhe nossas últimas iniciativas e veja como você pode ajudar a transformar a realidade de quem precisa.
              </p>
            </div>
            <Button asChild variant="outline" className="border-primary text-black font-bold">
              <Link href="/acoes">VER TODAS AS AÇÕES</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] animate-pulse">Buscando destaques...</p>
              </div>
            ) : featuredActions.length === 0 ? (
              <div className="col-span-full py-20 bg-white rounded-[32px] border border-dashed text-center">
                <p className="text-gray-400 font-medium italic">Nenhuma campanha em destaque no momento.</p>
              </div>
            ) : (
              featuredActions.map((action) => (
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
                      <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-medium italic h-10">
                        {action.excerpt || 'Sem resumo disponível.'}
                      </p>
                      <div className="flex items-center gap-2 text-black font-black uppercase tracking-[0.2em] text-[10px] italic">
                        Ver Detalhes <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 transform translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">Pronto para fazer a diferença?</h2>
            <p className="text-xl text-gray-400 mb-10">
              Cada doação, não importa o tamanho, ajuda a colocar comida na mesa e esperança no coração de uma família.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-black font-bold px-8">
                <Link href="/como-doar">QUERO DOAR AGORA</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold px-8 transition-colors">
                <Link href="/contato">SER UM VOLUNTÁRIO</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
