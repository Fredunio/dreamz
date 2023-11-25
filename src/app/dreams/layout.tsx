import { Grid, Stack } from '@mui/joy'
import React from 'react'
import DreamsPageFilters from './DreamsPageFilters'

export default function DreamsPageLayout() {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <Stack direction="column" justifyContent="" alignItems="center">
            <p>Dreams Page Header</p>
            <DreamsPageFilters />
            <Grid
                container
                spacing={2}
                sx={{ flexGrow: 1, width: '100%' }}
                // columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {items.map((item, index) => (
                    <Grid xs={12} sm={6} md={4} key={index}>
                        <p className="w-full border-4 border-red-600 h-[20rem]">
                            {item}
                        </p>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    )
}
