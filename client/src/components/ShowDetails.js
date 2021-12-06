import { fetchShowDetail } from '../services/FetchShowList'; 
import { useEffect, useState } from 'react'; 
import AddShowButton from './AddShowButton';

function ShowDetails({ id }) {
  const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [loading, setLoading] = useState(true); 
  const [details, setDetails] = useState({}); 

  async function getShowDetails(id) {
    setLoading(true);
    const details = await fetchShowDetail(id); 
    setDetails(details); 
  }

  useEffect(() => {
    getShowDetails(id); 
    setLoading(false); 
  }, [id]); 

  function renderShowCompletion(nextEp) {
    if (nextEp === null) {
      return (
        <>
          <i className="material-icons">check_circle_outline</i>Completed
        </>
      )
    } else {
      return (
        <>
          <i className="material-icons">pending</i>Ongoing
        </>
      )
    }
  }

  return (
    <div className='popup-content-container'>
      {loading ? <div>Loading</div> 
      : <>
        <div className='show-details-header'>
          <h2 className='title'>{details.name}</h2>
          <AddShowButton id={id} totalEps={details.number_of_episodes} />
        </div>
        <div className='details-body'>
          <img className='show-details-backdrop' src={POSTER_BASE_URL + details.backdrop_path} alt='backdrop'></img>

          <h3>Overview</h3>
          <p>{details.overview}</p>

          <h3>Status</h3>
          <p>{renderShowCompletion(details.next_episode_to_air)}</p>
          {details.next_episode_to_air ? <p>Next episode: {details.next_episode_to_air.episode_number}</p> : null}
          <p>Total Episodes: {details.number_of_episodes}</p>
          <p>Number of seasons: {details.number_of_seasons}</p>
        </div>
      </>
      }
      
      
    </div>
  );
}

export default ShowDetails;
