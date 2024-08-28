import { Delete, Edit } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

const MenuCommpont = (props) => {
    const { open, handleClick, handleClose, handleUpdate, anchorEl, deleteJob } = props


    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}

            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                disableScrollLock={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleUpdate}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Update</Typography>
                </MenuItem>
                <MenuItem onClick={deleteJob}>
                    <ListItemIcon>
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Delete</Typography>
                </MenuItem>

            </Menu>
        </div>
    )
}

export default MenuCommpont
