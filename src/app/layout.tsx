import "@/styles/globals.css"

import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"

import { GeistSans } from "geist/font/sans"

import { TRPCReactProvider } from "@/trpc/react"

export const metadata: Metadata = {
    title: "Clerkme",
    description: "Clerk patients with ease",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en" className={`${GeistSans.variable}`}>
                <body>
                    <TRPCReactProvider>{children}</TRPCReactProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
