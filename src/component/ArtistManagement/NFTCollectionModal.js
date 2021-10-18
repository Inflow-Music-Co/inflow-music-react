import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';

const NFTCollectionModal = ({ NFTCollection, setNFTCollection }) => {
    const [address, setAddress] = useState('')

    return (
        <div>
            <Modal
                show={NFTCollection}
                className="edit-profile-modal success"
                onHide={() => {
                    setNFTCollection((NFTCollection) => !NFTCollection);
                }}
            >
                <Modal.Header>
                    <Grid container style={{ flexGrow: 1 }}>
                        <Grid item xs={12} style={{ paddingBottom: 30 }}>
                            <span className="login-title col-12"> add your NFT collection</span>
                        </Grid>
                    </Grid>
                </Modal.Header>
                <Modal.Body>
                <label>Your Ethereum Address</label>
                            <div className="comman-row-input">
                                <input
                                    placeholder="your ethereum address"
                                    type="text"
                                    name="ethereum address" 
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                    <Modal.Footer>
                    <button className="btn-gradiant m-1" 
                        >
                                CREATE COLLECTION
                            </button>
                    
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
            
        </div>
    )
}

export default NFTCollectionModal
