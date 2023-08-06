import './styles/globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Header from './components/layout/Header/Header'
import { CssBaseline } from '@mui/material'
import AuthSessionProvider from './providers/providers'
import ThemeRegistry from './theme/ThemeRegistry'

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Dreamz',
    description: 'Your dreams are everything',
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
                    <body className={roboto.className}>
                        <Header />
                        {children}
                    </body>
                </html>
            </ThemeRegistry>
        </AuthSessionProvider>
    )
}
