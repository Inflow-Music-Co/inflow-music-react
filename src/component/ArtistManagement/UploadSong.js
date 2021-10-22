import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AddTrackField from './AddTrackField';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, updateArtistSingleMp3 } from '../../store/reducers/playlistSlice';
import { ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const UploadSong = ({ songUpload, setSongUpload, id}) => {
    const [mp3Uploaded, setMp3Uploaded] = useState(false);
    const playlist = useSelector((state) => state.playlist);
    const uploadProgress = useSelector((state) => state.playlist.uploadProgress);
    const [uploaded, setMp3Fileed] = useState(false);
    const [image, setImage] = useState({});
    const [imageRender, setImageRender] = useState('');
    const [mp3Name, setMp3Name] = useState('');
    const [mp3File, setMp3File] = useState('');
    const [uploadComplete, setUploadComplete] = useState(false);
    const [balance, setBalance] = useState();
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

    const handleImageUpload = (e) => {
        setImageRender(URL.createObjectURL(e.target.files[0]));
        dispatch(addImage(e.target.files[0]));
    };

    const uploadMp3 = async () => {
        console.log('upload Mp3 fired');
        
        if (!mp3File) {
            alert('please upload a valid .mp3 file');
        }  else {
            //ensures last field is added to store            
            const data = new FormData();

            data.append('file', mp3File)
            data.append('img', playlist.img);
            data.append('balance', balance);
            data.append('name', mp3Name);
            data.append('artist_id', id);

            //console log data
            for (var pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            dispatch(updateArtistSingleMp3(data));
        }
    };

    return (
        <div>
            <Modal
                show={songUpload}
                className="edit-profile-modal success"
                onHide={() => {
                    setSongUpload((songUpload) => !songUpload);
                }}
            >
                <Modal.Header>
                    <Grid container style={{ flexGrow: 1 }}>
                        <Grid item xs={12} style={{ paddingBottom: 30 }}>
                            <span className="login-title col-12"> upload your track</span>
                        </Grid>
                    </Grid>
                </Modal.Header>
                <Modal.Body>
                    <AddTrackField
                        setMp3Name={setMp3Name}
                        setMp3File={setMp3File}
                        uploaded={uploaded}
                    />
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
                                <label>Upload Your Track Image</label>
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
                            <button className="btn-gradiant m-1" onClick={uploadMp3}>
                                CREATE
                            </button>
                        </Grid>
                    </Grid>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default UploadSong
