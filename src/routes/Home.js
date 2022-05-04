import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

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
          <section className={styles.nav}>
            <div className={styles.nav_main}>
              <h1 className={styles.nav_title}>Recom</h1>
              <div className={styles.nav_profile}>hello</div>
            </div>
          </section>
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
