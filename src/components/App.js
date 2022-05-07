import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from './Home';
import Routines from './Routines';
import MyRoutines from './MyRoutines';
import Activities from './Activities';
import MyActivities from './myActivities';
import User from './User';
import Login from './Login'
import RegisterLogin from './RegisterLogin';
import { getRoutines } from '../api';

import { getAllActivities } from '../api';

const App = () => {
 const [routines, setRoutines] = useState([]);
 const [activities, setActivities] = useState([]);
 const [searchResults, setSearchResults] = useState({ count: {}, duration: [] });


 useEffect(async () => {
    const allRoutines = await getRoutines();
    setRoutines(allRoutines);
 },[setRoutines])
 
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

const [loggedIn, setLoggedIn] = useState(false);


useEffect(() => {
    setLoggedIn(!!localStorage.getItem("UserToken"))
}, []);


const logOut = () => {
    localStorage.removeItem("UserToken");
    setLoggedIn(false);
}

return (<div className='app'>

    <BrowserRouter>
        <div id="header">
            <h1 className='header'>Fitness Tracker</h1>
                <div id= "buttonRoutesBox">
                    {!loggedIn? <>
                    <button className="button"><Link id='link' to="/login">Login</Link></button>
                    <button className="button"><Link id='link' to="/signUp">SignUp</Link></button>
                    <button className="button"><Link id='link' to="/routines">Public Routines</Link></button> 
                    <button className="button"><Link id='link' to="/activities">Public Activities</Link></button>
                    </> : <>
                    <button className="button"> <Link id='link' to="/user">User</Link></button>  
                    <button className="button"><Link id='link' to="/myRoutines">MyRoutines</Link></button> 
                    <button className="button"><Link id='link' to="/myActivities">MyActivities</Link></button>
                    <button className="button"><Link id='link' to="/routines">Public Routines</Link></button> 
                    <button className="button"><Link id='link' to="/activities">Public Activities</Link></button></>} </div>
                </div>
    
                    <Route path="/login">
                        <Login setLoggedIn={setLoggedIn}loggedIn={loggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>   
                    </Route>

                    <Route path="/signUp">
                        <RegisterLogin setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
                    </Route>

                    <Route path="/user">
                        <User loggedIn={loggedIn} setLoggedIn={setLoggedIn} username={username} setUsername={setUsername}/>
                    </Route> 
 
            <Route path = "/routines"><Routines routines = {routines} setRoutines = {setRoutines} username = {username}/></Route>  
            <Route path = "/myRoutines"><MyRoutines routines = {routines} setRoutines = {setRoutines} loggedIn={loggedIn}/></Route>
            <Route path = "/activities"><Activities activities = {activities} setActivities = {setActivities}/></Route>
            <Route path = "/myActivities">< MyActivities activities = {activities} setActivities = {setActivities}/></Route>

            </BrowserRouter>
        </div>);
        }
        export default App;


