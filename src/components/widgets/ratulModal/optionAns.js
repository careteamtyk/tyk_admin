import './optionAns.css'
import IconButton from '@mui/material/IconButton'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CloseIcon from '@mui/icons-material/Close';
import parse from 'html-react-parser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants'
import { cleanO } from '../../../utils/util'
const OptionAns= (props)=>{
    const {ls, op, text, optionL, isAns, setCa, ans, setAns, show, showD, totalOptions, setTotalOptions} = props
    const [isImage, setIsImage] = useState(cleanO(ans).includes('<img'))
    const file_inp = useRef()
    const optionStyle = {
        marginLeft: ls?ls:'initial',
        display: show?'inline-block':'none'
    }
    const onImageSelect = ()=>{
        let fi = file_inp.current
        fi.click()
    }
    const onRemove = ()=>{
        if(totalOptions>4){
            setTotalOptions(totalOptions-1)
            setCa("")
        }
    }
    const onSelected = (e)=>{
        const [file] = file_inp.current.files
        if(file){
            let fd = new FormData()
            fd.append("image", file)
            axios.post(API_ENDPOINT+'trainer/upload-image-only', fd, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    setIsImage(true)
                    //document.querySelector('#o_img_c img').current.setAttribute('src', d.message)
                    setAns(`<img src=${d.message} alt="ans"/>`)
                }else{
                    toast(d.message)
                }
            })
        
        }
    }
    const onAnswer = ()=>{
        if(ans === "")
            toast("You cannot select this option")
        else
            setCa(op)
    }
    const closeImage = ()=>{
        setIsImage(false)
        setAns("")
    }
    return(
        <div class="option_ans" style={optionStyle} >
            <div style={{width: 180, height: 86}}>
                <input onChange={onSelected} ref={file_inp} type="file" accept="image/*" style={{display: 'none'}} />
                
                <div id='o_img_c' style={{display: isImage?'initial':'none'}}>
                    <div onClick={closeImage} style={{display: 'flex', position: 'absolute', right: 8, top: 8, borderRadius: '50%', cursor: 'pointer', backgroundColor: '#ccc'}}>
                        <CloseIcon sx={{fontSize: 18, color: '#939090'}} />
                    </div>
                    {parse(cleanO(ans))}   
                </div>
                <textarea onChange={e=>setAns(e.target.value)} value={ans} style={{display: isImage?'none':'initial'}} rows={4} placeholder={text}></textarea>
            </div>
            <div class="option_header">
                {optionL}
            </div>
            <div onClick={onAnswer} style={{position: 'absolute', right: 0, top: '-15px', cursor: 'pointer', color: isAns? 'green':'#ccc', zIndex: 6, width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '50%'}}>
                <CheckCircleIcon />
            </div>
            <div class="option_ans_pic">
                
                <IconButton sx={{display: showD?'initial':'none'}} onClick={onRemove}  color="primary" aria-label="upload picture" component="span">
                <DeleteOutlineIcon />
                </IconButton>
                <IconButton onClick={onImageSelect} color="primary" aria-label="upload picture" component="span">
                <InsertPhotoIcon />
                </IconButton>
            </div>
        </div>
    )
}
export default OptionAns