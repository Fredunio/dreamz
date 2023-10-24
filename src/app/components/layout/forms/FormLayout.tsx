import { Stack, Typography, styled } from '@mui/joy'

export default function FormLayout({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) {
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            spacing={8}
            sx={{
                py: 10,
            }}
        >
            <Typography level="h1" component={'h1'}>
                {title}
            </Typography>

            <Stack
                spacing={6}
                width={{
                    // xs: '15rem',
                    // sm: '20rem',
                    md: '30rem',
                    lg: '40rem',
                    // xl: '35rem',
                }}
                direction={'column'}
            >
                {children}
            </Stack>
        </Stack>
    )
}
