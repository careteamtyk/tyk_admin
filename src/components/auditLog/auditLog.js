import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import './auditLog.css'
const AuditLog = ()=>{
    const [al, setAl] = useState([])
    const [pb, setPb] = useState(false)
    useEffect(()=>{
        loadAls()
    }, [])
    function loadAls(){
        setPb(true)
        axios.post(API_ENDPOINT+'sam/get-audit-logs', {}, HEADER_TOKEN).then(res=>{
            setPb(false)
            let d = res.data
            if(d.success){
                setAl(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    function formatDate(str){
        let d = new Date(str)
        let dd = d.getDay()
        let mm = d.getMonth()
        let y = d.getFullYear()
        let mins = d.getMinutes()
        let secs = d.getSeconds()
        return dd+"/"+mm+"/"+y
    }
    return (
        <div className='audit-logo'>
        <h2>Audit Log</h2>
        {
            pb?<CircularProgress />:
            <table>
                <tr>
                    <th>Origin</th><th>Activity</th><th>Date</th>
                </tr>
                {
                    al.map(a=>(
                        <tr>
                            <td>{a.origin}</td><td>{a.message}</td><td>{formatDate(a.date)}</td>
                        </tr>
                    ))
                }
            </table>
        }
        </div>
    )
}
export default AuditLog