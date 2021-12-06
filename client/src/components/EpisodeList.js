import EpisodeListItem from "./EpisodeListItem"

function EpisodeList({ epArr, setEpArr, id }) {
    function renderEpisodes(bool, index) {
        return <EpisodeListItem id={id} epNum={index + 1} watched={bool} epArr={epArr} setEpArr={setEpArr} />;
    }
    return (
        <div className='episode-list'>
            {(epArr.map(renderEpisodes))}
        </div>
    )
}

export default EpisodeList; 