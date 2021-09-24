import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import '../page/LoginModal.css'

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
                <div className="d-flex flex-row justify-content-center align-items-center col-12">
                <span className="login-title col-12"> create your artist profile</span>
                </div>
            </Modal.Header>  
            <Modal.Body>
                <div className="mt-5 mb-0 pb-0 form-group">
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
        </Modal>    
        </div>
    )
}

export default CreateArtistModal
