import './qlBtn.css'
import GridOnIcon from '@mui/icons-material/GridOn';
import { Button } from '@mui/material';
const QlBtn = (props)=>{
    const {hl, bl, ic} = props
    return(
        <div className="ql-btn">
            <div className="ql-btn-h">{hl}</div>
            <div className="ql-btn-a">
                <Button onClick={props.onClick} variant="contained" startIcon={ic}>{bl}</Button>
            </div>
        </div>
    )
}
export default QlBtn