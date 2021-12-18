const pool = require("../db");

const getWatchlist = async (req, res) => {
  try {
    const watchlist = await pool.query("SELECT * FROM watchlist");
    res.json({
      watchlist: watchlist.rows,
    });
  } catch (err) {
    console.error(err);
  }
};

const addToWatchlist = async (req, res) => {
  try {
    const { did, total_eps } = req.body;
    const newTest = await pool.query(
      "INSERT INTO watchlist (uid, did, eps) VALUES (1, $1, $2) RETURNING *",
      [did, total_eps]
    );
    res.json(newTest.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteFromWatchlist = async (req, res) => {
  try {
    const { did } = req.body;
    await pool.query("DELETE FROM watched WHERE did = $1", [did]);
    const deleted = await pool.query(
      "DELETE FROM watchlist WHERE did = $1 RETURNING *",
      [did]
    );
    res.json(deleted.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

const updateWatchlist = async (req, res) => {
  try {
    const { did, episode } = req.body;
    const watched = await pool.query(
      "INSERT INTO watched (uid, did, episode) VALUES (1, $1, $2) RETURNING *",
      [did, episode]
    );
    res.json(watched.rows[0]);
  } catch (err) {
    console.error(err);
  }
};

const getWatched = async (req, res) => {
  try {
      const { did } = req.params; 
      const episodes = await pool.query("SELECT episode FROM watched WHERE did = $1 AND uid = 1 ORDER BY episode ASC", [did]); 
      res.json({
          episodes: episodes.rows
      }); 
  } catch (err) {
      console.error(err); 
  }
}; 

const deleteEpisode = async (req, res) => {
  try {
      const { did, episode } = req.body; 
      const deleted = await pool.query("DELETE FROM watched WHERE uid = 1 AND did = $1 AND episode = $2 RETURNING *", [did, episode]); 
      res.json(deleted.rows[0]); 
  } catch (err) {
      console.error(err); 
  }
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  deleteFromWatchlist,
  updateWatchlist,
  getWatched,
  deleteEpisode
};
