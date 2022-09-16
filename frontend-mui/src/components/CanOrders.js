import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Permissible, PermissibleRender } from '@brainhubeu/react-permissible';

const ListItem = (
    <ListItemButton>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
    </ListItemButton>
);

const ListItem2 = () => (
    <ListItemButton>
        <ListItemIcon>
            <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
    </ListItemButton>
);

const callbackFunction = ({ userPermissions, requiredPermissions }) => {
    console.log(`
      react-permissible: Access Denied
      userPermissions: ${userPermissions}
      requiredPermissions: ${requiredPermissions}
    `);
};

const CanOrders = Permissible(
    () => <ListItem2 />,
    ['ACCESS_ADMIN'],
    ['ACCESS_DASHBOARD', 'ACCESS_ADMIN'],
    callbackFunction,
    true
);

export default CanOrders