import { useState, useEffect } from 'react';
import Cryptr from 'cryptr';
import axios from 'axios';
import ReactPlayer from 'react-player';
const cryptr = new Cryptr(process.env.REACT_APP_CRYPTR_SECRET)

const Streamer = ({ encodedUrl }) => {

    const [decodedOriginalUrl, setDecodedOriginalUrl] = useState('');
    const [view, setView] = useState(false);

    useEffect(() => {
        setDecodedOriginalUrl(cryptr.decrypt(encodedUrl));
    },[view])

    useEffect(() => {
        console.log('decodedOriginalUrl', decodedOriginalUrl, 'view', view);
        if(decodedOriginalUrl !== ''){
            setView(true);
        }
    })

    return (
        <div className="dashboard-wrapper-main">
        {view ? <ReactPlayer 
            url={`${decodedOriginalUrl}`}
            config={{
                youtube: {
                    playerVars: { showinfo: 0}
                }
            }} /> : <div> please wait </div>}
        </div>
    )
}

export default Streamer
