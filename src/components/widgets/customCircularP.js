import './customCircularP.css'
import loader from '../assets/gifs/loader.gif'
const CustomCircularP = ({show})=>{
    return(
        <div className='custom-c-p' style={{display: show?'table':'none'}}>
            <img src={loader} alt />
        </div>
    )
}
export default CustomCircularP