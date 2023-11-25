import * as React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Dropdown, IconButton, Menu, MenuButton, MenuItem } from '@mui/joy'

export default function AddMenuHeader() {
    return (
        <Dropdown>
            <MenuButton
                slots={{ root: IconButton }}
                slotProps={{
                    root: {
                        variant: 'plain',
                        color: 'neutral',
                        'aria-label': 'Add content',
                    },
                }}
            >
                <AddBoxIcon />
            </MenuButton>

            <Menu>
                <MenuItem>Add item</MenuItem>
            </Menu>
        </Dropdown>
    )
}
