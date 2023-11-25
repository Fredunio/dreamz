'use client'

import {
    Button,
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
import { minPasswordLength } from '@/app/lib/variables'
import { InfoOutlined } from '@mui/icons-material'
import { passwordMeter } from '@/app/lib/passwordMeter'
import GithubLoginButton from '../buttons/GithubLoginButton'
import { useEffect, useRef } from 'react'
// import { hashPassword } from '@/app/lib/passwordFunctions'
import { signIn } from 'next-auth/react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const schema = yup.object().shape({
    email: yup.string().email().required('Please enter a valid email'),
    // one special character, one number, one uppercase letter, one lowercase letter
    password: yup
        .string()
        .min(
            minPasswordLength,
            `Password must be at least ${minPasswordLength} characters`
        )
        .required()
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(
            /[A-Z]/,
            'Password must contain at least one uppercase letter'
        ),
})

type FormData = yup.InferType<typeof schema>

export default function SignUpForm() {
    const form = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    })

    const { register, handleSubmit, watch, formState } = form
    const router = useRouter()
    const onSubmit = async (data: FormData) => {
        const { email, password } = data
        try {
            const response = await axios.post('/api/auth/signUp', {
                email,
                password,
            })

            if (response.status === 200) {
                toast.success('Account created successfully')
            } else {
                toast.error(response.data.message)
            }

            router.push('/auth/signIn')
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    const pw = watch('password')

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
                Sign Up
            </Typography>
            <FormControl
                error={!!formState.errors.email}
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
                {/* <FormLabel>Email</FormLabel>
                <Input
                    startDecorator={<AlternateEmailIcon />}
                    fullWidth={true}
                /> */}
            </FormControl>

            <FormControl
                error={!!formState.errors.password}
                sx={{
                    width: '100%',
                }}
                size="lg"
            >
                <Stack
                    spacing={1}
                    sx={{
                        '--hue': Math.min(pw.length * 10, 120),
                    }}
                >
                    <FloatingLabelInput
                        registerProps={register('password')}
                        endDecorator={<KeyIcon />}
                        label="Password"
                        placeholder="Password"
                        type="password"
                    />
                    {formState.errors.password && (
                        <FormHelperText>
                            <InfoOutlined />
                            {formState.errors.password.message}
                        </FormHelperText>
                    )}
                    {pw.length > 0 && (
                        <>
                            <LinearProgress
                                determinate
                                size="sm"
                                value={
                                    (Number(passwordMeter(pw).score) + 1) * 20
                                }
                                sx={{
                                    bgcolor: 'background.level3',
                                    color: 'hsl(var(--hue) 80% 40%)',
                                }}
                            />
                            <Typography
                                level="body-xs"
                                sx={{
                                    alignSelf: 'flex-end',
                                    color: 'hsl(var(--hue) 80% 30%)',
                                }}
                            >
                                {passwordMeter(pw).strength}
                                {/* {pw.length < 3 && 'Very weak'}
                                {pw.length >= 3 && pw.length < 6 && 'Weak'}
                                {pw.length >= 6 && pw.length < 10 && 'Strong'}
                                {pw.length >= 10 && 'Very strong'} */}
                            </Typography>
                        </>
                    )}
                </Stack>

                {/* <FormLabel>Repeat Password</FormLabel> */}
                {/* <Input startDecorator={<KeyIcon />} fullWidth={true} /> */}
            </FormControl>
            <Button
                type="submit"
                variant="solid"
                color="primary"
                size="lg"
                fullWidth
                disabled={!didMountRef || formState.isSubmitting}
            >
                Sign Up
            </Button>
            <Divider
                sx={{
                    my: 1,
                }}
            >
                or
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
                Already have an account?{' '}
                <Typography
                    // level="body-sm"
                    component="a"
                    href="/auth/signIn"
                    color="primary"
                >
                    Sign In
                </Typography>
            </Typography>
        </Sheet>
    )
}
