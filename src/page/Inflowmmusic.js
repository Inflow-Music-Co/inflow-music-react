/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Banner from '../component/Banner';
import Artistpic from '../component/Artistpic';
import Song from '../component/Song';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Loader from '../component/Loader';
import { assetsImages } from "../constants/images";

const Inflowmusic = () => {
    const [artists, setArtists] = useState();
    const [loading, setloading] = useState(false);
    const [imagesUrl, setImagesUrl] = useState();

    useEffect(() => {
        getArtists();
    }, [])

    const getArtists = async () => {
        try {
            setloading(true)
            const { data } = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/v1/artist/getall`)
            setArtists(data.artists)
            setloading(false);
        } catch (e) {
            setloading(false);
        }
    }

    const displayArtists = () => {
        if (artists && artists.length > 0) {
            return artists.map((artist, i) => {
                if(artist.status !== 'pending' && artist.has_activated === true){
                    return (<Link to={`/artist/${artist._id}`} key={i}>
                    <Artistpic imglink={`${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`} name={`${artist.first_name}`} />
                    </Link>)
                }
            });
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="Inflow-music-main">
            <Banner />
            <div className="dashboard-wrapper-main inner-music-wrapper">
                <div className="artist-heading">Featured Artists</div>
                <div className="grid-for-artist">
                    {artists ? displayArtists() : null}
                </div>
                <div className="see-all-artist">
                    <a href="#">See All Artists</a>
                </div>
                {/* <div className="artist-heading">NFT Drops</div>
                <div className="songs-grid-main">
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                </div>
                <div className="see-all-artist see-all-nft">
                    <a href="#">See All NFTs</a>
                </div> */}
            </div>
        </div>
    );
}

export default Inflowmusic;
