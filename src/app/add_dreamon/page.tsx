'use client'

import Sheet from '@mui/joy/Sheet'
import Grid from '@mui/joy/Grid'
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
    Textarea,
    Typography,
    styled,
} from '@mui/joy'
import FormControl from '@mui/joy/FormControl'
import Close from '@mui/icons-material/Close'
import FormLayout from '../components/layout/forms/FormLayout'
import { VisuallyHiddenInput } from '../components/layout/forms/VisuallyHiddenInput'

export default function AddDreamonPage() {
    return (
        <FormLayout title="Add Dreamon 👹">
            {/* 👺 */}
            <FormControl size={'lg'}>
                <FormLabel>Name</FormLabel>
                <Input
                    sx={{
                        minWidth: {},
                    }}
                    placeholder="..."
                />
                <FormHelperText>
                    This is the name of your Dreamon
                </FormHelperText>
            </FormControl>

            <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea placeholder="..." minRows={3} />
                <FormHelperText>
                    Describe your Dreamon in a few words
                </FormHelperText>
            </FormControl>

            <FormControl size="lg">
                <FormLabel htmlFor="upload-button">Image</FormLabel>

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
                    Upload an image
                    <VisuallyHiddenInput type="file" />
                </Button>
                <FormHelperText>
                    This is the image of your dreamon
                </FormHelperText>
            </FormControl>

            <FormControl size="lg">
                <FormLabel>Link to Dreams</FormLabel>
                <Autocomplete
                    multiple
                    id="link-to-dreams"
                    placeholder="Search dreams..."
                    options={[
                        'My Dream 1',
                        'My Dream 2',
                        'My Dream 3',
                        'My Dream 4',
                        'My Dream 5',
                    ]}
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
                    Link your dreamon to your dreams
                </FormHelperText>
            </FormControl>

            <Stack
                justifyContent={'space-between'}
                alignItems={'center'}
                direction={'row'}
            >
                <Button size="lg" variant="outlined" color="danger">
                    Cancel
                </Button>
                <Button size="lg" variant="solid" color="success">
                    Add Dreamon
                </Button>
            </Stack>
        </FormLayout>
    )
}
