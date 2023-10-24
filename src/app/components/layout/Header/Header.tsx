import AuthSectionHeader from './AuthSectionHeader'
import { Sheet, Stack, Typography, getInitColorSchemeScript } from '@mui/joy'
import Link from 'next/link'
import ThemeButton from './ThemeButton'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

const pages = ['Products', 'Pricing', 'Blog']
const profileItems = ['Profile', 'Settings', 'Logout']
const navItems = ['Home', 'About', 'Contact']
const drawerWidth = 240

export default async function Header() {
    const session = await getServerSession(options)
    return (
        <>
            <Sheet
                id="main-header"
                component="header"
                sx={{
                    position: 'sticky',
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    px: 4,
                    py: 2,
                    top: 0,
                    zIndex: 3,
                    bgcolor: 'background.default',
                    borderBottom: 1,
                    borderColor: 'divider',
                    boxShadow: 4,
                    height: 'var(--header-height)',
                }}
            >
                <Typography
                    level="h4"
                    prefetch={false}
                    href={'/'}
                    component={Link}
                >
                    Dreamz
                </Typography>
                <Stack component="section" direction={'row'} spacing={4}>
                    <ThemeButton />
                    <AuthSectionHeader session={session} />
                </Stack>
            </Sheet>
        </>
    )
}
