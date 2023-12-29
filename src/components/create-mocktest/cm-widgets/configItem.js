import './configItem.css'
import Switch from '@mui/material/Switch';
const ConfigItem = (props)=>{
    const {text, checked, setChecked} = props
    const onChange  = ()=>{
        setChecked(!checked)
    }
    return(
        <div className='config_item'>
            <div>{text}</div><Switch checked={checked} onChange={onChange} />
        </div>
    )
}
export default ConfigItem