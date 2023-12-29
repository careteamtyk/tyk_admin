import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import { Button, CircularProgress, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import './mocktests.css'
import SearchBar from "../widgets/searchBar";
import MockTestCard from "./mockTestCard";
import { toast } from "react-toastify";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import MtReport from "./mtReport";

const MockTests = ()=>{
    const PARENT = "parent"
    const REPORT = "report"
    const [currentView, setCurrentView] = useState(PARENT)
    const [cLink, setClink] = useState('')
  const [assessments, setAssessments] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [cdate, setCdate] = useState(new Date());
    const createRedirect = ()=>{
        document.location.href="/create-mocktest"
    }
    useEffect(()=>{
        loadMocktest()
    }, [])
    function loadMocktest(){
        setIsLoading(true)
        axios.post(API_ENDPOINT+'sam/get-mocktests', {}, HEADER_TOKEN).then(res=>{
            setIsLoading(false)
            let d = res.data
            if(d.success){
               setAssessments(d.message)
            }else{
              toast(d.message)
            }
        })
    }
    const onSearch = (e)=>{

    }
    const onMockTestReport = (linkCode)=>{
        setClink(linkCode)
        setCurrentView(REPORT)
    }
    return(
        <div>
           {currentView !==PARENT && <Button size="small" variant="outlined" onClick={()=>setCurrentView(PARENT)}>Back</Button>}

    {currentView ===PARENT? <>
            {
                isLoading?<CircularProgress />:''}
            {assessments.length>0?
            <div>
             <div style={{display: 'flex', width: '100%', marginLeft: '16px'}}>
             <SearchBar size="9px" placeholder="Search Assessment"  onSearch={onSearch}/>
             <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
             <Button onClick={createRedirect} variant='outlined' startIcon={<AddCircleOutlineRounded/>}>Create Mocktest</Button>
             </div>
            </div>
        <div style={{paddingRight: 16, display: 'flex'}}>
            <div style={{flex: 1, padding: 8}}>
                <div style={{marginTop: 12, overflowY: 'auto'}}>
                   {
                       assessments.map((assessment, i)=>(
                           <MockTestCard key={i} onReport={onMockTestReport}  assessment = {assessment }/>
                       ))
                   }      
                </div>
            </div>
            <div style={{padding: 8}}>
                <div>
                <div style={{color: '#444', marginBottom: '16px'}}>Filter by Date</div>
                <div style={{display: 'flex', justifyContent: 'end'}}>
                <DatePicker 
                
                selected={cdate} onChange={(date) => setCdate(date)} 
                inline
                />
                </div>
                </div>
            </div>
        </div>
        </div>:''}

        {
            (!isLoading && assessments.length<=0)?
            <div className='create-action'>
                <div style={{fontSize: '22px', color: '#777', marginBottom: '16px'}}>No Assessments yet</div>
                <Button onClick={createRedirect} variant='outlined' startIcon={<AddCircleOutlineRounded/>}>Create Mocktest</Button>
            </div>:''
        }
    </>:<>
     {cLink !=='' && <MtReport linkCode={cLink} />}
    </>}
        </div>
    )
}
export default MockTests