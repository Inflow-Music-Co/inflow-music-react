import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import queryString from "query-string";
import { setUserData } from '../store/reducers/authSlice';
import localStorageService from '../utils/localstorage'
import Axios from 'axios'

const VerifyEmail = () => {
    const dispatch = useDispatch()
    const { token } = queryString.parse(useLocation().search)
    const [ stateMsg, setStateMsg ] = useState('Verifying email now')
    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/verifyemail`, {token})
        .then((res) => {
            setStateMsg("Your email has been verified! You can now sign in with your new account ")
            const { userData, access_token, refresh_token, } = res.data
            localStorageService.setToken({ access_token, refresh_token });
            // Set current user
            dispatch(setUserData({ userData, access_token, isLoggedIn: true }));
            window.location.href = "/"
        
        })
        .catch(e => {
            setStateMsg("Failed to verify your email")
        })
    }, [token, dispatch])
    return (
        <div>
            <p>{stateMsg}</p>
        </div>
    )
}

export default VerifyEmail