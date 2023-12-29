import Header from '../header/header'
import LeftMenuLogo from '../widgets/leftMenuLogo'
import MenuButton from '../widgets/menuButton'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined'
import LogoutIcon from '@mui/icons-material/Logout';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Chart } from "react-google-charts"
import './home.css'
import { useState } from 'react'
import CardInfo from '../widgets/cardInfo'
import Dashboard from './dashboard'
import { Outlet, Route, Routes } from 'react-router-dom'
import ResetPassword from '../../login/resetPassword';
import MockTest from '../mocktest/mockTest'
import { deleteToken } from '../../utils/util'
import QuestionLibrary from '../questionLibrary/questionLibrary'
import Membership from '../membership/membership'
import EmailScheduler from '../emailScheduler/emailScheduler'
import AuditLog from '../auditLog/auditLog'
import ErrorLog from '../errorLog/errorLog'
import MockTests from '../mocktest/mocktests'
import CreateMockTest from '../create-mocktest/createMockTest'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Plans from '../plans/Plans'
import ManagePlans from '../plans/ManagePlans'
const Home = (props)=>{
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    let pos = ""
    if(keysUrl.length>3){
        pos = keysUrl[3]
    }
    const [a_code, setAcode] = useState(pos)
    const [collapse, setCollapse] = useState(false)
    const goToDashboard = ()=>{
      document.location.href = "/dashboard"
    }
    const goToMockTest = ()=>{
      document.location.href = "/mock-test"
    }
    const goToQuestionLibrary = ()=>{
      document.location.href = "/question-library"
    }
    const goToMembership = ()=>{
      document.location.href = "/membership"
    }
    const goToPlans = ()=>{
      document.location.href = "/manage-plans"
    }
    const goToAuditLog = ()=>{
      document.location.href = "/audit-log"
    }
    const goToErrorLog = ()=>{
      document.location.href = "/error-log"
    }
    const logout = ()=>{
      deleteToken()
      document.location.href="/login"
    }
    return(
    <div className='home'>
            <Header title={pos} collapse={collapse} setCollapse={setCollapse} />
        <div className={collapse?'left_menu_box collapse':'left_menu_box'}>
          <LeftMenuLogo collapse={collapse} />
          <div style={{position: 'absolute', width: '100%', height: '100%', boxShadow: '5px 0 5px -5px rgb(176 210 238)'}}>
            <MenuButton onClick={goToDashboard} collapse={collapse}  text="My Dashboard" MenuIcon = {DashboardCustomizeOutlinedIcon} active = {a_code==="dashboard"} />
            <MenuButton onClick={goToMockTest} collapse={collapse}  text="Mock Tests" MenuIcon = {AssessmentOutlinedIcon} active = {a_code==="mock-test"} />
            <MenuButton onClick={goToQuestionLibrary} collapse={collapse} text="Question Library" MenuIcon = {LibraryBooksOutlinedIcon} active = {a_code==="question-library"} />
            <MenuButton onClick={goToMembership} collapse={collapse} text="Membership" MenuIcon = {InsightsOutlinedIcon} active = {a_code==="membership"} />
            <MenuButton onClick={goToPlans} collapse={collapse} text="Manage Plans" MenuIcon = {AccountBalanceWalletIcon} active = {a_code==="manage-plans"} />
            <MenuButton onClick={goToAuditLog} collapse={collapse} text="Audit Log" MenuIcon = {VerifiedUserIcon} active = {a_code==="audit-log"} />
            <MenuButton onClick={goToErrorLog} collapse={collapse} text="Error Log" MenuIcon = {ErrorOutlineIcon} active = {a_code==="error-log"} />
            <MenuButton onClick={logout} collapse={collapse} text="Logout" MenuIcon = {LogoutIcon} />
          </div>
        </div>
        <div style={{marginLeft: collapse?70:200, padding: 16}}>
          {
            pos===""||pos==="home"||pos==="dashboard"?<Dashboard />:
            pos ==="reset-password"?<ResetPassword />:
            pos ==="create-mocktest"?<CreateMockTest />:
            pos ==="mock-test"?<MockTests />:
            pos ==="manage-plans"?<ManagePlans />:
            pos ==="question-library"?<QuestionLibrary />:
            pos ==="membership"?<Membership />:
            pos ==="email-scheduler"?<EmailScheduler />:
            pos ==="audit-log"?<AuditLog />:
            pos ==="error-log"?<ErrorLog />:''
            
          }
        </div>
    </div>
    )
}
export default Home