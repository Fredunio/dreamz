import { Avatar, Button, Stack } from '@mui/joy'
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
            // sx={{ ml: 'auto' }}
        >
            <Button
                sx={{
                    fontSize: '1rem',
                    // fontWeight: 'bold',
                }}
                variant="outlined"
                size="md"
                color="primary"
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
            >
                Sign Up
            </Button>
        </Stack>
    )
}
