import { Stack } from '@mui/joy'
import SignInForm from '../../components/forms/SignInForm'
import * as React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
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
            {/* <Typography level="h1">Sign In</Typography> */}
            <SignInForm />
        </Stack>
    )
}
