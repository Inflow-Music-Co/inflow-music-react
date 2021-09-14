import { useState, useEffect } from 'react';
import Cryptr from 'cryptr';
import axios from 'axios';
import ReactPlayer from 'react-player';
const cryptr = new Cryptr(process.env.REACT_APP_CRYPTR_SECRET)

const Streamer = ({ encodedUrl }) => {

    let decodedUrl = '';
    const [view, setView] = useState(false);

    useEffect(() => {
       decodedUrl = cryptr.decrypt(encodedUrl);
    },[view])

    useEffect(() => {
        if(decodedUrl !== ''){
            setView(true);
            
        }
    })
    
    decodedUrl = cryptr.encrypt(decodedUrl)

    return (
        <div className="dashboard-wrapper-main">
        {view ? <ReactPlayer 
            url={`${decodedUrl}`}
            controls="false"
            config={{
                youtube: {
                    playerVars: { disablekb: 0}
                }
            }} /> : <div> please wait </div>}
        </div>
    )
}

export default Streamer
