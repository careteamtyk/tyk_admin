import './emptyContent.css'
const EmptyContent = (props)=>{
    const {bg="#ebebf3", lc="rgb(169 167 167)", lv="No Content Here"} = props 
    const cs = {
        background: bg
    }
    const ls={
        color: lc
    }
    return(
        <div style={cs} className='empty-content'>
            <div style={ls} className='empty-c-l'>{lv}</div>
        </div>
    )
}
export default EmptyContent