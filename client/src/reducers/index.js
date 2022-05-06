import { combineReducers } from "redux";

import movies from './movies';
import cast from './cast';
import earnings from './earnings';
import extendedCast from './extendedCast';
import CDW from './CDW';
import awards from './movieAwards';
import reviews from './reviews';
import watchlist from './watchlist';
import sgenrel1 from './sgenrel1';
import sgenrel2 from './sgenrel2';
import sgenrel3 from './sgenrel3';
import fmovieReducer from './featuredMovie';

export default combineReducers({ movies, cast, earnings, extendedCast, CDW, awards, reviews, watchlist, fmovieReducer, sgenrel1, sgenrel2, sgenrel3 });