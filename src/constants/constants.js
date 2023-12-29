import { getToken } from "../utils/util"
const LOCAL = "local"
const PRODUCTION="production"
const state = PRODUCTION
const PAGE_SIZE = 30
const API_ENDPOINT = state === PRODUCTION?"https://apis.tykhere.com/":"http://localhost:5624/"
const HEADER_TOKEN={
    headers:{
        'content-type': 'application/json',
        token: getToken()
    }
}
const RUPEE_SYMBOL = "₹"
const DEFAULT_BANNER = "/default_test_banner.png"
const IMAGE_UPLOAD_END = API_ENDPOINT+'sam/upload-image'
const IMAGES_GET_END = API_ENDPOINT+'sam/get-images'
const HOSTNAME = state === PRODUCTION?"https://admin.tykhere.com/":"http://localhost:3000/"
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export {
    RUPEE_SYMBOL,
    PAGE_SIZE,
    MONTHS,
    API_ENDPOINT, HEADER_TOKEN, HOSTNAME, IMAGES_GET_END, IMAGE_UPLOAD_END, DEFAULT_BANNER}