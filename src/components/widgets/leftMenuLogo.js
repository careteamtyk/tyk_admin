import './leftMenuLogo.css'
import appLogo from '../assets/images/applogo.png'
import appIcon from '../assets/svgs/appIcon.svg'
const LeftMenuLogo = (props)=>{
    return(
        <div style={{display: 'flex', height: 60}}>
       {props.collapse?<img className='left-menu-logo' src={appIcon} alt="App Icon"/>:<img className='left-menu-logo' src={appLogo} alt="App Logo"/>}
        </div>
    )
}
export default LeftMenuLogo