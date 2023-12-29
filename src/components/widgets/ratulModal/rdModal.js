import './rdModal.css'
import {useEffect, useRef, useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import {convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { EditorState } from 'draft-js';
import OptionAns from './optionAns';
import { Button, CircularProgress, IconButton, Input } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TopicIcon from '@mui/icons-material/Topic';
import AddTopic from './addTopic';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import { optionChecker } from '../../../utils/util';
import AddCategory from './addCategory';
const RdModal = (props)=>{ 
    const {showModal, onQnAdded, setShowModal, questions, setQuestions} = props
    
    const [showAddTopic, setShowAddTopic] = useState(false)
    const [showAddCategory, setShowAddCategory] = useState(false)
    const [question, setQuestion] = useState("")
    const [totalOptions, setTotalOptions] = useState(4)
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("")
    const [optionE, setOptionE] = useState("")
    const [optionF, setOptionF] = useState("")
    const [ca, setCa] = useState("")
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [currentTopic, setCurrentTopic] = useState("")
    const [currentCategory, setCurrentCategory] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onEditorStateChange = editorState => {
        setEditorState(editorState);
        setQuestion(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
    function resetState(){
        setQuestion("")
        setOptionA("")
        setOptionB("")
        setOptionC("")
        setOptionD("")
        setOptionE("")
        setOptionF("")
        setEditorState(EditorState.createEmpty())
        setCa("")
    }
    useEffect(()=>{
        if(showModal){
            modal.current.style.display = 'flex'
            modal.current.style.justifyContent = 'center'
            modal.current.style.animation = "showa 0.6s both"
        }
    }, [showModal])

    const modal = useRef(null)
    window.onclick = e=>{
        if(modal && e.target === modal.current)
            hideModal()
    }
    const animEnd = ()=>{
        if(window.getComputedStyle(modal.current).getPropertyValue("opacity") == 0){
            modal.current.style.display = "none"
        }
    }
    function hideModal(){
        modal.current.style.animation = "hidea 0.6s both"
        setShowModal(false)
    }
    const close = ()=>{
        hideModal()
    }
    const addClick = (e)=>{
        e.stopPropagation()
        if(totalOptions<6)
            setTotalOptions(totalOptions+1)
    }
    const onSave = ()=>{
        if(question.length<8){
            toast("Please Enter Question")
        }else if(optionA === ""){
            toast("Please Enter Option A")
        }else if(optionB === ""){
            toast("Please Enter Option B")
        }else if(currentCategory === ""){
            toast("Please select category")
        }else if(currentTopic === ""){
            toast("Please select topic")
        }else if(ca === ""){
            toast("Please select correct answer")
        }else{
           let ops = []
           ops.push({option: optionA, isCorrect: ca==="A"})
           ops.push({option: optionB, isCorrect: ca==="B"})
           if(totalOptions>2 && optionC !== "")
                ops.push({option: optionC, isCorrect: ca==="C"})
           if(totalOptions>3 && optionD !== "")
                ops.push({option: optionD, isCorrect: ca==="D"})
           if(totalOptions>4 && optionE !== "")
                ops.push({option: optionE, isCorrect: ca==="E"})
           if(totalOptions === 6 && optionF !== "")
                ops.push({option: optionF, isCorrect: ca==="F"})

            let qf = {question: question, category: currentCategory, topic: currentTopic, options: ops}        
            axios.post(API_ENDPOINT+'sam/add-qn-lib-man', qf, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    onQnAdded(currentCategory, currentTopic)
                    hideModal()
                    resetState()
                    toast(d.message, {autoClose: 900, position: 'bottom-center'})
                }else{
                    toast(d.message, {autoClose: 900, position: 'bottom-center'})
                }
            })
        }
    } 
    const uploadCallback = (file, callback) => {
        return new Promise((resolve, reject) => {
          const reader = new window.FileReader();
          reader.onloadend = async () => {
             const form_data = new FormData();
             form_data.append("image", file);
             
             axios.post(API_ENDPOINT+'trainer/upload-image-only', form_data, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    resolve({ data: { link:d.message} });
                }else{
                    toast(d.message)
                }
             })

          };
          reader.readAsDataURL(file);
        });
      }
      const config = {
        image: { uploadCallback: uploadCallback },
      }
    
    const onCategorySelect = ()=>{
        setShowAddCategory(!showAddCategory)
        setShowAddTopic(!!showAddCategory)
    }
    const onTopicSelect = ()=>{
        setShowAddTopic(!showAddTopic)
        setShowAddCategory(!!showAddTopic)
    }
    return(
        <div ref={modal} onAnimationEnd={animEnd}  class="modal">
            <div onClick={e=>e.stopPropagation()} class="modal-content">
                <div class="modal-header">
                <span onClick={close} class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div style={{position: 'absolute', zIndex: 20, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: isSubmitting?'initial':'none'}}><CircularProgress /></div>
                    <div class="editor_container">
                        <div style={{display: 'flex', position: 'absolute', right: 24, top: 11, cursor: 'pointer'}}>
                        <Button className='c_add_topic' onClick = {onCategorySelect} startIcon={<TopicIcon />} variant='outlined' sx={{color: 'white', border: '1px solid white', textTransform: 'none', borderRadius: 10, marginRight: '12px', fontWeight: 400, fontSize: 12}}>
                            {currentCategory===""?"Select Category":currentCategory}
                        </Button>
                        <Button disabled={currentCategory ===""} className='c_add_topic' onClick = {onTopicSelect} startIcon={<TopicIcon />} variant='outlined' sx={{color: 'white', border: '1px solid white', textTransform: 'none', borderRadius: 10, marginRight: '12px', fontWeight: 400, fontSize: 12}}>
                            {currentTopic===""?"Select Topic":currentTopic}
                        </Button>
                        <AddCategory currentTopic={currentCategory} setCurrentTopic={setCurrentCategory}  show ={showAddCategory} setShow ={setShowAddCategory} />
                        <AddTopic currentTopic={currentTopic} category={currentCategory} setCurrentTopic={setCurrentTopic}  show ={showAddTopic} setShow ={setShowAddTopic} />
                        </div>
                <Editor
                    toolbar={config}
                    editorState={editorState}
                    placeholder='Type your question here...'
                    onEditorStateChange={onEditorStateChange}
                />
                <div class="answer_c">
                    <OptionAns isAns={ca==="A"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionA} setAns = {setOptionA} op="A" optionL="Option A" text="Enter Answer" /> 
                    <OptionAns isAns={ca==="B"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionB} setAns = {setOptionB} op="B" optionL="Option B" text="Enter Answer" ls={6}/> 
                    <OptionAns isAns={ca==="C"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionC} setAns = {setOptionC} op="C" optionL="Option C" text="Enter Answer" ls={6}/>
                    <OptionAns isAns={ca==="D"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionD} setAns = {setOptionD} op="D" optionL="Option D" text="Enter Answer" ls={6}/>            
                   
                    <OptionAns isAns={ca==="E"} setCa={setCa} show={totalOptions>=5} showD={totalOptions===5} totalOptions={totalOptions} setTotalOptions={setTotalOptions} ans={optionE} setAns = {setOptionE} op="E" optionL="Option E" text="Enter Answer" ls={6}/>
                   
                    <OptionAns isAns={ca==="F"} setCa={setCa} show={totalOptions===6} showD={totalOptions===6} totalOptions={totalOptions} setTotalOptions={setTotalOptions} ans={optionF} setAns = {setOptionF} op="F"  optionL="Option F" text="Enter Answer" ls={6}/>
                    
                    {
                        totalOptions<6?
                        <IconButton onClick={addClick} color="primary" component="span">
                            <AddCircleOutlineIcon sx={{fontSize: 32}} />
                        </IconButton>:''
                    }
                </div>

                </div>
                </div>
                <div class="modal-footer">
               <div style={{display: 'flex', position: 'relative',marginTop:16, marginBottom: 12,  justifyContent: 'end'}}>
               <Button onClick={close} variant='contained'>Cancel</Button>
               <Button onClick={onSave} sx={{marginLeft: 2}}  startIcon={<CloudDownloadIcon />} variant='contained'>Save</Button>
               </div>
                </div>
            </div>
        </div>
    )
}
export default RdModal