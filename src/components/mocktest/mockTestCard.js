import { Button } from '@mui/material'
import Qsize from '../widgets/qSize';
import './mockTestCard.css'
const MockTestCard = ({assessment, onReport})=>{
    function getDateFormat(d){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let y = d.getFullYear()
        let dd = '0'+d.getDate()
        let h = '0'+d.getHours()
        let min = '0'+d.getMinutes()
        return dd.slice(-2)+' '+months[d.getMonth()]+' '+y+', '+h.slice(-2)+':'+min.slice(-2)
    }  
    const onClick = ()=>{
        onReport(assessment.linkCode)
    }
    return(
        <div className='mock-test-card'> 
            <img src={assessment.banner} style={{borderRadius: '50%', width: '96px',height: '96px', objectFit: 'cover'}} alt=""/>
            <div style={{flex: 1, marginLeft: 16, alignSelf: 'center'}}>
                <div style={{fontSize: 17, fontWeight: 600, color: '#444'}}>{assessment.title}</div>
                <div style={{fontSize: '14px', color: '#666'}}><span style={{color: '#555'}}>{assessment.category}</span> &#62; <span>{assessment.subCategory}</span></div>
                <div style={{color: '#666', fontSize: 12}}>{assessment.date?getDateFormat(new Date(assessment.date)):''}</div>
                <Qsize numQns={assessment.numQns} numTopics={assessment.numTopics} duration={assessment.duration}/>             
            </div>
            <div style={{alignSelf: 'center'}}>
                <Button onClick={onClick} sx={{textTransform: 'none', borderRadius: 12}} variant="outlined">View Result</Button>
            </div>
        </div>
    )
}
export default MockTestCard