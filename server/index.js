const API_KEY = require("./apikey"); 
const express = require("express");
const app = express();
const cors = require("cors"); 
const pool = require("./db"); 
const axios = require("axios"); 

const BASE_URL = "https://api.themoviedb.org/3/"; 
const url = BASE_URL + `discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_original_language=ko`;

//middleware
app.use(cors());
app.use(express.json())

// get list of shows by page 
app.get("/shows/:page", async (req, res) => {
    try {
        const { page } = req.params; 
        const response = await axios.get(url + `&page=${page}`); 
        res.json({
            shows: response.data.results
        });  
    } catch (err) {
        console.error(err); 
    }
})

// get information for a show 
app.get("/show/:did", async (req, res) => {
    const { did } = req.params; 
    const showDetailsUrl = `https://api.themoviedb.org/3/tv/${did}?api_key=${API_KEY}&language=en-US`
    try {
        const details = await axios.get(showDetailsUrl); 
        res.json({
            details: details.data
        })
    } catch (err) {
        console.error(err); 
    }
})

// get watchlist 
app.get("/watchlist", async (req, res) => {
    try {
        const watchlist = await pool.query("SELECT * FROM watchlist"); 
        res.json({
            watchlist: watchlist.rows
        }); 
    } catch (err) {
        console.error(err);
    }
    
})

// add to watchlist 
app.post("/add", async (req, res) => {
    try {
         
        const { did, total_eps } = req.body; 
        const newTest = await pool.query("INSERT INTO watchlist (uid, did, eps) VALUES (1, $1, $2) RETURNING *", [did, total_eps]);
        res.json(newTest.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
})

// delete from watchlist
app.delete("/remove", async (req, res) => {
    try {
        const { did } = req.body; 
        await pool.query("DELETE FROM watched WHERE did = $1", [did]); 
        const deleted = await pool.query("DELETE FROM watchlist WHERE did = $1 RETURNING *", [did]); 
        res.json(deleted.rows[0]); 
    } catch (err) {
        console.error(err); 
    }
})

// update watchlist with episode of a show seen
app.post("/update", async (req, res) => {
    try {
        const { did, episode } = req.body; 
        const watched = await pool.query("INSERT INTO watched (uid, did, episode) VALUES (1, $1, $2) RETURNING *", [did, episode]); 
        res.json(watched.rows[0]); 
    } catch (err) {
        console.error(err); 
    }
})

// get watched episodes of a show 
app.get("/watched/:did", async (req, res) => {
    try {
        const { did } = req.params; 
        const episodes = await pool.query("SELECT episode FROM watched WHERE did = $1 AND uid = 1 ORDER BY episode ASC", [did]); 
        res.json({
            episodes: episodes.rows
        }); 
    } catch (err) {
        console.error(err); 
    }
})

// delete episode of a show from watched list
app.delete("/watched/remove", async (req, res) => {
    try {
        const { did, episode } = req.body; 
        const deleted = await pool.query("DELETE FROM watched WHERE uid = 1 AND did = $1 AND episode = $2 RETURNING *", [did, episode]); 
        res.json(deleted.rows[0]); 
    } catch (err) {
        console.error(err); 
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
})