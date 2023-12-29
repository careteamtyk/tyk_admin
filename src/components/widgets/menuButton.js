import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './menuButton.css'
const MenuButton = (props)=>{
    const {MenuIcon, collapse, active, text, onClick} = props
    return (
        <div onClick={onClick} className= {active?'menu_button active':'menu_button'} style={{padding: collapse?'12px 24px 12px 24px':'12px', borderRadius: collapse?'initial':8, marginLeft: collapse?'initial':12, marginTop: 12}}>
           {<MenuIcon  fontSize="small" />} 
           {collapse?'':<><div style={{marginLeft: 8, flex: 1, alignSelf: 'center'}}>{text}</div><ArrowForwardIosIcon  sx={{fontSize: 13, alignSelf: 'center'}} /></>}
        </div>
    )
}
export default MenuButton