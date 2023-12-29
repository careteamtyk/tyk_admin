import ImagesQ from './imageQ'
import './imageUpload.css'
import {useEffect, useState} from 'react'
const Gallery = (props)=>{
    const {images} = props
    return(
        <div>
            {
                images.map(img=>(
                    <ImagesQ imgLink={img.image} desc={img.desc}/>
                ))
            }
           
            <div class="clearfix"></div>
        </div>
    )
}
export default Gallery