function fetchShowList(page) {
    return fetch(`http://localhost:5000/shows/${page}`)
      .then(res => res.json())
      .then(data => data.shows); 
}

function fetchShowDetail(id) {
  return fetch(`http://localhost:5000/show/${id}`)
    .then(res => res.json())
    .then(data => data.details); 
}

function fetchSearchResults(query) {
  return fetch(`http://localhost:5000/search/${query}`)
    .then(res => res.json())
    .then(data => data.results);
}

export { fetchShowList, fetchShowDetail, fetchSearchResults }; 