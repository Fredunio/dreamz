'use client'

import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemDecorator,
    ListItemContent,
    ListDivider,
} from '@mui/joy'
import { KeyboardArrowRight } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Face3Icon from '@mui/icons-material/Face3'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { usePathname } from 'next/navigation'

const navLinks = [
    {
        name: 'Profile',
        href: '/dashboard/profile',
        icon: <PersonIcon />,
    },
    {
        name: 'Journal',
        href: '/dashboard/journal',
        icon: <AutoStoriesIcon />,
    },

    {
        name: 'Dreams',
        href: '/dashboard/dreams',
        icon: <AutoAwesomeIcon />,
    },
    {
        name: 'Dreamons',
        href: '/dashboard/dreamons',
        icon: <Face3Icon />,
    },
    {
        name: 'Account',
        href: '/dashboard/account',
        icon: <AdminPanelSettingsIcon />,
    },
]

export default function DashboardNav() {
    const pathname = usePathname()

    return (
        <Grid
            xs={3}
            sx={{
                position: 'sticky',
                // top: 'var(--header-height)',
            }}
        >
            <List
                component="nav"
                size="lg"
                variant="plain"
                sx={{
                    rowGap: '0.5rem',
                    border: 'none',
                    '--List-padding': '0px',
                    '--ListItem-paddingY': '1rem',
                    '--ListDivider-gap': '0px',
                    height: '100%',
                }}
            >
                {navLinks.map((link) => (
                    <>
                        <ListItem
                            href={link.href}
                            component={'a'}
                            key={link.name}
                        >
                            <ListItemButton
                                variant="outlined"
                                color="neutral"
                                selected={pathname === link.href}
                                sx={{
                                    borderRadius: '8px',
                                    maxHeight: '2rem',
                                }}
                            >
                                <ListItemDecorator>
                                    {link.icon}
                                </ListItemDecorator>
                                <ListItemContent
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {link.name}
                                </ListItemContent>
                                <KeyboardArrowRight />
                            </ListItemButton>
                        </ListItem>
                    </>
                ))}
            </List>
        </Grid>
    )
}
