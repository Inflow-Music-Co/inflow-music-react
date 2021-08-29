import React, { useContext, useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../utils/hooks'
import { injected, fortmatic } from '../utils/connectors'
import './base.css';
//import Search from '../component/Search';
import Notification from '../component/Notification';
import Profiledropdown from '../component/Profiledropdown';
import { Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { connected, disconnect } from "../store/reducers/walletSlice";

const Header = () => {
    const wallet = useSelector(state => state.wallet);
    const token = useSelector(state => state.auth.token);
    // const wallet = useSelector(state => state.wallet);
    const dispatch = useDispatch()
    const [alert, setalert] = useState(null);

    const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React()

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState()
    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    // console.log({wallet})
    useEffect(() => {
        if (wallet.wallet_connected) {
            conn();
        }
        // eslint-disable-next-line
    }, [])

    const conn = async () => {
        setActivatingConnector(fortmatic)
        await activate(fortmatic)
        dispatch(connected({ address: account }));
    }

    const connectWallet = async () => {
        if (!token) {
            window.location.href = "/login"
            return;
        }
        try {
            if (!account) {
                setActivatingConnector(fortmatic)
                await activate(fortmatic)
                dispatch(connected({ address: account }));
                showAlert('Wallet connected successfully', 'success');
                // setTimeout(() => {
                //     window.location.reload();
                // },1500)
            } else {
                deactivate()
                showAlert('Wallet disconnected', 'info');
                dispatch(disconnect());
            }
        } catch (e) {
            // console.log(e);
        }
    }

    const showAlert = (title, type) => {
        setalert(<SweetAlert style={{ color: '#000' }} type={type} onConfirm={hideAlert} timeout={2000} title={title} />)
    }

    const hideAlert = () => {
        setalert(null);
    }

    return (
        <div className="header-main">
            {alert}
            <div className="left-col-main">
                {/* <Search /> */}
            </div>
            <div className="right-col-main">
                <Button size="sm" className="mr-2 wallet-button" onClick={() => connectWallet()}>
                    {!!account ? 'Disconnect Wallet' : 'Connect Wallet'}
                </Button>
                <div className="notified-main">
                        <Notification />
                    </div>
                <div className="profile-dropdown">
                    <Profiledropdown />
                </div>
            </div>
        </div>
    )
}



export default Header;
