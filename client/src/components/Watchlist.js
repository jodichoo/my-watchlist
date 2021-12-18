import { useEffect, useState } from "react";
import { getWatchlist } from "../services/QueryWatchlist";
import WatchlistShow from "./WatchlistShow";
import Popup from "./Popup";
import WatchlistShowDetails from "./WatchlistShowDetails";
import Navbar from "./Navbar";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [openShowDetails, setOpenShowDetails] = useState(null);
  const [openEpsSeen, setOpenEpsSeen] = useState([]);

  async function getList() {
    const list = await getWatchlist();
    setWatchlist(list);
  }

  useEffect(() => {
    getList();
  }, []);

  function renderWatchlistShow(id) {
    return (
      <WatchlistShow
        key={id}
        id={id}
        setIsOpen={setDetailsOpen}
        setOpenShowDetails={setOpenShowDetails}
        setOpenEpsSeen={setOpenEpsSeen}
        isOpen={detailsOpen}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className="watchlist">
        <h2>My List:</h2>
        <div className="watchlist-shows-wrapper">
          {watchlist.map((show) => renderWatchlistShow(show.did))}
        </div>
        {detailsOpen && openShowDetails ? (
          <Popup setIsOpen={setDetailsOpen}>
            <WatchlistShowDetails
              details={openShowDetails}
              epsSeen={openEpsSeen}
              setEpsSeen={setOpenEpsSeen}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          </Popup>
        ) : null}
      </div>
    </>
  );
}

export default Watchlist;
