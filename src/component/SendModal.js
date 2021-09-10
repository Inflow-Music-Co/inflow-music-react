import React from 'react'
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    select: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '200px',
        height: '45px',
         

    }
});

const SendModal = ({ tokenSymbols, send, setSend }) => {

    const classes = useStyles();

    const handleChange = () => {

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
                    onChange={handleChange}
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
                        />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
        
                <Modal.Footer>
                  <Button variant="contained" color="secondary" size="large">
                        Send Transaction
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
    )
}

export default SendModal
