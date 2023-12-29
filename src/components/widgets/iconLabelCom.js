const IconLabelCom = (props)=>{
    const {icon, label} = props
    return(
        <div style={{display: 'flex'}}>
            {icon}
            <div style={{fontSize: 15, marginLeft: 6}}>{label}</div>
        </div>
    )
}
export default IconLabelCom