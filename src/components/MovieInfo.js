const MovieInfo = ({ movie, setFavorite }) => {
  return (
    <div className="row movie__info">
      <div className="col-md-4">
        <img
          className="movie__modal__img img-responsive"
          src={movie.img}
          alt={movie.name}
        />
      </div>
      <div className="col-md-8 movie__info__body">
        <button
          className={`movie__fav ${movie.isFavorite ? "fav" : ""}`}
          onClick={() => {
            setFavorite(movie.id);
          }}
        >
          <i className={movie.isFavorite ? "star-filled" : "star"} />
        </button>
        <h2>{movie.name}</h2>

        <div className="movie__description">{movie.description}</div>
      </div>

      <hr />

      <div className="col-md-12">
        <div className="movie__info">Release Year: {movie.year}</div>
        <div className="movie__genres">
          <span>Genres: </span>
          {movie.genres.map((genre, idx) => (
            <span key={idx} className="badge bg-secondary">
              {genre}
            </span>
          ))}
        </div>
        <div className="movie__director">
          <span>Director: </span>
          {movie.director}
        </div>
        <div className="movie__starring">
          <span>Starring: </span>
          {movie.starring.map((star, idx) => (
            <a
              key={idx}
              href={`https://www.biography.com/search?query=${star}`}
              target="_blank"
              rel="noreferrer"
            >
              {star}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
