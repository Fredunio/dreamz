import localFont from 'next/font/local'
import { Inter, Roboto, Leckerli_One } from 'next/font/google'

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
    preload: true,
})

export const inter = Inter({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
    preload: true,
})

export const leckerliOne = Leckerli_One({
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
    preload: true,
})
