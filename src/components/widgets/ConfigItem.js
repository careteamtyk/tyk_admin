import Switch from '@mui/material/Switch';
const ConfigItem = ({text, checked, setChecked})=>{
    const onChange  = ()=>{
        setChecked(!checked)
    }
    return(
        <div style={{
            marginTop: '12px',
            border: '1px solid #ccc',
            borderRadius: '11px',
            padding: '1px 14px',
            userSelect: 'none',
            cursor: 'pointer',
            display: 'flex',
        }}>
            <div
            style={{
                alignSelf: 'center',
                flex: 1,}}
            >{text}</div><Switch checked={checked} onChange={onChange} />
        </div>
    )
}
export default ConfigItem