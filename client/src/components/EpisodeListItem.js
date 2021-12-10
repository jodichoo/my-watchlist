import { useState } from 'react'; 
import { addEpisodeToList, removeEpisodeFromList } from '../services/QueryWatchlist'; 
import EpisodeCheckbox from './EpisodeCheckbox';

function EpisodeListItem({ epNum, watched, epArr, setEpArr, id }) {
    const [seen, setSeen] = useState(watched ? true : false); 

    function toggleWatched() {
        const newArr = epArr.map(x => x); 
        newArr[epNum - 1] = !seen; 

        updateWatchedEpisodes(!seen); 
        setEpArr(newArr); 
        setSeen(seen => !seen);  
    }

    async function updateWatchedEpisodes(isSeen) {
        if (isSeen) {
            await addEpisodeToList(id, epNum); 
        } else {
            await removeEpisodeFromList(id, epNum); 
        }
    }
    
    return (
        <div key={id} className='episode-list-item'>
            <EpisodeCheckbox checked={seen} disabled={watched == null} toggleWatched={toggleWatched} />
            Episode {epNum} {' '}
            {watched === null ? "(To be aired)" : null}
        </div>
    )
}

export default EpisodeListItem; 