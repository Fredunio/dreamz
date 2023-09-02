import { Button, IconButton, Input, Sheet, Stack } from '@mui/joy'
import { Box, Container, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function HomePage() {
    return (
        <Stack
            direction={'column'}
            sx={{
                // bgcolor: 'background.body',
                // py: 4,
                px: 6,
            }}
        >
            <Sheet
                sx={{
                    py: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    bgcolor: 'inherit',
                    justifyContent: 'center',
                    gap: '2rem',
                }}
            >
                <Typography textAlign="center" variant="h1">
                    Welcome to Dreamz
                </Typography>
                <Input
                    color="primary"
                    variant="outlined"
                    size="lg"
                    placeholder="Search..."
                    sx={{
                        minWidth: {
                            xs: '100%',
                            sm: '100%',
                            md: '100%',
                            lg: '100%',
                            xl: '25rem',
                        },
                        '--Input-paddingInline': '21px',
                        '--Input-radius': '50px',
                        '--Input-decoratorChildHeight': '2.8rem',
                    }}
                    endDecorator={
                        <IconButton variant="solid" color="primary">
                            <SearchIcon />
                        </IconButton>
                    }
                />
            </Sheet>
        </Stack>
    )
}
