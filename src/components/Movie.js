import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
import React, { Component }  from 'react';

function Movie({ id ,coverImg, title, year, summary, genres }) {
  return (
    <div className={styles.movie}>
      <img className={styles.movie_img} src={coverImg} alt={title} />
      <div className={styles.movie_desc}>
        <Link to={`/movie/${id}`} className={styles.movie_desc_link}>
          <h2 className={styles.movie_title}>{title}</h2>
          <h3 className={styles.movie_year}>Since: {year}</h3>
          { <p className={styles.movie_text}>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p> }
          <ul className={styles.movie_list}>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </Link>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;