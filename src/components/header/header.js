
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import TopMenuIcon from '../widgets/topMenuIcon'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import './header.css'
import { useState } from 'react';
import { Cloud, ContentCopy, ContentCut, ContentPaste } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import LockResetIcon from '@mui/icons-material/LockReset';
import { deleteToken } from '../../utils/util';
const Header = (props)=>{
    const {collapse, setCollapse, title} = props
    let mtitle= title
    if(title === "")
      mtitle = "home"
    let temp = mtitle.replaceAll('-', " ")
    let mytitle = capitalize(temp)
    function capitalize(str) {
        const words = str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
        return words;
    } 
    
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const goToReset = ()=>{
      document.location.href = '/reset-password'
    }
    const logout = ()=>{
      deleteToken()
      document.location.href="/login"
    }
    return(
        <div className='dashboard_header' style={{paddingLeft: collapse?90:248}}>
            <TopMenuIcon collapse={collapse} setCollapse={setCollapse} />
            <div style={{flex: 1, paddingLeft: 12, alignSelf: 'center', fontSize: 20, fontWeight: 600}}>{mytitle}</div>
            <div style={{width: 48, height: 48, alignSelf: 'center', borderRadius: '50%', marginRight: 12}}>
            <IconButton aria-label="account" size="large">
            <NotificationsNoneIcon />
            </IconButton>
            </div>
            <div style={{width: 48, height: 48, alignSelf: 'center', border: '1px solid #bdd6bd', borderRadius: '50%', marginRight: 12}}>
            <IconButton aria-describedby={id} onClick={handleClick} aria-label="account" size="large">
            <ManageAccountsIcon sx={{color: 'rgb(156, 39, 176)'}} />
            </IconButton>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <MenuList>
                  <MenuItem>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Settings</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={goToReset}>
                    <ListItemIcon>
                      <LockResetIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Reset Password</ListItemText>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </MenuList>
            </Popover>
        </div>
    )
}
export default Header