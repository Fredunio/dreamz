import './styles/globals.css'
import type { Metadata } from 'next'
import Header from './components/layout/Header/Header'
import SessionProvider from './providers/SessionProvider'
import ThemeRegistry from './theme/ThemeRegistry'
import { inter } from './fonts'
import { getServerSession } from 'next-auth'
import TanstackProvider from './providers/TanstackProvider'
import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'
import * as React from 'react'

export const metadata: Metadata = {
    title: 'Dreamz',
    description: 'Your dreams are everything',
    viewport: 'width=device-width, initial-scale=1',
}

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const session = await getServerSession()

    return (
        <SessionProvider session={session}>
            <TanstackProvider>
                <ThemeRegistry options={{ key: 'joy' }}>
                    <html lang="en">
                        <body className={`${inter.className} min-h-screen`}>
                            <Header />
                            <Toaster position="top-center" />
                            {children}
                        </body>
                    </html>
                </ThemeRegistry>
            </TanstackProvider>
        </SessionProvider>
    )
}
