import React, { useState } from "react"
import "../styles/Login.css"
import { useNavigate } from "react-router-dom"

export default function Login()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [incorrectCredentials, setIncorrectCredentials] = useState(false)
    const redirect = useNavigate()

    async function handleSubmit(e)
    {
        try
        {
            e.preventDefault()
            const loginResponse = await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/login", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({username: username, password: password}), credentials: 'include'})
            const login = await loginResponse.json()
            document.cookie = `username=${login.username}`
            
            if(login != null)
            {
                redirect("/pages/home")
            }
        }
        catch
        {
            setIncorrectCredentials(true)
        }
    }

    function handleChange(e)
    {
        if(e.target.name == "username"){setUsername(e.target.value)}
        else if(e.target.name == "password"){setPassword(e.target.value)}
    }

    return(
        <div id="login-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Login to Bug Tracker</h1>
                    {incorrectCredentials && <span className="text-danger">Incorrect username or password</span>}
                </div>

                <div>
                    <label>Username</label>
                    <input type="text" placeholder="Username" name="username" value={username} onChange={handleChange} />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
                </div>

                <button>Log in</button>
            </form>
        </div>
    )
}