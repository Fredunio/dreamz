'use client'

import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Option,
    Select,
    Stack,
    Textarea,
    Typography,
} from '@mui/joy'
import Image from 'next/image'
import * as React from 'react'
import DashboardSectionHeader from '../DashboardSectionHeader'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { VisuallyHiddenInput } from '../../components/layout/forms/VisuallyHiddenInput'
import { getUser } from '../../lib/fetchers/users/getUser'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getZodiacSigns } from '../../lib/fetchers/zodiacSigns/getZodiacSigns'
import EditIcon from '@mui/icons-material/Edit'
import toast from 'react-hot-toast'
import { updateProfile } from '../../lib/fetchers/profiles/updateProfile'
import { parseDatabaseName } from '../../utils/helpers'
import { User, ZodiacSign } from '@prisma/client'

const schema = yup.object().shape({
    username: yup.string().required(),
    bio: yup.string(),
    showEmail: yup.boolean(),
    showBirthday: yup.boolean(),
    birthday: yup.date().nullable(),
    zodiac: yup.string().nullable(),
})

type ProfileFormValues = yup.InferType<typeof schema>

export default function ProfileForm({
    user,
    zodiacSigns,
}: {
    user: User | undefined
    zodiacSigns: ZodiacSign[]
}) {
    const {
        register,
        setValue,
        handleSubmit,
        getValues,
        watch,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: async () => {
            console.log('profile in defaultV: ', user)
            return {
                username: user?.username || '',
                bio: user?.bio || undefined,
                // avatar: user?.image || null,
                // background: user?.background || null,
                showEmail: user?.showEmail || false,
                showBirthday: user?.showBirthday || false,
                birthday: user?.birthday ? new Date(user?.birthday) : null,
                zodiac: user?.zodiac || null,
            }
        },
    })

    console.log('user profile: ', user)

    const profileMutation = useMutation({
        mutationKey: ['edit_profile'],
        mutationFn: updateProfile,

        onMutate() {
            const loadingToastId = toast.loading('Updating profile...')
            return { loadingToastId }
        },
        onError: (error: any, variables, context) => {
            toast.remove(context?.loadingToastId)
            toast.error('Something went wrong!')
        },
        onSuccess: (data, variables, context) => {
            toast.remove(context?.loadingToastId)
            toast.success('Profile updated!')
        },
    })

    const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
        console.log('submit data: ', data)

        profileMutation.mutate({
            id: user?.id!,
            body: data,
        })
    }

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

                    <label
                        htmlFor="avatar-upload"
                        className="aspect-square group h-full rounded-lg overflow-hidden  bg-blue-400 relative transition-opacity hover:cursor-pointer hover:opacity-80 active:opacity-70"
                        tabIndex={1}
                        // variant="solid"
                        // color="primary"
                    >
                        <Image
                            className="object-contain"
                            src={
                                'https://avatars.githubusercontent.com/u/58823013?v=4'
                            }
                            alt={'Avatar'}
                            width={200}
                            height={200}
                            // fill={true}
                        />
                        <VisuallyHiddenInput
                            id="avatar-upload"
                            tabIndex={-1}
                            // {...register('avatar')}
                            type="file"
                            accept="image/png, image/jpeg, image/gif, image/webp,"
                            multiple={false}
                        />
                    </label>
                </FormControl>

                <FormControl
                    sx={{
                        width: '100%',
                        display: 'flex',
                        height: '20rem',
                    }}
                    size={'lg'}
                >
                    <FormLabel>Background</FormLabel>

                    <label
                        htmlFor="background-upload"
                        className="h-full w-full  rounded-lg overflow-hidden relative transition-opacity hover:cursor-pointer hover:opacity-80 active:opacity-70"
                        tabIndex={1}
                        // variant="solid"
                        // color="primary"
                    >
                        <Image
                            className="object-cover"
                            src={
                                'https://images.unsplash.com/photo-1698325650945-d957745b30d1?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            }
                            alt={'Background'}
                            fill={true}
                        />
                        <VisuallyHiddenInput
                            id="background-upload"
                            tabIndex={-1}
                            // {...register('background')}
                            type="file"
                            accept="image/png, image/jpeg, image/gif, image/webp,"
                            multiple={false}
                        />
                    </label>
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
                            {...register('username')}
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
                    spacing={4}
                >
                    <FormControl
                        sx={{
                            width: '100%',
                        }}
                        size={'lg'}
                    >
                        <FormLabel>Birdthday 🎂</FormLabel>
                        <Input
                            {...register('birthday')}
                            type="date"
                            variant="outlined"
                            color="primary"
                        />
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
                            onChange={(e, newValue) => {
                                if (typeof newValue === 'string') {
                                    setValue('zodiac', newValue)
                                }
                            }}
                            // {...register('zodiac')}
                            value={watch('zodiac')}
                            variant="outlined"
                            color="primary"
                            placeholder="Add zodiac sign..."
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Option value="">None</Option>

                            {zodiacSigns &&
                                zodiacSigns.map((zodiac) => (
                                    <Option
                                        key={zodiac.name}
                                        value={zodiac.name}
                                    >
                                        {parseDatabaseName(zodiac.name)}
                                    </Option>
                                ))}
                        </Select>

                        {/* <FormHelperText>Name of your dream</FormHelperText> */}
                    </FormControl>
                </Stack>
                <FormControl size={'lg'}>
                    <FormLabel>Bio</FormLabel>
                    <Textarea
                        {...register('bio')}
                        variant="outlined"
                        color="primary"
                        placeholder="Tell about yourself..."
                        sx={{
                            width: '100%',
                        }}
                        endDecorator={
                            <Typography level="body-xs" sx={{ ml: 'auto' }}>
                                {watch('bio')?.length || 0} character(s)
                            </Typography>
                        }
                    />
                </FormControl>

                <Stack direction={'row'} gap={6}>
                    <Stack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row'}
                        spacing={4}
                    >
                        <FormControl size="lg">
                            <Checkbox
                                {...register('showEmail')}
                                color="primary"
                                variant="outlined"
                                label="Show email"
                            />
                        </FormControl>
                    </Stack>
                    <Stack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row'}
                        spacing={4}
                    >
                        <FormControl size="lg">
                            <Checkbox
                                {...register('showBirthday')}
                                color="primary"
                                variant="outlined"
                                label="Show birthday"
                            />
                        </FormControl>
                    </Stack>
                </Stack>
                <Stack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                    mt={4}
                >
                    <Button size="lg" variant="outlined" color="danger">
                        Cancel
                    </Button>
                    <Button
                        loading={isSubmitting}
                        onClick={handleSubmit(onSubmit)}
                        size="lg"
                        variant="solid"
                        color="success"
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    )
}
