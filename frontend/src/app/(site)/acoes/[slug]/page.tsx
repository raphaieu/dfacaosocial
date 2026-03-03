import { Metadata } from 'next'
import ActionDetailClient from './ActionDetailClient'
import { notFound } from 'next/navigation'

interface Props {
    params: Promise<{ slug: string }>
}

async function getAction(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/slug/${slug}`, {
            next: { revalidate: 60 } // Revalidate every minute
        })
        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error('Error fetching action:', error)
        return null
    }
}

async function getTransparency(id: number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/campaigns/${id}/transparency`, {
            next: { revalidate: 60 }
        })
        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error('Error fetching transparency:', error)
        return null
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const action = await getAction(slug)

    if (!action) {
        return {
            title: 'Campanha não encontrada | D.F. Ação Social',
        }
    }

    return {
        title: `${action.title} | D.F. Ação Social`,
        description: action.excerpt || `Conheça mais sobre a ação ${action.title} e como você pode ajudar a D.F. Ação Social.`,
        openGraph: {
            title: action.title,
            description: action.excerpt,
            images: [
                {
                    url: action.thumbnail || '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: action.title,
                },
            ],
        },
    }
}

export default async function ActionDetailPage({ params }: Props) {
    const { slug } = await params
    const action = await getAction(slug)

    if (!action) {
        notFound()
    }

    const transparency = await getTransparency(action.id)

    return <ActionDetailClient action={action} transparency={transparency} />
}
