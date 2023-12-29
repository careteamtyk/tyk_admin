import './details.css'
import online1 from '../assets/svgs/Online_test1.svg'
import { useEffect, useRef, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from 'react-toastify'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import AutoSelect from './cm-widgets/autoSelect';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import ImgUpload from '../img-upload/imgUpload';
const Details =  (props)=>{
    const {option, setOption, category, setCategory, subCategory, setSubCategory, banner, setBanner, setS, at, ad, setAt, setAd} = props
    const [loading, setLoading] = useState(false)
    const [cats, setCats] = useState([])
    const [showCategorySelect, setShowCategorySelect] = useState(false)
    const [showSubCategorySelect, setShowSubCategorySelect] = useState(false)
    const [subcats, setSubCats] = useState([])
    const [subCatsEnabled, setSubCatsEnabled]  = useState(true)

    
    const file_inp = useRef()
    const onImgSelect = event=>{
        const [file] = file_inp.current.files
        if(file){
            let fd = new FormData()
            fd.append("image", file)
            setLoading(true)
            axios.post(API_ENDPOINT+'trainer/upload-image-only', fd, HEADER_TOKEN).then(res=>{
                let d = res.data
                setLoading(false)
                if(d.success){
                    setBanner(d.message)
                }else{
                    toast(d.message)
                }
            })
        
        }
    }
    const addBanner =()=>{
        file_inp.current.click()
    }
    const goNext = ()=>{
        if(at ==="")
            toast("Please Enter Assessment title")
        else{
            setS(2)
        }
    }
    useEffect(()=>{
        loadCategories()
    }, [])
    useEffect(()=>{
        if(category !==""){
            setSubCatsEnabled(false)
            loadSubCategories()
        }
    }, [category])

    function loadCategories(){
        axios.get(API_ENDPOINT+'sam/get-categories-all', HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let tps = d.message
                let ta = []
                tps.map(t=>{
                    ta.push({label: t.category})
                })
                setCats(ta)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    }
    function loadSubCategories(){
        axios.post(API_ENDPOINT+'sam/get-subcategories',{category: category}, HEADER_TOKEN).then(res=>{
            let d = res.data
            console.log(d)
            if(d.success){
                let tps = d.message
                let ta = []
                tps.map(t=>{
                    ta.push({label: t})
                })
                console.log(tps)
                setSubCats(ta)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    }
    const onCategoryClick = ()=>{
       setShowCategorySelect(!showCategorySelect)
    }
    const onSubCategoryClick = ()=>{
        if(!subCatsEnabled)
            setShowSubCategorySelect(!showSubCategorySelect)
     }
    return(
        <div className="details">
            <div style={{display: 'flex'}}>
            <input onChange={onImgSelect} ref={file_inp} type="file" accept="image/*" style={{display: 'none'}} />
                <div style={{flex: 0.6, padding: '10px'}}>
                    <h3 style={{color: 'rgb(72 71 71)'}}>Assessment Details</h3>
                    <div style={{display: 'flex'}}>
                        <div style={{flex: 0.6}}>
                            <TextField onChange={e=>setAt(e.target.value)} value={at} fullWidth variant="standard" size='small' label='Enter Assessment title'  />
                        </div>  
                        <div className='ad-c-b'>
                            {/* {!loading?
                                <IconButton onClick={addBanner} size='large'> <AddPhotoAlternateIcon /></IconButton>:<CircularProgress />
                            } */}
                            <ImgUpload banner={banner} setBanner={setBanner}/>
                        </div>
                    </div><br/>
                    <FormControl fullWidth
                    className='mock-input'>
  <InputLabel id="demo-simple-select-label">Select duration</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Select duration"
    value={ad}
    onChange={e=>setAd(e.target.value)}
  >
        <MenuItem value={15}>15 minutes</MenuItem>
        <MenuItem value={20}>20 minutes</MenuItem>
        <MenuItem value={30}>30 minutes</MenuItem>
        <MenuItem value={45}>45 minutes</MenuItem>
        <MenuItem value={60}>60 minutes</MenuItem>
        <MenuItem value={90}>90 minutes</MenuItem>
        <MenuItem value={120}>120 minutes</MenuItem>
        <MenuItem value={180}>180 minutes</MenuItem>
    </Select>
    </FormControl>
    <div style={{position: 'relative'}}>
        <TextField  InputLabelProps={{
            shrink: true,
          }} value={category} onChange={onCategoryClick} onClick={onCategoryClick} className='mock-input' fullWidth variant='standard' size='small' label='Enter Category'/>
        <AutoSelect show={showCategorySelect} setShow={setShowCategorySelect} label="Select Category" mlist={cats} cvalue={category} setCvalue={setCategory}/>
    </div>
    <div style={{position: 'relative'}}>
        <TextField disabled={subCatsEnabled} InputLabelProps={{
            shrink: true,
          }} value={subCategory} onChange={onSubCategoryClick} onClick={onSubCategoryClick} className='mock-input' fullWidth variant='standard' size='small' label='Enter Subcategory' />
         <AutoSelect show={showSubCategorySelect} setShow={setShowSubCategorySelect} label="Select Sub Category" mlist={subcats} cvalue={subCategory} setCvalue={setSubCategory}/>
    </div>
    <Button style={{marginTop: '12px'}} onClick = {goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>
        Next
    </Button>

                </div>
                <div style={{flex: 0.4}}>
                    <img style={{width: '90%', borderRadius: '8px', marginLeft: '10px', marginTop: '16px'}} src={online1} />
                </div>
            </div>
        </div>
    )
}
export default Details