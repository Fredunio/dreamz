import './styles/globals.css'
import type { Metadata } from 'next'
import Header from './components/layout/Header/Header'
import SessionProvider from './providers/providers'
import ThemeRegistry from './theme/ThemeRegistry'
import { inter } from './fonts'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
    title: 'Dreamz',
    description: 'Your dreams are everything',
    viewport: 'width=device-width, initial-scale=1',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession()

    return (
        <SessionProvider session={session}>
            <ThemeRegistry options={{ key: 'joy' }}>
                {/* TODO: get this to work */}
                {/* {getInitColorSchemeScript({
                    defaultMode: 'dark',
                })} */}
                <html lang="en">
                    <body className={`${inter.className} min-h-screen`}>
                        <Header />
                        {children}
                    </body>
                </html>
            </ThemeRegistry>
        </SessionProvider>
    )
}
