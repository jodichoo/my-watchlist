const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const getPopular = async (req, res) => {
  try {
    const { page } = req.params;
    const response = await axios.get(
      process.env.GET_POPULAR_URL + `&page=${page}`
    );
    res.json({
      shows: response.data.results,
    });
  } catch (err) {
    console.error(err);
  }
};

const getShowInfo = async (req, res) => {
  const { did } = req.params;
  const showDetailsUrl = `https://api.themoviedb.org/3/tv/${did}?api_key=${process.env.API_KEY}&language=en-US`;
  try {
    const details = await axios.get(showDetailsUrl);
    res.json({
      details: details.data,
    });
  } catch (err) {
    console.error(err);
  }
};

const getSearchResults = async (req, res) => {
  const { query } = req.params;
  let page = 1;

  function searchUrl(p) {
    return `https://api.themoviedb.org/3/search/tv?api_key=${process.env.API_KEY}&page=${p}&query=${query}&include_adult=false`;
  }

  try {
    let response = await axios.get(searchUrl(page));
    const totalPages = response.data.total_pages;
    let results = response.data.results.filter(
      (show) => show.original_language === "ko"
    );

    while (page < totalPages) {
      page++;
      response = await axios.get(searchUrl(page));
      results = [
        ...results,
        ...response.data.results.filter(
          (show) => show.original_language === "ko"
        ),
      ];
    }

    res.json({
      results,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getPopular, getShowInfo, getSearchResults };
