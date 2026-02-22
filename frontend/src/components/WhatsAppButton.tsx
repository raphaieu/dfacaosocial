import Link from "next/link"
import Image from "next/image"

export default function WhatsAppButton() {
    const phoneNumber = "5561987654321" // Update with real number
    const message = "Olá! Gostaria de saber mais sobre como posso ajudar a D.F. Ação Social."
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center animate-bounce-slow"
            aria-label="Falar pelo WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle"
            >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
        </Link>
    )
}
