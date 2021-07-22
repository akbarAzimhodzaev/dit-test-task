import { END_LOADING, SET_MOVIES, START_LOADING } from "./types";
import { MOVIES_ENDPOINT } from "../../constants/endpoints";

export const setMoviesAction = (data) => {
  return {
    type: SET_MOVIES,
    payload: data,
  };
};

export const startLoadingAction = () => {
  return {
    type: START_LOADING,
  };
};

export const endLoadingAction = () => {
  return {
    type: END_LOADING,
  };
};

export const getMoviesAsync = () => async (dispatch) => {
  dispatch(startLoadingAction());

  let res = await fetch(MOVIES_ENDPOINT);
  let data = await res.json();
  dispatch(setMoviesAction(data));

  dispatch(endLoadingAction());
};
