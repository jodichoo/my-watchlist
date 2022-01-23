import { useState, useEffect } from "react";
import ShowListItem from "./ShowListItem";
import { fetchSearchResults, fetchShowList } from "../services/FetchShowList";
import Popup from "./Popup";
import ShowDetails from "./ShowDetails";
import LoadMoreButton from "./LoadMoreButton";
import Searchbar from "./Searchbar";
import Navbar from "./Navbar";

function ShowList() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [shows, setShows] = useState([]);
  const [results, setResults] = useState([]); 
  const [showId, setShowId] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  async function searchShows(query) {
    setLoading(true);
    setIsSearch(true);
    const searchResults = await fetchSearchResults(query);
    setLoading(false);
    setResults(searchResults);
  }

  function renderShow(show) {
    return (
      <ShowListItem
        key={show.id}
        show={show}
        setIsOpen={setDetailsOpen}
        setShowId={setShowId}
      />
    );
  }

  function displayList() {
    if (isSearch) {
      return results.map(renderShow)
    } else {
      return shows.map(renderShow); 
    }
  }

  async function getShows(page) {
    const list = await fetchShowList(page);
    setLoading(false);
    setShows(list);
  }

  async function loadMore() {
    const moreShows = await fetchShowList(pages + 1);
    setShows((list) => [...list, ...moreShows]);
    setPages(pages + 1);
  }

  useEffect(() => {
    getShows(pages);
  }, []);

  return (
    <>
      {loading ? (
        <div className="show-list">Loading...</div>
      ) : (
        <div className="show-list">
          {isSearch && (
            <div className="back" onClick={() => setIsSearch(false)}>
              <i className="material-icons">arrow_back</i>Back to popular
            </div>
          )}
          
          <Searchbar searchShows={searchShows} />
          <h2>{isSearch ? "Search Results:" : "Popular:"}</h2>

          {displayList()}

          {detailsOpen ? (
            <Popup setIsOpen={setDetailsOpen}>
              <ShowDetails id={showId} />
            </Popup>
          ) : null}

          {isSearch || <LoadMoreButton loadMore={loadMore} />}
        </div>
      )}
    </>
  );
}

export default ShowList;
