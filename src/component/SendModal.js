import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import SmallLoader from './SmallLoader';
import MenuItem from '@material-ui/core/MenuItem';
import { Contract, ethers } from 'ethers';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import SocialToken from '../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json';
import usdc from '../artifacts/contracts/token/erc20/usdc.json';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import { POLYGON_USDC } from '../utils/addresses';
import { POLYGON_USDC_PROXY } from '../utils/addresses';
import withReactContent from 'sweetalert2-react-content';

const useStyles = makeStyles({
    select: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '200px',
        height: '45px'
    }
});

const SendModal = ({
    provider,
    tokenMappings,
    tokenSymbols,
    send,
    setSend,
    getTokensBalAndPrice,
    addedUsdc,
    setAddedUsdc
}) => {
    const MySwal = withReactContent(Swal);
    const [addresses, setAddresses] = useState([]);
    const [tokenToSend, setTokenToSend] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [loading, setLoading] = useState(false);
    const [successTransfer, setSuccessTransfer] = useState(false);
    const [error, setError] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        addUsdc();
    }, []);

    useEffect(() => {
        successTransfer &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Transaction Successfull</p>,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setSuccessTransfer((successTransfer) => !successTransfer);
            });
        error &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Error Sending Transaction</p>,
                icon: 'error',
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setError((error) => !error);
            });
    }, [successTransfer, error]);

    const addUsdc = () => {
        if (!addedUsdc) {
            tokenMappings.push({ address: POLYGON_USDC, symbol: 'USDC' });
            setAddedUsdc(true);
        }
    };

    const sendTransaction = async () => {
        if (!provider) {
            alert('Please log in');
            return;
        } else {
            try {
                setLoading(true);
                let amount;
                const signer = provider.getSigner();
                const contract = new ethers.Contract(tokenToSend, usdc, signer);

                if (tokenToSend === POLYGON_USDC) {
                    console.log('token is USDC');
                    amount = ethers.utils.parseUnits(amountToSend, 6);
                    const transaction = await contract.transfer(recipientAddress, amount, {
                        gasLimit: 250000
                    });
                    await transaction.wait();
                } else {
                    console.log('token is social token');
                    amount = ethers.utils.parseUnits(amountToSend);
                    const transaction = await contract.transfer(recipientAddress, amount, {
                        gasLimit: 250000
                    });
                    await transaction.wait();
                }
                setLoading(false);
                setSuccessTransfer(true);
                getTokensBalAndPrice();
            } catch (error) {
                console.log(error);
                alert(error);
                setError(true);
            }
        }
    };

    console.log(tokenMappings);

    return (
        <>
            <Modal show={send} className="edit-profile-modal" onHide={() => setSend(false)}>
                <Modal.Header></Modal.Header>
                <Modal.Body>
                    <Select
                        className={classes.select}
                        label="social token"
                        labelId="simple-select-outlined-label"
                        id="simple-select-outlined"
                        onChange={(e) => setTokenToSend(e.target.value)}
                        style={{ minWidth: 150 }}
                        disableUnderline
                        variant="filled"
                    >
                        {addedUsdc
                            ? tokenMappings.map((pair, index) => {
                                  return (
                                      <MenuItem value={pair.address} key={index}>
                                          {pair.symbol}
                                      </MenuItem>
                                  );
                              })
                            : null}
                    </Select>
                    <div className="mt-5 mb-0 pb-0 form-group">
                        <div className="col-12">
                            <div className="comman-row-input ">
                                <input
                                    placeholder="address"
                                    type="text"
                                    name="address"
                                    onChange={(e) => setRecipientAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 mb-0 pb-0 form-group">
                        <div className="col-12">
                            <div className="comman-row-input ">
                                <input
                                    placeholder="amount"
                                    type="number"
                                    name="address"
                                    onChange={(e) => setAmountToSend(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <SmallLoader />
                        </div>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={sendTransaction}
                        >
                            Send Transaction
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SendModal;
