import { Button, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import SearchBar from '../widgets/searchBar'
import TopicBox from '../widgets/topicBox'
import './selectQuestions.css'
import BiotechIcon from '@mui/icons-material/Biotech';
import {CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import clockIcon from '../assets/svgs/clock.svg'
import topicIcon from '../assets/images/topic_icon.png'
import questionIcon from '../assets/images/question_paper_icon.png'
import IconLabel from '../widgets/iconLabel'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import axios from 'axios'
import SelectedTopic from '../widgets/selectTopic'
import { toast } from 'react-toastify'
import { isReallyNumber } from '../../utils/util'
const SelectQuestions = (props)=>{
    const {at, ad, banner, category, setS, mytopics, setMytopics} = props
    const [topics, setTopics] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [qno, setQno] = useState("")
    const [st, setSt] = useState("")
    const [ct, setCt] = useState({})
    let noQns = mytopics.length>0?mytopics.map(i=>i.numQns).reduce((a,b)=>parseInt(a)+parseInt(b)):0
    useEffect(()=>{
        loadTopics()
    }, [])
    const onSearch = e=>{

    }
    function btoast(msg){
      toast(msg, {autoClose: 900, position: 'top-left'})
    }
    const onAdd = ()=>{
      if(qno == 0)
        btoast("Enter more than zero")
      else if(!isReallyNumber(qno))
        btoast("Please enter valid number")
      else if(Object.keys(ct).length<=0){
        btoast("Please select topic")
      }else if(parseInt(qno)>parseInt(ct.num)){
        btoast(`You cannot exceed ${ct.num}`)
      }else{
        let tps = [...mytopics]
        let fi = tps.findIndex(f=>f.topic===ct.topic)
        if(fi !== -1){
          btoast("Topic already added")
        }else{
          tps.push({topic: ct.topic, numQns: qno})
          setMytopics(tps)
          setQno("")
          btoast("Added successfully")
        } 
      }

    }
    const onRemove = (tp)=>{
      let nr = [...mytopics]
      let i = nr.findIndex(t=>t.topic===tp)
      nr.splice(i, 1)
      setMytopics(nr)
    }
    const onTopicSelect = (s)=>{
        setSt(s.topic)
        setCt(s)
    }
    const goNext = ()=>{
      setS(3)
    }
    const goPrev = ()=>{
      setS(1)
    }
    const onKeyEnter = (e)=>{
        if(e.key === "Enter"){
          onAdd()
        }
    }
    function loadTopics(){
        axios.post(API_ENDPOINT+'sam/get-topics-num', {category: category}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let ta = d.message
                let ar = []
                ta.map(at=>{
                  ar.push({topic: at._id, num: at.count})
                })
                setTopics(ar)
            }else{
              toast(d.message)
            }
        })
    }
    return(
        <div className='select-questions'>
            <h3 style={{color: 'rgb(72 71 71)'}}>Select Questions</h3>

    <div style={{display: 'flex', width: '100%', marginTop: 12}}>
        <div style={{maxWidth: 500, width: '100%', padding: 8}}>
        <SearchBar size="9px" placeholder="Search Topic"  onSearch={onSearch}/>
        <div style={{marginTop: 16}}>
          {
            topics.map(t=>(
              <TopicBox onClick={()=>onTopicSelect({topic: t.topic, num: t.num})} topic={t.topic} num={t.num} selected={t.topic === st}/>
            ))
          }
        </div>
        </div>
        <div style={{flex: 1, marginLeft: 16}}>
            <div style={{maxWidth: 450, padding: 16, borderRadius: 12, width: '100%', boxShadow: 'rgb(0 0 0 / 16%) 0px 3px 6px, rgb(152 167 235 / 23%) 0px 3px 6px'}}>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: isLoading?'table':'none'}}><CircularProgress /></div>
            <p>Selected Topic</p>
            <div style={{display: 'flex', color: '#555'}}>
            <BiotechIcon />
            <div style={{fontWeight: 500, fontSize: 16, alignSelf: 'center', marginLeft: 8}}>{Object.keys(ct).length>0?ct.topic:"Select Topic"}</div>
            <div style={{marginLeft: 12, color: '#888', alignSelf: 'center', fontSize: 15}}>{Object.keys(ct).length>0?ct.num:"..."}{" Questions"}</div>
            </div>
            <div style={{fontWeight: 500, marginTop: 16}}>Select no of Questions</div>
            <div style={{fontSize: 13, color: '#888'}}>System will randomly pick from question bank</div>
            <div style={{display: 'flex', marginTop: 16}}>
            <div style={{alignSelf: 'center'}}><TextField onKeyDown={onKeyEnter} onChange={(e)=>setQno(e.target.value)} value={qno} label="No. of Questions" size='small'/></div><div style={{marginLeft: 16, alignSelf: 'center'}}><Button onClick={onAdd} startIcon={<AddIcon />} variant='contained'>Add</Button></div>
            </div>
            </div>
        </div>
    </div>
    <div style={{display: 'flex',  margin: 'auto', justifyContent: 'center', marginTop: 48}}>
    <Button onClick={goPrev} variant="contained" startIcon={<ArrowBackIosNewIcon />}>Previous</Button>
    <div style={{marginLeft: 16}}><Button onClick={goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button></div>
    </div>

    <div style={{display: 'flex', marginTop: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderTop: '4px solid #3208FF', padding: 10, boxShadow: ' 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'}}>
    <img src={banner} style={{borderRadius: 10, maxHeight: '144px', objectFit: 'cover'}} alt=""/>
            <div style={{marginLeft: 16, marginRight: 16}}>
               <div style={{fontWeight: 600, fontSize: 16}}>{at}</div>
               <IconLabel icon={clockIcon} label={ad+" minutes"} is={16} ls={14} gap={10} />
               <IconLabel icon={topicIcon} label={`${mytopics.length} Topics Added`} is={16} ls={14} gap={10} />
               <IconLabel icon={questionIcon} label={`${noQns} Questions Added`} is={16} ls={14} gap={10} />
            </div>
        <div style={{flex: 1, paddingLeft: 32, paddingRight: 16}}>
          <div style={{fontWeight: 600, fontSize: 16}}>Selected Topics</div>
          {
            !(mytopics.length>0)?'No Topic selected yet':(
              mytopics.map(t=>(
                <SelectedTopic  onRemove={()=>onRemove(t.topic)} topic={t.topic} num={t.numQns} /> 
              ))
            )
          }

        </div>
    </div>
        </div>
    )
}
export default SelectQuestions