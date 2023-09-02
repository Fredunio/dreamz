import { Stack } from '@mui/joy'
import React from 'react'
import ThemeButton from './ThemeButton'
import AuthSectionHeader from './AuthSectionHeader'

export default function RightGroup() {
    return (
        <Stack component="section" direction={'row'} spacing={4}>
            <ThemeButton />
            <AuthSectionHeader />
        </Stack>
    )
}
