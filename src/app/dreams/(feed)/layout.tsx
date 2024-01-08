import { Grid, Stack, Typography } from '@mui/joy'
import React from 'react'
import DreamsPageFilters from './DreamsPageFilters'
import { layoutPaddingX } from '../../lib/config'

export default function DreamsPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Stack
            direction="column"
            sx={{
                // px: {
                //     xs: 14,
                //     sm: 20,
                //     md: 40,
                // },
                px: layoutPaddingX,
                py: 8,
                position: 'relative',
                // width: '100%',
            }}
            alignItems="center"
            gap={6}
        >
            <Typography level="h1">Dreams</Typography>
            {children}
        </Stack>
    )
}
