import React from "react"
import "../styles/SharedLayout.css"
import { Outlet, NavLink, useNavigate } from "react-router-dom"
import getUsername from "../middleware/getUsernameCookie"

export default function SharedLayout({isAuth})
{
    const redirect = useNavigate()

    async function signOut()
    {
        try
        {
            await fetch("https://bug-tracker-backend-leonmohan.herokuapp.com/logout", {credentials:"include"})
            redirect("/pages/login")   
        }
        catch
        {

        }
    }

    function signUp()
    {
        redirect("/")
    }

    return(
        <>
            <nav id="sharedlayout-navigation">
                    {isAuth && <NavLink className="sharedlayout-navlink" to={"/pages/home"} style={({isActive}) => {return{color: isActive ? 'rgba(205, 134, 13, 1)' : 'rgba(8, 89, 121, 1)'}}}>Home</NavLink>}
                    <NavLink className="sharedlayout-navlink" to={"/pages/explore"} style={({isActive}) => {return{color: isActive ? 'rgba(205, 134, 13, 1)' : 'rgba(8, 89, 121, 1)'}}}>Explore</NavLink>
                    {isAuth && <NavLink className="sharedlayout-navlink" to={"/pages/create"} style={({isActive}) => {return{color: isActive ? 'rgba(205, 134, 13, 1)' : 'rgba(8, 89, 121, 1)'}}}>Create</NavLink>}
                    {isAuth && <div id="sharedlayout-navbutton"><p id="sharedlayout-username">Welcome, {getUsername()}</p><button onClick={signOut}>Log out</button></div>}
                    {!isAuth && <div id="sharedlayout-navbutton"><button onClick={signUp}>Sign up</button></div>}
            </nav>
            <Outlet />
        </>
    )
}