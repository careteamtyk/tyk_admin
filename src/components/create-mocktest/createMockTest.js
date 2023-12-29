import './createMockTest.css'
import ti1 from '../assets/svgs/ti1.svg'
import ti2 from '../assets/svgs/ti2.svg'
import ti3 from '../assets/svgs/ti3.svg'
import online1 from '../assets/svgs/Online_test1.svg'
import CreateTab from '../widgets/createTab'
import { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from 'react-toastify'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Details from './details'
import SelectQuestions from './selectQuestions'
import ConfigureCreate from './configureCreate'
import { DEFAULT_BANNER } from '../../constants/constants'
const CreateMockTest = ()=>{
    const tabs = [
        {icon: ti1, title: 'Mocktest Details', step: 1},
        {icon: ti2, title: 'Random Selection', step: 2},
        {icon: ti3, title: 'Configure & Create', step: 3}
    ]
    const [s, setS] = useState(1)
    const [at, setAt] = useState("")
    const [ad, setAd] = useState(30)
    const [category, setCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [banner, setBanner] = useState(DEFAULT_BANNER)
    const [mytopics, setMytopics] = useState([])

    const onTab1 = (step)=>{
        if(step !== 1){
            if(at ==="")
                toast("Please Enter Assessment Title")
            else{
                setS(step)
            } 
        }else
            setS(step)
    }
    return (
        <div>
            <div style={{display: 'flex'}}>
                {
                    tabs.map((t, i, arr)=>
                    <div style={{flex: 1}}><CreateTab onClick={()=>onTab1(t.step)} icon={t.icon} index={i} size={arr.length} title={t.title} step={`Step ${t.step}`} active={s===t.step}/></div>
                    )
                }
            </div>
            {
                s===1?<Details s={s} setS={setS} at = {at} setAt={setAt} ad={ad} setAd={setAd} banner={banner} setBanner={setBanner} category={category} setCategory={setCategory} subCategory={subCategory} setSubCategory={setSubCategory}/>
                :s===2?<SelectQuestions s={s} setS={setS} mytopics={mytopics} setMytopics={setMytopics} banner={banner} ad={ad} at={at} category={category} />
                :<ConfigureCreate category={category} subCategory={subCategory}  mytopics={mytopics} banner={banner} at={at} ad={ad} setS={setS}/>
                }
        </div>
    )
}
export default CreateMockTest