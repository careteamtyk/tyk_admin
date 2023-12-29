import { Button } from '@mui/material'
import excelIcon from '../../assets/images/excel_icon_round.png'
import BorderAllIcon from '@mui/icons-material/BorderAll';
import excelUpload from '../../assets/images/excel_upload.png'
import './excelWidgets.css'
const ExcelWidgets = (props)=>{
    const {onFileSelect, handleChose, fn} = props
    return(
        <div className='excel-w-c'>
            <div style={{display: 'flex'}}>
            <img src={excelIcon} alt="excel" style={{width: 48, cursor: 'pointer'}}/>
            <div style={{marginLeft: 12}}>
                <div style={{fontSize: 17, fontWeight: 600}}>Upload questions from excel</div>
                <div style={{fontSize: 14, color: '#444'}}>Required excel format .xlsx</div>
            </div>
            </div>
            <div onClick = {onFileSelect} className='excel-onfile-sel'>
                <input onChange={handleChose} type="file" id="excel_input" style={{display: 'none'}} accept=".xlsx"/>
                <img src={excelUpload} alt="Excel Upload" style={{width: 100, display: 'block', margin: '12px auto'}}/>
                <div style={{textAlign: 'center', marginBottom: 16, color: '#777'}}>{fn===""?"Click here to Upload":fn}</div>
            </div>
            <a href='/QuestionTemplate.xlsx' download style={{textDecoration: 'none'}}>
            <Button startIcon={<BorderAllIcon />} sx={{padding: '1px 10px', marginTop: '18px', marginBottom: '16px', textTransform: 'none', borderRadius: 6}} variant="outlined">
                Download the Template
            </Button>
            </a>
        </div>
    )
}
export default ExcelWidgets 