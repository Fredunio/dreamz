import { Typography } from '@mui/joy'
import * as React from 'react'

export default function FieldErrorMessage({ error }: { error?: string }) {
    if (!error) {
        return null
    }
    return (
        <Typography
            level="body-md"
            sx={{
                color: 'danger.plainColor',
                mt: 1,
            }}
        >
            {error}
        </Typography>
    )
}
