function EpisodeCheckbox({ checked, disabled, toggleWatched }) {
    return (
        <input type='checkbox' checked={checked} disabled={disabled} onChange={toggleWatched} ></input>
    )
}

export default EpisodeCheckbox; 