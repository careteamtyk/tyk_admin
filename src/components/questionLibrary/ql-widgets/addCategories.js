import { AddCircle } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import './addCategories.css'
import CloseIcon from '@mui/icons-material/Close';
import { toast} from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Topic from './Topic'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import { activeArranger } from '../../../utils/util';
const AddCategories = (props)=>{
    const {show, setShow, categories, setCategories} = props
    const [tp, setTp] = useState("")
    const [mt, setMt] = useState([])
    const addTopic = ()=>{
        if(tp ===""){
            toast("Please Enter Topic", {position: 'bottom-center', autoClose: 1000})
        }else{
            axios.post(API_ENDPOINT+'sam/add-category', {category: tp}, HEADER_TOKEN).then(res=>{
                let d = res.data
                console.log(d)
                if(d.success){
                    toast(d.message)
                    let tps = [...categories]
                    tps.push({category: tp, status: "Active"})
                    let ars = activeArranger(tps)
                    setCategories(ars)       
                    setShow(false)
                    setTp("")
                }else{
                    toast(d.message, {position: 'bottom-center', autoClose: 900})
                }
            })
        }
    }
    const onChange = (e)=>{
        let v = e.target.value
        if(v ===""){
            setMt([])
        }else{
            let nm = [...categories]
            let nnm = nm.filter(n=>n.category.includes(v))
            setMt(nnm)
        }
        setTp(v)
    }
    const onKeyEnter = (e)=>{
        if (e.key === "Enter") {
            addTopic()
        }
    }
    const onCategorySelect = (cat)=>{
        setTp(cat)
    }
    return(
        <div className={show?"add-topic-p show":"add-topic-p"} >
            <div style={{display: 'flex'}}>
                <TextField onKeyDown={onKeyEnter} value={tp} onChange={onChange} variant='outlined' label="Enter Topic" size='small' />
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
                    <Topic onClick={()=>onCategorySelect(t.category)} text={t.category} />
                ))
            }
            </div>
        </div>
    )
}
export default AddCategories