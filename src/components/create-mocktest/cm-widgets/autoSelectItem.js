import { TextField } from "@mui/material"
import { useState } from "react"
import './autoSelectItem.css'
const AutoSelectItem = (props)=>{
    const {label, onSelect} = props
    const selectItem = ()=>{
        onSelect(label)
    }
    return(
        <div onClick={selectItem} className="auto-select-item">
           {label}
        </div>
    )
}
export default AutoSelectItem