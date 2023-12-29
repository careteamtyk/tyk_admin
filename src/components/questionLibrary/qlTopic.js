import './qlTopic.css'
import {Button} from '@mui/material'
import axios from "axios"
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
const QlTopic = (props)=>{
    const {selected, topics, setTopics, setTopic, numQns, topic, status} = props
    const setT = (e)=>{
        e.stopPropagation()
        setTopic(topic)
    } 
    const setStatus = (e)=>{
        e.stopPropagation()
        let toupdate = status==="Active"?"Inactive":"Active"
        axios.post(API_ENDPOINT+'trainer/set-topic-status', {topic: topic, status: toupdate}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let tcs = [...topics]
                let tc = tcs.findIndex(t=>t.topic === topic)
                tcs[tc].status = toupdate
                tcs.sort((a, b)=>{
                    let fa = a.topic.toLowerCase(),
                    fb = b.topic.toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                })
                let actives = tcs.filter(t=>t.status === 'Active')
                let inactives = tcs.filter(t=>t.status === 'Inactive')
                let ars = actives.concat(inactives) 
                setTopics(ars)
            }
        })
    }
    return(<div onClick={setT} className={selected?'ql-topic-c selected':'ql-topic-c'}>
        <div className='ql-topic'>
            {topic}
            <div style={{color: '#888', fontSize: 14, fontWeight: 'normal'}}> {numQns==='...'?numQns:`${numQns} Questions`}</div>
        </div>
        <div className='ql-topic-status'><Button onClick={setStatus} size="small" variant="outlined">{status}</Button></div>
    </div>)
}
export default QlTopic