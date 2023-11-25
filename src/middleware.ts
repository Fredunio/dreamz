export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/dashboard:path*', '/add_dream', '/add_dreamon'],
}
