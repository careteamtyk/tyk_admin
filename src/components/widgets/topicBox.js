import { useState } from 'react'
import './topicBox.css'
const TopicBox = (props)=>{
    const {topic, num, selected, onClick} = props
    const [sn,setSn] = useState(false)
    return (
        <div onClick={onClick} className={"topic_box"+(selected?" selected":"")} onMouseEnter={()=>setSn(true)} onMouseOut={()=>setSn(false)}>{topic}
        {(sn || selected)?<div className='topic_box_info'>{num} Questions</div>:''}
        </div>
    )
}
export default TopicBox