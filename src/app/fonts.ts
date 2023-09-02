import localFont from 'next/font/local'
import { Inter, Roboto } from 'next/font/google'

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})

export const borel = localFont({
    src: 'assets/fonts/Borel-Regular.ttf',
    style: 'normal',
    display: 'swap',
})

export const inter = Inter({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
})
