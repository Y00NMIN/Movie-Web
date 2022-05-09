import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React, { Component }  from 'react';
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import profile from '../src_assets/profile.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch , faHouse , faStar, faBookmark, faArrowRotateLeft, faSquareCheck} from "@fortawesome/free-solid-svg-icons";


function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=7.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <section className={styles.loading}>
          <h1 className={styles.loading_title}>Loading...</h1>
          <div className={styles.progress_bar} aria-hidden="true">
            <span className={styles.progress_bar_gauge}></span>
          </div>
        </section>
      ) : (
        <section className={styles.main}>
          <section className={styles.sidebar}>
            <a href="#"><h1 className={styles.sidebar_title}>Recom</h1></a>
            <div className={styles.sidebar_setting}>
              <button type="submit">
                <FontAwesomeIcon icon={faHouse} />
                <p>홈</p>
              </button>
              <button type="submit">
                <FontAwesomeIcon icon={faSearch} />
                <p>검색</p>
              </button>
              <button type="submit">
                <FontAwesomeIcon icon={faStar} />
                <p>평가하기</p>
              </button>
            </div>
            <div className={styles.sidebar_locker}>
              <strong>보관함</strong>
              <button type="submit">
                <FontAwesomeIcon icon={faBookmark} />
                <p>보고싶어요</p>
              </button>
              <button type="submit">
                <FontAwesomeIcon icon={faArrowRotateLeft} />
                <p>추천하기</p>
              </button>
              <button type="submit">
                <FontAwesomeIcon icon={faSquareCheck} />
                <p>다 본 작품</p>
              </button>
              <button type="submit">
                <FontAwesomeIcon icon={faStar} />
                <p>평가한 작품</p>
              </button>
            </div>
          </section>
          <div className={styles.nav}>
            <img src={profile} className={styles.nav_profile} alt="profile" />
          </div>
          <section className={styles.mainPage}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                coverImg={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            ))}
          </section>
        </section>
      )}
    </div>
  );
}

export default Home;
