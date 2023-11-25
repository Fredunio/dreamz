'use client'

import {
    Button,
    Chip,
    Divider,
    FormControl,
    FormHelperText,
    LinearProgress,
    Sheet,
    Stack,
    Typography,
} from '@mui/joy'
import GoogleLoginButton from '../buttons/GoogleLoginButton'
import FacebookLoginButton from '../buttons/FacebookLoginButton'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import FloatingLabelInput from '../formElements/FloatingLabelInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InfoOutlined } from '@mui/icons-material'
import { passwordMeter } from '@/app/lib/passwordMeter'
import GithubLoginButton from '../buttons/GithubLoginButton'
import { useEffect, useRef } from 'react'
// import { hashPassword } from '@/app/lib/passwordFunctions'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

const schema = yup.object().shape({
    email: yup.string().email().required('Please enter a valid email'),
    // one special character, one number, one uppercase letter, one lowercase letter
    password: yup.string().required(),
})

type FormData = yup.InferType<typeof schema>

export default function SignInForm() {
    const form = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const searchParams = useSearchParams()
    const router = useRouter()

    const { register, handleSubmit, watch, formState } = form
    const onSubmit = async (data: FormData) => {
        const loginResponse = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        if (loginResponse?.error) {
            console.log(loginResponse.error)
        }

        console.log(loginResponse)
        const redirectTo = searchParams.get('redirectTo')

        if (redirectTo) {
            router.push(redirectTo)
        }

        // router.push('/')
    }

    const didMountRef = useRef(false)
    useEffect(() => {
        didMountRef.current = true
    })
    return (
        <Sheet
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                // alignContent: 'center',
                width: {
                    md: '30rem',
                },
                flexDirection: 'column',
                px: 8,
                py: 6,
                gap: 2,
                borderRadius: 5,
                // backgroundColor: 'inherit',
            }}
            variant="outlined"
            color="neutral"
        >
            <Typography level="h2" mb={4}>
                Sign In
            </Typography>
            <FormControl
                error={Boolean(formState.errors.email)}
                sx={{
                    width: '100%',
                }}
                size="lg"
            >
                <FloatingLabelInput
                    registerProps={register('email')}
                    endDecorator={<AlternateEmailIcon />}
                    label="Email"
                    placeholder="Email"
                />
                {formState.errors.email && (
                    <FormHelperText>
                        <InfoOutlined />
                        {formState.errors.email.message}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl
                error={Boolean(formState.errors.password)}
                sx={{
                    width: '100%',
                }}
                size="lg"
            >
                <FloatingLabelInput
                    registerProps={register('password')}
                    endDecorator={<KeyIcon />}
                    label="Password"
                    placeholder="Password"
                    type="password"
                />
            </FormControl>
            <Button
                type="submit"
                variant="solid"
                color="primary"
                size="lg"
                fullWidth
                disabled={!didMountRef || formState.isSubmitting}
            >
                Login
            </Button>
            <Divider
                sx={{
                    my: 1,
                }}
            >
                <Chip variant="soft" color="neutral" size="sm">
                    or
                </Chip>
            </Divider>
            <Stack direction={'row'} spacing={2} width={'100%'}>
                <GoogleLoginButton
                    onClick={() => {
                        signIn('google')
                    }}
                />
                <FacebookLoginButton
                    onClick={() => {
                        signIn('facebook')
                    }}
                ></FacebookLoginButton>
                <GithubLoginButton
                    onClick={() => {
                        signIn('github')
                    }}
                ></GithubLoginButton>
            </Stack>
            <Typography mt={2} level="body-sm">
                Don&apos;t have an account?{' '}
                <Typography
                    // level="body-sm"
                    component="a"
                    href="/auth/signUp"
                    color="primary"
                >
                    Sign Up
                </Typography>
            </Typography>
        </Sheet>
    )
}
