import React from 'react'
import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    ListItemDecorator,
    Sheet,
    Stack,
    Typography,
} from '@mui/joy'
import { KeyboardArrowRight } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import DashboardNav from './DashboardNav'
import HomeIcon from '@mui/icons-material/Home'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            mx={'auto'}
            maxWidth={'var(--max-page-width)'}
            py={{
                md: 5,
                lg: 10,
            }}
            px={{
                md: 10,
                lg: 20,
            }}
        >
            <Stack
                direction={'column'}
                alignItems={'stretch'}
                sx={{ width: '100%' }}
            >
                <Sheet
                    variant="plain"
                    sx={{ p: 4, backgroundColor: 'transparent' }}
                >
                    <Typography level="h1" component={'h1'}>
                        {/* <HomeIcon sx={{ mr: 2 }} /> */}
                        Dashboard
                    </Typography>
                </Sheet>

                <Grid
                    mt={4}
                    columnGap={4}
                    width={'100%'}
                    container
                    sx={{ flexGrow: 1, position: 'relative' }}
                >
                    <DashboardNav />
                    <Grid xs>
                        <Sheet
                            //  variant="plain"
                            sx={{
                                height: '100%',
                                backgroundColor: 'transparent',
                            }}
                        >
                            {children}
                        </Sheet>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    )
}
