import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setCorrectPassword } from '../store/reducers/passwordSlice';
import { useDispatch } from 'react-redux';
import { assetsImages } from '../constants/images';


const PasswordProtect = ({ setPasswordUpdated }) => {

    const [input, setInput] = useState('');

    const dispatch = useDispatch();
    
    const handlePassword = (e) => {
        setInput(e.target.value);
    };

    const checkPassword = () => {
        if (input === 'inflowgo') {
            dispatch(setCorrectPassword(true));
            setPasswordUpdated(true);
            
        } else {
            alert('wrong password');
        }
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
        <img alt="" src={assetsImages.homeLogo} className="logo-main-image-password"/>
            <Grid item xs={3} style={{ margin: 25 }}>                
            </Grid>
            <Grid item xs={3}>
                <Grid container direction="row">
                    <Grid item xs={10}>
                        <TextField
                            id="filled-basic"
                            label="password"
                            variant="filled"
                            size="small"
                            type="password"
                            style={{ backgroundColor: 'white', borderRadius: 10 }}
                            onChange={handlePassword}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ margin: 5 }}
                            onClick={checkPassword}
                        >
                            enter
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
                <Button 
                    variant="outlined" 
                        color="secondary"
                        size="large"
                        onClick={() => window.location.href = 'https://inflowsocial.io/'}     
                        style={{ margin: 50, color: 'white', borderRadius: 30 }}>
                    about
                </Button>
            </Grid>
        </Grid>
    );
};

export default PasswordProtect;
