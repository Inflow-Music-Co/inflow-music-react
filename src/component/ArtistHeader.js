import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

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
                    <div className="artis-img mb-0">
                        <img
                            alt=""
                            src={
                                artist.profile_image
                                    ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`
                                    : null
                            }
                        />
                    </div>
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
                                style={{ borderRadius: 30, boxShadow: '40px' }}
                            >
                                SUBSCRIBE
                            </Button>
                        </div>
                    </div>
                </div>
                <Grid container direction="row">
                    <Grid item xs={2}>
                    <div className="artist-tag">
                        {requiredBalance ? (
                            <Link
                                to={{
                                    pathname: `/${inflowGatedUrl}`,
                                    requiredBalance: requiredBalance,
                                    address: socialTokenAddress,
                                    encodedUrl: encodedUrl
                                }}
                            >
                                <button className="tag-button"> UNRELEASED VIDEOS </button>
                            </Link>
                        ) : null}
                    </div>
                    </Grid>
                    <Grid item xs={2}>
                    <div className="artist-tag">
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
                                <button className="tag-button"> UNRELEASED TRACK </button>
                            </Link>
                        ) : null}
                    </div>
                    </Grid>
                    <Grid item xs={1}>
                    <div className="artist-tag">
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
                                <button className="tag-button"> UNRELEASED MIXTAPE </button>
                            </Link>
                        ) : null}
                    </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ArtistHeader;
