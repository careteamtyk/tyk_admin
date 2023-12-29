import { AddCircle } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import './addCategory.css'
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';

const AddCategory = (props)=>{
    const {show, setShow, categories, setCategories} = props
    const [category, setCategory] = useState("")
    const addCategory = ()=>{
        if(category===""){
            toast("Please Enter Category")
        }else{
            axios.post(API_ENDPOINT+'sam/add-categories', {category}, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    toast(d.message)
                    let cs = [...categories]
                    cs.push({category})
                    setCategories(cs)
                }else{
                    toast(d.message)
                }
            })
        }
    }
    return(
        <div className={show?"add-category-p show":"add-category-p"} >
            <ToastContainer />
            <TextField value={category} onChange={(e)=>setCategory(e.target.value)} variant='outlined' label="Enter Category" size='small' />
            <Button onClick={addCategory} variant='outlined' startIcon={<AddCircle/>} sx={{marginLeft: '6px'}}>Add</Button>
            <div style={{position: 'absolute', left:-20, top: -17}}>
            <IconButton onClick={()=>setShow(false)}>
            <CloseIcon />
            </IconButton>
            </div>
        </div>
    )
}
export default AddCategory