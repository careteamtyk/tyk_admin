import './qlCategory.css'
import {Button} from '@mui/material'
import axios from "axios"
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
const QlCategory = (props)=>{
    const {selected, onCategorySelected, onCatStatusChanged, value, status} = props
    return(<div onClick={onCategorySelected} className={selected?'ql-topic-c selected':'ql-topic-c'}>
        <div className='ql-topic'>
            {value}
        </div>
        <div className='ql-topic-status'><Button onClick={onCatStatusChanged} size="small" variant="outlined">{status}</Button></div>
    </div>)
}
export default QlCategory