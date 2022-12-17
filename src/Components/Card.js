import React, { useState } from "react";
import ReactDOM from "react-dom";
import close from "../images/close.svg";
import moment from "moment";
import notFound from "../images/notFound.png";
const Modal = ({ children }) => {
  const element = document.getElementById("overlay");
  if (children) {
    element.classList.remove("hidden");
    return ReactDOM.createPortal(children, element);
  }
  element.classList.add("hidden");
  return null;
};
const formatDate = (date) => {
  let corrDate = moment(date);
  return corrDate.format("LL");
};
function Card(movie) {
  //console.log(movie);
  //const [show, setShow] = useState(false);
  const [state, setState] = useState({ modalContent: null });
  const replaceImage = (error) => {
    //replacement of broken Image
    error.target.src = notFound;
  };
  let img_path = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <Modal>{state.modalContent}</Modal>
      <div
        className="movie"
        onClick={() =>
          setState({
            modalContent: (
              <div className="toggle-view">
                <h4 className="toggle-title">{movie.info.title}</h4>

                <button className="toggle-close">
                  <img
                    src={close}
                    alt="close"
                    onClick={() => setState({ modalContent: null })}
                  />
                </button>

                <img
                  className="toggle-img"
                  alt="movie-poster"
                  src={img_path + movie.info.poster_path}
                  onError={replaceImage}
                  loading="lazy"
                />
                <div className="toggle-info-wrap">
                  <p className="release-date">
                    <span>Release Date:</span>{" "}
                    {formatDate(movie.info.release_date)}
                  </p>

                  <p className="description">{movie.info.overview}</p>

                  <p className="toggle-rating">
                    <b>{movie.info.vote_average}</b> / 10 (
                    <span>{movie.info.vote_count}</span>)
                  </p>
                </div>
              </div>
            )
          })
        }
      >
        <img
          src={img_path + movie.info.poster_path}
          onError={replaceImage}
          alt="movie-img"
          loading="lazy"
        />
        <p className="movie-rating">{movie.info.vote_average}</p>
        <p className="movie-title">{movie.info.title}</p>
      </div>
    </>
  );
}

export default Card;
