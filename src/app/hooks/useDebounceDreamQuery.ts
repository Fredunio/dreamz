import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function useDebounceDreamQuery(
    value: any,
    name: string,
    func: (name: string, value: string | string[] | undefined) => void,
    delay: number
) {
    useEffect(() => {
        const timer = setTimeout(() => {
            func(name, value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay, func, name])
}
