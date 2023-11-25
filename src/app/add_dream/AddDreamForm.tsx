'use client'

import {
    Autocomplete,
    Button,
    Checkbox,
    Chip,
    FormHelperText,
    FormLabel,
    Input,
    Option,
    Select,
    Stack,
    SvgIcon,
} from '@mui/joy'
import FormControl from '@mui/joy/FormControl'
import { Editor } from '@tinymce/tinymce-react'
import { useCallback, useRef } from 'react'
import Close from '@mui/icons-material/Close'
import { VisuallyHiddenInput } from '../components/layout/forms/VisuallyHiddenInput'
import { parseDatabaseName } from '../utils/helpers'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getDreamCategories } from '../lib/fetchers/dreams/getDreamCategories'
import { getEmotions } from '../lib/fetchers/getEmotions'
import ImagePreview from '../components/formElements/ImagePreview'
import * as React from 'react'
import FieldErrorMessage from '../components/formElements/FieldErrorMessage'
import { postDreamEntity } from '../lib/fetchers/dreams/postDreamEntity'
import toast from 'react-hot-toast'

// TODO: implement saving form data to session storage

const editor_api_key = process.env.NEXT_PUBLIC_TINY_API_KEY

const schema = yup
    .object({
        name: yup.string().required("Dream's name is required"),
        date: yup.date().nullable().defined(),
        categoryId: yup.number().required('Category is required'),
        emotions: yup.array().of(yup.number().required()).defined(),
        story: yup.string().required('Story is required'),
        image: yup.mixed(),
        inputTag: yup.string(),
        tags: yup.array().of(yup.string().required()).defined(),
        isPrivate: yup.boolean().required(),
        disableComments: yup.boolean().required(),
        disableLikes: yup.boolean().required(),
    })
    .required()

export default function AddDreamForm({ tinyApiKey }: { tinyApiKey?: string }) {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting, isLoading, isValidating },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            date: new Date(),
            categoryId: undefined,
            emotions: [],
            story: '',
            image: '',
            inputTag: '',
            tags: [],
            isPrivate: false,
            disableComments: false,
            disableLikes: false,
        },
    })

    const { data: categoriesData } = useQuery({
        queryKey: ['dream_categories'],
        queryFn: getDreamCategories,
    })

    const { data: emotionsData } = useQuery({
        queryKey: ['emotions'],
        queryFn: getEmotions,
    })

    const dreamMutation = useMutation({
        mutationKey: ['create_dream'],
        mutationFn: postDreamEntity,

        onMutate() {
            const loadingToastId = toast.loading('Adding dream...')
            return { loadingToastId }
        },
        onError: (error: any, variables, context) => {
            toast.remove(context?.loadingToastId)
            toast.error('Something went wrong!')
            console.log('mutation error: ', error)
        },
        onSuccess: (data, variables, context) => {
            toast.remove(context?.loadingToastId)
            toast.success('Dream added successfully!')
            console.log('mutation success: ', data)
        },
    })

    const addToTags = useCallback(
        (tag: string | undefined | null) => {
            //     check if tag is already in tags, or is empty
            if (!tag || !tag.trim()) {
                return
            }

            if (tag.length < 3) {
                //   toast.error('Tag must be at least 3 characters long')
                toast('Tag must be at least 3️⃣ characters long')
                return
            }

            if (tag.length > 20) {
                //   toast.error('Tag must be less than 20 characters long')
                toast('Tag must be less than 2️⃣0️⃣ characters long')
                return
            }

            // TODO: if already in tags highlight chip

            if (getValues('tags').includes(tag)) {
                return
            }

            if (getValues('tags').length >= 5) {
                return
            }

            setValue('tags', [...getValues('tags'), tag])
            setValue('inputTag', '')
        },
        [getValues, setValue]
    )

    const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = (data) => {
        const { emotions, tags, inputTag, image, ...dreamInput } = data

        const formData = new FormData()

        formData.append('image', image[0])

        tags.forEach((tag) => {
            formData.append(`tags[]`, tag)
        })

        emotions.forEach((emotion) => {
            formData.append(`emotions[]`, emotion.toString())
        })

        formData.append('dreamInput', JSON.stringify(dreamInput))

        dreamMutation.mutate(formData)

        // dreamMutation.mutate({
        //     dreamInput: { ...dreamInput },
        //     emotions: emotions,
        //     tags: data.tags,
        // })
    }

    const editorRef = useRef<null | {
        getContent: () => string
    }>(null)

    const image = watch('image') as FileList | undefined

    return (
        <Stack
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            spacing={6}
            direction={'column'}
            encType="multipart/form-data"
        >
            <FormControl size={'lg'}>
                <FormLabel>Name</FormLabel>
                <Input
                    autoComplete={'off'}
                    {...register('name')}
                    variant="outlined"
                    color="primary"
                    placeholder="Add name..."
                />
                <FieldErrorMessage error={errors.name?.message} />
            </FormControl>

            <Stack
                justifyContent={'space-between'}
                alignItems={'self-start'}
                direction={'row'}
                spacing={6}
            >
                <FormControl
                    sx={{
                        width: '100%',
                    }}
                    size={'lg'}
                >
                    <FormLabel>Date 📆</FormLabel>
                    <Input
                        {...register('date')}
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
                    <FormLabel>Category</FormLabel>
                    <Select
                        {...register('categoryId')}
                        variant="outlined"
                        color="primary"
                        placeholder="Select category..."
                    >
                        {categoriesData?.categories.map((category) => (
                            <Option
                                key={Number(category.id)}
                                value={category.id}
                            >
                                {parseDatabaseName(category.name)}
                            </Option>
                        ))}
                    </Select>
                    <FieldErrorMessage error={errors.categoryId?.message} />
                </FormControl>
            </Stack>

            <FormControl size={'lg'}>
                <FormLabel>Emotions 😴</FormLabel>
                <Autocomplete
                    color="primary"
                    variant="outlined"
                    multiple
                    id="emotions"
                    placeholder="Emotions"
                    options={emotionsData?.emotions || []}
                    getOptionLabel={(option) =>
                        parseDatabaseName(
                            `${parseDatabaseName(option.name)} ${option.emoji}`
                        )
                    }
                    renderTags={(tags, getTagProps) =>
                        tags.map((item, index) => (
                            // eslint-disable-next-line react/jsx-key
                            <Chip
                                variant="solid"
                                color="primary"
                                startDecorator={item.emoji}
                                endDecorator={<Close fontSize="large" />}
                                {...getTagProps({ index })}
                                key={Number(item.id)}
                            >
                                {parseDatabaseName(item.name)}
                            </Chip>
                        ))
                    }
                />
                <FormHelperText>
                    Here you can add emotions to your dream
                </FormHelperText>
            </FormControl>

            <FormControl size={'lg'}>
                <FormLabel>Story 📖</FormLabel>
                <FormHelperText>
                    This is the story of your dream. You can describe your dream
                    including location, people, and other details.
                </FormHelperText>
                <Editor
                    init={{
                        // TODO: change the skin when dark/light mode is toggled
                        skin: 'oxide-dark',
                        content_css: 'dark',
                        statusbar: false,
                        plugins:
                            'preview searchreplace autolink autosave visualblocks visualchars fullscreen link pagebreak nonbreaking anchor insertdatetime advlist lists wordcount quickbars emoticons',

                        quickbars_insert_toolbar: false,
                        quickbars_image_toolbar: false,
                        a11y_advanced_options: true,
                        toolbar:
                            'undo redo |  blocks fontfamily fontsize forecolor | bold italic strikethrough | bullist numlist |  alignleft aligncenter alignright alignjustify | outdent indent',
                    }}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    apiKey={editor_api_key}
                    onEditorChange={(e) => {
                        setValue('story', e)
                    }}
                    initialValue="<p>This is the initial content of the editor</p>"
                    {...register('story')}
                />

                <FieldErrorMessage error={errors.story?.message} />
            </FormControl>
            <FormControl
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
                size="lg"
            >
                <FormLabel htmlFor="upload-button">Front Image</FormLabel>

                <Button
                    id="upload-button"
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    variant="solid"
                    color="primary"
                    startDecorator={
                        <SvgIcon>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                        </SvgIcon>
                    }
                >
                    Upload a front image
                    <VisuallyHiddenInput
                        {...register('image')}
                        // onChange={(e) => {
                        //     const file = e.target.files?.[0]
                        //     console.log('image: ', getValues('image'))
                        //     console.log(
                        //         'image watch: ',
                        //         watch('image')
                        //     )
                        //     // check file size less than 5mb
                        //     if (file && file.size > 5000000) {
                        //         console.log('file size is too big')
                        //         setError('image', {
                        //             type: 'maxSize',
                        //             message:
                        //                 'Image size must be less than 5mb',
                        //         })
                        //     }
                        // }}
                        type="file"
                        accept="image/png, image/jpeg, image/gif, image/webp,"
                        multiple={false}
                    />
                </Button>

                <ImagePreview
                    src={image?.[0] && URL.createObjectURL(image[0])}
                    onRemove={() => {
                        setValue('image', '')
                    }}
                    containerClassName={'mt-4'}
                    alt={'Front Image'}
                />
                <FieldErrorMessage error={errors.image?.message?.toString()} />
            </FormControl>

            <FormControl size="lg">
                <FormLabel>Tags</FormLabel>

                <Input
                    {...register('inputTag')}
                    endDecorator={
                        <Button
                            variant="solid"
                            color="primary"
                            onClick={(e) =>
                                addToTags(getValues('inputTag')?.toLowerCase())
                            }
                            startDecorator={
                                <SvgIcon>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </SvgIcon>
                            }
                        >
                            Add
                        </Button>
                    }
                    variant="outlined"
                    color="primary"
                    placeholder="Add tags..."
                    onKeyDown={(e) => {
                        // TODO: fix so after enter is pressed, the name field is not focused
                        if (e.key === 'Enter') {
                            addToTags(getValues('inputTag'))
                        }
                    }}
                />
                <Stack
                    justifyContent={'start'}
                    alignItems={'center'}
                    direction={'row'}
                    spacing={1}
                    mt={2}
                    flexWrap={'wrap'}
                >
                    {watch('tags').map((item, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <Chip
                            variant="solid"
                            color="primary"
                            endDecorator={<Close />}
                            onClick={() =>
                                setValue(
                                    'tags',
                                    watch('tags').filter((tag) => tag !== item)
                                )
                            }
                        >
                            <span className={`font-bold`}>#</span>

                            {item}
                        </Chip>
                    ))}
                </Stack>
            </FormControl>

            <Stack direction={'column'}>
                <Stack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                    spacing={4}
                >
                    <FormControl size="lg">
                        <Checkbox
                            {...register('isPrivate')}
                            label="Private Dream"
                        />
                    </FormControl>
                    <FormControl size="lg">
                        <Checkbox
                            {...register('disableComments')}
                            label="Disable Comments"
                        />
                    </FormControl>
                    <FormControl size="lg">
                        <Checkbox
                            {...register('disableLikes')}
                            label="Disable Likes"
                        />
                    </FormControl>
                </Stack>
            </Stack>

            <Stack
                mt={4}
                justifyContent={'space-between'}
                alignItems={'center'}
                direction={'row'}
            >
                <Button
                    size="lg"
                    type="reset"
                    variant="outlined"
                    color="danger"
                    disabled={
                        isSubmitting ||
                        isLoading ||
                        isValidating ||
                        dreamMutation.isPending
                    }
                >
                    Cancel
                </Button>
                <Button
                    size="lg"
                    type="submit"
                    variant="solid"
                    color="success"
                    loading={
                        isSubmitting ||
                        isLoading ||
                        isValidating ||
                        dreamMutation.isPending
                    }
                >
                    Add Dream
                </Button>
            </Stack>
        </Stack>
    )
}
