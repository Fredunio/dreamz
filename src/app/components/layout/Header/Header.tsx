'use client'

import AuthSectionHeader from './AuthSectionHeader'

import MenuIcon from '@mui/icons-material/Menu'

import { Sheet, Typography } from '@mui/joy'
import { useState } from 'react'
import Link from 'next/link'
import ThemeButton from './ThemeButton'
import RightGroup from './RightGroup'

const pages = ['Products', 'Pricing', 'Blog']
const profileItems = ['Profile', 'Settings', 'Logout']
const navItems = ['Home', 'About', 'Contact']
const drawerWidth = 240

export default function Header() {
    return (
        <Sheet
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
                zIndex: 1,
                bgcolor: 'background.backdrop',
                boxShadow: 4,
            }}
        >
            <Typography level="h4" component="h1">
                Dreamz
            </Typography>
            <RightGroup />
        </Sheet>
    )
}
