import { useEffect, useState } from 'react'; 
import RemoveShowButton from "./RemoveShowButton";
import EpisodeList from './EpisodeList';

function WatchlistShowDetails({ details, epsSeen, setEpsSeen, watchlist, setWatchlist }) {
    const [epArr, setEpArr] = useState(createEpisodesArr()); 
    
    function createEpisodesArr() {
        const arr = []; 
        const totalEps = details.number_of_episodes; 
        const upcomingEp = details.next_episode_to_air;
        for (let j = 0; j < totalEps; j++) {
            arr[j] = false; 
        }
        epsSeen.forEach(ep => arr[ep - 1] = true);
        if (upcomingEp) {
            const num = upcomingEp.episode_number; 
            for (let i = num - 1; i < totalEps; i++) {
                arr[i] = null; 
            }
        }
        return arr; 
    }

    useEffect(() => {
        const newEpsSeen = []; 
        for (let i = 0; i < details.number_of_episodes; i++) {
            if (epArr[i]) {
                newEpsSeen.push(i + 1); 
            }
        }
        setEpsSeen(newEpsSeen); 
    }, [epArr]); 

    return (
        <div className='popup-content-container'>
            <div className='show-details-header'>
                <h2 className='title'>{details.name}</h2>
                <RemoveShowButton id={details.id} watchlist={watchlist} setWatchlist={setWatchlist} />
            </div>
            <br />
            <div className='details-body'>
                {epsSeen.length === 0 ? 'You have not started on this show' : `Seen episodes ${epsSeen}`}
                <EpisodeList epArr={epArr} setEpArr={setEpArr} id={details.id} />
            </div>
        </div>
    )
}

export default WatchlistShowDetails; 