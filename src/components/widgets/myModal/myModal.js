import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import './myModal.css'
const MyModal = (props)=>{
    const {showModal, setShowModal, title="", modalC} = props
    useEffect(()=>{
        if(showModal){
            modal.current.style.display = 'flex'
            modal.current.style.justifyContent = 'center'
            modal.current.style.animation = "showa 0.6s both"
        }else{
            modal.current.style.animation = "hidea 0.6s both"
            setShowModal(false)
        }
    }, [showModal])
    const modal = useRef(null)
    window.onclick = e=>{
        if(modal && e.target === modal.current)
            hideModal()
    }
    const animEnd = ()=>{
        if(window.getComputedStyle(modal.current).getPropertyValue("opacity") == 0){
            modal.current.style.display = "none"
        }
    }
    function hideModal(){
        modal.current.style.animation = "hidea 0.6s both"
        setShowModal(false)
    }
    const close = ()=>{
        hideModal()
    }
    return(
        <div ref={modal} onAnimationEnd={animEnd}  class="modal">
        <div onclick="event.stopPropagation()" class="modal-content">
                <div class="modal-header">
                <div style={{flex: 1, alignSelf: 'center', fontSize: 22, fontWeight: 700, marginLeft: 16, marginTop: 16, color: '#333'}}>{title}</div><div onClick={close} class="close">&times;</div>
                </div>
                <div className="modal-c-body">
                    {modalC}
                </div>
            </div>
            </div>
    )
}
export default MyModal