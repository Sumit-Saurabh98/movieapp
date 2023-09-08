import React, { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import "./homepage.css";
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  useToast,
  Spinner, Flex
} from "@chakra-ui/react";
import MovieCard from "../components/movieCard/MovieCard"

function Homepage(props) {
  const toast = useToast();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [userId, setUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const TOKEN = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    getMovies();
    getGenres();
  }, [page]);

  const getMovies = async () => {
    try {
      const data = await fetchDataFromApi(`/discover/movie?page=${page}`);
      setMovies(data.results);
      console.log(data.results)
      setTotalPages(data.total_pages);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const getGenres = async () => {
    try {
      const data = await fetchDataFromApi(`/genre/movie/list`);
      setGenres(data.genres);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToWatchlist = async (movieId) => {
    try {
      await fetch(`https://api.themoviedb.org/3/account/${userId}/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        }),
      });

      toast({
        title: "Added to watchlist.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToFavorites = async (movieId) => {
    try {
      await fetch(`https://api.themoviedb.org/3/account/${userId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          favorite: true,
        }),
      });

      toast({
        title: "Added to favorites.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSearchSubmit = async () => {
    if (searchQuery) {
      try {
        const data = await fetchDataFromApi(`/search/movie?query=${searchQuery}`);
        setSearchResults(data.results);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <div>
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button colorScheme="cyan" onClick={handleSearchSubmit}>
            Search
          </Button>
        </Box>
      </div>

      <div className="mainContainer">
        {!isLoading
          ? (searchQuery && searchResults.length > 0
              ? searchResults
              : movies
            ).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={genres}
                showButtons={true}
                handleAddToWatchlist={handleAddToWatchlist}
                handleAddToFavorites={handleAddToFavorites}
              />
            ))
          : (<Flex
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
        </Flex>)}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <ButtonGroup>
          <Button onClick={handlePrevPage} isDisabled={page === 1}>
            Previous
          </Button>
          <Button onClick={handleNextPage} isDisabled={page === totalPages}>
            Next
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Homepage;
