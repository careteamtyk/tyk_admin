import {ShimmerCategoryList} from "react-shimmer-effects";
const TopicShimmer = ()=>{
    const sc = {
        display: 'block'
    }
    const topic = {
        margin: '8px',
        borderRadius: '8px',
        height: '48px',
        display: 'block'
    }
    return(
        <div style={sc}>
            <ShimmerCategoryList />
        </div>
    )
}
export default TopicShimmer