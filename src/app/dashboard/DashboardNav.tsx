import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemDecorator,
    ListItemContent,
    ListDivider,
} from '@mui/joy'
import { KeyboardArrowRight } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import Face3Icon from '@mui/icons-material/Face3'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'

const navLinks = [
    {
        name: 'Profile',
        icon: <PersonIcon />,
    },
    {
        name: 'Journal',
        icon: <AutoStoriesIcon />,
    },

    {
        name: 'Dreams',
        icon: <AutoAwesomeIcon />,
    },
    {
        name: 'Dreamons',
        icon: <Face3Icon />,
    },
    {
        name: 'Account',
        icon: <AdminPanelSettingsIcon />,
    },
]

export default function DashboardNav() {
    return (
        <Grid xs={3}>
            <List
                size="lg"
                variant="outlined"
                sx={{
                    borderTop: 'none',
                    borderRight: 'none',
                    '--List-padding': '0px',
                    '--ListItem-paddingY': '1rem',
                    '--ListDivider-gap': '0px',
                    height: '100%',
                }}
            >
                {navLinks.map((link) => (
                    <>
                        <ListItem key={link.name}>
                            <ListItemButton>
                                <ListItemDecorator>
                                    {link.icon}
                                </ListItemDecorator>
                                <ListItemContent
                                    sx={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {link.name}
                                </ListItemContent>
                                <KeyboardArrowRight />
                            </ListItemButton>
                        </ListItem>
                        {navLinks.indexOf(link) !== navLinks.length - 1 && (
                            <ListDivider />
                        )}
                    </>
                ))}
            </List>
        </Grid>
    )
}
