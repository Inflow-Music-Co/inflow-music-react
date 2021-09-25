import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import '../page/LoginModal.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TwitterIcon from '@mui/icons-material/Twitter';

const CreateArtistModal = ({ createArtistAccount, setCreateArtistAccount }) => {

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
                        placeholder="your social token name"
                        type="text"
                        name="social token name"
                        />
                    </div>
                    <div className="comman-row-input">
                        <input
                        placeholder="artist name"
                        type="text"
                        name="artist name"
                        />
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="comman-row-input">
                        <input
                        placeholder="your social symbol"
                        type="text"
                        name="social token name"
                        />
                    </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn-gradiant m-1">
                    CREATE
                </button>
            </Modal.Footer>
        </Modal>    
        </div>
    )
}

export default CreateArtistModal
