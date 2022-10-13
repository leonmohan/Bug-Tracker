import React from "react";
import { Link } from "react-router-dom";
import "../styles/Error.css"


export default function Error()
{
    return(
    <div id="error-container">
        <h1>Page not found</h1>
        <Link to="/">Return to homepage</Link>
    </div>)
}