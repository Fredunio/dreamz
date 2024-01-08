'use client'

import { Box, Chip, Stack, Typography } from '@mui/joy'
import React from 'react'
import { getSingleDream } from '../../lib/fetchers/dreams/getSingleDream'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

export default function DreamPage({ params }: { params: { id: string } }) {
    const id = params.id

    const { data: dreamData } = useQuery({
        queryKey: ['dream'],
        queryFn: () => getSingleDream({ id: id }),
    })

    const dream = dreamData?.dreams[0]
    console.log('dreamData: ', dreamData)

    return (
        <Stack
            direction="column"
            className="page-container"
            sx={{
                px: 14,
                py: 8,
                position: 'relative',
                width: {
                    // xs: '100%',
                    md: '50rem',
                    lg: '60rem',
                },
                // width: '100%',
            }}
            alignItems="center"
            gap={2}
        >
            <Box
                sx={{
                    borderRadius: '4',
                    overflow: 'hidden',
                    width: '100%',
                    height: {
                        xs: '10rem',
                        md: '15rem',
                        lg: '20rem',
                    },
                    position: 'relative',
                }}
            >
                <Image
                    src={
                        dream?.imageUrl ||
                        '/assets/images/default_dream_image.jpg'
                    }
                    alt={dream?.name || 'dream image'}
                    layout="fill"
                    objectFit="cover"
                />
            </Box>
            <Typography level="h3" className="self-start justify-self-start">
                {dream?.name}
            </Typography>
            <Box
                sx={{
                    width: '100%',
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        width: '100%',
                        gap: 2,
                    }}
                >
                    {dream?.tags.map((tag) => (
                        <Chip
                            size="sm"
                            key={tag.tag.name}
                            color="primary"
                            // onClick={function () {}}
                            variant="solid"
                        >
                            #{tag.tag.name}
                        </Chip>
                    ))}
                </Stack>
                <Stack
                    direction="row"
                    sx={{
                        width: '100%',
                        gap: 2,
                    }}
                >
                    {dream?.emotions.map((emotion) => (
                        <Chip
                            size="sm"
                            key={emotion.emotion.name}
                            color="primary"
                            // onClick={function () {}}
                            variant="solid"
                        >
                            #{emotion.emotion.name}
                        </Chip>
                    ))}
                </Stack>
            </Box>
        </Stack>
    )
}
