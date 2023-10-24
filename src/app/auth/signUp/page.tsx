import { Stack, Typography } from '@mui/joy'
import SignUpForm from '@/app/components/forms/SignUpForm'

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
            <Typography level="h1">Sign Up</Typography>
            <SignUpForm />
        </Stack>
    )
}
