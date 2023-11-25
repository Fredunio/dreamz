import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Option,
    Select,
    Stack,
} from '@mui/joy'
import Image from 'next/image'
import * as React from 'react'
import DashboardSectionHeader from '../DashboardSectionHeader'

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
                title={'Profile'}
                subtitle={'Manage your profile information'}
            />
            <Stack
                spacing={6}
                sx={{
                    p: 4,
                    width: '100%',
                }}
                direction={'column'}
            >
                <FormControl
                    sx={{
                        width: '100%',
                        display: 'flex',
                        height: '12rem',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                    size={'lg'}
                >
                    <FormLabel>Avatar</FormLabel>

                    <button
                        title="Upload avatar"
                        type="button"
                        className="aspect-square h-full rounded-lg overflow-hidden  bg-blue-400 relative transition-opacity hover:cursor-pointer hover:opacity-95 active:opacity-90"
                    >
                        <Image
                            className="object-contain"
                            src={
                                'https://avatars.githubusercontent.com/u/58823013?v=4'
                            }
                            alt={'Avatar'}
                            fill={true}
                        />
                    </button>
                </FormControl>
                <FormControl
                    sx={{
                        width: '100%',
                        display: 'flex',
                        height: '18rem',
                    }}
                    size={'lg'}
                >
                    <FormLabel>Background</FormLabel>

                    <Button
                        color="neutral"
                        variant="soft"
                        // sx={{
                        //     backgroundColor: 'Background',
                        // }}
                        title="Upload Background"
                        type="button"
                        className="h-full w-full rounded-lg overflow-hidden relative transition-opacity hover:cursor-pointer hover:opacity-95 active:opacity-90"
                    >
                        <Image
                            className="object-cover"
                            src={
                                'https://images.unsplash.com/photo-1698325650945-d957745b30d1?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            }
                            alt={'Avatar'}
                            fill={true}
                        />
                    </Button>
                </FormControl>

                <FormControl size={'lg'}>
                    <FormLabel>Username</FormLabel>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={4}
                    >
                        <Input
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
                            Check availability
                        </Button>
                    </Stack>
                </FormControl>

                <Stack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                    spacing={6}
                >
                    <FormControl
                        sx={{
                            width: '100%',
                        }}
                        size={'lg'}
                    >
                        <FormLabel>Birdthday 🎂</FormLabel>
                        <Input type="date" variant="outlined" color="primary" />
                        {/* <FormHelperText>
                            This is the date of your dream
                        </FormHelperText> */}
                    </FormControl>

                    <FormControl
                        sx={{
                            width: '100%',
                        }}
                        size={'lg'}
                    >
                        <FormLabel>Zodiac Sign 🌠</FormLabel>
                        <Select
                            variant="outlined"
                            color="primary"
                            placeholder="Add zodiac sign..."
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Option value="aries">Aries</Option>
                            <Option value="taurus">Taurus</Option>
                            <Option value="gemini">Gemini</Option>
                            <Option value="cancer">Cancer</Option>
                            <Option value="leo">Leo</Option>
                            <Option value="virgo">Virgo</Option>
                            <Option value="libra">Libra</Option>
                            <Option value="scorpio">Scorpio</Option>
                            <Option value="sagittarius">Sagittarius</Option>
                            <Option value="capricorn">Capricorn</Option>
                            <Option value="aquarius">Aquarius</Option>
                            <Option value="pisces">Pisces</Option>
                        </Select>

                        {/* <FormHelperText>Name of your dream</FormHelperText> */}
                    </FormControl>
                </Stack>

                <Stack direction={'column'}>
                    <Stack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row'}
                        spacing={4}
                    >
                        <FormControl size="lg">
                            <Checkbox label="Show email" />
                        </FormControl>
                    </Stack>
                </Stack>
                <Stack
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
                </Stack>
            </Stack>
        </Stack>
    )
}
