import { useEffect, useState } from 'react'; 
import { fetchShowDetail } from '../services/FetchShowList';
import { getEpsSeen } from '../services/QueryWatchlist'; 

function WatchlistShow({ id, setIsOpen, setOpenShowDetails, setOpenEpsSeen, isOpen }) {
    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original/";
    const [details, setDetails] = useState({}); 
    const [epsSeen, setEpsSeen] = useState([]); 

    async function getDetails() {
        const details = await fetchShowDetail(id); 
        setDetails(details); 
    }

    async function getWatchProgress() {
        const episodes = await getEpsSeen(id); 
        const result = []; 
        episodes.forEach(epObj => result.push(epObj.episode)); 
        setEpsSeen(result);
    }

    function openDetails() {
        setIsOpen(true); 
        setOpenShowDetails(details); 
        setOpenEpsSeen(epsSeen); 
    }

    useEffect(() => {
        getDetails(); 
        getWatchProgress(); 
    }, [isOpen]); 

    return (
        <div className='watchlist-show' key={id} onClick={openDetails}>
            <div className='poster-container'>
                <img className='poster' src={POSTER_BASE_URL + details.poster_path} alt='poster'></img>
            </div>
            <div className='body'>
                <h3>{details.name}</h3>
                <div className='progress-bar'>
                    <div className='progress' style={{width :`${epsSeen.length * 100 / details.number_of_episodes}%`}}></div>
                </div>
                <p>{epsSeen.length} / {details.number_of_episodes} episodes seen</p>
            </div>
        </div>
    )
}

export default WatchlistShow;