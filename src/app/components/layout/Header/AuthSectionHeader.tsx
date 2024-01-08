'use client'

import {
    Avatar,
    Button,
    Dropdown,
    ListDivider,
    Menu,
    MenuButton,
    MenuItem,
    Stack,
} from '@mui/joy'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import * as React from 'react'
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream'
import Image from 'next/image'
import clsx from 'clsx'

function AuthButtons() {
    // {
    //   onLoginClick,
    //   onSignUpClick,
    // }: {
    //   onLoginClick: () => void
    //   onSignUpClick: () => void
    // }
    return (
        <Stack component="section" direction={'row'} spacing={2}>
            <Button
                component={'a'}
                href={'/auth/signIn'}
                sx={{
                    fontSize: '1rem',
                }}
                variant="outlined"
                size="md"
                color="primary"
                // onClick={onLoginClick}
            >
                Login
            </Button>

            <Button
                component={'a'}
                href={'/auth/signUp'}
                sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
                variant="solid"
                size="md"
                color="primary"
                // onClick={onSignUpClick}
            >
                Sign Up
            </Button>
        </Stack>
    )
}

function UserAvatar({ src, name }: { src?: string; name?: string }) {
    const avatarClasses = clsx(
        'transition-opacity hover:cursor-pointer hover:opacity-95 active:opacity-90'
    )

    if (!src) {
        return <Avatar className={avatarClasses} src={src} />
    }

    return (
        <Avatar className={avatarClasses}>
            <Image
                src={src}
                alt={name || 'User Avatar'}
                width={40}
                height={40}
            />
        </Avatar>
    )
}

function AvatarButton({ session }: { session: Session }) {
    return (
        <Dropdown>
            <MenuButton sx={{ borderRadius: 40, padding: 0 }}>
                <UserAvatar
                    name={session.user?.name || undefined}
                    src={session.user?.image || undefined}
                />
            </MenuButton>
            <Menu placement="bottom-end" size="lg">
                <MenuItem
                    sx={{
                        px: 4,
                        gap: 2,
                    }}
                    href="/dashboard"
                    component="a"
                >
                    <AccountBoxIcon color="action" />
                    Profile
                </MenuItem>
                <MenuItem
                    sx={{
                        px: 4,
                        gap: 2,
                    }}
                    href="/profile/dreams"
                    component="a"
                >
                    <SettingsSystemDaydreamIcon />
                    My Dreams
                </MenuItem>

                <MenuItem
                    sx={{
                        px: 4,
                        gap: 2,
                    }}
                >
                    <SettingsIcon />
                    Settings
                </MenuItem>
                <ListDivider />
                <MenuItem
                    sx={{
                        px: 4,
                        gap: 2,
                    }}
                    onClick={() => {
                        signOut()
                    }}
                >
                    <LogoutIcon />
                    Logout
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

export default function AuthSectionHeader({
    session,
}: {
    session: Session | null
}) {
    // IDK if modals are necessary
    // const [loginModalOpen, setLoginModalOpen] = useState(false)
    // const [signUpModalOpen, setSignUpModalOpen] = useState(false)

    return (
        <>
            {session ? (
                <AvatarButton session={session} />
            ) : (
                <AuthButtons
                // onLoginClick={() => setLoginModalOpen(true)}
                // onSignUpClick={() => setSignUpModalOpen(true)}
                />
            )}

            {/*<LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />*/}
            {/*<SignUpModal open={signUpModalOpen} setOpen={setSignUpModalOpen} />*/}
        </>
    )
}
