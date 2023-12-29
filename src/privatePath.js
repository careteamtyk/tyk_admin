import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./utils/util";
const PrivatePath = ({ children })=>{
    return isLoggedIn()? children : <Navigate to="/login" />;
}
export default PrivatePath 