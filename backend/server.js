//Modules
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require("cookie-parser")
require("dotenv").config()


//Imported middleware
    //Users
const signupUser = require("./middleware/signupUser")
const getUsersProjects = require("./middleware/getUsersProjects")
const logoutUser = require("./middleware/logoutUser")

//     //Projects & ProjectsUsers
const createProject = require("./middleware/createProject")
const getProjects = require("./middleware/getProjects")
const viewProjectDetails = require("./middleware/viewProjectDetails")
const joinProject = require("./middleware/joinProject")
const checkProjectAdmin = require("./middleware/security_middleware/checkProjectAdmin")
const getProjectBugs = require("./middleware/getProjectBugs")

//     //Bugs
const updateBugComplete = require("./middleware/updateBugComplete")
const updateBugAssigned = require("./middleware/updateBugAssigned")
const createBug = require("./middleware/createBug")
const deleteBug = require("./middleware/deleteBug")

    //Security
const authenticate = require("./middleware/security_middleware/authenticate")
const authorizeRequest = require("./middleware/security_middleware/authorizeRequest")
const authorize = require("./middleware/security_middleware/authorize")


//Configuration
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({ origin:"https://bug-tracker-leonmohan-frontend.herokuapp.com", credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }))

//Middleware routes
    //Users
app.post("/signup", signupUser)
app.post("/login", authenticate)
app.get("/logout", logoutUser)
app.get("/authorize", authorize)
app.get("/getUsersProjects", authorizeRequest, getUsersProjects)

//     //Projects & ProjectsUsers
app.post("/createProject", authorizeRequest, createProject)
app.get("/getProjects", getProjects)
app.get("/viewProjectDetails/:projectID", authorizeRequest, viewProjectDetails)
app.get("/getProjectBugs/:projectID", authorizeRequest, getProjectBugs)
app.post("/guestJoinProject", authorizeRequest, joinProject)

//     //Bugs
app.post("/createBug", authorizeRequest, checkProjectAdmin, createBug)
app.put("/updateBugComplete", authorizeRequest, updateBugComplete)
app.delete("/deleteBug", authorizeRequest, checkProjectAdmin, deleteBug)
app.put("/updateBugAssigned", authorizeRequest, checkProjectAdmin, updateBugAssigned)



//Port
app.listen(process.env.PORT || 8000)