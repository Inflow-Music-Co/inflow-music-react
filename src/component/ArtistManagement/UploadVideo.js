import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import AddVideoField from './AddVideoField';
import { useDispatch, useSelector } from 'react-redux';
import { createArtistVideo } from '../../store/reducers/videoSlice';
import { ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import React from 'react'

const UploadVideo = ({ videoUpload, setVideoUpload, id }) => {

    const playlist = useSelector((state) => state.video);
    const uploadProgress = useSelector((state) => state.video.uploadProgress);
    const [balance, setBalance] = useState();
    const [mp4Name, setMp4Name] = useState('');
    const [mp4File, setMp4File] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [imageRender, setImageRender] = useState('');
    const [uploadComplete, setUploadComplete] = useState(false)
    const dispatch = useDispatch();
    const MySwal = withReactContent(Swal);


    useEffect(() => {
        uploadComplete &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Video Uploaded </p>,
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

    const uploadMp4 = async () => {        
        if (!mp4File) {
            alert('please upload a valid .mp3 file');
        }  else {
            //ensures last field is added to store            
            const data = new FormData();

            data.append('file', mp4File);
            data.append('balance', balance);
            data.append('name', mp4Name);
            data.append('artist_id', id);

            //console log data
            for (var pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }

            dispatch(createArtistVideo(data));
        }
    };

    return (
        <div>
            <Modal
                show={videoUpload}
                className="edit-profile-modal success"
                onHide={() => {
                    setVideoUpload((videoUpload) => !videoUpload);
                }}
            >
                <Modal.Header>
                    <Grid container style={{ flexGrow: 1 }}>
                        <Grid item xs={12} style={{ paddingBottom: 30 }}>
                            <span className="login-title col-12"> upload your video</span>
                        </Grid>
                    </Grid>
                </Modal.Header>
                <Modal.Body>
                    <AddVideoField
                        setMp4Name={setMp4Name}
                        setMp4File={setMp4File}
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
                        
                    </Grid>
                    <Modal.Footer>
                    <Grid container direction="column" >
                        {uploadProgress && <Grid item xs={12}>
                            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                        </Grid>}
                        <Grid item xs={12} style={{paddingLeft: 75, margin: 10}}>
                            <button className="btn-gradiant m-1" onClick={uploadMp4}>
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

export default UploadVideo
