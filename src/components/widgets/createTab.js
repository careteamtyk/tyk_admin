import './createTab.css'
const CreateTab = (props)=>{
    const {icon, title, step, index, size, active, onClick} = props
    return(
        <div onClick={onClick} className="create-tab" style={{borderBottom: active?'none':'1px solid #D3D4D5', borderLeft: (index>0)?'none':'1px solid #D3D4D5', background: active?'white':'#EFF5FE'}}>
            <img style={{width: 36, height: 36, alignSelf: 'center'}} src={icon} alt="" />
            <div style={{flex: 1, alignSelf: 'center', paddingLeft: 16}}>
                <div style={{fontSize: 15}}>{title}</div>
                <div style={{fontSize: 13, color: '#888'}}>{step}</div>
            </div>
        </div>
    )
}
export default CreateTab