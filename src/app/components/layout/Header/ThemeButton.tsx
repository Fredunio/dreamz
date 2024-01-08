'use client'

import IconButton from '@mui/joy/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useColorScheme } from '@mui/joy'
import { useEffect, useState } from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'

function ThemeButton() {
    const { mode, setMode } = useColorScheme()
    const [mounted, setMounted] = useState(false)

    // necessary for server-side rendering
    // because mode is undefined on the server
    useEffect(() => {
        setMounted(true)
    }, [])
    if (!mounted) {
        return null
    }

    return (
        <IconButton
            sx={{
                borderRadius: '99%',
                // ml: 'auto',
            }}
            variant="plain"
            onClick={() => {
                setMode(mode === 'dark' ? 'light' : 'dark')
            }}
        >
            {mode === 'light' ? (
                <span className="text-2xl">🕶️</span>
            ) : (
                // <DarkModeIcon />
                <span className="text-2xl">💡</span>
            )}
            {/* <LightModeIcon /> */}
        </IconButton>
    )
}

export default ThemeButton
