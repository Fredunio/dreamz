'use client'

import {
    Avatar,
    Button,
    Dropdown,
    Menu,
    MenuButton,
    MenuItem,
    Skeleton,
    Stack,
} from '@mui/joy'
import { signOut, useSession } from 'next-auth/react'
import LoginModal from './LoginModal'
import { useState } from 'react'
import SignUpModal from './SignUpModal'
import { Session } from 'next-auth'
import { on } from 'events'

function UserAvatar({ src, name }: { src?: string; name?: string }) {
    return (
        <Avatar
            // component={'button'}
            className="transition-opacity hover:cursor-pointer hover:opacity-95 active:opacity-90"
            src={src}
        />
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
            <Menu>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem
                    onClick={() => {
                        signOut()
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

function AuthButtons({
    onLoginClick,
    onSignUpClick,
}: {
    onLoginClick: () => void
    onSignUpClick: () => void
}) {
    return (
        <Stack component="section" direction={'row'} spacing={2}>
            <Button
                sx={{
                    fontSize: '1rem',
                }}
                variant="outlined"
                size="md"
                color="primary"
                onClick={onLoginClick}
            >
                Login
            </Button>

            <Button
                sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                }}
                variant="solid"
                size="md"
                color="primary"
                onClick={onSignUpClick}
            >
                Sign Up
            </Button>
        </Stack>
    )
}

export default function AuthSectionHeader({
    session,
}: {
    session: Session | null
}) {
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const [signUpModalOpen, setSignUpModalOpen] = useState(false)

    return (
        <>
            {session ? (
                <AvatarButton session={session} />
            ) : (
                <AuthButtons
                    onLoginClick={() => setLoginModalOpen(true)}
                    onSignUpClick={() => setSignUpModalOpen(true)}
                />
            )}

            <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
            <SignUpModal open={signUpModalOpen} setOpen={setSignUpModalOpen} />
        </>
    )
}
