import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setCorrectPassword } from '../store/reducers/passwordSlice';
import { useDispatch } from 'react-redux';


const PasswordProtect = ({ setPasswordUpdated }) => {

    const [input, setInput] = useState('');

    const dispatch = useDispatch();
    
    const handlePassword = (e) => {
        setInput(e.target.value);
    };

    const checkPassword = () => {
        if (input === 'br3aK!inGChang£s') {
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
            <Grid item xs={3} style={{ margin: 25 }}>
                <h2 className="headings">INFLOW MUSIC</h2>
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
                <Button variant="outlined" color="primary" style={{ margin: 50, color: 'white' }}>
                    about
                </Button>
            </Grid>
        </Grid>
    );
};

export default PasswordProtect;
