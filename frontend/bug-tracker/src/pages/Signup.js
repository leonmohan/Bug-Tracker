import React, { useState } from "react"
import "../styles/Signup.css"
import { useNavigate } from "react-router-dom"

export default function Signup()
{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameTakenError, setUsernameTakenError] = useState(false)

    const redirect = useNavigate();

    async function handleSubmit(e)
    {
        try
        {
            e.preventDefault()
            const signupUser = await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/signup", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({username: username, password: password})})
            if(signupUser.ok)
            {
                redirect("/pages/login")
            }
            else
            {
                setUsernameTakenError(true)
            }
        }
        catch(err)
        {
            setUsernameTakenError(true)
        }
    }

    function handleChange(e)
    {
        if(e.target.name == "username"){setUsername(e.target.value)}
        else if(e.target.name == "password"){setPassword(e.target.value)}
    }

    return(
        <div id="signup-container">
            <div id="signup-login-btn">
                <button onClick={()=>redirect("pages/login")}>Log In</button>
            </div>
            
            <section id="signup-form">
                <form onSubmit={handleSubmit}>
                    <h1>BUG TRACKER</h1>
                    <h3>SIGN UP TO START TRACKING BUGS!</h3>
                    <div id="signup-username">
                        {username.length <= 0 && <span className="text-danger">Enter a username</span>}
                        {username.includes(" ") && <span className="text-danger">Whitespaces in username are not allowed</span>}
                        {usernameTakenError && <span className="text-danger">That username is invalid or already in use</span>}
                        <label>Username</label>
                        <input type="text" placeholder="Username" onChange={handleChange} name="username" value={username} />
                    </div>

                    <div id="signup-password">
                        <label>Password</label>
                        <input type="password" placeholder="Password" onChange={handleChange} name="password" value={password} />
                    </div>

                    <button id="signup-submitbtn">Sign Up</button>
                </form>
            </section>
        </div>
    )
}