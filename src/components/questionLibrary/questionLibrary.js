import { Button } from "@mui/material";
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import TopicIcon from '@mui/icons-material/Topic';
import GridOnIcon from '@mui/icons-material/GridOn';
import CategoryIcon from '@mui/icons-material/Category';
import AddTopic from "./ql-widgets/addTopic";
import {toast } from "react-toastify";
import QlCategory from "./ql-widgets/qlCategory";
import RdModal from "../widgets/ratulModal/rdModal";
import MyModal from "../widgets/myModal/myModal";
import QlExcel from "./qlExcel";
import QlQuestions from "./qlQuestions";
import './questionLibrary.css'
import EmptyContent from "../widgets/emptyContent";
import QlBtn from "./ql-widgets/qlBtn";
import QuizIcon from '@mui/icons-material/Quiz';
import TopicShimmer from "../widgets/shimmers/topicShimmer";
import { API_ENDPOINT, HEADER_TOKEN } from "../../constants/constants";
import DuplicateQuestions from "./duplicateQuestions";
import AddCategories from "./ql-widgets/addCategories";
import SearchBar from "../widgets/searchBar";
import { activeArranger, activeTopicArranger } from "../../utils/util";
const QuestionLibrary = ()=>{
    const [categories, setCategories] = useState([])
    const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false)
    const [category, setCategory] = useState("")
    const [searchCatList, setSearchCatList] = useState([])
    const [showAddCategory, setShowAddCategory] = useState(false)

    const [topics, setTopics] = useState([])
    const [isTopicsLoaded, setIsTopicsLoaded] = useState(false)
    const [topic, setTopic] = useState("")
    const [searchTopicList, setSearchTopicList] = useState([])
    const [showAddTopic, setShowAddTopic] = useState(false)

    const [showQuestions, setShowQuestions] = useState(false)
    const [questions, setQuestions] = useState([])
    const [isQnsLoaded, setIsQnsLoaded] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [showExcelModal, setShowExcelModal] = useState(false)
    const [refreshT, setRefreshT] = useState(false)
    const [dqModal, setDqModal] = useState(false)
    const [dQs, setDQs] = useState([])

    useEffect(()=>{
        loadCategories()
    }, [refreshT])
    useEffect(()=>{
        if(category!=""){
            setTopic("")
            loadTopics()
        }else{
            setIsTopicsLoaded(true)
        }
    }, [category])

    function loadCategories(){
        setIsCategoriesLoaded(false)
        axios.get(API_ENDPOINT+'sam/get-categories-all', HEADER_TOKEN).then(res=>{
            setIsCategoriesLoaded(true)
            let d = res.data
            console.log(d)
            if(d.success){
                let tps = d.message
                let ars = activeArranger(tps)
                setCategories(ars)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    }
    function loadTopicQuestions(tp){
        setIsQnsLoaded(false)
        axios.post(API_ENDPOINT+'sam/topic-questions', {category: category, topic: tp}, HEADER_TOKEN).then(res=>{
            let d = res.data
            setIsQnsLoaded(true)
            if(d.success){
                setQuestions(d.message)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    }
    
    const getDuplicateQuestions = ()=>{
        axios.post(API_ENDPOINT+'trainer/get-duplicate-questions', {}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                setDQs(d.message)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }     
        })
    }
    const loadTopics = ()=>{
        setIsTopicsLoaded(false)
        axios.post(API_ENDPOINT+'sam/get-category-topics', {category: category}, HEADER_TOKEN).then(res=>{
            setIsTopicsLoaded(true)
            let d = res.data
            if(d.success){
                let tps = activeTopicArranger(d.message)
                setTopics(tps)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    } 
    const importExcel = ()=>{
        setShowExcelModal(!showExcelModal)
    }
    const addQuestion = ()=>{
        setShowModal(!showModal)
    }
    const onQnDeleted = (dcategory, dtopic)=>{
        //setRefreshT(!refreshT)
    }
    const onQnAdded = (dtopic)=>{
        setRefreshT(!refreshT)
    }
    const showDuplicateQns = (e)=>{
        setDqModal(!dqModal)
    }
    const excelUploaded = ()=>{
        setRefreshT(!refreshT)
    }
    const duplicatesRemoved = ()=>{
        setRefreshT(!refreshT)
        toast("All duplicates removed successfully", {autoClose: 1500, position: 'bottom-center'})
    }
    const onTopicSelect = (v)=>{
        setTopic(v)
        setShowQuestions(true)
        loadTopicQuestions(v)
    }
    const onCategorySelect = (cat)=>{
        setCategory(cat)
        setShowQuestions(false)
    }
    const onCategorySearch = (e)=>{
        e.preventDefault()
        let v = e.target.value
        if(v ===""){
            setSearchCatList([])
        }else{
            let nm = [...categories]
            let nnm = nm.filter(n=>n.category.includes(v))
            setSearchCatList(nnm)
        }
    }
    const onTopicSearch = (e)=>{
        let v = e.target.value
        if(v ===""){
            setSearchTopicList([])
        }else{
            let nm = [...topics]
            let nnm = nm.filter(n=>n.topic.includes(v))
            setSearchTopicList(nnm)
        }
    }
    const onCatStatusChanged = (event, cv, status)=>{
        event.stopPropagation()
        let toupdate = status==="Active"?"Inactive":"Active"
        axios.post(API_ENDPOINT+'sam/set-category-status', {category: cv, status: toupdate}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let tcs = [...categories]
                let tc = tcs.findIndex(t=>t.category === cv)
                tcs[tc].status = toupdate
                let ars = activeArranger(tcs)
                setCategories(ars)

            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    }
    const onTopicStatusChanged = (event, cv, tv, status)=>{
        event.stopPropagation()
        let toupdate = status==="Active"?"Inactive":"Active"
        axios.post(API_ENDPOINT+'sam/set-topic-status', {category: cv, topic: tv, status: toupdate}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let tcs = [...topics]
                let tc = tcs.findIndex(t=>(t.topic === tv&&t.category===cv))
                tcs[tc].status = toupdate
                let ars = activeTopicArranger(tcs)
                setTopics(ars)

            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    }
    return(
        <div className="ql-c">
            <RdModal onQnAdded={onQnAdded} isQL={true} questions={questions} setQuestions={setQuestions}  showModal={showModal} setShowModal={setShowModal}/>
            <MyModal showModal={showExcelModal} setShowModal = {setShowExcelModal} title="Import from Excel" modalC={<QlExcel topics={topics} excelUploaded={excelUploaded} showModal={showExcelModal} setShowModal = {setShowExcelModal} />} />
            {dQs.length>0? <MyModal showModal={dqModal} setShowModal={setDqModal} title="Clear Duplicate Questions" modalC={<DuplicateQuestions showModal={dqModal} setShowModal={setDqModal} duplicatesRemoved = {duplicatesRemoved} questions={dQs}/>} />:''}
            <div style={{display: 'flex'}}>
            <div style={{flex: 0.4, paddingRight: 16}}>
                    <div className="ql-topic-h">
                        <div className="ql-topic-h-l">Categories:</div>
                        <SearchBar placeholder="Search Categories" size="6px" onSearch={onCategorySearch}/> 
                        <div className="ql-topic-h-a">
                            <Button  onClick = {()=>setShowAddCategory(!showAddCategory)} startIcon={<TopicIcon/>} variant="contained" >Add</Button>
                            <AddCategories show={showAddCategory}  setShow={setShowAddCategory} categories={categories} setCategories={setCategories}/>
                        </div>
                    </div>
                
                    <div className="ql-topics-c">
                        {
                            searchCatList.length>0?
                            searchCatList.map(t=>{
                                return <QlCategory onCategorySelected = {()=>onCategorySelect(t.category)} onCatStatusChanged={(event)=>onCatStatusChanged(event, t.category, t.status)} selected={category===t.category} value={t.category}  status={t.status}/>
                            }):

                            isCategoriesLoaded?
                            categories.length>0?
                            categories.map(t=>{
                                return <QlCategory onCategorySelected = {()=>onCategorySelect(t.category)} onCatStatusChanged={(event)=>onCatStatusChanged(event, t.category, t.status)} selected={category===t.category} value={t.category} status={t.status}/>
                            })
                                :<EmptyContent lv="No Categories Yet" />
                            :<TopicShimmer />
                        }
                    </div>
                    {
                        dQs.length>0? <div onClick={showDuplicateQns} className="duplicates-q-c"><div className="duplicates-q-l">{`+${dQs.length} Questions have duplicates`}</div></div>:''
                    }
                <div className="ql-action">
                    <QlBtn hl="Upload Questions from Excel" bl="Upload Questions" ic={<GridOnIcon />} onClick = {importExcel}/>
                    <QlBtn hl="Create Questions manually" bl="Add Question" ic={<QuizIcon />}  onClick={addQuestion}/>
                </div>
                </div>
                <div style={{flex: 0.6, paddingRight: 16}}>
                {
                    !showQuestions?
                <div style={{width: '80%', margin: 'auto'}}>
                   <div className="ql-topic-h">
                        <div className="ql-topic-h-l">{category===""?"Topics:":category+":"}</div>
                        <SearchBar placeholder="Search Topics" size="6px" onSearch={onTopicSearch}/> 
                        <div className="ql-topic-h-a">
                            <Button  onClick = {()=>setShowAddTopic(!showAddTopic)} startIcon={<CategoryIcon/>} variant="contained" >Add</Button>
                            <AddTopic show={showAddTopic}  setShow={setShowAddTopic} category={category} topics={topics} setTopics={setTopics}/>
                        </div>
                    </div>
                
                    <div style={{height: '480px'}} className="ql-topics-c">
                        {
                            searchTopicList.length>0?
                            searchTopicList.map(t=>{
                                return <QlCategory onCategorySelected = {()=>onTopicSelect(t.topic)} onCatStatusChanged={(event)=>onTopicStatusChanged(event, t.category, t.topic, t.status)} selected={topic===t.topic} value={t.topic}  status={t.status}/>
                            }):

                            isTopicsLoaded?
                            topics.length>0?
                            topics.map(t=>{
                                return <QlCategory onCategorySelected = {()=>onTopicSelect(t.topic)} onCatStatusChanged={(event)=>onTopicStatusChanged(event, t.category, t.topic, t.status)} selected={topic===t.topic} value={t.topic}  status={t.status}/>
                            })
                                :<EmptyContent lv={category===""?"Select Category to see Topics":`No Topics for ${category}`} />
                            :<TopicShimmer />
                        }
                    </div>
                </div>:
            
                <QlQuestions isQnsLoaded={isQnsLoaded} setShowQuestions={setShowQuestions} category={category} topic={topic} onQnDeleted={onQnDeleted}  questions={questions} setQuestions={setQuestions}/>
                }
                </div>
            </div>
        </div>
    )
}
export default QuestionLibrary