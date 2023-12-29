import './configureCreate.css'
import { useState } from 'react';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import {toast} from 'react-toastify';

import Qsize from '../widgets/qSize';
import DateTimePicker from 'react-datetime-picker';
import ConfigItem from './cm-widgets/configItem';
const ConfigureCreate = (props)=>{
    const {mytopics, banner, at, ad, setS, category, subCategory} = props
    const [showAnswer, setShowAnswer] = useState(false)
    const [allowBack, setAllowBack] = useState(false)
    const [previewCorrect, setPreviewCorrect] = useState(true)
    const [previewStatus, setPreviewStatus] = useState(true)
    const [allowReport, setAllowReport] = useState(true)
    const [shuffleQuestions, setShuffleQuestions] = useState(false)
    const [shuffleOptions, setShuffleOptions] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    let noQns = mytopics.length>0?mytopics.map(i=>i.numQns).reduce((a,b)=>parseInt(a)+parseInt(b)):0
    const onBack = ()=>{
        setS(2)
    }
    function getDateFormat(d){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let y = d.getFullYear()
        let dd = '0'+d.getDate()
        let h = '0'+d.getHours()
        let min = '0'+d.getMinutes()
        return dd.slice(-2)+' '+months[d.getMonth()]+' '+y+', '+h.slice(-2)+':'+min.slice(-2)
    }  
    const create = ()=>{
        if(at === ""){
            toast("Please Enter Assessment title first")
        }else if(parseInt(noQns) ===0){
            toast("The assessment has no questions")
        }else if(category===""){
            toast("Please specify category")
        }else if(subCategory ===""){
            toast("Please specify subcategory")
        }else{
            const assessment = {
                title: at,
                duration: ad,
                banner: banner,
                category: category,
                subCategory: subCategory,
                numTopics: mytopics.length,
                numQns: parseInt(noQns),
                questions: mytopics,
                config: {
                    showAnswer, allowBack, previewCorrect, previewStatus, allowReport, shuffleQuestions, shuffleOptions
                }
            }
            setIsSubmitting(true)
            axios.post(API_ENDPOINT+'sam/create-mocktest', {assessment}, HEADER_TOKEN).then(res=>{
                setIsSubmitting(false)
                let d = res.data
                if(d.success){
                    toast(d.message)
                    document.location.href = "/mock-test"
                }else{
                    toast(d.message)
                }
            })
        }
    }
    return(
        <div>
            {isSubmitting? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <CircularProgress />
    </div>:''}
            <div className="config_assessment">
                <div style={{display: 'flex', justifyContent: 'center', margin: '8px 10px 16px 10px'}}>
                <img src={banner} style={{borderRadius: '50%', width: '96px',height: '96px', objectFit: 'cover'}} alt=""/>
                    <div style={{marginLeft: '12px'}}>
                        <div style={{fontSize: 20, marginTop: 12}}>{at}</div>
                        <div style={{display: 'table', margin: 'auto', marginBottom: 16}}>
                        <Qsize numQns = {noQns} numTopics = {mytopics.length} duration={ad}/>
                        </div>
                    </div>
                </div>
               <ConfigItem text="Need to show the answer after each question?" checked={showAnswer} setChecked={setShowAnswer} />
               <ConfigItem text="Allow candidate to click back to previous question?" checked={allowBack} setChecked={setAllowBack} />
               <ConfigItem text="Preview questions with correct answer" checked={previewCorrect} setChecked={setPreviewCorrect}/>
               <ConfigItem text="Preview questions with answer status" checked={previewStatus} setChecked={setPreviewStatus}/>
               <ConfigItem text="Allow report download" checked={allowReport} setChecked={setAllowReport}/>
               <ConfigItem text="Shuffle questions" checked={shuffleQuestions} setChecked={setShuffleQuestions}/>
               <ConfigItem text="Shuffle options" checked={shuffleOptions} setChecked={setShuffleOptions}/>

            </div>
            <div style={{display: 'flex',  margin: 'auto', justifyContent: 'center', marginTop: 48}}>
    <Button onClick = {onBack} sx={{textTransform: 'none', borderRadius: 12}}  variant="contained" startIcon={<ArrowBackIosNewIcon />}>Previous</Button>
    <div style={{marginLeft: 16}}><Button sx={{textTransform: 'none', borderRadius: 12, backgroundColor: 'green'}} onClick={create}  variant="contained" startIcon={<DriveFileRenameOutlineIcon />}>Create</Button></div>
    </div>
        </div>
    )
}
export default ConfigureCreate