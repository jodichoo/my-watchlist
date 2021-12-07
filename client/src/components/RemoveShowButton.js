function RemoveShowButton({ removeShow }) {

    // async function removeShow() {
    //     const newWatchlist = watchlist.filter(show => show.did !== id); 
    //     setWatchlist(newWatchlist);
    //     await removeShowFromList(id);
    //     console.log('show removed');  
    // }

    return (
        <div className='remove-button' onClick={removeShow}>
            Remove from list
        </div>
    )
}

export default RemoveShowButton; 