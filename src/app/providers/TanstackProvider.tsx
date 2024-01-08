'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

export default function TanstackProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // staleTime above 0 to avoid refetching immediately on the client
                        staleTime: 60 * 1000,
                    },
                },
            })
    )

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
