import { ContentCopyOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './imageUpload.css'
const ImagesQ = (props)=>{
  const {imgLink, desc} = props
  const copyLink = ()=>{
    navigator.clipboard.writeText(imgLink)
    toast("Copied Image Link!")
  }
    return (
      <div class="qimgC">
        <ToastContainer />
        <div class="qImg">
          <a target="_blank" href={imgLink}>
            <img src={imgLink} alt="Question Img" />
          </a>
          <div class="desc">{desc}</div>
        </div>
        <div className='copy-icon' style={{position: 'absolute', zIndex: 2, display: 'table', top:0, right:0}}>
        <IconButton onClick={copyLink}><ContentCopyOutlined/></IconButton>
        </div>
      </div>
    )
}
export default ImagesQ