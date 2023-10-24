import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    ListItemDecorator,
    Sheet,
    Stack,
    Typography,
} from '@mui/joy'
import { KeyboardArrowRight } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import DashboardNav from './DashboardNav'

export default function DashboardLayout() {
    return (
        <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            py={{
                md: 5,
                lg: 10,
            }}
            px={{
                md: 10,
                lg: 20,
            }}
        >
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={12}>
                    <Sheet variant="outlined" sx={{ p: 4 }}>
                        <Typography level="h1" component={'h1'}>
                            Dashboard
                        </Typography>
                    </Sheet>
                </Grid>

                <DashboardNav />

                <Grid xs={9}>
                    <Sheet
                        variant="outlined"
                        sx={{ p: 4, borderTop: 'none', height: '100%' }}
                    >
                        <h2>Content</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Suscipit unde non hic, magni magnam in
                            temporibus tenetur cum animi libero at nam expedita
                            commodi consequatur accusantium necessitatibus
                            provident corrupti ratione?
                        </p>
                    </Sheet>
                </Grid>
            </Grid>
        </Stack>
    )
}
