import AuthSectionHeader from './AuthSectionHeader'
import { Divider, Sheet, Stack, Typography } from '@mui/joy'
import Link from 'next/link'
import ThemeButton from './ThemeButton'
import { getServerSession } from 'next-auth'
import AddMenuHeader from './AddMenuHeader'
import * as React from 'react'
import { authOptions } from '../../../api/auth/[...nextauth]/options'
import Image from 'next/image'

const pages = ['Products', 'Pricing', 'Blog']
const profileItems = ['Profile', 'Settings', 'Logout']
const navItems = ['Home', 'About', 'Contact']
const drawerWidth = 240

export default async function Header() {
    const session = await getServerSession(authOptions)
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
                    // borderColor: 'divider',
                    borderColor: 'Highlight',
                    boxShadow: 4,
                    height: 'var(--header-height)',
                }}
            >
                {/* <Image
                    src="assets/logo.svg"
                    alt="Dreamz Logo"
                    width={150}
                    height={150}
                /> */}
                <Typography
                    level="h3"
                    prefetch={false}
                    href={'/'}
                    component={Link}
                >
                    Dreamz
                </Typography>
                <Stack
                    component="section"
                    alignItems={'stretch'}
                    direction={'row'}
                    spacing={2}
                    alignContent={'stretch'}
                >
                    <ThemeButton />
                    <AuthSectionHeader session={session} />

                    {session && (
                        <>
                            <Divider
                                orientation="vertical"
                                sx={{
                                    marginRight: 4,
                                }}
                            />
                            <AddMenuHeader />
                        </>
                    )}
                </Stack>
            </Sheet>
        </>
    )
}
