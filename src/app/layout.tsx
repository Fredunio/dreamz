import './styles/globals.css'
import type { Metadata, Viewport } from 'next'
import Header from './components/layout/Header/Header'
import SessionProvider from './providers/SessionProvider'
import ThemeRegistry from './theme/ThemeRegistry'
import { inter } from './fonts'
import { getServerSession } from 'next-auth'
import TanstackProvider from './providers/TanstackProvider'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import * as React from 'react'
import { authOptions } from './api/auth/[...nextauth]/options'

export const metadata: Metadata = {
    title: 'Dreamz',
    description: 'Dream sharing app',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const session = await getServerSession(authOptions)

    return (
        <ThemeRegistry options={{ key: 'joy' }}>
            <html lang="en">
                <body className={`${inter.className} min-h-screen `}>
                    <SessionProvider session={session}>
                        <TanstackProvider>
                            <Header />
                            <Toaster position="top-center" />
                            {/* <div className="flex flex-col items-center justify-center "> */}
                            {/* <div className="w-full max-w-[140rem]"> */}
                            {children}
                            {/* </div> */}
                            {/* </div> */}
                        </TanstackProvider>
                    </SessionProvider>
                </body>
            </html>
        </ThemeRegistry>
    )
}
