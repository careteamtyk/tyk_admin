import { AddCircle } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import './addTopic.css'
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
const AddTopic = (props)=>{
    const {show, setShow, category, topics, setTopics} = props
    const [tp, setTp] = useState("")
    const addTopic = ()=>{
        if(tp ===""){
            toast("Please Enter Topic")
        }else if(category===""){
            toast("Please Select Category first")
        }else{
            axios.post(API_ENDPOINT+'sam/add-topics', {topic: tp, category: category}, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    toast(d.message)
                    let tps = [...topics]
                    tps.push({topic: tp})
                    setTopics(tps)
                }else{
                    toast(d.message)
                }
            })
        }
    }
    return(
        <div className={show?"add-topic-p show":"add-topic-p"} >
            <ToastContainer />
            <TextField value={tp} onChange={(e)=>setTp(e.target.value)} variant='outlined' label="Enter Topic" size='small' />
            <Button onClick={addTopic} variant='outlined' startIcon={<AddCircle/>} sx={{marginLeft: '6px'}}>Add</Button>
            <div style={{position: 'absolute', left:-20, top: -17}}>
            <IconButton onClick={()=>setShow(false)}>
            <CloseIcon />
            </IconButton>
            </div>
        </div>
    )
}
export default AddTopic