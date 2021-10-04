import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Header from '../base/Header';
import Sidebar from '../base/Sidebar';

function ArtistRoute(props) {
    const token = useSelector((state) => state.auth.token);
    const isArtist = useSelector((state) => state.auth.isArtist);
    const history = useHistory();

    if (!token || !isArtist) {
        history.push('/');
        return;
    }

    return (
        <>
            <Header />
            <Sidebar />
            <div className="main-comman-wrapping">
                <Route {...props} />
            </div>
        </>
    );
}

export default ArtistRoute;
