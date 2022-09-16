import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Permissible, PermissibleRender } from '@brainhubeu/react-permissible';
import CanOrders from '@components/CanOrders';


/* const callbackFunction = ({ userPermissions, requiredPermissions }) => {
  console.log(`
    react-permissible: Access Denied
    userPermissions: ${userPermissions}
    requiredPermissions: ${requiredPermissions}
  `);
}; */

const PermissibleOrders = <PermissibleRender
userPermissions={['ACCESS_ADMIN']}
requiredPermissions={['ACCESS_DASHBOARD', 'ACCESS_ADMIN']}
/* renderOtherwise={null}  */// optional
oneperm={true} // optional
>
  <ListItemButton>
    <ListItemIcon>
      <ShoppingCartIcon />
    </ListItemIcon>
    <ListItemText primary="Orders" />
  </ListItemButton>
</PermissibleRender>;

const ClearList = (<ListItemButton>
  <ListItemIcon>
    <DashboardIcon />
  </ListItemIcon>
  <ListItemText primary="Dashboard" />
</ListItemButton>);

/* const CanOrders = Permissible(
ClearList,
  ['ACCESS_ADMIN'],
  ['ACCESS_DASHBOARD', 'ACCESS_ADMIN'],
  callbackFunction,
  true
); */
/* const PermOrders = () => {
  
  const CanOrders = Permissible(
    ClearList,
      ['ACCESS_ADMIN'],
      ['ACCESS_DASHBOARD', 'ACCESS_ADMIN'],
      callbackFunction,
      true
    )
return <CanOrders />
}  */


console.log(typeof (PermissibleOrders), typeof (<CanOrders />))
console.log( PermissibleOrders, <CanOrders />)

export const mainListItems = (
  <React.Fragment>
    {ClearList}
    {PermissibleOrders}
    <CanOrders />
    
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);