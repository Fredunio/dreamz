import { Avatar, Button, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function AuthSectionHeader() {
    // const session = useSession()
    // if (session) {
    //     return (
    //         <Stack
    //             component="section"
    //             direction={'row'}
    //             spacing={2}
    //             sx={{ p: 2 }}
    //         >
    //             {session.data?.user?.image && (
    //                 <Avatar src={session.data?.user?.image} />
    //             )}
    //             <Button variant="contained" color="primary">
    //                 Logout
    //             </Button>
    //         </Stack>
    //     )
    // }

    return (
        <Stack
            component="section"
            direction={'row'}
            spacing={2}
            sx={{ p: 2, ml: 'auto' }}
        >
            <Button variant="contained" color="primary">
                Login
            </Button>
            <Button variant="contained" color="secondary">
                Sign Up
            </Button>
        </Stack>
    )
}
