/* eslint-disable */

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import queryString from "query-string";
import Axios from 'axios'
const ResetPassword = () => {
    const { token } = queryString.parse(useLocation().search)
    const [ stateMsg, setStateMsg ] = useState('')
    const [newPassword, setNewPassword] = useState(null)

    const handleChange = (event) =>  { 
        setNewPassword(event.target.value);  
    }
    const handleSubmit = async (event) => {
        try {
            if(!!newPassword) {
                console.log("nnnn", newPassword)
                await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/changepassword`, {token, newPassword})
                setStateMsg("Your password has been changed successfully ! You can now sign in with your new password")
            }
        } catch(e) {
            setStateMsg("Your request to reset your password has expired or the link in inValid")
        }
    }

    return (
        <div className="dashboard-wrapper-main vw-100 d-flex flex-column justify-content-center align-items-center">
                <div className="heading">Change Password</div>
            <p>{stateMsg}</p>
            {/* <form onSubmit={handleSubmit}>         */}
            <label>
                New Password:
            <input type="text" value={newPassword} onChange={handleChange} />       
            </label>
            <button onClick={handleSubmit}>submit</button>
            {/* <input type="submit" value="Submit" /> */}
            {/* </form> */}
            
        </div>
    )
}



export default ResetPassword