import { ArrowDropDown } from '@mui/icons-material'
import { extendTheme } from '@mui/joy/styles'
import React from 'react'

export const appTheme = extendTheme({
    components: {
        JoyStack: {
            defaultProps: {
                useFlexGap: true,
            },
        },
        JoyFormLabel: {
            defaultProps: {
                sx: {
                    fontWeight: 'bold',
                },
            },
        },

        JoySelect: {
            defaultProps: {
                indicator: <ArrowDropDown />,
            },
        },
    },
    // colorSchemes: {
    //     light: {
    //         palette: {},
    //     },
    //     dark: {
    //         palette: {},
    //     },
    // },
})
