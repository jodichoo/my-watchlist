import { useEffect, useState } from "react";
import RemoveShowButton from "./RemoveShowButton";
import EpisodeList from "./EpisodeList";
import { removeShowFromList } from "../services/QueryWatchlist";

function WatchlistShowDetails({
  details,
  epsSeen,
  setEpsSeen,
  watchlist,
  setWatchlist,
  setDetailsOpen
}) {
  const [epArr, setEpArr] = useState(createEpisodesArr());

  // creates an array to represent the list of episodes and their status
  function createEpisodesArr() {
    const arr = [];
    const totalEps = details.number_of_episodes;
    const upcomingEp = details.next_episode_to_air;
    for (let j = 0; j < totalEps; j++) {
      arr[j] = false;
    }
    epsSeen.forEach((ep) => (arr[ep - 1] = true));
    if (upcomingEp) {
      const num = upcomingEp.episode_number;
      for (let i = num - 1; i < totalEps; i++) {
        arr[i] = null;
      }
    }
    return arr;
  }

  //removes the current show from the watchlist
  async function removeShow() {
    const newWatchlist = watchlist.filter((show) => show.did !== details.id);
    setWatchlist(newWatchlist);
    await removeShowFromList(details.id);
    setDetailsOpen(false); 
  }

  // updates the list of episodes seen when the watch status of an episode for the show changes
  useEffect(() => {
    const newEpsSeen = [];
    for (let i = 0; i < details.number_of_episodes; i++) {
      if (epArr[i]) {
        newEpsSeen.push(i + 1);
      }
    }
    setEpsSeen(newEpsSeen);
  }, [epArr]);

  function renderShowCompletion(nextEp) {
    if (nextEp === null) {
      return (
        <>
          <i className="material-icons">check_circle_outline</i>Completed
        </>
      );
    } else {
      return (
        <>
          <i className="material-icons">pending</i>Ongoing
        </>
      );
    }
  }

  return (
    <div className="popup-content-container">
      <div className="show-details-header">
        <h2 className="title">{details.name}</h2>
        <RemoveShowButton id={details.id} removeShow={removeShow} />
      </div>
      <br />
      <div className="details-body">
        <h3>Status:</h3>
        <p>{renderShowCompletion(details.next_episode_to_air)}</p>
        <h3>Overview</h3>
        <p>{details.overview}</p>
        {epsSeen.length === 0
          ? <h3>You have not started on this show</h3>
          : <h3>You have seen {epsSeen.length} episodes</h3>}
        <EpisodeList epArr={epArr} setEpArr={setEpArr} id={details.id} />
      </div>
    </div>
  );
}

export default WatchlistShowDetails;
