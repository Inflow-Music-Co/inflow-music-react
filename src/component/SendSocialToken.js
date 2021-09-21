import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
    btn: {
     borderRadius: 10,
     width: '200px',
     height: '36px' 
    },
    select: {
        backgroundColor: '#606060',
        borderRadius: 5,
        width: '200px',
        height: '45px',
         

    },
    textField: {
        backgroundColor: '#606060',
        borderRadius: 5,
        width: '200px',
        height: '45px' 
    }
});

const SendSocialToken = ({ tokenSymbols }) => {

    console.log({ tokenSymbols });

    const classes = useStyles();
    const [age, setAge] = React.useState('');
    
    const handleChange = (event) => {
    setAge(event.target.value);
    };

    return (
        <Grid container spacing ={3} direction="row" justify="left">
            <Grid container item xs={6} direction="row">
                social token
            </Grid>
            <Grid container item xs={6} direction="row">
                amount to send
            </Grid>
            <Grid className={classes.btn} item xs={4} style={{textAlign: "center"}}>
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
            </Grid>
            <Grid container item xs={4}>
                <form className={classes.root} noValidate autoComplete="off">
                <TextField className={classes.textField} id="outlined-basic" label="amount" variant="outlined" />
                </form>
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="secondary" size="large">
                SEND
                </Button>
            </Grid>
        </Grid>
    )
}

export default SendSocialToken
