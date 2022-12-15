import React from 'react';
import {data} from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite } from '../actions';
import {connect} from '../';

class App extends React.Component {
   componentDidMount(){
      // make api call
      // dispatch an action
      this.props.dispatch(addMovies(data));
   }

   isMovieFavourite = (movie) =>  {
      const {movies} = this.props;

      const index = movies.favourites.indexOf(movie);

      if(index !== -1){
         // found the movie
         return true;
      }

      return false;
   }

   onChangeTab = (value) => {
      this.props.dispatch(setShowFavourite(value));
   }

   render(){
      const { movies, search } = this.props; // { movies: {}, search: {} }
      const { list, favourites, showFavourites } = movies;

      const displayMovies = showFavourites ? favourites : list;

      return (
         <div className="App">
            <Navbar store={this.props.store} search={search} />
            <div className="main">
               <div className="tabs">
                  <div
                     className={`tab ${showFavourites ? "" : "active-tabs"}`}
                     onClick={() => this.onChangeTab(false)}
                  >
                     Movies
                  </div>
                  <div
                     className={`tab ${showFavourites ? "active-tabs" : ""}`}
                     onClick={() => this.onChangeTab(true)}
                  >
                     Favourites
                  </div>
               </div>

               <div className="list">
                  {displayMovies.map((movie, index) => (
                     <MovieCard
                        movie={movie}
                        key={`movies-${index}`}
                        dispatch={this.props.store.dispatch}
                        isFavourite={this.isMovieFavourite(movie)}
                     />
                  ))}
               </div>

               {displayMovies.length === 0 ? (
                  <h1
                     style={{
                        textAlign: "center",
                        color: "grey",
                        marginTop: 100,
                     }}
                  >
                     No movies to display!
                  </h1>
               ) : null}
            </div>
         </div>
      );
   }
}


function mapStateToProps (state) {
   return {
      movies: state.movies,
      search: state.movies
   };
}

const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
