'use client'

import Image from 'next/image'

const partners = [
    { name: 'Ana COC', logo: '/partners/ana_coc.jpg' },
    { name: 'Bem por Ju', logo: '/partners/bem_por_ju.jpg' },
    { name: 'Colégio Manoel Ribeiro', logo: '/partners/colegio_manoel_ribeiro.jpg' },
    { name: 'CSL Colégio Superior', logo: '/partners/csl_colegio_superior.jpg' },
    { name: 'Delicitas', logo: '/partners/delicitas.jpg' },
    { name: 'Desbancando as Bancas', logo: '/partners/desbancando_as_Bancas.jpg' },
    { name: 'Ghost Contador Encantos', logo: '/partners/ghost_contador_encantos.jpg' },
    { name: 'Mulheres no Comando Bloquinho', logo: '/partners/mulheres_no_comando_bloquinho.jpg' },
    { name: 'Presentear', logo: '/partners/presentear.jpg' },
    { name: 'Selvagem Consultoria Ambiental', logo: '/partners/selvagem_consultoria_ambiental.jpg' },
]

export default function PartnersCarousel() {
    // Double the partners to create the infinite loop effect
    const infinitePartners = [...partners, ...partners]

    return (
        <section className="py-16 bg-gray-50 overflow-hidden border-t border-gray-100">
            <div className="container mx-auto px-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-center">
                    Parceiros & Patrocinadores
                </h2>
                <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative flex">
                {/* Infinite Scroll Container */}
                <div className="flex animate-infinite-scroll space-x-8 md:space-x-12 px-4 hover:[animation-play-state:paused]">
                    {infinitePartners.map((partner, index) => (
                        <div
                            key={`${partner.name}-${index}`}
                            className="flex-shrink-0 group"
                        >
                            <div className="w-[180px] h-[180px] md:w-[250px] md:h-[250px] bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center p-6 md:p-10 transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
          width: max-content;
        }
      `}</style>
        </section>
    )
}
