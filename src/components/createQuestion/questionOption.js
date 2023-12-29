import './questionOption.css'
import parse from 'html-react-parser';
const QuestionOption = (props)=>{
   const {on, oc} = props
    return(<div className='question_option'>
        <div className='option_num'><div style={{alignSelf: 'center'}}>{on}</div></div>
        <div className='option_content'>{parse(oc)}</div>
    </div>)
}
export default QuestionOption