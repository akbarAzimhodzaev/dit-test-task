export default function Movie({ movie, view, handleMovieClick, setFavorite }) {
  let movieClasses = view === "grid" ? "col-6 col-sm-6 col-md-3" : "col-12";
  return (
    <div className={movieClasses}>
      {view === "grid" ? (
        <div className="movie">
          <div className="movie__img__wrapper">
            <img
              className="movie__img img-responsive"
              src={movie.img}
              alt={movie.name}
              onClick={() => handleMovieClick(movie.id)}
            />
          </div>
          <div className="movie__body">
            <h3
              className="movie__title"
              onClick={() => handleMovieClick(movie.id)}
            >
              {movie.name}
            </h3>
            <span className="movie__year">{movie.year}</span>
            <button
              className={`movie__fav ${movie.isFavorite ? "fav" : ""}`}
              onClick={() => {
                setFavorite(movie.id);
              }}
            >
              <i className={movie.isFavorite ? "star-filled" : "star"} />
            </button>
          </div>
        </div>
      ) : (
        <div className="movie grid-view row">
          <div className="col-3">
            <div className="movie__img__wrapper">
              <img
                className="movie__img img-responsive"
                src={movie.img}
                alt={movie.name}
                onClick={() => handleMovieClick(movie.id)}
              />
            </div>
          </div>
          <div className="col-9">
            <div className="movie__body">
              <h3
                className="movie__title"
                onClick={() => handleMovieClick(movie.id)}
              >
                {movie.name}
              </h3>
              <div className="movie__desc">{movie.description}</div>
              <span className="movie__year">{movie.year}</span>
              <button
                className={`movie__fav ${movie.isFavorite ? "fav" : ""}`}
                onClick={() => {
                  setFavorite(movie.id);
                }}
              >
                <i className={movie.isFavorite ? "star-filled" : "star"} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
