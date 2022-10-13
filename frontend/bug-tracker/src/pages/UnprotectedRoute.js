import { Navigate} from "react-router-dom"
import auth from "../middleware/auth"



export default function UnprotectedRoute({isAuth, setIsAuth, component})
{
    auth(setIsAuth)
    return isAuth ? <Navigate to="/pages/home" /> : component
}