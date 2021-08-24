import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import queryString from "query-string";
import Axios from 'axios'
const VerifyEmail = () => {
    const { token } = queryString.parse(useLocation().search)
    const [ stateMsg, setStateMsg ] = useState('Verifying email now')
    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/verifyemail`, {token})
        .then((res) => {
            setStateMsg("Your email has been verified! You can now sign in with your new account ")
        })
        .catch(e => {
            setStateMsg("Failed to verify your email")
        })
    }, [token])
    return (
        <div>
            <p>{stateMsg}</p>
        </div>
    )
}

export default VerifyEmail