import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Header from './components/layout/Header/Header'
import localFont from 'next/font/local'
import AuthSessionProvider from './providers/providers'
import ThemeRegistry from './theme/ThemeRegistry'
import { inter, roboto } from './fonts'

export const metadata: Metadata = {
    title: 'Dreamz',
    description: 'Your dreams are everything',
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthSessionProvider>
            <ThemeRegistry options={{ key: 'mui' }}>
                <html lang="en">
                    <body className={`${inter.className}`}>
                        <Header />
                        {children}
                    </body>
                </html>
            </ThemeRegistry>
        </AuthSessionProvider>
    )
}
