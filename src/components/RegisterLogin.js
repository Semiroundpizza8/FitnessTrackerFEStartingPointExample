import React, {useState} from "react";
import { registerUser } from "./api";

const RegisterLogin = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [hasTriggeredError, setHasTriggeredError] = useState(false);
    const {loggedIn, setLoggedIn} = props

  

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 5) {
            setHasTriggeredError(true);
        }
        else {
            console.log('username: ', username);
            console.log('password: ', password);
            setUsername('');
            setPassword('');
            setName('');
            setEmail('');
        }
        
        const dataObject = {
            user: {
                username: username,
                password: password},
        }

       

        const didLoggedInWork = await registerUser(dataObject);
        setLoggedIn(didLoggedInWork);

    


    }

    


    const handleChange = (event) => setUsername(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value)
    
    if (hasTriggeredError) return <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>

    return (
        <div id='Register'>
            {!loggedIn? 
            <>
            <form onSubmit={handleSubmit}>
             <label htmlFor='username'>Create Username: </label>
            <input type='text' name='username' value={username} onChange={handleChange} /> 
            <label htmlFor='password'>Create Password: </label>
            <input type='password' name='password' value={password} onChange={handlePasswordChange} />
                {hasTriggeredError &&
                    <p style={{ color: 'red' }}> Whoopse, looks like you need to fix something! </p>
                }
                <button id="summit" type='submit'>Submit</button>
            </form> </> : <p> You already have an account and are signed in!</p>}
        </div>
    )
}



export default RegisterLogin
