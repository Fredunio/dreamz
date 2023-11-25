import { Stack, Typography, styled } from '@mui/joy'
import * as React from 'react'

export default function FormLayout({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) {
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            spacing={8}
            sx={{
                py: 10,
            }}
        >
            <Typography level="h1" component={'h1'}>
                {title}
            </Typography>

            <Stack
                px={{
                    xs: 2,
                    sm: 4,
                    md: 0,
                }}
                spacing={6}
                width={{
                    // xs: '15rem',
                    sm: '100%',
                    md: '40rem',
                    lg: '60rem',
                    // xl: '35rem',
                }}
                // bgcolor={{
                //     xs: 'red',
                //     sm: 'green',
                //     md: 'blue',
                //     lg: 'yellow',
                //     xl: 'pink',
                // }}
                direction={'column'}
            >
                {children}
            </Stack>
        </Stack>
    )
}
