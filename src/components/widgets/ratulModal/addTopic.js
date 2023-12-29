import { Button, IconButton, TextField, InputBase, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import './addTopic.css'
import { AddCircle } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search';
import Topic from './topic';
import { useState } from 'react';
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
const AddTopic = (props)=>{
    const {show, setShow, category, currentTopic, setCurrentTopic} = props
    const [topics, setTopics] = useState([])
    const [tp, setTp] = useState("")
    const [adding, setAdding] = useState(false)
    const onCancel  = ()=>{
        setShow(false)
    }
    const onSave = ()=>{
        setShow(false)
    }
    const onChange = (e)=>{
        let v = e.target.value
        setTp(v)
        if(v !== ""){
            axios.post(API_ENDPOINT+'sam/get-topics-search', {category: category, topic: v}, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    setTopics(d.message)
                }
            })
        }else{
            setTopics([])
        }
    }
    function loadTopicsFilter(v){
        
    }
    const addTopic  = ()=>{
        if(tp !== ""){
            setAdding(true)
            axios.post(API_ENDPOINT+'trainer/add-topic', {topic: tp}, HEADER_TOKEN).then(res=>{
                let d= res.data
                setAdding(false)
                if(d.success){
                    setCurrentTopic(tp)
                    setShow(false)
                }
            })
        }
    }
    const onTopicSelect = (v)=>{
        setCurrentTopic(v)
        setShow(false)
    }
    const onKeyEnter = (e)=>{
        if (e.key === "Enter") {
            addTopic()
        }
    }
    return(
        <div className="add_topic" style={{display: show?'initial':'none'}}>
            <div style={{display: 'flex'}}>
            <TextField onKeyDown={onKeyEnter} autoComplete='off' value={tp} onChange={onChange} variant='outlined' label="Enter Topic" size='small' />
            {adding?<CircularProgress />:<Button onClick={addTopic} variant='outlined' startIcon={<AddCircle/>} sx={{marginLeft: '6px', alignSelf: 'center'}}>Add</Button>}
            <div style={{position: 'absolute', right:-22, top: -22}}>
            <IconButton size='small' onClick={()=>setShow(false)}>
            <CloseIcon />
            </IconButton>
            </div>
            </div>

            <div className='topics_c'>
            {
                topics.map(t=>(
                    <Topic text={t.topic} onTopicSelect = {onTopicSelect}  currentTopic={currentTopic}/>
                ))
            }
            </div>
    </div>
    )
}
export default AddTopic 