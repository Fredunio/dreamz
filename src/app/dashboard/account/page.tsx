import { Button, FormControl, FormLabel, Input, Stack, SvgIcon } from '@mui/joy'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import React from 'react'
import DashboardSectionHeader from '../DashboardSectionHeader'
import { DeleteForever } from '@mui/icons-material'

export default function DashboardProfile() {
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            spacing={8}
            sx={{
                width: '100%',
            }}
        >
            <DashboardSectionHeader
                title={'Account'}
                subtitle={'Manage your account information'}
            />
            <Stack
                spacing={6}
                sx={{
                    p: 4,
                    width: '100%',
                }}
                direction={'column'}
            >
                <FormControl size={'lg'}>
                    <FormLabel>Email</FormLabel>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={4}
                    >
                        <Input
                            type="email"
                            variant="outlined"
                            color="primary"
                            placeholder="Add name..."
                            sx={{
                                width: '100%',
                            }}
                        />
                        <Button
                            sx={{
                                whiteSpace: 'nowrap',
                            }}
                            color="primary"
                            variant="solid"
                        >
                            Change Email
                        </Button>
                    </Stack>
                </FormControl>

                <FormControl size={'lg'}>
                    <FormLabel>Password</FormLabel>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={4}
                    >
                        <Input
                            type="password"
                            variant="outlined"
                            color="primary"
                            placeholder="Add name..."
                            sx={{
                                width: '100%',
                            }}
                        />
                        <Button
                            sx={{
                                whiteSpace: 'nowrap',
                            }}
                            color="primary"
                            variant="solid"
                        >
                            Change Password
                        </Button>
                    </Stack>
                </FormControl>

                <FormControl size="lg">
                    <FormLabel>Actions</FormLabel>
                    <Stack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row'}
                        spacing={8}
                    >
                        <Button
                            size="lg"
                            variant="outlined"
                            color="warning"
                            sx={{
                                width: '100%',
                            }}
                            endDecorator={<DeleteForever />}
                        >
                            Delete Account
                        </Button>
                        <Button
                            size="lg"
                            variant="outlined"
                            color="primary"
                            sx={{
                                width: '100%',
                            }}
                            endDecorator={<AcUnitIcon />}
                        >
                            Freeze Account
                        </Button>
                        <Button
                            size="lg"
                            variant="outlined"
                            color="success"
                            sx={{
                                width: '100%',
                            }}
                            // endDecorator={<
                        >
                            Activate Account
                        </Button>
                    </Stack>
                </FormControl>

                {/* <Stack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                    mt={4}
                >
                    <Button size="lg" variant="outlined" color="neutral">
                        Cancel
                    </Button>
                    <Button size="lg" variant="solid" color="success">
                        Save
                    </Button>
                </Stack> */}
            </Stack>
        </Stack>
    )
}
