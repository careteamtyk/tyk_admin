import { SetMealSharp } from '@mui/icons-material'
import Close from '@mui/icons-material/Close'
import { Button, Divider, IconButton, TextField } from '@mui/material'
import { useState } from 'react'
import './autoSelect.css'
import AutoSelectItem from './autoSelectItem'
const AutoSelect = (props)=>{
    const {label, setCvalue, mlist, show, setShow} = props
    const [enableEdit, setEnableEdit] = useState(false)
    const [searchList, setSearchList] = useState(mlist)
    const [inval, setInval] = useState("")
    const onChange = (e)=>{
        let v = e.target.value
        setInval(v)
        let fl = mlist.filter(ob=>new RegExp(v, 'i').test(ob.label))
        setSearchList(fl)
    } 
    const onAdd = ()=>{
        setCvalue(inval)
        setShow(false)

    }
    const onSelect  = (v)=>{
        setCvalue(v)
        setInval(v)
        setShow(false)
    }
    const onKeyEnter = (e)=>{
        if (e.key === "Enter") {
            onAdd()
        }
    }
    return(
        <div className={show?'auto-select show':'auto-select'}>
            <IconButton onClick={()=>setShow(false)} size='small'><Close/></IconButton>
            <div style={{display: 'flex'}}>
            <TextField disabled={enableEdit} onKeyDown={onKeyEnter} value={inval} onChange={onChange} size='small' variant='outlined' fullWidth type='text'  label={label}/>
            <Button onClick={onAdd} variant='outlined' >Add</Button>
            </div>
            <div style={{maxHeight: '360px', overflowY: 'auto', marginTop: '10px'}}>
                
               {
                searchList.map((m, i)=><>
                <AutoSelectItem key={i} onSelect={onSelect} label={m.label}/>
                <Divider />
                </>)
               }
            </div>
        </div>
    )
}
export default AutoSelect