import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import History from './History';
import Mydashboard from '../page/Mydashboard';
import Inflowmusic from '../page/Inflowmmusic';
// import DemoPage from '../page/DemoPage';
import AddAdmin from '../page/AddAdmin';
import News from '../page/News';
import Leaderboard from '../page/Leaderboard';
import Accountsettings from '../page/Accountsettings';
import Login from '../page/Login';
import Labels from '../page/Labels';
import LabelArtists from '../page/LabelArtists';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import AdminRoutes from './AdminRoutes';
import ArtistRoutes from './ArtistRoutes';
// import Artistpic from '../component/Artistpic';
import Artist from '../component/Artist';
import Artistmanagement from '../component/Artistmanagement';
import CreateSocialToken from '../page/CreateSocialToken';
import GetMintPrice from '../page/GetMintPrice';
import MintUSDC from '../component/MintUSDC';
import AllArtists from '../page/AllArtists';
import ManageLabels from '../page/ManageLabels';
import ManageLabelArtists from '../page/ManageLabelArtists';
import Createcollectible from '../component/Createcollectible';
import Collectible from '../component/Collectible';
import AdminPanel from '../page/AdminPanel';
import ResetPassword from '../page/ResetPassword'
import VerfiyEmail from '../page/VerifyEmail'
import LoginModal from '../page/LoginModal';

export const AppRoutes = () => {
    
    return (
        <Switch>
            <PublicRoutes path="/login" component={Login} exact />
            <PublicRoutes path="/auth/resetpassword" component={ResetPassword} />
            <PublicRoutes path="/auth/verifyemail" component={VerfiyEmail} />
            <PublicRoutes path="/collectible/:collectibleId" component={Collectible} />
            <PublicRoutes path="/" component={Inflowmusic} exact />
            <AdminRoutes path="/artistonboarding" component={CreateSocialToken} exact />
            <Route path="/getmintprice" component={GetMintPrice} exact />
            <Route path="/mintusdc" component={MintUSDC} exact />
            <AdminRoutes path="/adminpanel" component={AdminPanel} exact />
            <AdminRoutes path="/addadmin" component={AddAdmin} exact />
            <AdminRoutes path="/allartists" component={AllArtists} exact />
            <AdminRoutes path="/managelabels" component={ManageLabels} exact />
            <AdminRoutes path="/managelabelartists/:labelid" component={ManageLabelArtists} exact />
            {/* <ArtistRoutes
                path="/artistmanage"
                component={Artistmanagement}
                exact
            /> */}
            <ArtistRoutes
                path="/artistmanage"
                component={Artistmanagement}
                exact />
            <PublicRoutes
                path="/createcollectible/:quantity"
                component={Createcollectible}
                exact />
            <PrivateRoutes path="/dashboard" component={Mydashboard} exact />
            <PublicRoutes path="/news" component={News} exact />
            <PublicRoutes path="/leaderboard" component={Leaderboard} exact />
            <PrivateRoutes
                path="/accountsettings"
                component={Accountsettings}
                exact />
            <PublicRoutes path="/labels" component={Labels} exact />
            <PublicRoutes path="/labels/:labelid" component={LabelArtists} exact />
            <PublicRoutes path="/artist/:id" component={Artist} exact />
            <PublicRoutes path="/artist" component={Artist} exact />
            {/* <PrivateRoutes path="/demo" component={DemoPage} exact />
            <PrivateRoutes path="/login" component={Login} exact /> */}
        </Switch>
    );
};

// <Route path="/" component={Mydashboard} exact />
//       <Route path="/inflowmusic" component={Inflowmusic} exact />
//       <Route path="/news" component={News} exact />
//       <Route path="/leaderboard" component={Leaderboard} exact />
//       <Route path="/accountsettings" component={Accountsettings} exact />
//       <Route path='/labels' component={Labels} exact />
//       <Route path='/rocnations' component={Rocnations} exact />
//       <Route path="/demo" component={DemoPage} exact />
//       <Route path="/login" component={Login} exact />