import { Button, FormControlLabel, IconButton, InputBase, Paper, Switch } from "@mui/material"
import { useEffect, useState } from "react"
import './qlQuestions.css'
import QlQuestionBox from "./qlQuestionBox";
import EmptyContent from "../widgets/emptyContent";
import AlertDialogSlide from "../widgets/ratulModal/alertDialog";
import CustomCircularP from "../widgets/customCircularP";
import SearchBar from "../widgets/searchBar";
import { ArrowBackIosNew } from "@mui/icons-material";
const QlQuestions = (props)=>{
    const {onQnDeleted, isQnsLoaded, setShowQuestions, category, topic, questions, setQuestions} = props
    const [myqns, setMyqns] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [showAns, setShowAns] = useState(false)
    const [cq, setCq] = useState({})
    const [dopen, setDopen] = useState(false)
    const onChange = ()=>{
        setShowAns(!showAns)
    }
    const onSearch = (e)=>{
       let s = e.target.value
       if(s.length>0){
            setShowSearch(true)
            let ss = [...questions]
            let sf = ss.filter(f=>f.question.includes(s))
            setMyqns(sf)
       }else{
           setShowSearch(false)
           setMyqns(questions)
       }
    }
    const onDelete = (qn)=>{
        setCq(qn)
        setDopen(!dopen)
    }
    const onEdited = (qf, id)=>{
        let qss1 = [...myqns]
        let qss2 = [...questions]
        let i1 = qss1.findIndex(qs=>qs._id === id)
        let i2 = qss2.findIndex(qs=>qs._id === id)
        let newQn = {_id: id, ...qf}
        if(i1>=0){
            qss1.splice(i1, 1, newQn)
        }
        if(i2>=0){
            qss2.splice(i2, 1, newQn)
        }
        setMyqns(qss1)
        setQuestions(qss2)
    }
    return(
        <div className="ql-questions-c">
           {<CustomCircularP show={!isQnsLoaded} />}
             {!!cq?<AlertDialogSlide onQnDeleted={onQnDeleted} isQl={true} dopen = {dopen} q={cq} setDopen= {setDopen} myqns={myqns} setMyqns={setMyqns} questions = {questions} setQuestions={setQuestions}/>:''}
           <div className="ql-questions-h">
                <div style={{flex: 1}}>
                <div className="ql-questions-hl">
                    <Button onClick={()=>setShowQuestions(false)} className="ql-questions-hl-back" variant="outlined" startIcon={<ArrowBackIosNew/>}>Topics</Button>
                    {`${category} > ${topic} >`}{questions.length>0?`${questions.length} Questions`:'Questions'}
                    </div>
                <FormControlLabel
                        value="start"
                        control={<Switch size="small" color="primary" />}
                        label="Show Answer"
                        checked={showAns}
                        onChange = {onChange}
                        labelPlacement="start"
                    />
                </div>
                <div>
                <SearchBar size="9px" placeholder="Search Question"  onSearch={onSearch}/>
                </div>    
            </div>
                    <div className="ql-questions">
                        {
                        !showSearch?                   
                        questions.length>0?
                        questions.map((q, i)=>(
                            <QlQuestionBox i={i} onDelete={()=>onDelete(q)} onEdited={onEdited} q={q} showAns={showAns} />
                        )):<EmptyContent lv="No Questions yet"/>
                        :
                        <div>
                            {myqns.map(q=>(
                                <QlQuestionBox onDelete={()=>onDelete(q)} onEdited={onEdited} q={q} showAns={showAns} />
                             ))
                            }
                        </div>
                        }    
                    </div>
        </div>
    )
}
export default QlQuestions