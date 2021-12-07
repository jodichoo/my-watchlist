function ShowListItem({ show, setIsOpen, setShowId }) {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original/";
  const { id, name, vote_average, overview, poster_path } = show; 

  function openShowDetails(show) {
    setShowId(id); 
    setIsOpen(true);
  }

  return (
    <div className='show-container' onClick={openShowDetails}>
      <div className='show-preview-left'>
        <div className='show-preview-poster-container'>
          <img className='show-preview-poster' src={poster_path ? POSTER_BASE_URL + poster_path : null} alt='poster'></img>
        </div>
        <div className='show-preview-text'>
          <h1>{name}</h1>
          <p>{overview}</p>
        </div>
      </div>
      <div className='show-preview-right'>
        <div className='show-preview-rating'>
          <i className="material-icons">star</i>
          {vote_average}
        </div>
      </div>
    </div>
  );
}

export default ShowListItem; 