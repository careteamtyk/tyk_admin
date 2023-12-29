import QuestionOption from './questionOption'
import parse from 'html-react-parser';
import './qPreviewBox.css'
import { Button } from '@mui/material';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
const QpreviewBox = (props)=>{
    const {question, setShowView} = props
    const ons= ["A", "B", "C", "D", "E", "F"]
    return (
        <div className="q-preview-box">
            <Button onClick={()=>setShowView("question")} startIcon={<ArrowBackIosNewOutlined />} sx={{margin: '16px 2px'}} variant='outlined' size='small'>Back</Button>
             <div className='question_num'>Question 1)</div>
             <div className='question'>{parse(question.question)}</div>
             {
                 question.options.map((qo, i)=>(
                    <QuestionOption  on = {ons[i]} oc={qo.option}/>
                 ))
             }
        </div>
    )
}
export default QpreviewBox