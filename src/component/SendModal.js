import { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import SmallLoader from "./SmallLoader";
import MenuItem from '@material-ui/core/MenuItem'
import { Contract, ethers } from "ethers";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import SocialToken from "../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const useStyles = makeStyles({
    select: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '200px',
        height: '45px',
         

    }
});

const SendModal = ({ provider, tokenMappings, tokenSymbols, send, setSend, getTokensBalAndPrice }) => {
    
    const MySwal = withReactContent(Swal);
    const [tokenToSend, setTokenToSend] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [loading, setLoading] = useState(false);
    const [successTransfer, setSuccessTransfer] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        successTransfer &&
          MySwal.fire({
            title: <p style={{ color: "white" }}>Transaction Successfull</p>,
            icon: "success",
            customClass: {
              confirmButton: "btn-gradiant",
            },
            buttonsStyling: false,
            background: "#303030",
          }).then(() => {
            setSuccessTransfer((successTransfer) => !successTransfer);
          });
          error && MySwal.fire({
              title: <p style={{ color: "white" }}>Error Sending Transaction</p>,
              icon: "error",
              customClass: {
                confirmButton: "btn-gradiant",
              },
              buttonsStyling: false,
              background: "#303030",
            }).then(() => {
              setError((error) => !error);
            });
      }, [successTransfer, error]);

    const classes = useStyles();

    const sendTransaction = async () => {
        if (!provider) {
            alert("Please log in");
            return;
        } else {
            try {
                console.log({ tokenMappings })
                let tokenAddress = tokenMappings.filter(key => key.name === tokenToSend)
                tokenAddress = tokenAddress[0].address
                console.log('tokenAddress', tokenAddress)
                const signer = provider.getSigner();
                const amount = ethers.utils.parseUnits(amountToSend);
                const contract = new ethers.Contract(tokenAddress, SocialToken.abi, signer);
                setLoading(true);
                const transaction = await contract.transfer(recipientAddress, amount);  
                await transaction.wait();
                console.log(transaction);
                setLoading(false);
                setSuccessTransfer(true);
                getTokensBalAndPrice();
            } catch (error) {
                alert(error)
                setError(true)
            }  
          }    
    }

    return (
            <>
              <Modal
                show={send}
                className="edit-profile-modal"
                onHide={() => setSend(false) }
              >
                <Modal.Header>
                </Modal.Header>
                <Modal.Body>
                <Select
                    className={classes.select} 
                    label="social token"
                    labelId="simple-select-outlined-label"
                    id="simple-select-outlined"
                    onChange={(e) => setTokenToSend(e.target.value)}
                    style={{minWidth: 150}}
                    disableUnderline
                    variant="filled">
                    {tokenSymbols.map((symbol, index) => {
                        return <MenuItem value={symbol} key={index}>{symbol}</MenuItem>
                    })}
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
                {loading ? 
                    <div className="d-flex justify-content-center align-items-center flex-column">
                    <SmallLoader />
                    </div> : <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    onClick={sendTransaction}>
                        Send Transaction
                  </Button>}
                  
                </Modal.Footer>
              </Modal>
            </>
    )
}

export default SendModal
