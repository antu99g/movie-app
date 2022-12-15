import { combineReducers } from "redux";
import {
   ADD_MOVIES,
   ADD_FAVOURITE,
   REMOVE_FAVOURITE,
   SET_SHOW_FAVOURITE,
   ADD_SEARCH_RESULT,
   ADD_MOVIE_TO_LIST,
} from "../actions";

const initialMovieState = {
   list: [],
   favourites: []
}

export function movies(state = initialMovieState, action) {
   switch (action.type) {
      case ADD_MOVIES:
         return {
            ...state,
            list: action.movies,
         };
      case ADD_FAVOURITE:
         return {
            ...state,
            favourites: [action.movie, ...state.favourites],
         };
      case REMOVE_FAVOURITE:
         const newFavourits = state.favourites.filter(
            (movie) => movie.Title !== action.movie.Title
         );
         return {
            ...state,
            favourites: newFavourits,
         };
      case SET_SHOW_FAVOURITE:
         return {
            ...state,
            showFavourites: action.value,
         };
      case ADD_MOVIE_TO_LIST:
         return {
            ...state,
            list: [action.movie, ...state.list]
         };
      default:
         return state;
   }
} 



const initialSearchState = {
   result: {},
   showSearchResults: false
};

export function search(state = initialSearchState, action) {
   switch (action.type) {
      case ADD_SEARCH_RESULT:
         return {
            ...state,
            result: action.movie,
            showSearchResults: true,
         };
      case ADD_MOVIE_TO_LIST:
         return {
            ...state,
            showSearchResults: false,
         };
      default:
         return state;
   }
}


// const initialRootState = {
//    movies: initialMovieState,
//    search: initialSearchState
// }

// export function rootReducer (state = initialRootState, action) {
//    return {
//       movies: movies(state.movies, action),
//       search: search(state.search, action),
//    };
// }


export default combineReducers({
   movies,
   search
});