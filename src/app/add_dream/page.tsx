'use client'

import {
    Autocomplete,
    Button,
    Checkbox,
    Chip,
    FormHelperText,
    FormLabel,
    Input,
    List,
    Option,
    Select,
    Stack,
    SvgIcon,
    Typography,
    styled,
} from '@mui/joy'
import FormControl from '@mui/joy/FormControl'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import Close from '@mui/icons-material/Close'
import FormLayout from '../components/layout/forms/FormLayout'
import { VisuallyHiddenInput } from '../components/layout/forms/VisuallyHiddenInput'
import { parseDatabaseName } from '../utils/helpers'

const editor_api_key = process.env.NEXT_PUBLIC_TINY_API_KEY

// TODO: Move this to a separate file/database
const emojis: {
    emoji: string
    name: string
}[] = [
    { emoji: '😃', name: 'joy' },
    { emoji: '😨', name: 'fear' },
    { emoji: '😡', name: 'anger' },
    { emoji: '😢', name: 'sadness' },
    { emoji: '❤️', name: 'love' },
    { emoji: '😕', name: 'confusion' },
    { emoji: '🤔', name: 'confusion' },
    {
        emoji: '😌',
        name: 'peace',
    },
    {
        emoji: '😳',
        name: 'embarrassment',
    },
    {
        emoji: '😔',
        name: 'nostalgia',
    },
    {
        emoji: '🧐',
        name: 'curiosity',
    },
    { emoji: '🙏', name: 'hope' },
    {
        emoji: '🤢',
        name: 'disgust',
    },
    {
        emoji: '😂',
        name: 'amusment',
    },
    {
        emoji: '😞',
        name: 'loneliness',
    },
    {
        emoji: '😓',
        name: 'guilt',
    },
    {
        emoji: '😅',
        name: 'relief',
    },
    {
        emoji: '😎',
        name: 'pride',
    },
    {
        emoji: '😬',
        name: 'awkwardness',
    },
    {
        emoji: '😉',
        name: 'playfulness',
    },
    {
        emoji: '😲',
        name: 'shock',
    },
    {
        emoji: '😤',
        name: 'frustration',
    },
]

export default function AddDreamPage() {
    const editorRef = useRef<null | {
        getContent: () => string
    }>(null)
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
        }
    }

    return (
        <FormLayout title="Add Dream ✨">
            <Stack spacing={6} direction={'column'}>
                <FormControl size={'lg'}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        variant="outlined"
                        color="primary"
                        placeholder="Add name..."
                    />
                    {/* <FormHelperText>Name of your dream</FormHelperText> */}
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
                        <FormLabel>Date 📆</FormLabel>
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
                        <FormLabel>Category</FormLabel>
                        <Select
                            variant="outlined"
                            color="primary"
                            placeholder="Select category..."
                        >
                            <Option value="option1">Option I</Option>
                            <Option value="option2">Option II</Option>
                            <Option value="option3">Option III</Option>
                        </Select>
                        {/* <FormHelperText>
                            This is the category of your dream
                        </FormHelperText> */}
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
                        options={emojis}
                        getOptionLabel={(option) =>
                            parseDatabaseName(
                                `${parseDatabaseName(option.name)} ${
                                    option.emoji
                                }`
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
                    <Editor
                        init={{
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            statusbar: false,
                            plugins: ['image'],
                            toolbar: 'image',
                            images_file_types: 'jpg,jpeg,png',
                        }}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        apiKey={editor_api_key}
                    />
                    <FormHelperText>
                        This is the story of your dream. You can describe your
                        dream including location, people, and other details.
                    </FormHelperText>
                </FormControl>
                <FormControl size="lg">
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
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    <FormHelperText>
                        Add a front image for your dream
                    </FormHelperText>
                </FormControl>
                <FormControl size="lg">
                    <FormLabel>Tags</FormLabel>
                    <Autocomplete
                        multiple
                        id="tags-default"
                        placeholder="Add tags..."
                        options={['red', 'blue', 'green', 'yellow', 'orange']}
                        renderTags={(tags, getTagProps) =>
                            tags.map((item, index) => (
                                // eslint-disable-next-line react/jsx-key
                                <Chip
                                    variant="solid"
                                    color="primary"
                                    endDecorator={<Close />}
                                    {...getTagProps({ index })}
                                >
                                    {item}
                                </Chip>
                            ))
                        }
                        //   options={top100Films}
                        //   getOptionLabel={(option) => option.title}
                        //   defaultValue={[top100Films[13]]}
                    />
                    <FormHelperText>
                        These are the tags of your dream
                    </FormHelperText>
                </FormControl>
                <Stack direction={'column'}>
                    <Stack
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row'}
                        spacing={4}
                    >
                        <FormControl size="lg">
                            <Checkbox label="Private Dream" />
                        </FormControl>
                        <FormControl size="lg">
                            <Checkbox label="Disable Comments" />
                        </FormControl>
                        <FormControl size="lg">
                            <Checkbox label="Disable Likes" />
                        </FormControl>
                    </Stack>
                </Stack>
                <Stack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                >
                    <Button size="lg" variant="outlined" color="danger">
                        Cancel
                    </Button>
                    <Button size="lg" variant="solid" color="success">
                        Add Dream
                    </Button>
                </Stack>
            </Stack>
        </FormLayout>
    )
}
