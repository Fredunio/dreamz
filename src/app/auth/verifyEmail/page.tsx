import { Stack, Typography } from '@mui/joy'
import VerifyEmailBox from './VerifyEmailBox'

export default function VerifyEmailPage() {
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
            <VerifyEmailBox />
        </Stack>
    )
}
