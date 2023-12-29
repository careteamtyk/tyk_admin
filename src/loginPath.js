import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./utils/util";
const LoginPath = ({ children })=>{
    return !isLoggedIn()? children : <Navigate to="/" />;
}
export default LoginPath 