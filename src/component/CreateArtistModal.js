import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../page/LoginModal.css';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TwitterIcon from '@mui/icons-material/Twitter';
import { styled } from '@mui/material/styles';
import { setUserData } from '../store/reducers/authSlice';

const twitterRegex = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
const symbolRegex = /[A-Z]{3}/;

const Input = styled('input')({
    display: 'none'
});

const CreateArtistModal = ({
    createArtistAccount,
    setCreateArtistAccount,
    userAddress,
    userEmail
}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [errorFlg, setErrorFlg] = useState('');
    const [errTwitter, setErrTwitter] = useState(false);
    const [errSymbol, setErrSymbol] = useState(false);
    const [errArtistName, setErrArtistName] = useState(false);
    const [errUpload, setErrUpload] = useState(false);
    const [errSocialTokenName, setErrSocialTokenName] = useState(false);
    const [artistAccountCreated, setArtistAccountCreated] = useState(false);
    const MySwal = withReactContent(Swal);
    const [artistData, setArtistData] = useState({
        twitterUrl: '',
        artistName: '',
        socialTokenName: '',
        symbol: '',
        profile: ''
    });

    useEffect(() => {
        artistAccountCreated &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>artist account created!</p>,
                icon: 'success',
                background: '#303030'
            }).then(() => {
                setArtistAccountCreated((artistAccountCreated) => !artistAccountCreated);
            });
    }, [artistAccountCreated]);

    const createArtist = async (e) => {
        e.preventDefault();

        if (!twitterRegex.test(String(artistData.twitterUrl).toLowerCase())) {
            setErrTwitter(true);
            alert('twitter error');
        } else if (!artistData.artistName) {
            setErrArtistName(true);
            alert('artist name error');
        } else if (!artistData.socialTokenName) {
            setErrSocialTokenName(true);
            alert('social token name error');
        } else if (!symbolRegex.test(String(artistData.symbol))) {
            setErrSymbol(true);
            alert('symbol error');
        } else if (!artistData.profile) {
            setErrUpload(true);
            alert('file upload error');
        } else {
            const data = new FormData();
            data.append('instagram_url', artistData.twitterUrl);
            data.append('first_name', artistData.artistName);
            data.append('social_token_name', artistData.socialTokenName);
            data.append('social_token_symbol', artistData.symbol);
            data.append('wallet_id', userAddress);
            data.append('profile', artistData.profile);
            data.append('email', userEmail);

            for (var pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            setArtistAccountCreated(true);

            await axios
                .post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/onboardingupgrade`, data)
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleSocialTokenName = (e) => {
        setArtistData({ ...artistData, socialTokenName: e.target.value });
    };

    const handleArtistName = (e) => {
        setArtistData({ ...artistData, artistName: e.target.value });
    };

    const handleSymbol = (e) => {
        setArtistData({ ...artistData, symbol: e.target.value });
    };

    const handleTwitterUrl = (e) => {
        setArtistData({ ...artistData, twitterUrl: e.target.value });
    };

    const handleUpload = (e) => {
        setArtistData({ ...artistData, profile: e.target.files[0] });
    };

    return (
        <div>
            <Modal
                show={createArtistAccount}
                className="edit-profile-modal"
                onHide={() => {
                    setCreateArtistAccount((createArtistAccount) => !createArtistAccount);
                }}
            >
                <Modal.Header>
                    <Grid conatiner style={{ flexGrow: 1 }}>
                        <Grid item xs={12} style={{ paddingBottom: 30 }}>
                            <span className="login-title col-12"> create your artist profile</span>
                        </Grid>
                        {/* <Grid item xs={12}>
                <Button
                    style={{backgroundColor: "#1DA1F2", color: "white", marginLeft: 5, borderRadius: 30}}
                    variant="contained"
                    size="large"
                    >
                    connect your twitter&nbsp;&nbsp;
                    <TwitterIcon />
                </Button>
                </Grid> */}
                    </Grid>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-4 mb-0 pb-0 form-group">
                        <div className="col-12">
                            <div className="comman-row-input">
                                <h5>instagram link</h5>
                                <input
                                    placeholder="your instagram link"
                                    type="text"
                                    name="twitter url"
                                    onChange={handleTwitterUrl}
                                />
                            </div>
                            <div className="comman-row-input">
                                <h5>artist name</h5>
                                <input
                                    placeholder="your artist name"
                                    type="text"
                                    name="artist name"
                                    onChange={handleArtistName}
                                />
                            </div>
                            <div className="comman-row-input">
                                <h5>name your token</h5>
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
                                <h5>your token symbol</h5>
                                <input
                                    placeholder="your social token symbol (eg. INF)"
                                    type="text"
                                    name="social token name"
                                    onChange={handleSymbol}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <h5>your profile picture </h5>
                            <label htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleUpload}
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth={true}
                                    component="span"
                                >
                                    UPLOAD IMAGE
                                </Button>
                            </label>
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
    );
};

export default CreateArtistModal;
