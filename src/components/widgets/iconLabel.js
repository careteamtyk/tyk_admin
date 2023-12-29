const IconLabel = (props)=>{
    const {icon, label, is, ls, gap, color, wt, font, isMUI} = props 
        
    const containerStyle = {
        display: 'flex',
        marginTop: 10,
        fontFamily: font?font:"Open Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
        marginBottom: 10
    }
    const iconStyle = {
        width: is?is:'initial'
    }
    const labelStyle = {
        marginLeft: gap, 
        fontSize: ls,
        color: color?color:'initial',
        fontWeight: wt?wt:500, 
        alignSelf: 'center'
    }
    return (
        <div style={containerStyle}>
            {isMUI?icon:<img style={iconStyle} src={icon} alt=""/>}
            <div style={labelStyle}>{label}</div>
        </div>
    )
}
export default IconLabel