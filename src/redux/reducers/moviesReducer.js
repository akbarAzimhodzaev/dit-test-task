import { END_LOADING, SET_MOVIES, START_LOADING } from "../actions/types";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case START_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case END_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
