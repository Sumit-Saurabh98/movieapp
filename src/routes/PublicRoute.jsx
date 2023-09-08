import React from 'react';
import {Routes, Route} from "react-router-dom"
import Homepage from "../pages/Homepage"
import Authentication from '../pages/Authentication';
import Favorite from '../pages/Favorite';
import Watchlist from '../pages/Watchlist';
import PrivateRoute from './PrivateRoute';
import MovieDetails from '../pages/MovieDetails';
function PublicRoute(props) {
    return (
        <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/:id' element={<MovieDetails/>} />
            <Route path='/authentication' element={<Authentication/>} />
            <Route path='/favorite' element={<PrivateRoute><Favorite/></PrivateRoute>} />
            <Route path='/watchlist' element={<PrivateRoute><Watchlist/></PrivateRoute>} />
        </Routes>
    );
}

export default PublicRoute;