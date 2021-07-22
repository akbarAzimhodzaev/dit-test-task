import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavoriteAction,
  setFavoritesAction,
} from "../redux/actions/favoritesReducer";
import { getMoviesAsync } from "../redux/actions/moviesActions";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Movie from "./Movie";
import MovieInfo from "./MovieInfo";

export default function MoviesList() {
  let dispatch = useDispatch();

  let { data: movies, loading, error } = useSelector((state) => state.movies);
  let { data: favorites } = useSelector((state) => state.favorites);

  const [modal, setModal] = useState(false);
  const [view, setView] = useState("grid");
  const [filter, setFilter] = useState("All genres");
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [filteredMovies, setFilteredMovies] = useState([]);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    dispatch(getMoviesAsync());
  }, [dispatch]);

  useEffect(() => {
    let _genres = movies.reduce(
      (acc, el) => [...acc, ...el.genres],
      ["All genres"]
    );
    setGenres([...new Set(_genres)]);
    setFilteredMovies(movies);
  }, [movies]);

  useEffect(() => {
    let initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(setFavoritesAction(initialFavorites));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));

    if (selectedMovie.hasOwnProperty("id")) {
      let [_selected] = movies.filter((m) => m.id === selectedMovie.id);

      _selected = {
        ..._selected,
        isFavorite: favorites.includes(_selected.id),
      };

      setSelectedMovie(_selected);
    }
  }, [favorites]);

  useEffect(() => {
    setFilteredMovies(() => {
      let _filtered = movies.filter((movie) => {
        if (filter === "All genres") return true;
        return movie.genres.includes(filter);
      });

      _filtered = _filtered.map((movie) => ({
        ...movie,
        isFavorite: favorites.includes(movie.id),
      }));

      return _filtered;
    });
  }, [filter, favorites, movies]);

  const handleMovieClick = (id) => {
    let [_selected] = movies.filter((m) => m.id === id);

    _selected = {
      ..._selected,
      isFavorite: favorites.includes(_selected.id),
    };

    setSelectedMovie(_selected);
    toggle();
  };

  const setFavorite = (id) => {
    dispatch(setFavoriteAction(id));
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="container movies__list mt-3">
      {error && <div className="alert alert-danger">Something went wrong!</div>}
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-9">
              <h1>Movies Gallery</h1>
              <div className="row filters">
                <div className="col-lg-4 filters__counter">
                  {filteredMovies.length} movies in the list
                </div>
                <div className="col-lg-4 col-sm-6">
                  Filter by Genre
                  <select onChange={handleChange}>
                    {genres.map((g, i) => (
                      <option value={g} key={i}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-4 col-sm-6 text-end">
                  <span>View: </span>
                  <div className="btn-group view__btn-group">
                    <button
                      type="button"
                      className={`${
                        view === "grid" ? "active" : ""
                      } btn btn-light`}
                      onClick={() => {
                        setView("grid");
                      }}
                    >
                      <i className="grid" />
                    </button>
                    <button
                      type="button"
                      className={`${
                        view === "list" ? "active" : ""
                      } btn btn-light`}
                      onClick={() => {
                        setView("list");
                      }}
                    >
                      <i className="list" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                {filteredMovies.map((movie) => (
                  <Movie
                    key={movie.id}
                    handleMovieClick={handleMovieClick}
                    setFavorite={setFavorite}
                    movie={movie}
                    view={view}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-3 sidebar">
              <h3>Favorites List</h3>
              {favorites.length === 0 ? (
                <span className="badge bg-danger">List is empty</span>
              ) : (
                <ul className="list-group">
                  {movies.map((movie) => {
                    if (!favorites.includes(movie.id)) return false;
                    return (
                      <li
                        key={movie.id}
                        className="list-group-item"
                        onClick={() => {
                          handleMovieClick(movie.id);
                        }}
                      >
                        {movie.name}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <Modal isOpen={modal} toggle={toggle} className="modal-lg">
            <ModalHeader toggle={toggle}>{selectedMovie.name}</ModalHeader>
            <ModalBody>
              <MovieInfo movie={selectedMovie} setFavorite={setFavorite} />
            </ModalBody>
          </Modal>
        </>
      )}
    </div>
  );
}
