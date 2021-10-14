import { useRef, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTrackField from './AddTrackField';
import { useDispatch, useSelector } from 'react-redux';
import { addMp3s, addImage, clearPlaylist } from '../../store/reducers/playlistSlice';
import { updateArtistPlaylists } from '../../store/reducers/playlistSlice';
import Axios from 'axios';

const CreatePlaylist = ({ id, showPlaylistModal, setShowPlaylistModal}) => {
    const [mp3Uploaded, setMp3Uploaded] = useState(false);
    const playlist = useSelector((state) => state.playlist)
    const [uploaded, setMp3Fileed] = useState(false);
    const [image, setImage] = useState({});
    const [imageRender, setImageRender] = useState('');
    const [mp3Name, setMp3Name] = useState('');
    const [mp3File, setMp3File] = useState('');
    const [addTrack, setAddTrack] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const [balance, setBalance] = useState();
    const numberOfTracks = useRef(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearPlaylist());
    },[])

    const [mp3Data, setMp3Data] = useState([
        {
            name: '',
            file: ''
        }
    ]);

    const handleImageUpload = (e) => {
        setImageRender(URL.createObjectURL(e.target.files[0]));
        dispatch(addImage(e.target.files[0]));
    };

    const handleAddTrack = () => {
        if (mp3Name === '') {
            alert('please add a name before adding a new track');
        } else if (mp3File === '') {
            alert('please upload a file before adding a new track');
        } else {
            setAddTrack(true);

            dispatch(addMp3s({ name: mp3Name, file: mp3File }));
                
            numberOfTracks.current += 1;
        }
    };

    const handleRemoveTrack = () => {
        console.log('handleRemoveTrack fired');
        const toRemove = mp3Data[numberOfTracks.current - 1];
        console.log({ toRemove });
        setMp3Data(mp3Data.filter((item) => item !== toRemove));
    };

    const uploadMp3 = async () => {
        console.log('uploadMp3 fired');
        if (!mp3File) {
            alert('please upload a valid .mp3 file');
        } else if (!mp3Data) {
            alert('please add a file name');
        } else {
            //make sure all data is added
            // setMp3Data((stateData) => [...stateData, { mp3Name, mp3File }]);

            console.log({ playlist });

            const data = new FormData();

            //@TODO loop through redux state and append to data.form for multer upload
            playlist.data.forEach(entry => {

            })

            data.append('data', playlist.data);
            data.append('img', playlist.img);
            data.append('balance', balance);
            data.append('id', id);

            //console log data
            for (var pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            dispatch(updateArtistPlaylists(data));
        }
    };

    const renderAddTrackField = () => {
        return (
            <div>
                {mp3Data.map((data, index) => (
                    <AddTrackField
                        setMp3Name={setMp3Name}
                        setMp3File={setMp3File}
                        setMp3Data={setMp3Data}
                        uploaded={uploaded}
                        key={index}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <Modal
                show={showPlaylistModal}
                className="edit-profile-modal success"
                onHide={() => {
                    setShowPlaylistModal((showPlaylistModal) => !showPlaylistModal);
                }}
            >
                <Modal.Header>
                    <Grid container style={{ flexGrow: 1 }}>
                        <Grid item xs={12} style={{ paddingBottom: 30 }}>
                            <span className="login-title col-12"> create your playlist</span>
                        </Grid>
                    </Grid>
                </Modal.Header>
                <Modal.Body>
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <label>Mixtape Name</label>
                            <input
                                id="playlist name"
                                onChange={(e) => setPlaylistName(e.target.value)}
                                className="form-control mb-3 mt-4"
                                type="text"
                                placeholder="ex. my awesome private mixtape"
                            />
                        </Grid>
                    </Grid>

                    <AddTrackField
                        setMp3Name={setMp3Name}
                        setMp3File={setMp3File}
                        setAddTrack={setAddTrack}
                        setmp3Data={setMp3Data}
                        uploaded={uploaded}
                    />
                    {addTrack && renderAddTrackField()}
                    <Grid container item direction="row" justify="flex-end">
                        <Grid item xs={2} container direction="row" justify="flex-end">
                            <IconButton
                                color="warning"
                                onClick={() => {
                                    handleRemoveTrack();
                                }}
                            >
                                <RemoveCircleOutlineIcon color="warning" fontSize="large" />
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                            container
                            direction="row"
                            justify="flex-end"
                            style={{ paddingLeft: 40 }}
                        >
                            <IconButton
                                onClick={() => {
                                    handleAddTrack();
                                }}
                            >
                                <AddCircleOutlineIcon fontSize="large" style={{ color: 'green' }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <label>Tokens Required To Access</label>
                            <input
                                id="balance"
                                onChange={(e) => setBalance(e.target.value)}
                                className="form-control mb-3 mt-4"
                                type="number"
                                placeholder="ex. 100"
                            />
                        </Grid>
                        <Grid container direction="row">
                            <Grid item xs={9} alignItems={'center'} style={{ paddingTop: 35 }}>
                                <label>Upload Your Playlist Image</label>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    style={{ marginLeft: 20, marginTop: 31 }}
                                    component="label"
                                >
                                    UPLOAD
                                    <Input
                                        accept="image/*"
                                        id="image-upload"
                                        type="file"
                                        onChange={handleImageUpload}
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        {imageRender && (
                            <Grid container direction="column" alignItems="center" justify="center">
                                <Grid item xs={12} style={{ margin: 10 }}>
                                    <img src={imageRender} alt="playlist image " height="300" />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                    <Modal.Footer>
                        <button className="btn-gradiant m-1" onClick={uploadMp3}>
                            CREATE
                        </button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreatePlaylist;
