import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import { useState } from 'react';
import './topMenuIcon.css'
const TopMenuIcon = (props)=>{
    const {collapse, setCollapse} = props
    const [open, setOpen] = useState(collapse)
    const onClick = (event)=>{
        setOpen(!open)
        setCollapse(!open)
    }
    return(
        <div onClick={onClick} className='top_menu_icon'>
            {open?<ListIcon />:<MenuIcon />}
        </div>
    )
}
export default TopMenuIcon