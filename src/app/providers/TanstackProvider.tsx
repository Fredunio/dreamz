'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/clients/queryClient'

export default function TanstackProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
