import React, { useEffect, useState } from 'react';
import CustomCircularP from '../widgets/customCircularP';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants/constants';
import applogo from '../assets/svgs/applogo.svg'
import aprofile from '../assets/images/aprofile.png'
import AnswerBox from './answerBox';
import './ViewMockResult.css'
const ViewMockResult = () => {
    const [loading, setLoading] = useState(false)
    const [mockTest, setMockTest] = useState({})
    const { id } = useParams();

    useEffect(()=>{
        mtSheet()
    }, [id])
    function mtSheet(){
        setLoading(true)
        axios.get(API_ENDPOINT+'get-user-sheet/'+id).then(res=>{
            const d = res.data
            setLoading(false)
            if(d.success){
                setMockTest(d.message)
            }
        })        
    }

    return (
        <div>
            <CustomCircularP show={loading}/>
        {Object.keys(mockTest).length>0 && <div className="user-response">
        <div>
            <div className="user-response-header">
                <img src={applogo}  style={{height: '90px', alignSelf: 'center'}}/>
                <div className="ur-atitle">{mockTest.title}</div>
                <div className="ur-details">
                    <center><img src={aprofile} style={{height: '90px'}}/>
                    <div style={{fontSize: 15, color: '#444', marginTop: 8}}>{mockTest.candidate_name}</div>
                    <div style={{display: 'flex', color: 'green', justifyContent: 'center'}}>
                        <div style={{alignSelf: 'center'}}>Your Score</div>
                        <div style={{fontSize: 30, marginLeft: 16}}>{mockTest.allquestions.filter(mq=>mq.choiceCorrect).length+'/'+mockTest.numQns}</div>
                    </div>
                    </center>
                </div>
            </div>
            <div className="ur-content">
                <div className="ur-label-action">
                    <h2 style={{flex: 1}}>Answer Sheet</h2>        
                </div>
                {mockTest.allquestions.map(b=><AnswerBox assessment={mockTest}  answer={b} />)}
            </div>
        </div>
        </div>}
    </div>
    );
};

export default ViewMockResult;