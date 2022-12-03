# Bug Tracker
![BugTracker](https://user-images.githubusercontent.com/101066826/195493705-adb290a4-5853-45de-a6cc-10eb25f4b273.gif)

### A website I built in React that allows you to create an account, projects, bugs that you can preform CRUD operations on in that project.

## Tech used: ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
For the explanations I will divide the project into two parts: Frontend and backend

### Frontend
The frontend of this application has three main folders inside of the src folder: components, middleware, and pages.
#### Components
Bug.js is a component that is rendered on the ViewProject page component. It recieves a bugDetails object, projectUsers array, role string, and reload function from it's props. The bugDetails object is destructured further where bug_id, completed, title, assignedTo, description, and project_id is extracted. These values are used to conditionally render update and delete operations for the admin.

Project.js is a component that is rendered on the Explore and Home.js page components. It recieves a isAuth boolean and project object from it's props. The isAuth is used to conditionally render a button that either redirects to the login page or a button that redirects to the projects page details. The project object contains details about the project like its name, owner, and description.

SharedLayout.js is a componenet that is rendered on all page componenets except for the Signup and Error page. This componenet is responsible for showing a navigation bar at the top. It recieves a isAuth boolean that determines what it renders. If the user is authorized, then navigation links to the home, explore, and create pages are made visible. There is also a log out button if the user is authorized. If the user is not authorized, then only the Explore page will be available to navigate. If the user is not authorized there will also be a sign up button.

#### Middleware
auth.js is what's used by most of the page componenets to authorize the user's navigation. Instead of repeating myself in code, I just import this file and invoke the useAuth function

getUsernameCookie.js is what I use to quickly get the username cookie so I can display the name of the user in the SharedLayout. (This is not to be confused with the JWT token. There is a seperate cookie called username)

#### Pages
Create.js is the page componenet that allows a logged in user to create a new project. It has two state hooks; projectName and description. projectName holds the value that is written in the create forms project name. Description holds the value that is written in the create forms project description. They both are controlled inputs that get update on every change. When the user submits the form the createProject endpoint is fetched from the node app. The user is then redirect to their homepage where they can view the project they just created.

Error.js is just a simple page componenet for all pages that was not intended to be navigated to. It shows a Page not found error and provides a hyperlink that redirects the user back to the signup page.

Explore.js is a page componenet that allows you to browse all of the communities projects. It has a state hook called explorePageDetails which is responsible for holding an array of all the projects and a loading boolean variable which is initially set to true so a loading gif will show. The projects are populated when the page is first loaded via a useEffect hook with an empty dependency array. What this useEffect hook does is fetch a recieve json of all the projects, maps them into Project.js componenets and places those rendered componenets into explorePageDetail's projects array the loading variable is also set to false to the loading gif wont show anymore. All that's rendered is a title, the loading gif (conditionally depending on the loading variable), and the array of project componenets.

Home.js is a page componenet that works similiarly like Explore but with a little twist. It holds a state hook called homePageDetails that holds all information on the projects and also has a loading variable which is initially set to true. A useEffect hook makes a fetch request that gets json of the specific users projects that they are involved in this information is populated in the state hook and sets the loading variable to false.

Login.js has three useState hooks. The first holds the username, password, and an incorrectCredentials boolean. They both reflect whatever values is written in the form. When the form is submitted, a request is sent to "/login". If an error is returned, the error is caught and incorrectCredentials is set to true, which will then cause a red span text to display an error message. Basically all thats rendered is the form and the validation for the form (conditionally rendered)

ProtectedRoute.js is an easy way to authorize the user without repeating lines of code. What this componenet does is checks if the user is Authorized, and if they are then the componenet they want to navigate to is rendered. Otherwise, they are redirected to the login page. Home, ViewProject, and Create are all passed to this componenet in its props and then rendered if the conditions of being authorize are met.

Signup.js is a responsible for allowing the user to sign into the bug tracker. It has three state hooks; username, password, and usernameTaken error. Username and password are controlled inputs that reflect exactly what values the user has entered on the signup form. When the form is submitted, a request is sent to the signup route on my backend. If the request passes, then that means that everything went well and the user is then redirected to the login page where they can login to their new account. If the request fails, then the setUsernameTakenError state hook is changed to true which will then conditionally render an error message on the form. This componenet also has some validations like checking if there is any whitespaces in the username and if the username is empty it tells them to enter a username.

UnprotectedRoute.js is an easy way to redirect an authorized user that goes to a page meant for unauthroized users like signup or login. Just like ProtectedRoute.js, it checks if the user is authroized and if they're not, it renders the componenet. Otherwise if the user is authroized, they are redirected to their home page.

ViewProject.js is the page componenet that the allows users to view information about a project. It contains a state hook called projectDetailsPage that contains information about the project's name, description, role in the project, the project's users, the project's id, the create bug form's details, and a loading boolean that is initially set to true. When the project is first loaded, a useEffect hook is called which populates all the information in the projectDetailsPage such as the projects name, description, role, and projectUsers. It also gets all the bugs that belong to that project and renders Bug.js componenets for each bug that is returned. < option > componenets are also rendered based off all the names returned from the projectUsers array that gets fetched. When all this data is retrived, the projectDetailsPage is populated with all the information and loading is set to false. If the user's role is a guest, then a "Join project" button will be rendered. If the user's role is a admin, then a form will be rendered that allows them to create a new bug on the project and assign it to the developers on the project. These inputs are all controlled inputs. When the form is submitted, a request is sent to the route on my backend with "createBug". The page is then reloaded by changing the loading state boolean to true and a method that regathers all the projects data is invoked which updates all the information. 

### Backend

#### Database
The database I decided to use is PostgresSQL because that would allow me to structure all my data with relationships. There are four tables in total in my database:

Users: There are three columns in the Users table; user_id, username, and password. The user_id is a primary key. This table holds all the login information for the user.

Projects: There are five columns in the Projects table; project_id, owner_id, name, description, and created_at. The project_id column is a primary key and the owner_id column is a foreign key that references the user_id column from the Users table. This table holds all the projects that belong to different Users.

ProjectsUsers: There are four columns in the ProjectsUsers table; projectusers_id, project_id, user_id, and role. The projectusers_id is a primary key. The project_id column is a foreign key that references the project_id column from the Projects table. The user_id column is also a foreign key that references a user_id from the Users table. The purpose of this table is to represent the relationship that each user has with a project. This table is considered a "join table" or "association table" for that reason

Bugs: There are six columns in the Bugs table; bug_id, project_id, user_id, title, description, and completed. bug_id is a primary key. project_id is a foreign key that references a project_id from the Projects table. user_id is a foreign key that references the user_id column from the Users table. The purpose of this table is to keep a record of all the bugs that belong to projects and who (from Users) is that bug assigned to.
# 
#### Node.js application
The application consists of two main folders: data and middleware

##### Data:

Every file in this folder is responsible for interacting with my database. They all use db.js, which is a file that connects to the database so querys can be preformed. 

users.js has one create operation and two read operations: insertUser inserts a new user into the Users table, getUserByUsername returns a user object based on the username inputted, getUserById returns a user object based on the id inputted, getUserIdByUsername was created because I wanted a convenient way of getting a user's id based off their username alone.

projects.js has one create operation and two read operations: insertProject inserts a new project into the Projects table, getProjects returns an array of objects that contain information about all the projects and getProjectsById returns an object that contains information about a specific project.

projectsusers.js has one create operation and four read operations: insertUserIntoProject inserts a new user into the ProjectsUsers table as a developer. getProjectAdminByProjectID returns the record that represents the project's admin. getProjectUsersByProjectId returns all the users records (not users object) that are involved in a specific project. getProjectUsersRole returns the projectusers record of a specific user (so they can tell what there role is on a project). getProjectUsersProjectIdsByUserId returns all the project_id columns that a specific user is associated with (used for telling what projects the users is involved in)

bugs.js has one create operation, two read operations, two update operations, and one delete operation. insertBug inserts a new bug into the Bugs table. getBugsByProjectId returns all the bugs from a specific project based off the project_id inputted. getBugsProject returns the project that a bug is involved in using its bug_id. toggleBugCompleteById updates the completed column of a specific bug to the opposite of whatever it was set to. updateBugAssignedToByUserId changed the user that the bug is assigned to and deleteBug deletes a specific bug
# 
##### Middleware:
There is two types of middleware; security middleware and regulare middleware

athenticate.js is the middleware that is responsible for authenticating that a user has entered the correct username and password. It works by gathering the username and password entered, and checking if a user in the database with that username exists (by using users.js from data). If the validation is passed, it then checks to see if there inputted password matches the one in the database by using the bcrypt library (since all passwords are hashed and salted). If the password matches then a new jwt token is created and signed using the user object queried from the database. This jwt is stored in the client's cookie and will be used to authorize them when navigating the website. A json response is also send to the clinet to notify them that they have successfully signed in.

authorize.js is the middlware that is reponsible for authorizing the user every time they navigate accross the website. It does this by checking the token cookie in the client's cookies and verifying it using the jwt library. If the validation is passed, a json response is sent to the client authorizing their access.

authorizeRequest.js works the same way as authorize.js except it was built to authorize the user when they make a request rather then just navigating the website. If the jwt token is verified, it will just load the next middleware

checkProjectAdmin.js is meant to verify that the user is an admin on a specific project before allowing them to preform a request. It gathers the cookie and the projectID that the client wants to preform an operation on, then it checks in the database if that user is an admin (by using projectusers.js and users.js from data) If the validation is passed, the next middleware is loaded.

createBug.js gathers all the form data inputted by an admin and checks if the user that the admin is assigning to complete the bug is involved in the project. If they are, then the bug is inserted (using bugs.js)

createProject.js gathers the users token, and decodes it to get the username was signed to the JWT token. It then gets the project name and description submitted by the form. The project is then inserted into the database (using projects.js) with the username decoded from the JWT token as the owner (admin) of the project

joinProject.js first verifies if the client that's requesting to join is involved in the project already. If they aren't, the client's is inserted into the ProjectsUsers table as a developer on that project.

getProjectBugs.js uses bugs.js to get all the bugs that have the inputted projectID match the foreign key project_id from the bugs table. Before it responds with an array of the bugs, it deletes the user_id of the and replaces it with the username of the project's admin.

getProjects.js gets all the projects from the database using (project.js). Before it responds with an array of projects, it deletes the owner_id and replaces it with the username of the user.

getUsersProjects.js gets an individual user's project from the database using (projects.js). First it uses projectsusers.js to find out which project does the user belong to, and then it uses project.js to get information about those projects. It then replaces the owner_id column from each object with their username instead.

deleteBug.js deletes a bug by gathering the projectID of the bug and the bug_id using bugs.js

logoutUser.js deletes the clients "token" cookie

signupUser.js preforms validations to see if the username and password is undefined, the username is an empty string, or if the username has a space. If all these validations are passed, then a hashedPassword is generated using the bcrypt library. The new user is then inserted into the database with the username and the hashed password (using user.js).

updateBugAssigned.js changes the user that is assigned to complete a bug. First it gets the user and checks if that user is in involved in the project (using projectsusers). If that validation is passed, then the user thats assigned to complete the bug is changed (using bugs.js)

updateBugComplete.js toggles the completed value of a specific bug. First it gets the bug_id and token from the client then it doublechecks if the client making the request is an admin. If all these validations are passed then the bug's completed column is switched using bugs.js.

viewProjectDetails.js gets all the details that the user needs when viewing the project such as there role on the project the users that belong to that project.

##### Security:
This folder basically holds jwt and bcrypt modules that shortcut signing JWT tokens and hashing passwords and comparing passwords with bcrypt.

## Optimizations
When looking back, some optimiations and improvments I think I should make are writing more cleaner and consistent code, and using a library like Redux to handle state. 

On my frontend, page componenets I tend to sometimes destructure the props object and sometimes I don't bother to do that, so there is an inconsistency in the coding style. I also have some pages with a large state hook that holds an object of all the details about the page but on other pages I don't implement this (see Login vs ViewProject). I also think the "middleware" folder is poorly named because it's not really middleware that's inside that folder. The reason why I'm intrested in is because from what I've heard its basically like a frontend database for state hooks. This sounds like a good solution for all the props drilling that I do on this project. (See how I pass useAuth: App -> Explore -> Project).

On the backend, I feel like I could have done a better job with naming the middleware modules. I tried to name each middleware based off what they do (CRUD). If you take a look at how they are named, some of they follow this principle and some don't, thus making the coding style inconsistent.

## Lessons Learned:
This is a great project for me because I learned so much while building it.

First of all I learned firsthand about the concept of "Props drilling". I found myself having to pass down this state hook called isAuth. This caused me to do some research about how to prevent props drilling and the that caused me to learn about a popular state management tool called Redux. I will try to use Redux on my next project

The second thing I learned about was the basics of what hashing and salting is. One topic I tried to push myself to do on this project was thinking about implementing security becasue I had never done so before. I wanted to prepare for the event that some hacker steals records from my Users table in the database. This made me learn about the very basics of encrypting passwords by hashing and salting them. I used the bcrypt library to do this to all the users passwords when they sign up. Another big thing about seurity I learned about was the concept of authenication and authorization. When the user logs in, I used the bcrypt library to authenticate that the user typed in the correct password by comparing the hashed password in the database with the password that was entered. For authorization, I decided to use JWT tokens. When the user gets authenicated, a JWT token is created and stored into their cookies. Anytime this user makes a request, the token's value in that cookie is verified. I like JWT because it's simple to use, however I undestand that I need to learn more traditional ways of authorization like such as saving sessions to a database.

Initially I was going to create this project using the MERN stack, but the problem with MongoDB was it was hard to represent relationships. This made me discover what the PERN stack was, but now I had a new problem; I needed to use a free relational postgres database. That's where AWS comes in. Right now I'm using their free RDS feature. I don't think this feature will be availaible forever though so I'm just using it for as long as I can.
