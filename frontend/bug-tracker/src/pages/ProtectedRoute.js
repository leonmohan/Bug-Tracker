import { Navigate} from "react-router-dom"
import auth from "../middleware/auth"



export default function ProtectedRoute({isAuth, setIsAuth, component})
{
    auth(setIsAuth)
    return isAuth ? component : <Navigate to="/pages/login" />
}