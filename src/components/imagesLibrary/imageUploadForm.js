import './imageUploadForm.css'
import { Button, IconButton } from '@mui/material'
import { ImageOutlined, UploadFileRounded } from '@mui/icons-material'
import {useState, useRef} from 'react'
import imgPreview from './imPreview.png'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN, IMAGE_UPLOAD_END } from '../../constants/constants'
const ImageUploadForm = (props)=>{
    const {images, setImages, showModal,  setShowModal} = props
    const [desc, setDesc] = useState("")
    const [fn, setFn] = useState("")
    const [imgFile, setImageFile] = useState(null)

    const handleChoose = (e)=>{
        console.log('clicked 0')
        if(e.target.files.length > 0){
            setImageFile(e.target.files[0])
            setFn(e.target.files[0].name)
            var src = URL.createObjectURL(e.target.files[0]);
            var preview = document.getElementById("img-preview");
            preview.src = src;
          }
    }
    const selectClick = ()=>{
        document.getElementById('img-input').click()
    }
    const submitForm =()=>{
        if(imgFile === null){
            toast("Please Select Image")
        }else if(desc === ""){
            toast("Please describe your image")
        }else{
            const formData = new FormData()
            formData.append("desc", desc)
            formData.append("image", imgFile)
            axios.post(IMAGE_UPLOAD_END, formData, HEADER_TOKEN).then(res=>{
                let d = res.data
                console.log(d)
                if(d.success){
                    toast(d.message.message)
                    let ims = [...images]
                    ims.splice(0,0, d.message.data)
                    setImages(ims)
                    setShowModal(false)
                }else{
                    toast(d.message)
                }
            })
        }
    }
    return(
        <div>
            <ToastContainer />
                <div className='img-upload-area' onClick={selectClick}>
                    <div>
                    <input type="file" id="img-input" style={{display: 'none'}} accept="image/*" onChange={handleChoose} /> 
                    <center>
                        <img id="img-preview" src={imgPreview} />
                    </center>
                    <div style={{userSelect: 'none', textAlign: 'center'}}>{fn===""?"Choose Image":fn}</div>
                    </div>
                </div>
                <div className='desc-area'>
                    <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Enter description(for search later)' rows="4">

                    </textarea>
                </div>
                <div style={{margin: '16px auto', display: 'table'}}>
                <Button onClick={submitForm} startIcon={<UploadFileRounded />} variant="contained">Submit</Button>
                </div>
        </div>
    )
}
export default ImageUploadForm