import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Create from "./pages/Create"
import ViewProject from "./pages/ViewProject"
import Error from "./pages/Error"
import SharedLayout from "./components/SharedLayout"
import ProtectedRoute from "./pages/ProtectedRoute"
import { useState } from "react";
import UnprotectedRoute from "./pages/UnprotectedRoute"

function App()
{

  const [isAuth, setIsAuth] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UnprotectedRoute isAuth={isAuth} setIsAuth={setIsAuth} component={<Signup />}></UnprotectedRoute>} />

        <Route element={<SharedLayout isAuth={isAuth} />}>
          <Route path="/pages/home" element={<ProtectedRoute isAuth={isAuth} setIsAuth={setIsAuth} component={<Home isAuth={isAuth} />} />} />
          <Route path="/pages/explore" element={<Explore isAuth={isAuth} />} />
          <Route path="/pages/create" element={<ProtectedRoute isAuth={isAuth} setIsAuth={setIsAuth} component={<Create />} />} />     
          <Route path="/pages/login" element={<UnprotectedRoute isAuth={isAuth} setIsAuth={setIsAuth} component={<Login />} />} />
          <Route path="/pages/projects/:projectId" element={<ProtectedRoute isAuth={isAuth} setIsAuth={setIsAuth} component={<ViewProject />} />} />
        </Route>

        <Route path="*" element={<Error />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
