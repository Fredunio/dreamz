'use client'

import { Box, Chip, Option, Select, Sheet } from '@mui/joy'
import React from 'react'

export default function DreamsPageFilters({
    categories,
    sortByOptions,
    emotions,
}: {
    categories: any
    sortByOptions: any
    emotions: any
}) {
    return (
        <Sheet
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                '& > *': {
                    m: 1,
                    width: '25ch',
                },
            }}
        >
            <Select name="category" placeholder="Choose one…">
                <Option value={4}>test</Option>
            </Select>

            <Select
                component={'select'}
                multiple
                defaultValue={['dog', 'cat']}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                        {selected?.map((selectedOption) => (
                            <Chip
                                variant="soft"
                                color="primary"
                                key={selectedOption.value}
                            >
                                {selectedOption.label}
                            </Chip>
                        ))}
                    </Box>
                )}
                sx={{
                    minWidth: '15rem',
                }}
                slotProps={{
                    listbox: {
                        sx: {
                            width: '100%',
                        },
                    },
                }}
            >
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="fish">Fish</Option>
                <Option value="bird">Bird</Option>
            </Select>

            {/* <Select
                component={'select'}
                defaultValue={['dog']}
                multiple
                sx={{
                    minWidth: '13rem',
                }}
                slotProps={{
                    listbox: {
                        sx: {
                            width: '100%',
                        },
                    },
                }}
            >
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="fish">Fish</Option>
                <Option value="bird">Bird</Option>
            </Select> */}
        </Sheet>
    )
}
