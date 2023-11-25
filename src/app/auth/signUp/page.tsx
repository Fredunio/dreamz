import { Stack, Typography } from '@mui/joy'
import SignUpForm from '../../components/forms/SignUpForm'
import * as React from 'react'

export default function SignUpPage() {
    return (
        <Stack
            minHeight={`calc(100vh - var(--header-height))`}
            spacing={4}
            // py={6}
            sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                placeContent: 'center',
            }}
        >
            <SignUpForm />
        </Stack>
    )
}
