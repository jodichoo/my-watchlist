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

export { fetchShowList, fetchShowDetail }; 