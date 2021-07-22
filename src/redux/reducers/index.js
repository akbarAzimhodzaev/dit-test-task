import { combineReducers } from "redux";
import favoritesReducer from "./favoritesReducer";
import { moviesReducer } from "./moviesReducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
