import { AddCircleOutline } from '@mui/icons-material'
import { Button } from '@mui/material'
import './mockAddHeader.css'
const MockAddHeader = (props)=>{
    const {text, onClick} = props
    return(
        <div className='mock-add-header'>
            <div className='mock-h-text'>{text}</div>
            <Button onClick={onClick} className='mock-h-add' variant='contained' startIcon={<AddCircleOutline/>}>Add</Button>
        </div>
    )
}
export default MockAddHeader