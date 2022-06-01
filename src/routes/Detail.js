import {useEffect, useState }  from 'react';
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import Movie from "../components/Movie";

function Detail() {
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=7.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <section className={styles.Detail}>
      <h1>Detail</h1>
      <div>
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
      </div>
    </section>
  );
}

export default Detail;

