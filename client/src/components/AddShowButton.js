import { addToWatchlist } from '../services/QueryWatchlist';  

function AddShowButton({ id, totalEps }) {  
  function addShow() {
    addToWatchlist(id, totalEps); 
    console.log('add ' + id + ' to the watchlist'); 
  }

  return (
    <div className='add-button' onClick={addShow}>+ Add to watchlist</div>
  )
}

export default AddShowButton; 