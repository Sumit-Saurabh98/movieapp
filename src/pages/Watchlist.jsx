import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import MovieCard from "../components/movieCard/MovieCard";
import "./homepage.css";
import {Flex, Spinner} from "@chakra-ui/react"

function Watchlist() {
  const [genres, setGenres] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGenres = async () => {
    try {
      const data = await fetchDataFromApi(`/genre/movie/list`);
      setGenres(data.genres);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchWatchlistMovies = async () => {
      try {
        const response = await fetchDataFromApi(`/account/${userId}/watchlist/movies`);

        setWatchlistMovies(response.results);
        setIsLoading(false);
        getGenres();
      } catch (error) {
        console.error("Error fetching watchlist movies:", error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchWatchlistMovies();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <Flex
          align="center"
          justify="center"
          minH="100vh" 
        >
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
          />
        </Flex>
      ) : (
        <div className="mainContainer">
          {watchlistMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} showButtons={false} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
