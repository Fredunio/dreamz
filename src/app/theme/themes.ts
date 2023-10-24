import { extendTheme } from '@mui/joy/styles'

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

