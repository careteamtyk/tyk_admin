import './qSize.css'
import IconLabelCom from './iconLabelCom'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TopicIcon from '@mui/icons-material/Topic';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Qsize = (props)=>{
    const {numQns, numTopics, duration} = props
    return(
        <div className='q-size'>
                <IconLabelCom icon = {<QuestionAnswerIcon sx={{color: '#777', fontSize: 17}} />} label={`${numQns} Questions`} /> 
                <IconLabelCom icon = {<TopicIcon sx={{color: '#777', fontSize: 17, marginLeft: '14px'}} />} label={`${numTopics} Topics`} /> 
                <IconLabelCom icon = {<AccessTimeIcon sx={{color: '#777', fontSize: 17, marginLeft: '14px'}} />} label={`${duration} minutes`} /> 
        </div>
    )
}
export default Qsize