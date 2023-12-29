import './Topic.css'
import DoneIcon from '@mui/icons-material/Done';
const Topic = (props)=>{
    const {text, onClick} = props
    return (
        <div onClick={onClick} className='ql-topic-d'>
            <div>{text}</div>
        </div>
    )
}
export default Topic