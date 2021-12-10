import { useState } from "react";

function Searchbar({ searchShows }) {
  const [searchQuery, setSearchQuery] = useState(""); 

  function handleSubmit(e) {
    e.preventDefault();
    searchShows(searchQuery); 
  }

  return (
    <form className='search-bar' onSubmit={handleSubmit}>
      Search:
      <input type="text" placeholder="..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} required></input>
      <button type='submit'>Search</button>
    </form>
  );
}

export default Searchbar; 