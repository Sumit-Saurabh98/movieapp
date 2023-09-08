// MovieDetailsPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetailsCard from "../components/movieCard/MovieDetailsCard";
import { fetchDataFromApi } from "../utils/api";
import {Flex, Spinner} from "@chakra-ui/react"

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await fetchDataFromApi(`/movie/${id}`);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

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
        <MovieDetailsCard  movie={movie} />
      )}
    </div>
  );
}

export default MovieDetailsPage;
