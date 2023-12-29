import './answerOption.css'
import parse from 'html-react-parser';
const AnswerOption = (props)=>{
    const {isAnswer, on, oc, wrong} = props
    return(
        <div className={isAnswer && !wrong?'answer_option answer':(wrong? 'answer_option wrong':'answer_option')}>
        <div className='option_num'><div style={{alignSelf: 'center'}}>{on}</div></div>
        <div className='option_content'>{parse(oc)}</div>
        </div>
    )
}
export default AnswerOption