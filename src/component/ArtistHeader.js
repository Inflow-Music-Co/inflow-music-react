import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    btn: {
       borderColor: "#7932a8",
       
       backgroundColor: "black", 
       "&:hover": {
           borderColor: "#b84dff"
       },
    },

}));


const ArtistHeader = ({
    artist,
    requiredBalance,
    inflowGatedUrl,
    socialTokenAddress,
    encodedUrl,
    mp3RequiredBalance,
    mp3Url,
    mp3Id
}) => {

    const classes = useStyles();
        
    return (
        <div className="artist-main">
            <div className="background">
                <img
                    alt=""
                    src={
                        artist.banner_image
                            ? `${process.env.REACT_APP_SERVER_URL}/${artist.banner_image}`
                            : null
                    }
                    className="background-blur"
                />
            </div>
            <div className="artist-details">
                <div className="artist-main-details">
                        <img
                            alt=""
                            src={
                                artist.profile_image
                                    ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`
                                    : null
                            }
                        />
                    <div className="artist-content">
                        <div className="artist-content-details">
                            <div className="artist-name">{`${
                                artist.first_name ? artist.first_name : ''
                            } ${artist.last_name ? artist.last_name : ''}`}</div>
                            {/* <div className="album-name">--</div> */}
                            <ul>
                                <li>
                                    <div className="song-total">325</div>
                                    <div className="song-folder">Superfans</div>
                                </li>
                                <li>
                                    <div className="song-total">28</div>
                                    <div className="song-folder">NFTs</div>
                                </li>
                            </ul>
                        </div>
                        <div className="">
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                style={{ borderRadius: 30, boxShadow: '40px'}}
                            >
                                SUBSCRIBE
                            </Button>
                        </div>
                    </div>
                </div>
                <Grid container direction="row">
                    <Grid item container xs={6} style={{padding: 10, paddingLeft: 30}}>
                    <Grid item xs={2}>
                        {requiredBalance ? (
                            <Link
                                to={{
                                    pathname: `/${inflowGatedUrl}`,
                                    requiredBalance: requiredBalance,
                                    address: socialTokenAddress,
                                    encodedUrl: encodedUrl
                                }}
                            >
                                <Button
                                    className={classes.btn} 
                                    variant="outlined"
                                    style={{color: 'white', borderRadius: 15}}
                                    > 
                                    VIDEOS 
                                    </Button>
                            </Link>
                        ) : null}
                    </Grid>
                    <Grid item xs={2}>
                        {requiredBalance ? (
                            <Link
                                to={{
                                    pathname: `/mp3s/${artist._id}/${mp3Id}`,
                                    requiredBalance: mp3RequiredBalance, 
                                    address: socialTokenAddress,
                                    mp3Url,
                                    isPlaylist: false
                                }}
                            >
                                <Button
                                    className={classes.btn} 
                                    variant="outlined"
                                    color="secondary"
                                    style={{color: 'white', borderRadius: 15}}> 
                                    SINGLES 
                                    </Button>
                            </Link>
                        ) : null}
                    </Grid>
                    <Grid item xs={2}>
                        {requiredBalance ? (
                            <Link
                                to={{
                                    pathname: `/playlists/${artist._id}/${artist.mp3_playlists[0]._id}`,
                                    requiredBalance: artist.mp3_playlists[0].balance,
                                    address: socialTokenAddress,
                                    mp3Url : 'not a single mp3',
                                    isPlaylist : true
                                }}
                            >
                                <Button
                                    className={classes.btn} 
                                    variant="outlined"
                                    color="secondary"
                                    style={{color: 'white', borderRadius: 15}}
                                    > 
                                    MIXTAPES 
                                    </Button>
                            </Link>
                        ) : null}
                    </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ArtistHeader;
