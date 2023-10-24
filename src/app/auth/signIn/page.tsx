'use client'

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'

import {
    Button,
    Divider,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Sheet,
    Stack,
    Typography,
} from '@mui/joy'
import React, { useRef, useState } from 'react'
import GoogleLoginButton from '@/app/components/buttons/GoogleLoginButton'
import FacebookLoginButton from '@/app/components/buttons/FacebookLoginButton'
import SignInForm from '@/app/components/forms/SignInForm'

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
            <Typography level="h1">Sign In</Typography>
            <SignInForm />
        </Stack>
    )
}
