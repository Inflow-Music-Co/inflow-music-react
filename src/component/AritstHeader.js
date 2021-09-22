import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'

const AritstHeader = ({ artist, requiredBalance, inflowGatedUrl, socialTokenAddress, encodedUrl}) => {
    
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
                  artist.first_name ? artist.first_name : ""
                } ${artist.last_name ? artist.last_name : ""}`}</div>
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
                  style={{borderRadius: 30, boxShadow: '40px'}}>
                SUBSCRIBE
                </Button>
              </div>
            </div>
          </div>
          <div className="artist-tag">
          {requiredBalance ?
            <Link to={
              {
                pathname: `/${inflowGatedUrl}`,
                requiredBalance : requiredBalance,
                address : socialTokenAddress,
                encodedUrl : encodedUrl 
              }
              }>
            <button
              className="tag-button"
            >
              UNRELEASED MUSIC VIDEO{" "}
            </button>
            </Link> : null}
          </div>
        </div>
      </div>
    )
}

export default AritstHeader
