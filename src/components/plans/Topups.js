import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_ENDPOINT, PAGE_SIZE, RUPEE_SYMBOL } from '../../constants/constants';
import { getDateFormat, getHeader } from '../../utils/util';
import CustomCircularP from '../widgets/customCircularP';
import { Button, IconButton } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MyModal from '../widgets/myModal/myModal';
import AddPlan from './AddPlan';
import PreviewIcon from '@mui/icons-material/Preview';
import AddTopup from './AddTopup';

const Topups = () => {
    const [plans, setPlans] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentPlan, setCurrentPlan] = useState(null)
    const [currentMode, setCurrentMode] = useState("add")
    useEffect(()=>{
        loadPlans()
    }, [])
    function loadPlans(){
        setLoading(true)
        axios.get(API_ENDPOINT+'admin/get-topups', getHeader()).then(res=>{
            setLoading(false)
            const d = res.data
            if(d.success){
                d.message.sort((a, b) => {
                    if (a.isActive && !b.isActive) {
                        return -1;
                    }
                    if (!a.isActive && b.isActive) {
                        return 1;
                    }
                    return 0;
                });
                setPlans(d.message)
            }
        })
    }
    const addPlan = ()=>{
        setCurrentPlan(null)
        setCurrentMode("add")
        setShowAdd(true)
    }
    const onViewPlan = (cpl)=>{
        setCurrentPlan(cpl)
        setCurrentMode("view")
        setShowAdd(true)
    }
    const onActionDone = ()=>{
        setShowAdd(false)
        loadPlans()
    }
    return (
        <div>
            <MyModal showModal={showAdd} title="Add Topups" setShowModal={setShowAdd} modalC={<AddTopup show={showAdd} onActionDone={onActionDone} mode={currentMode} plan={currentPlan} />}/>
            <CustomCircularP show={loading}/>
        <div style={{display: 'flex'}}>
            <div style={{flex: 1}}><h2>Topups</h2></div>
            <div style={{alignSelf: 'center'}}><Button onClick={addPlan} variant='contained' startIcon={<AccountBalanceWalletIcon />}>Add Topup</Button> </div>
        </div>
          <div className="rd-table-container">
                <table>
                    <tbody>
                    <tr>
                        <th>SI.no.</th>
                        <th>Name</th>
                        <th>Price({RUPEE_SYMBOL})</th>
                        <th>Count</th>
                        <th>discount</th>
                        <th>color</th>
                        <th>createdOn</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {
                        plans.map((od, i)=>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{od.name}</td>
                                <td>{od.price}</td>
                                <td>{od.count}</td>
                                <td>{od.discount}</td>
                                <td style={{backgroundColor: `${od.color}`}}>{od.color}</td>
                                <td>{getDateFormat(new Date(od.createdOn))}</td>
                                <td>{od.isActive? "Active": "Inactive"}</td>
                                <td><IconButton onClick={()=>onViewPlan(od)}><PreviewIcon /></IconButton></td>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Topups;