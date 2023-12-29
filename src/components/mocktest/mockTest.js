import './mockTest.css'
import {useEffect, useState} from 'react'
import MyMenuItem from '../widgets/myMenuItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MockAddHeader from '../widgets/mockAddHeader'
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import { Popover } from '@mui/material';
import AddCategory from '../widgets/addCategory';
import AddTopic from '../widgets/addTopic';
import CreateQuestion from '../createQuestion/createQuestion';
const MockTest = ()=>{
    const [category, setCategory] = useState("")
    const [topic, setTopic] = useState("")
    const [showCQ, setShowCQ] = useState(false)
    const [questions, setQuestions] = useState([])
    const [categories, setCategories] = useState([])
    const [topics, setTopics] = useState([])

    const [showAddCategory, setShowAddCategory] = useState(false)
    const [showAddTopic, setShowAddTopic] = useState(false)
    const [showAddQuestion, setShowAddQuestion] = useState(false)


    useEffect(()=>{
        loadCategories()
    }, [])
    function loadCategories(){
        axios.post(API_ENDPOINT+'sam/get-categories', {}, HEADER_TOKEN).then(res=>{
            let d = res.data
            console.log(d)
            if(d.success){
                setCategories(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    function loadTopics(ct){
        axios.post(API_ENDPOINT+'sam/get-topics', {category: ct}, HEADER_TOKEN).then(res=>{
            let d = res.data
            console.log(d)
            if(d.success){
                setTopics(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    function loadQuestions(ctopic){
        axios.post(API_ENDPOINT+'sam/get-questions', {category: category, topic: ctopic}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                setQuestions(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    const addCategory = ()=>{
        setShowAddCategory(!showAddCategory)
    }
    const addTopic = ()=>{
        setShowAddTopic(!showAddTopic)
    }
    const addQuestion = ()=>{
        setShowCQ(!showCQ)
    }
    const selectCategory = (c)=>{
        setCategory(c)
        loadTopics(c)
    }
    const selectTopic = (t)=>{
        setTopic(t)
        loadQuestions(t)
    }
    return(
        <div className='mock-test'>
            <ToastContainer />
            <div style={{display: 'flex'}}>
                <div className='mock-category-c'>
                    <MockAddHeader onClick={addCategory} text="Categories" />
                    <AddCategory show={showAddCategory}  setShow={setShowAddCategory} category={category} setCategory={setCategory} categories={categories} setCategories={setCategories}/>
                    <div className='category-content'>
                        {
                            categories.map(c=>(
                                <MyMenuItem onClick={()=>selectCategory(c.category)} text={c.category} active={c.category===category} />
                            ))
                        }
                    </div>
                </div>
                <div className='mock-topic-c'>
                    <MockAddHeader onClick={addTopic} text="Topics" />
                    <AddTopic show={showAddTopic}  setShow={setShowAddTopic} topics={topics} setTopics={setTopics} category={category}/>
                    <div>
                        {
                            topics.map(c=>(
                                <MyMenuItem onClick={()=>selectTopic(c.topic)} text={c.topic} active={c.topic===topic} />
                            ))
                        }
                    </div>
                </div>
                <div className='mock-questions-c'>
                    <MockAddHeader onClick={addQuestion} text="Questions" />
                    <div>

                    </div>
                </div>
            </div>
            <CreateQuestion showModal={showCQ} setShowModal={setShowCQ} />
        </div>
    )
}
export default MockTest