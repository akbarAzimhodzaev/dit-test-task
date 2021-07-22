import { SET_FAVORITE, SET_FAVORITES } from "./types";

export const setFavoritesAction = (data) => {
  return {
    type: SET_FAVORITES,
    payload: data,
  };
};

export const setFavoriteAction = (id) => {
  return {
    type: SET_FAVORITE,
    payload: id,
  };
};
