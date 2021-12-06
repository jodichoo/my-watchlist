async function addToWatchlist(did, totalEps) {
  try {
    const body = { did, total_eps: totalEps };
    const response = await fetch("http://localhost:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error(err);
  }
}

function getWatchlist() {
  return fetch("http://localhost:5000/watchlist")
    .then(res => res.json())
    .then(data => data.watchlist); 
}

function getEpsSeen(id) {
  return fetch(`http://localhost:5000/watched/${id}`)
    .then(res => res.json())
    .then(data => data.episodes); 
}

function removeShowFromList(id) {
  const body = { did: id }; 
  return fetch("http://localhost:5000/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body) 
  })
    .then(res => res.json()) 
}

function removeEpisodeFromList(id, episode) {
  const body = { did: id, episode }; 
  return fetch("http://localhost:5000/watched/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
} 

function addEpisodeToList(id, episode) {
  const body = { did: id, episode }; 
  return fetch("http://localhost:5000/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}

export { addToWatchlist, getWatchlist, getEpsSeen, removeShowFromList, removeEpisodeFromList, addEpisodeToList }; 