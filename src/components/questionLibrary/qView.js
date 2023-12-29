import './qView.css'
const QView  = (props)=>{
    const {q, num} = props
    return(
        <div className='duplicate-q-view'>
            <div className='q-view'>{q}</div>
            <div className='repeat-num'>{`${num} times`}</div>
        </div>
    )
}
export default QView