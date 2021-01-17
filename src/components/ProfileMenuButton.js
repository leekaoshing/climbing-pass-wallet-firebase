import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { signOut } from '../services/firebase';

export function ProfileMenuButton() {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut());
    }

    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

    const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

    const handleProfileMenuClose = () => {
        setProfileMenuAnchorEl(null);
    };

    const handleProfileMenuOpen = (event) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };
        
    const profileMenuId = "profile-menu";
    const renderProfileMenu = (
        <Menu
            anchorEl={profileMenuAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={profileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
        >
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </Menu>
    );

    return (
        <div>
            <IconButton
                aria-label="show profile menu"
                aria-controls={profileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircleIcon />
            </IconButton>
            {renderProfileMenu}
        </div>
    );
};