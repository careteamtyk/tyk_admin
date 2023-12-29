import './addTopic.css'
import DoneIcon from '@mui/icons-material/Done';
const Topic = (props)=>{
    const {text, isSelectable=true, onTopicSelect, currentTopic} = props
    const onSelect = ()=>{
        if(isSelectable){
            onTopicSelect(text)
        }
    }
    return (
        <div onClick={onSelect} className={text === currentTopic?'topic selected':'topic'}>
            <div>{text}</div> {text === currentTopic?<DoneIcon />:''}
        </div>
    )
}
export default Topic