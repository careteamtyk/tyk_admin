import { Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import './createQuestion.css'
import BorderAllIcon from '@mui/icons-material/BorderAll';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PreviewIcon from '@mui/icons-material/Preview';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import OptionHeader from './optionHeader';
import { toast } from 'react-toastify';
import QpreviewBox from './qPreviewBox';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import readXlsxFile from 'read-excel-file'
const CreateQuestion = (props)=>{
    const {showModal, setShowModal} = props
    const [showView, setShowView] = useState("question")
    const [qo, setQo] = useState({})
    const [question, setQuestion] = useState("")
    const [a, setA] = useState("")
    const [b, setB] = useState("")
    const [c, setC] = useState("")
    const [d, setD] = useState("")
    const [e, setE] = useState("")
    const [f, setF] = useState("")
    const [aC, setAC] = useState(false)
    const [bC, setBC] = useState(false)
    const [cC, setCC] = useState(false)
    const [dC, setDC] = useState(false)
    const [eC, setEC] = useState(false)
    const [fC, setFC] = useState(false)
    const ops = ["A", "B", "C", "D", "E", "F"]
    //const excelHeader = {question: "Question", A: "Option A", isOptionACorrect: "isOptionACorrect", B: "Option B", isOptionBCorrect: "isOptionBCorrect", C: "Option C", isOptionCCorrect: "isOptionCCorrect",D: "Option D", isOptionDCorrect: "isOptionDCorrect",E: "Option E", isOptionECorrect: "isOptionECorrect", F: "Option F", isOptionFCorrect: "isOptionFCorrect"}
    useEffect(()=>{
        if(showModal){
            modal.current.style.display = 'flex'
            modal.current.style.justifyContent = 'center'
            modal.current.style.animation = "showa 0.6s both"
        }
    }, [showModal])
    const modal = useRef(null)
    window.onclick = e=>{
        if(modal && e.target === modal.current)
            hideModal()
    }
    const animEnd = ()=>{
        if(window.getComputedStyle(modal.current).getPropertyValue("opacity") == 0){
            modal.current.style.display = "none"
        }
    }
    function hideModal(){
        modal.current.style.animation = "hidea 0.6s both"
        setShowModal(false)
    }
    const close = ()=>{
        hideModal()
    }
    const submitQuestion = ()=>{
        let q = checkQuestion()
        if(q !== null){
            console.log(q)
        }
    }
    function checkQuestion(){
        if(question === ""){
            toast("Please Enter Question")
            return null
        }else if(a === ""){
            toast("Please Option A")
            return null
        }else if(b === ""){
            toast("Please Enter Option B")
            return null
        }else if(c === ""){
            toast("Please Enter Option C")
            return null
        }else if(d === ""){
            toast("Please Enter Option D")
            return null
        }else if(!aC && !bC && !cC && !dC && !eC && !fC){
            toast("Please Choose atleast one Correct Answer")
            return null
        }else{
            let options = []
            options.push({option: a, isCorrect: aC})
            options.push({option: b, isCorrect: bC})
            options.push({option: c, isCorrect: cC})
            options.push({option: d, isCorrect: dC})
            if(e !== "")
                options.push({option: e, isCorrect: eC})
            if(f !== "")
                options.push({option: f, isCorrect: fC})
            return {question: question, options: options}
        }
    }
    const showPreview = ()=>{
        let q = checkQuestion()
        if(q !==null){
            setQo(q)
            setShowView("preview")
        }
    }
    const exportToExcel = ()=>{
        let q = checkQuestion()
        console.log(q)
        if(q !== null){
            const data = []
            let qo = {}
            qo.Question = q.question
            q.options.forEach((qn, i)=>{
                qo[`Option${ops[i]}`] = qn.option
                qo[`isOption${ops[i]}Correct`] = qn.isCorrect
            })
            data.push(qo)
            exportToCSV(data, "mysample")
        }
    }
    const exportToCSV = (apiData, fileName) => {
        const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    const handleChose = (event)=>{
        readXlsxFile(event.target.files[0]).then((rows) => {
            let ra = []
            if(rows.length<2){
                toast("Invalid File Format!!")
            }else{
                let ar = rows[1]
                if(ar.length<9){
                    toast("Invalid File Format!!")
                }else{
                    let q = {}
                    q.question = ar[0]
                    let os = []
                    os.push({option: ar[1], isCorrect: ar[2]})
                    os.push({option: ar[3], isCorrect: ar[4]})
                    os.push({option: ar[5], isCorrect: ar[6]})
                    os.push({option: ar[7], isCorrect: ar[8]})
                    if(ar.length>9)
                        os.push({option: ar[9], isCorrect: ar[10]})
                    if(ar.length>11)
                        os.push({option: ar[11], isCorrect: ar[12]})
                    q.options = os
                    setQo(q)
                    setShowView("preview")
                }
            }
        })
    }
    const importExcel = (event)=>{
        document.getElementById("excel_input").click()
    }
    return(
        <div ref={modal} onAnimationEnd={animEnd}  class="modal createQuestion">
        <div onclick="event.stopPropagation()" class="modal-content">     
                <div class="modal-header">
                <div style={{flex: 1, alignSelf: 'center', fontSize: 18, marginLeft: 16, color: '#333'}}>Create Question</div><div onClick={close} class="close">&times;</div>
                </div>
                {
                showView==="question"?
                <div>
                <div style={{padding: '0 16px 16px 16px', maxHeight: '77vh', overflowY: 'auto'}}>
                <div style={{marginTop: 6, color: '#777'}}>Question</div>
                <textarea placeholder='Enter Question' rows="5" onChange={(e)=>setQuestion(e.target.value)}>{question}</textarea>
                
                <OptionHeader o={a} label="Option A" correct={aC} setCorrect={setAC}/>
                <textarea placeholder='Enter Option A' rows="3" onChange={(e)=>setA(e.target.value)}>{a}</textarea>
                
                <OptionHeader o={b} label="Option B" correct={bC} setCorrect={setBC}/>
                <textarea placeholder='Enter Option B' rows="3" onChange={(e)=>setB(e.target.value)}>{b}</textarea>
                
                <OptionHeader o={c} label="Option C" correct={cC} setCorrect={setCC}/>
                <textarea placeholder='Enter Option C' rows="3" onChange={(e)=>setC(e.target.value)}>{c}</textarea>

                <OptionHeader o={d} label="Option D" correct={dC} setCorrect={setDC}/>
                <textarea placeholder='Enter Option D' rows="3" onChange={(e)=>setD(e.target.value)}>{d}</textarea>
                
                <OptionHeader o={e} label="Option E" correct={eC} setCorrect={setEC}/>
                <textarea placeholder='Enter Option E' rows="3" onChange={(e)=>setE(e.target.value)}>{e}</textarea>
                
                <OptionHeader o={f} label="Option F" correct={fC} setCorrect={setFC}/>
                <textarea placeholder='Enter Option F' rows="3" onChange={(e)=>setF(e.target.value)}>{f}</textarea>

                </div>
                <div className='bottom-action-panel'>
                    <input onChange={handleChose} type="file" id="excel_input" style={{display: 'none'}} accept=".xlsx"/>
                    <Button onClick = {importExcel} startIcon={<BorderAllIcon/>} variant='contained' size='small'>Import Excel</Button>
                    <Button onClick={exportToExcel} startIcon={<ImportExportIcon />} sx={{marginLeft: '8px'}} size='small' variant='contained'>Export to Excel</Button>
                    <a target="_blank" href="/images-library" style={{textDecoration: 'none'}}><Button startIcon={<FileCopyIcon />} sx={{marginLeft: '8px'}} size='small' variant='contained'>Copy Image Link</Button></a>
                    <Button onClick={showPreview} startIcon={<PreviewIcon />} sx={{marginLeft: '8px'}} variant='contained' size='small'>Preview Question</Button>
                    <div style={{flex: 1}}></div>
                    <Button onClick={submitQuestion} className='submit-button' variant='contained' size='small'>Submit</Button>
                </div>
                </div>:
                showView==="preview"?
                <QpreviewBox showView={showView} setShowView={setShowView} question={qo} />:''
                }
        </div>

        </div>
    )
}
export default CreateQuestion