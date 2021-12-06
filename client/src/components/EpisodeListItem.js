import { useState } from 'react'; 
import { addEpisodeToList, removeEpisodeFromList } from '../services/QueryWatchlist'; 

function EpisodeListItem({ epNum, watched, epArr, setEpArr, id }) {
    const [seen, setSeen] = useState(watched ? true : false); 

    function toggleWatched() {
        const newArr = epArr.map(x => x); 
        newArr[epNum - 1] = !seen; 

        updateWatchedEpisodes(!seen); 
        setEpArr(newArr); 
        setSeen(!seen);  
    }

    async function updateWatchedEpisodes(bool) {
        if (bool) {
            await addEpisodeToList(id, epNum); 
        } else {
            await removeEpisodeFromList(id, epNum); 
        }
    }
    
    return (
        <div className='episode-list-item'>
            <input type='checkbox' checked={seen} disabled={watched === null} onChange={toggleWatched}></input>
            Episode {epNum} {' '}
            {watched === null ? "(To be aired)" : null}
        </div>
    )
}

export default EpisodeListItem; 