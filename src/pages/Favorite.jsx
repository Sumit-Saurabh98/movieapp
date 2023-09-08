import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import MovieCard from "../components/movieCard/MovieCard";
import "./homepage.css";
import { Spinner, Flex } from "@chakra-ui/react";

function Favorite() {
  const [genres, setGenres] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
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

    const fetchFavoriteMovies = async () => {
      try {
        const response = await fetchDataFromApi(`/account/${userId}/favorite/movies`);

        setFavoriteMovies(response.results);
        setIsLoading(false);
        getGenres();
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchFavoriteMovies();
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
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} showButtons={false} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorite;
