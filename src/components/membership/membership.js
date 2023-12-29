import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_ENDPOINT, PAGE_SIZE } from '../../constants/constants'
import { getDateFormat, getHeader } from '../../utils/util'
import './membership.css'
import SearchBar from '../widgets/searchBar'
import { Button } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt';
import CustomCircularP from '../widgets/customCircularP'
import * as XLSX from 'xlsx';
const Membership = ()=>{

    const [currentPage, setCurrentPage] = useState(1)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQ, setSearchQ] = useState('')

    useEffect(()=>{
        getMembers()
    }, [searchQ])
    function getMembers(){
        setLoading(true)
        axios.post(API_ENDPOINT+'admin/get-trainers', {page: currentPage, searchQ: searchQ}, getHeader()).then(res=>{
            setLoading(false)
            let d = res.data
            if(d.success){
                setUsers(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    const onSearch = (e)=>{
        setSearchQ(e.target.value)
    }
    const onExport = ()=>{
        let newUsers = []
        users.map((user, i)=>{
            newUsers.push({
                name: user.name,
                email: user.email,
                phone: user.phone,
                plan: user.plan.name
            })
        })

        const ws = XLSX.utils.json_to_sheet(newUsers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Users");
        XLSX.writeFile(wb, "output.xlsx");
    }

    return (
        <div className="membership-container">
            <CustomCircularP show={loading}/>
            <div style={{display: 'flex', marginBottom: '12px'}}>
                <div style={{flex: 1}}>
                <SearchBar onSearch={onSearch} placeholder="Search by Name" size='8px' cstyle={{maxWidth: '400px'}}/>
                </div>
                <Button onClick={onExport} variant='outlined' size='small' startIcon={<ListAltIcon />}>Export</Button>
            </div>
            <div className="rd-table-container">
                <table>
                <colgroup>
                    <col span="1"  style={{width: '1%'}}/>
                    <col span="1" style={{width: '20%'}}/>
                    <col span="1" style={{width: '20%'}} />
                    <col span="1" style={{width: '19%'}} />
                    <col span="1" style={{width: '20%'}} />
                    <col span="1" style={{width: '20%'}} />
                </colgroup>
                    <tbody>
                    <tr>
                        <th>SI.no.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Plan</th>
                        <th>Joined On</th>
                    </tr>
                    {
                        users.map((od, i)=>
                            <tr>
                                <td>{(currentPage-1)*PAGE_SIZE+i+1}</td>
                                <td>{od.name}</td>
                                <td>{od.email}</td>
                                <td>{od.phone}</td>
                                <td>
                                    
                                    {od.plan?
                                    <div>
                                        {od.plan.name === 'Trial Plan'?
                                        <div>
                                            <div style={{color: '#444', fontWeight: 600}}>{od.plan.name}</div>
                                            <div style={{fontSize: '14px', marginTop: '8px'}}>
                                                Subscribed on: <span>{getDateFormat(new Date(od.plan.createdOn))}</span>
                                            </div>
                                        </div>:
                                        <div>
                                             <div style={{color: '#444', fontWeight: 600}}>{od.plan.name}</div>
                                            <div style={{fontSize: '14px', marginTop: '8px'}}>
                                                Subscribed on: <span>{getDateFormat(new Date(od.plan.createdOn))}</span>
                                            </div>
                                            </div>}
                                    </div>:'Not Subscribed'}
                                
                                </td>
                                <td >{getDateFormat(new Date(od.createdOn))}</td>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Membership