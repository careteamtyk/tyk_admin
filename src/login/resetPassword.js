import { useRef, useState } from "react";
import './resetpwd.css'
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { API_ENDPOINT, HEADER_TOKEN } from "../constants/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteToken, getToken, saveToken } from "../utils/util";

const PasswordReset = () =>{
    const [cp, setCp] = useState("")
    const [newpass, setNewPass] = useState("")
    const [confpass, setConfPass] = useState("")
   
    
    const pwdResetSubmit = (event) =>{
        event.preventDefault()
        let params = {cp, newpass, confpass}
        axios.post(API_ENDPOINT+'sam/reset-password', params, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
               deleteToken()
               document.location.href = '/'
            }else{
                toast(d.message)
            }
        })
    }



    return (
        <div className="pwdReset">
            <ToastContainer />
            <div className="pwdInfo">
                <h2>Reset Your Password</h2>
                <form onSubmit={pwdResetSubmit}>
                    <TextField value={cp} onChange={(e)=>setCp(e.target.value)}  type="password"  label="Enter Current Password"  variant="standard"  fullWidth required margin="normal" />
                    <TextField value={newpass} onChange={(e)=>setNewPass(e.target.value)}  type="password"  label="Enter New Password"  variant="standard"  fullWidth required margin="normal" />
                    <TextField value={confpass} onChange={(e)=>setConfPass(e.target.value)}  type="password"  label="Confirm Password"  variant="standard"  fullWidth required margin="normal" />
                    <Button margin="normal" variant="contained" fullWidth type="submit">Reset</Button>
                </form>
            </div>
        </div>
    );
}
export default PasswordReset;