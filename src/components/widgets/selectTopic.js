import closeIcon from '../assets/images/close_btn_outline.png'
const SelectedTopic = (props)=>{
    const {isPreview, topic, num, onRemove} = props
    return(
        <div style={{display: 'inline-block', color: 'rgb(100 98 98)', margin: 8}}>
            <div style={{display: 'flex'}}>
            <div style={{alignSelf: 'center', display: 'flex', border: '1px solid #ccc', padding: '2px 8px 2px 8px', borderRadius: 10}}>
            <div style={{fontWeight: 500, fontSize: 15, paddingRight: 16}}>{topic}</div>
            <div>{num}</div>
            </div>
            {isPreview?'':<img onClick={onRemove} src={closeIcon} alt="" style={{alignSelf:'center', width: 22, cursor: 'pointer'}}/>}
            </div>
        </div>
    )
}
export default SelectedTopic