import { Button, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Gallery from './gallery'
import './imageUpload.css'
import { UploadFileOutlined } from '@mui/icons-material';
import MyModal from '../widgets/myModal/myModal';
import { useEffect, useState } from 'react';
import ImageUploadForm from './imageUploadForm';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN, IMAGES_GET_END } from '../../constants/constants';
import { toast } from 'react-toastify';
const ImagesUpload = ()=>{
    const [showModal, setShowModal] = useState(false)
    const [images, setImages] = useState([])
    const imageUpload = (event)=>{
        event.stopPropagation()
        setShowModal(!showModal)
    }
    useEffect(()=>{
        loadImages()
    }, [])
    const loadImages = ()=>{
      axios.post(IMAGES_GET_END, {}, HEADER_TOKEN).then(res=>{
          let d = res.data
          if(d.success){
            setImages(d.message)
          }else{
            toast(d.message)
          }
      })
    }
    return (
        <div>
            <div className='img-upload-header'>
            <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Image"
              inputProps={{ 'aria-label': 'Search any Topics' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button onClick={imageUpload} sx={{marginLeft: '16px'}} startIcon={<UploadFileOutlined />} size="small" variant='contained'>Upload Image</Button>
            </div>
            <Gallery images={images} />
            <MyModal images={images} setImages={setImages} showModal={showModal} setShowModal = {setShowModal} title="Upload Image Form" modalC={<ImageUploadForm showModal={showModal} setShowModal = {setShowModal} images={images} setImages={setImages} />} />
        </div>
    )
}
export default ImagesUpload