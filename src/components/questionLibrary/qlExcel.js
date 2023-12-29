import './qlExcel.css'
import excelIcon from '../assets/images/excel_icon_round.png'
import { Button, CircularProgress } from '@mui/material'
import BorderAllIcon from '@mui/icons-material/BorderAll';
import excelUpload from '../assets/images/excel_upload.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import readXlsxFile from 'read-excel-file';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import { cleanO, getPhone, makeUnique } from '../../utils/util';
import ExcelWidgets from '../widgets/excel-widgets/excelWidgets';
import { excelAnswer, processData } from './excelUtil';
const QlExcel = (props)=>{
    const {excelUploaded, showModal, setShowModal} = props
    const [excelUploading, setExcelUploading] = useState(false)
    const [fn, setFn] = useState("")
    const [rs, setRs] = useState([])
    const onFileSelect = ()=>{
        document.getElementById("excel_input").click()
    }
    useEffect(()=>{
        if(!showModal){
            setFn("")
            setRs([])
           
        }
    }, [showModal])

    const handleChose = (event)=>{
        setFn(event.target.files[0].name)
        readXlsxFile(event.target.files[0]).then((rows) => { 
            if(rows[0].length>10){
                setFn("")
                document.getElementById("excel_input").value = ""
                toast("Invalid File format! Please read instructions")
            }else if(rows.length<3){
                setFn("")
                document.getElementById("excel_input").value = ""
                toast("No questions Found in the Excel sheet")
            }else{
                rows.splice(0, 1)
                let excelData = processData(rows)
                setRs(excelData)
            }
        })
    }
    const uploadQuestionGroup = ()=>{
        const aqns = rs.filter(a=>a.formatCorrect)
        let uniqueTopics = makeUnique(aqns, ["category", "topic"])
        let at = []
        uniqueTopics.map(a=>{
            at.push({category: a.category, topic: a.topic})
        })
        let uniqueCategories = makeUnique(aqns, ["category"])
        let ac = []
        uniqueCategories.map(a=>{
            ac.push({category: a.category})
        })
        let ro = {questions: aqns, topics: at, categories: ac}
        setExcelUploading(true)
        axios.post(API_ENDPOINT+'sam/add-question-group', ro, HEADER_TOKEN).then(res=>{
            let d = res.data
            setExcelUploading(false)
            if(d.success){
                setShowModal(false)
                excelUploaded()
                setFn(null)
                setRs([])
                document.getElementById("excel_input").value=""
            }else{
                toast(d.message)
            }
        })
    }
    return(
        <div className="ql-excel">
            {rs.length>0?<div>
                <div className='ql-excel-analytics'>
                    <h3 style={{color: 'green'}}>Excel Sheet Analytics</h3>
                   <div>Total Questions: <span style={{marginLeft: 16}}>{rs.length}</span></div>
                   <div>Total Invalid Questions: <span style={{marginLeft: 16}}>{rs.filter(r=>!r.formatCorrect).length}</span></div>
                   <div>Total Questions to Import: <span style={{marginLeft: 16}}>{rs.length - rs.filter(r=>!r.formatCorrect).length}</span></div>
                   <div style={{color: 'red', marginTop: 12}}>*Questions labelled with red background are invalid</div>
                </div>
            <div className='selected_qns'>
                <table>
                    <tr>
                    <th>Category</th>
                    <th>Topic</th>
                    <th>Question</th>
                    <th>Option A</th>
                    <th>Option B</th>
                    <th>Option C</th>
                    <th>Option D</th>
                    <th>Option E</th>
                    <th>Option F</th>
                    <th>Answer</th>
                    </tr>
                    {
                        rs.map((r, i)=>(
                            <tr style={{backgroundColor: !!rs[i].formatCorrect?null:'#f8897c'}}>
                                <td>{r.category}</td>
                                <td>{r.topic}</td>
                                <td>{r.question}</td>
                                <td>{r.options[0].option}</td>
                                <td>{r.options[1].option}</td>
                                {r.options.length>2?<td>{r.options[2].option}</td>:<td></td>}
                                {r.options.length>3?<td>{r.options[3].option}</td>:<td></td>}
                                {r.options.length>4?<td>{r.options[4].option}</td>:<td></td>}
                                {r.options.length>5?<td>{r.options[5].option}</td>:<td></td>}
                                <td>{excelAnswer(r.options)}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
            <div className='ql-excel-btn-s'>
                <Button onClick={uploadQuestionGroup} variant='contained'>{excelUploading?<CircularProgress/>:"Upload"}</Button>
            </div>
            </div>:<div className='ql-excel-i'>
                    <div className='ql-excel-i-c'>
                        <h3>Instructions for Excel Upload</h3>
                        <ul>
                            <li>You should include a header with columns as Category, Topic, Question, option A, option B, option C, option D, option E(optional), option F(optional), Answer.</li>
                            <li>Only one option can be correct. So the Answer should be A, B, C, D, E or F.</li>
                            <li>There should be minimum of two options in the options section.</li>
                            <li>Every Question must be tagged to a Topic. A question without Topic will be discarded.</li>
                        </ul>
                    </div>
                    <ExcelWidgets onFileSelect={onFileSelect} handleChose={handleChose} fn={fn}/>
                </div>
            }
</div>
    )
}
export default QlExcel