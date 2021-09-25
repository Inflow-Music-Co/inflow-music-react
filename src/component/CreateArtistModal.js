import { useState } from 'react'
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import '../page/LoginModal.css'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TwitterIcon from '@mui/icons-material/Twitter';
import { setUserData } from '../store/reducers/authSlice';

const twitterRegex = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
const symbolRegex = /[A-Z]{3}/g;

const CreateArtistModal = ({ createArtistAccount, setCreateArtistAccount }) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [errorFlg, setErrorFlg] = useState("");
    const [errTwitter, setErrTwitter] = useState(false);
    const [errSymbol, setErrSymbol] = useState(false);
    const [errArtistName, setErrArtistName] = useState(false);
    const [errSocialTokenName, setErrSocialTokenName] = useState(false);
    const [artistData, setArtistData] = useState({
        twitterUrl: "",
        artistName: "",
        socialTokenName: "",
        symbol: "",
    });

    const createArtist = async (e) => {
        e.preventDefault();

        if(!twitterRegex.test(String(artistData.twitterUrl).toLowerCase())){
            setErrTwitter(true);
        } else if (!artistData.artistName){
            setErrArtistName(true);
        } else if (!artistData.socialTokenName){
            setErrSocialTokenName(true);
        } else if (symbolRegex.test(String(artistData.symbol))){
            setErrSymbol(true)
        } else {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}`)
        }
        
    }

    const handleSocialTokenName = (e) => {
        setArtistData({ ...artistData, socialTokenName: e.target.value});
    }

    const handleArtistName = (e) => {
        setArtistData({ ...artistData, artistName: e.target.value});
    }

    const handleSymbol = (e) => {
        setArtistData({ ...artistData, symbol: e.target.value});
    }

    const handleTwitterUrl = (e) => {
        setArtistData({ ...artistData, twitterUrl: e.target.value});
    }

    console.log(artistData);

    return (
        <div>
            <Modal
                show={createArtistAccount}
                className="edit-profile-modal"
                onHide={() => {
                    setCreateArtistAccount((createArtistAccount) => !createArtistAccount)
                    }}>
            <Modal.Header>
            <Grid conatiner style={{flexGrow: 1}}>
                <Grid item xs={12} style={{paddingBottom: 30}}>
                <span className="login-title col-12"> create your artist profile</span>
                </Grid>
                <Grid item xs={12}>
                <Button
                    style={{backgroundColor: "#1DA1F2", color: "white", marginLeft: 5, borderRadius: 30}}
                    variant="contained"
                    size="large"
                    >
                    connect your twitter&nbsp;&nbsp;
                    <TwitterIcon />
                </Button>
                </Grid>
            </Grid>
            </Modal.Header>  
            <Modal.Body>
                <div className="mt-4 mb-0 pb-0 form-group">
                    <div className="col-12">
                    <div className="comman-row-input">
                        <input
                        placeholder="twitter url"
                        type="text"
                        name="twitter url"
                        onChange={handleTwitterUrl}
                        />
                    </div>
                    <div className="comman-row-input">
                        <input
                        placeholder="artist name"
                        type="text"
                        name="artist name"
                        onChange={handleArtistName}
                        />
                    </div>
                    <div className="comman-row-input">
                        <input
                        placeholder="your social token name"
                        type="text"
                        name="social token name"
                        onChange={handleSocialTokenName}
                        />
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="comman-row-input">
                        <input
                        placeholder="your social symbol"
                        type="text"
                        name="social token name"
                        onChange={handleSymbol}
                        />
                    </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn-gradiant m-1" onClick={createArtist}>
                    CREATE
                </button>
            </Modal.Footer>
        </Modal>    
        </div>
    )
}

export default CreateArtistModal
