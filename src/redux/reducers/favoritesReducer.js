import { SET_FAVORITE, SET_FAVORITES } from "../actions/types";

const initialState = {
  data: [],
};

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case SET_FAVORITE: {
      // receives only movie ID, if ID is in the list - removes it, else adds it to the list
      let favList = state.data.includes(action.payload)
        ? state.data.filter((id) => id !== action.payload)
        : [...state.data, action.payload];
      return {
        ...state,
        data: favList,
      };
    }
    default:
      return state;
  }
}
