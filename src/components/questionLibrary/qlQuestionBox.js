import './qlQuestionBox.css'
import parse from 'html-react-parser';
import { Button, IconButton } from '@mui/material';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import { useState } from 'react';
import EditModal from '../widgets/ratulModal/editModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { cleanO } from '../../utils/util';
const QlQuestionBox = (props)=>{
    const {q, i, showAns, onDelete, onEdited} = props
    const [s, setS] = useState(q.status)
    const [showModal, setShowModal] = useState(false)
    const setStatus = (e)=>{
        e.stopPropagation()
        let toupdate = s==="Active"?"Inactive":"Active"
        axios.post(API_ENDPOINT+'sam/set-question-status', {id: q._id, status: toupdate}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                setS(toupdate)
            }
        })
    }
    const edit = ()=>{
        setShowModal(!showModal)
    }
    return(
        <div className='view_question'>
            <EditModal toEditQ={q} onEdited={onEdited}  showModal={showModal} setShowModal={setShowModal}/>
            <div className='q_action_qn'>
                <IconButton className='tk-icon-button' onClick={edit} aria-label="edit" >
                    <EditIcon fontSize="small"/>
                </IconButton>
                <IconButton className='tk-icon-button' onClick={onDelete} aria-label="delete" >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
                <Button onClick={setStatus} size="small" variant="outlined">{s}</Button>
            </div>
            <div className='v_qn_q'><span>{`Q${i+1}`}</span> {parse(cleanO(q.question))}</div>
                <div style={{display: showAns?'initial':'none'}}>
                <div className='v_option'>
                    <div className={q.options[0].isCorrect?'answer':''}>A) {parse(cleanO(q.options[0].option))}</div>
                    <div className={q.options[1].isCorrect?'answer':''}>B) {parse(cleanO(q.options[1].option))}</div>
                </div>     
                {
                    q.options.length>2?
                    <div className='v_option'>
                      <div className={q.options[2].isCorrect?'answer':''}>C) {parse(cleanO(q.options[2].option))}</div>
                      {q.options.length>3?<div className={q.options[3].isCorrect?'answer':''}>D) {parse(cleanO(q.options[3].option))}</div>:''}
                    </div>:''
                }              
                {q.options.length>4?
                <div className='v_option'>
                    <div className={q.options[4].isCorrect?'answer':''}>E) {parse(cleanO(q.options[4].option))}</div>
                    {q.options.length>5?<div className={q.options[5].isCorrect?'answer':''}>F) {parse(cleanO(q.options[5].option))}</div>:''}
                </div>:''}
                <div style={{marginTop: 12, fontStyle:'italic'}}>Topic: {q.topic}</div>
                </div>
        </div>
    )
}
export default QlQuestionBox