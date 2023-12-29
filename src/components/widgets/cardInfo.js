import './cardInfo.css'
const CardInfo = (props)=>{
    const {title, num, pc, duration, bg} = props
    return(
        <div className="card_info" style={{background: bg}}>
            <div>{title}</div>
            <div style={{fontSize: 26, marginTop: 6}}>{num}</div>
            {/* <div style={{fontSize: 14}}>{`${pc}% (${duration} days)`}</div> */}
        </div>
    )
}
export default CardInfo