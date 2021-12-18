const express = require("express");
const cors = require("cors"); 

const app = express();
const showControllers = require('./controllers/ShowControllers'); 
const watchlistControllers = require('./controllers/WatchlistControllers'); 

//middleware
app.use(cors());
app.use(express.json())

// get list of shows by page 
app.get("/shows/:page", showControllers.getPopular); 

// get information for a show 
app.get("/show/:did", showControllers.getShowInfo);

// get search results 
app.get("/search/:query", showControllers.getSearchResults);

// get watchlist 
app.get("/watchlist", watchlistControllers.getWatchlist); 

// add to watchlist 
app.post("/add", watchlistControllers.addToWatchlist);

// delete from watchlist
app.delete("/remove", watchlistControllers.deleteFromWatchlist);

// update watchlist with episode of a show seen
app.post("/update", watchlistControllers.updateWatchlist);

// get watched episodes of a show 
app.get("/watched/:did", watchlistControllers.getWatched)

// delete episode of a show from watched list
app.delete("/watched/remove", watchlistControllers.deleteEpisode)

app.listen(5000, () => {
    console.log("server has started on port 5000");
})