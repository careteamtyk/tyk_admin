import './myMenuItem.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const MyMenuItem = (props)=>{
    const {active, text, onClick} = props
    return(
         <div onClick={onClick} className= {active?'my-menu-item active':'my-menu-item'}>
           <div className='text-container'><div className='text-holder'>{text}</div></div><ArrowForwardIosIcon  sx={{fontSize: 13, alignSelf: 'center'}} />
         </div>
    )
}
export default MyMenuItem