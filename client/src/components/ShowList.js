import { useState, useEffect } from 'react'; 
import ShowListItem from './ShowListItem';
import { fetchShowList } from '../services/FetchShowList';  
import Popup from './Popup'; 
import ShowDetails from './ShowDetails'; 

function ShowList() {
  const [pages, setPages] = useState(1); 
  const [shows, setShows] = useState([]);
  const [showId, setShowId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false); 

  function renderShow(show) {
    return (
      <ShowListItem key={show.id} show={show} setIsOpen={setDetailsOpen} setShowId={setShowId} />
    )
  }

  async function getShows(page) {
    const list = await fetchShowList(page);
    setShows(list);
  }

  useEffect(() => {
    getShows(pages); 
  }, []); 

  return (
    <div className='show-list'>
      <h2>Popular:</h2>
      {(shows.map(show => renderShow(show)))}
      {detailsOpen ? 
        <Popup setIsOpen={setDetailsOpen}>
          <ShowDetails id={showId} />
        </Popup> 
        : null}
    </div>
  );
}

export default ShowList;