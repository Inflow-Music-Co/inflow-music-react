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
import { ProgressBar } from 'react-bootstrap';
import { addMp3s, addImage, removeMp3, clearPlaylist } from '../../store/reducers/playlistSlice';
import { updateArtistPlaylists } from '../../store/reducers/playlistSlice';
import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const CreatePlaylist = ({ id, showPlaylistModal, setShowPlaylistModal}) => {
    const [mp3Uploaded, setMp3Uploaded] = useState(false);
    const playlist = useSelector((state) => state.playlist)
    const uploadProgress = useSelector((state) => state.playlist.uploadProgress);
    const [uploaded, setMp3Fileed] = useState(false);
    const [image, setImage] = useState({});
    const [imageRender, setImageRender] = useState('');
    const [mp3Name, setMp3Name] = useState('');
    const [mp3File, setMp3File] = useState('');
    const [addTrack, setAddTrack] = useState(false);
    const [playlistName, setPlaylistName] = useState('');
    const [balance, setBalance] = useState();
    const numberOfTracks = useRef(0);
    const [inputFields, setInputFields] = useState([]);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [progressBar, setProgressBar] = useState();
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        uploadComplete &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Audio Uploaded </p>,
                icon: 'success',
                html: <span style={{ color: 'white' }}>your gated content is now live</span>,
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setUploadComplete((uploadComplete) => !uploadComplete);
            });
    }, [uploadComplete]);

    useEffect(() => {
        setProgressBar(uploadProgress)
        if(uploadProgress == 100){
            console.log('is 100%')
            setUploadComplete(true);
        }
        console.log('useEffect fired')
    },[uploadProgress])

    useEffect(() => {
        dispatch(clearPlaylist());
    },[])
    
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

            dispatch(addMp3s({ name: mp3Name, file: mp3File, }));
                
            numberOfTracks.current += 1;
            setInputFields([...inputFields, numberOfTracks.current]);
        }
    };

    const handleRemoveTrack = () => {
        setInputFields(fields => fields.filter((element, index) => index !== fields.length -1 ));
        dispatch(removeMp3(numberOfTracks.current - 1));
    };

    const uploadPlaylist = async () => {
        if (!playlist) {
            alert('please upload a valid .mp3 file');
        }  else {
            //ensures last field is added to store
            dispatch(addMp3s({ name: mp3Name, file: mp3File }));
            
            const data = new FormData();

            playlist.data.forEach(entry => {
                data.append('files', entry.file)
                data.append('track_names', entry.name)
            });
            data.append('playlist_name', playlistName);
            data.append('img', playlist.img);
            data.append('balance', balance);
            data.append('artist_id', id);
            

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
                {inputFields.map((data, index) => (
                    <AddTrackField
                        setMp3Name={setMp3Name}
                        setMp3File={setMp3File}
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
                        <Grid container direction="column" >
                        {uploadProgress && <Grid item xs={12}>
                            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                        </Grid>}
                        <Grid item xs={12} style={{paddingLeft: 75, margin: 10}}>
                            <button className="btn-gradiant m-1" onClick={uploadPlaylist}>
                                CREATE
                            </button>
                        </Grid>
                    </Grid>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreatePlaylist;
