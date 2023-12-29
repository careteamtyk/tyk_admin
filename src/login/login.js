import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from '../constants/constants';
import {saveToken} from '../utils/util'
import loginOfficeImg from './login-office.jpeg'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const Login  = ()=>{
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
    const onSubmit = (e)=>{
        e.preventDefault()  
        axios.post(API_ENDPOINT+'sam/login', {username, password}).then(res=>{
            let d = res.data
			console.log(d)
            if(d.success){
                let token = d.message.token
                saveToken(token)
                document.location.href = '/home'
            }else{
                toast(d.message)
            }
        })
    }
	const handleMouseDownPassword = (event)=>{
		event.preventDefault()
	}
    return(
        <div className="container">
           <div className='login-content'>
			<div className='login-banner'>
			</div>
			<div className='login-action-area'>
				<h1 style={{textAlign: 'center'}}>Welcome Admin</h1>
				<div style={{paddingLeft: '20px', paddingRight: '20px'}}>
				<form onSubmit={onSubmit}>
				<TextField margin='normal' required value={username} type="text" onChange={(event)=>setUsername(event.target.value)} variant="outlined" fullWidth size='small' label='Username'  />

				<FormControl required margin='normal' fullWidth size='small' variant="outlined">
				<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={(event)=>setPassword(event.target.value)}
					endAdornment={
					<InputAdornment position="end">
					<IconButton
						aria-label="toggle password visibility"
						onClick={()=>setShowPassword(!showPassword)}
						onMouseDown={handleMouseDownPassword}
						>
						{!showPassword ? <VisibilityOff /> : <Visibility/>}
						</IconButton>
					</InputAdornment>
					}
					label="Password"
				/>
				</FormControl>
				<div style={{marginTop: '20px'}}>
					<Button type='submit' variant='contained' fullWidth>Login</Button>
				</div>
				</form>
				</div>	
			</div>
			</div>
		</div>
    )
}
export default Login