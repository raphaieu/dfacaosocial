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
import { Heart, Users, Utensils } from "lucide-react"

const slides = [
  {
    title: "Transformando o futuro de famílias brasilienses",
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
    image: "https://images.unsplash.com/photo-1559027615-cd9d7a9154ad?q=80&w=2070&auto=format&fit=crop",
    cta: "Ser Voluntário",
    link: "/contato"
  }
]

const recentCampaigns = [
  {
    title: "Natal sem Fome 2024",
    excerpt: "Meta de arrecadar 500 cestas básicas para a comunidade do Sol Nascente.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop",
    tag: "Ativa",
    date: "20 Fev, 2026"
  },
  {
    title: "Ação de Volta às Aulas",
    excerpt: "Distribuição de kits escolares para crianças em situação de vulnerabilidade.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    tag: "Concluída",
    date: "10 Jan, 2026"
  },
  {
    title: "Sopa Comunitária",
    excerpt: "Ação semanal de distribuição de refeições quentes para pessoas em situação de rua.",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop",
    tag: "Recorrente",
    date: "Toda Sexta"
  }
]

export default function HomePage() {
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
            {recentCampaigns.map((camp, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={camp.image}
                    alt={camp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={camp.tag === "Ativa" ? "default" : "secondary"} className={cn(
                      camp.tag === "Ativa" ? "bg-[#25D366] text-white" : "bg-gray-200 text-gray-700"
                    )}>
                      {camp.tag}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="text-xs text-gray-400 mb-2">{camp.date}</div>
                  <CardTitle className="font-outfit group-hover:text-primary transition-colors">{camp.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {camp.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 text-black font-bold group-hover:translate-x-1 transition-transform" asChild>
                    <Link href={`/acoes/${i}`}>LER MAIS →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
