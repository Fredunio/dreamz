import { Sheet, Typography } from '@mui/joy'
import React from 'react'

export default function DashboardSectionHeader({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}) {
    return (
        <Sheet
            variant="outlined"
            sx={{
                p: 4,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
            }}
        >
            <Typography level="h2" component={'h2'}>
                {title}
            </Typography>

            <Typography
                level="body-md"
                component={'p'}
                sx={{
                    color: 'text.secondary',
                }}
            >
                {subtitle}
            </Typography>
        </Sheet>
    )
}
