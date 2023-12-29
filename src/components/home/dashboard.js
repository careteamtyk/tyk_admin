import axios from 'axios'
import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import { API_ENDPOINT, HEADER_TOKEN, MONTHS } from '../../constants/constants'
import { deleteToken, getHeader } from '../../utils/util'
import CardInfo from '../widgets/cardInfo'
import './dashboard.css'
const Dashboard = ()=>{
     const [totalTest, setTotalTest] = useState('...')
     const [totalTrainers, setTotalTrainers] = useState('...')
     const [totalMockTest, setTotalMockTest] = useState('...')

    const [assessmentsOverview, setAssessmentsOverview] = useState([])
    const [mocktestsOverview, setMockTestsOverview] = useState([])
    const [aOcurrentYear, setAoCurrentYear] = useState('2023')
    const [mOcurrentYear, setMoCurrentYear] = useState('2023')

    function getTrainersOverview(){
      axios.post(API_ENDPOINT+'admin/trainers-overview',{year: aOcurrentYear}, getHeader()).then(res=>{
        let d = res.data
        if(d.success){
            let asA = [["Months", "Assessments"]]
            let resA = d.message
            MONTHS.map((m, i)=>{
                let mn = m.slice(0, 3)
                let foundO = resA.find(r=>r._id ===(i+1))
                if(foundO !== undefined){
                  asA.push([mn, foundO.numTrainers])
                }else{
                  asA.push([mn, 0])
                }
            })
            setAssessmentsOverview(asA)
        }
      })
    }
    function getMocktestsOverview(){
      axios.post(API_ENDPOINT+'admin/mocktests-overview',{year: mOcurrentYear}, getHeader()).then(res=>{
        let d = res.data
        if(d.success){
            let asA = [["Months", "Assessments"]]
            let resA = d.message
            MONTHS.map((m, i)=>{
                let mn = m.slice(0, 3)
                let foundO = resA.find(r=>r._id ===(i+1))
                if(foundO !== undefined){
                  asA.push([mn, foundO.numMocktests])
                }else{
                  asA.push([mn, 0])
                }
            })
            setMockTestsOverview(asA)
        }else{
          if(d.auth === false){
            logout()
          }
        }
      })
    }
    const logout = ()=>{
      deleteToken()
      document.location.href="/login"
    }
    const assessmentsOverviewOptions = {
      chart: {
        title: "Trainers Ovierview",
        subtitle: `Trainers Overview ${aOcurrentYear}`,
      }
    }
    const mocktestsOverviewOptions = {
      chart: {
        title: "Mocktests Overview",
        subtitle: `Mocktests Overview ${mOcurrentYear}`,
      }
    }


      function getAssessmentNum(){
        axios.get(API_ENDPOINT+'admin/get-total-test', getHeader()).then(res=>{
            let d = res.data
            if(d.success){
              setTotalTest(d.message)
            }
        })
      }
      function getTotalTrainers(){
        axios.get(API_ENDPOINT+'admin/get-total-trainers', getHeader()).then(res=>{
            let d = res.data
            if(d.success){
              setTotalTrainers(d.message)
            }
        })
      }
      function getTotalMockTest(){
        axios.get(API_ENDPOINT+'admin/get-total-mock-test', getHeader()).then(res=>{
            let d = res.data
            if(d.success){
              setTotalMockTest(d.message)
            }
        })
      }
      useEffect(()=>{
        getAssessmentNum()
        getTotalTrainers()
        getTotalMockTest()
      }, [])
      useEffect(()=>{
        getTrainersOverview()
      }, [aOcurrentYear])
      useEffect(()=>{
        getMocktestsOverview()
      }, [mOcurrentYear])
    return(
        <div className="sam-dashboard">
            <div className='card_info_c'>
              <CardInfo title="Active Trainers" num={totalTrainers} pc="12" duration="30" bg="#7DA0FA"/> 
              <CardInfo title="Inactive Trainers" num="0" pc="5" duration="21" bg="#4747A1"/>
              <CardInfo title="Total Test" num={totalTest} pc="50" duration="56" bg="#7978E9"/>
              <CardInfo title ="Total Mock Test" num={totalMockTest} pc="4" duration="3" bg="#F3797E"/>
            </div>
            <div className='chart_c'>
              <div className='chart_item first'>
              <select value={aOcurrentYear} onChange={e=>setAoCurrentYear(e.target.value)} style={{position: 'absolute', zIndex: 10, right: 30}}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
                  {assessmentsOverview.length>0 &&
                    <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={assessmentsOverview}
                    options={assessmentsOverviewOptions}
                  />
                  }
                </div>
              <div className='chart_item'>
              <select value={mOcurrentYear} onChange={e=>setMoCurrentYear(e.target.value)} style={{position: 'absolute', zIndex: 10, right: 30}}>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
                  {mocktestsOverview.length>0 &&
                    <Chart
                    chartType="Bar"
                    width="100%"
                    height="400px"
                    data={mocktestsOverview}
                    options={mocktestsOverviewOptions}
                  />
                  }
                </div>
            </div>
        </div>
    )
}
export default Dashboard