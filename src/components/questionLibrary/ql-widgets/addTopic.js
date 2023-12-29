import { AddCircle } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import './addTopic.css'
import CloseIcon from '@mui/icons-material/Close';
import { toast} from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Topic from './Topic'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import { activeTopicArranger } from '../../../utils/util';
const AddTopic = (props)=>{
    const {show, setShow, category, topics, setTopics} = props
    const [tp, setTp] = useState("")
    const [mt, setMt] = useState([])
    const addTopic = ()=>{
        if(tp ===""){
            toast("Please Enter Topic", {position: 'bottom-center', autoClose: 1000})
        }else{
            axios.post(API_ENDPOINT+'sam/add-topic', {category: category, topic: tp}, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    toast(d.message, {autoClose: 900, position: 'bottom-center'})
                    let tps = [...topics]
                    tps.push({category: category, topic: tp, status: "Active"})
                    let ars = activeTopicArranger(tps)
                    setTopics(ars)
                    setShow(false)
                    setTp("")
                }else{
                    toast(d.message, {autoClose: 900, position: 'bottom-center'})
                }
            })
        }
    }
    const onChange = (e)=>{
        let v = e.target.value
        if(v ===""){
            setMt([])
        }else{
            let nm = [...topics]
            let nnm = nm.filter(n=>n.topic.includes(v))
            setMt(nnm)
        }
        setTp(v)
    }
    const onKeyEnter = (e)=>{
        if (e.key === "Enter") {
            addTopic()
        }
    }
    return(
        <div className={show?"add-topic-p show":"add-topic-p"} >
            <div style={{display: 'flex'}}>
            <TextField value={tp} onKeyDown={onKeyEnter} onChange={onChange} variant='outlined' label="Enter Topic" size='small' />
            <Button onClick={addTopic} variant='outlined' startIcon={<AddCircle/>} sx={{marginLeft: '6px', alignSelf: 'center'}}>Add</Button>
            <div style={{position: 'absolute', right:-22, top: -22}}>
            <IconButton size='small' onClick={()=>setShow(false)}>
            <CloseIcon />
            </IconButton>
            </div>
            </div>
            <div className='mt-topics-c'>
            {
                mt.map(t=>(
                    <Topic text={t.topic} />
                ))
            }
            </div>
        </div>
    )
}
export default AddTopic