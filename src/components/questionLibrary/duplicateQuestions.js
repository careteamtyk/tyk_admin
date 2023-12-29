import './duplicateQuestions.css'
import QView from './qView'
import {Button} from '@mui/material'
import { useState } from 'react'
import CustomCircularP from '../widgets/customCircularP'
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import { toast } from 'react-toastify'
const DuplicateQuestions = (props)=>{
    const {questions, duplicatesRemoved, showModal, setShowModal} = props
    const [loading, setLoading] = useState(false)
    const clearAll =(e)=>{
        setLoading(true)
        axios.post(API_ENDPOINT+'trainer/clear-all-duplicates', {questions: questions}, HEADER_TOKEN).then(res=>{
            setLoading(false)
            let d = res.data
            if(d.success){
                duplicatesRemoved()
                setShowModal(!showModal)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }    
        })
    }
    return (
        <div className="duplicate-questions">
            {<CustomCircularP show={loading} />}
            <div className='dq-action'><Button onClick={clearAll} variant='outlined'>Clear all duplicates</Button></div>
            <div className='dq-c'>
                {
                    questions.map((q, i)=>(
                        <QView q={q._id} num={q.count}/>
                    ))
                }
            </div>
        </div>
    )
}
export default DuplicateQuestions