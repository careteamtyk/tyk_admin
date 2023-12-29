import './createQuestion.css'
import {IconButton} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const OptionHeader = (props)=>{
    const {o, label, correct, setCorrect} = props
    const onSelectAnswer =()=>{
        if(o === "")
            toast("Please Type in Answer first")
        else
            setCorrect(!correct)
    }
    return(
        <div className='option-header'>
            <ToastContainer />
            <div style={{flex: 1, alignSelf: 'center'}}>{label}</div>
            <div onClick={onSelectAnswer} className='option-h-q' style={{background: correct?'#b7fdb7':'rgb(206, 238, 250)'}}>
                <div style={{alignSelf: 'center', userSelect: 'none'}}>is Option Correct?</div>
                <IconButton>
                    <CheckCircleIcon sx={{color: correct?'green': 'grey'}} size="small"/>
                </IconButton>
            </div>
        </div>
    )
}
export default OptionHeader