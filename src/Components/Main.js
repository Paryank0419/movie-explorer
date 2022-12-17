import React, { useState } from "react";
import Card from "./Card.js";
import logo from "../images/logo.svg";
import { useEffect } from "react/cjs/react.development";
import moment from "moment";

//calc time span
let currDate = moment().format("YYYY-MM-DD");
console.log(currDate);
let prevDate = moment().subtract(4, "months").format("YYYY-MM-DD");

let API_KEY = "&api_key=5d050c69652a2801e1310336c430fcaa";
let base_url = "https://api.themoviedb.org/3";
let url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${prevDate}&primary_release_date.lte=${currDate}&api_key=5d050c69652a2801e1310336c430fcaa`;
function Main() {
  const [searchValue, setSearchValue] = useState("");
  const [movieData, setData] = useState([]);
  const [url_set, setUrl] = useState(url);
  const [heading, setHeading] = useState(true);
  const [loading, setLoading] = useState(true);
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const searchMovie = (e) => {
    if (e.key === "Enter") {
      let searchUrl;
      if (searchValue.trim() === "" || searchValue.length === 0) {
        searchUrl = url;
        setHeading(true);
      } else {
        searchUrl =
          base_url +
          "/search/movie?api_key=5d050c69652a2801e1310336c430fcaa&query=" +
          searchValue;
        setHeading(false);
      }

      setUrl(searchUrl);
    }
  };
  useEffect(() => {
    fetch(url_set)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data.results);
      })
      .catch((error) => {
        console.log(error);
        setData([]);
      });
  }, [url_set]);

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <img
            src={logo}
            alt="site-logo"
            onClick={() => {
              setHeading(true);
              setSearchValue("");
              setUrl(url);
            }}
          />

          <div className="search-wrap">
            <input
              id="search"
              type="search"
              placeholder="Search for a movie"
              onChange={handleSearchInputChanges}
              value={searchValue}
              onKeyPress={searchMovie}
            ></input>
          </div>
        </div>
        <hr />
        {heading ? (
          <h3 className="movie-grid-title">Most Recent movies</h3>
        ) : (
          <h3 className="movie-grid-title">Search Results...</h3>
        )}
        <div className="movie-grid">
          {movieData.length === 0 ? (
            <p className="notfound">Not Found</p>
          ) : (
            !loading &&
            movieData.map((res, pos) => {
              return <Card info={res} key={pos} />;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
