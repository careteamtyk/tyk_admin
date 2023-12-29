import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../../constants/constants';
import CustomCircularP from '../widgets/customCircularP';
import { Translate } from '@mui/icons-material';
import { getDateFormat } from '../../utils/util';
import { Button } from '@mui/material';

const MtReport = ({linkCode}) => {

    const [loading, setLoading] = useState(false)
    const [mockTest, setMockTest] = useState([])

    useEffect(()=>{
        mtReports()
    }, [linkCode])

    function mtReports(){
        setLoading(true)
        axios.get(API_ENDPOINT+'get-user-sheets/'+linkCode).then(res=>{
            const d = res.data
            setLoading(false)
            if(d.success){
                setMockTest(d.message)
            }
        })        
    }
    const onViewResult = (id)=>{
        window.open(`mock-test-report/${id}`, '_blank');
    }
    return (
        <div>
            <CustomCircularP show={loading}/>
            {
                !loading && <>
                {mockTest.length>0 ?
                    <div>
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
                                <th>No of Qns</th>
                                <th>Taken On</th>
                                <th>View Result</th>
                            </tr>
                            {
                                mockTest.map((od, i)=>
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{od.candidate_name}</td>
                                        <td>{od.numQns}</td>
                                        <td >{getDateFormat(new Date(od.createdOn))}</td>
                                        <td><Button onClick={()=>onViewResult(od._id)} variant='outlined' size='small'>View</Button></td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    </div>:
                    <div 
                    style={{
                        position: 'fixed',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '22px',
                        color: '#777',
                        textAlign: 'center'
                    }}
                    >
                       <p>No Reports Found yet.</p>
                       <div style={{fontSize: '14px'}}>You will see reports after people take this mocktest</div>
                    </div>
                }
                </>


            }            
        </div>
    );
};

export default MtReport;