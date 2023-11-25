'use client'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'

import { Stack } from '@mui/joy'
import { useRef, useState } from 'react'
import SignInForm from '../../components/forms/SignInForm'
import * as React from 'react'

export default function SignInPage() {
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
