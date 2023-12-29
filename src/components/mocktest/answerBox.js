import './answerBox.css'
import parse from 'html-react-parser';
import AnswerOption from './answerOption';
const AnswerBox = ({assessment, answer})=>{
    const optionsI = ["A", "B", "C", "D", "E", "F"]
    const wrong = !isCorrect(answer.options, answer.response)
    function isCorrect(os, r){
        let ind = os.findIndex(o=>o.isCorrect)
        return optionsI[ind] === r
    }
    return (
        <div className='answer_box'>
             <div className='question_num'><span style={{color: 'green'}}>Q{answer.qno}.</span> <span style={{marginLeft: '8px', fontWeight: '500'}}>(Topic: {answer.topic})</span></div>
             <div className='question'>{parse(answer.question)}</div>
            {
                answer.options.map((option, i)=>(
                    <AnswerOption isAnswer={option.isCorrect} wrong={wrong && answer.response === optionsI[i]} on={optionsI[i]} oc={option.option}/>
                ))
            }

        {assessment.config.previewStatus && <div style={{margin: 12, border: '1px solid #ccc', display: 'table', padding: '2px 12px', borderRadius: 8, fontSize: 16}}>
            Status: <span style={{color: answer.status==="attempted"?"green":"red", marginRight: '8px'}}>{answer.status}</span>
        </div>}
        </div>
    )
}
export default AnswerBox