import React from "react";
import {useNavigate} from "react-router-dom"
import {
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";

function MovieCard({
  movie,
  genres,
  showButtons,
  handleAddToWatchlist,
  handleAddToFavorites,
}) {
    const navigate = useNavigate();
  const posterBaseUrl = "https://image.tmdb.org/t/p/original";
  const alternateImg = "https://us.123rf.com/450wm/worsan/worsan1801/worsan180100024/93145128-realistic-blue-cinema-poster-in-a-frame-with-a-picture-hanging-on-a-textured-gray-brick-wall-a.jpg?ver=6"
  const genreNames = movie.genre_ids
    .map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      return genre ? genre.name : null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <Card maxW="sm" key={movie.id}>
      <CardBody>
        <Image
        onClick={()=>navigate(`/${movie.id}`)}
        _hover={{cursor:"pointer"}}
          src={
            movie.poster_path
              ? posterBaseUrl + movie.poster_path
              : alternateImg
          }
          alt={movie.title}
          borderRadius="lg"
        />

        <Stack mt="6" spacing="3">
          <Heading size="md">{movie.title}</Heading>
          <Text>{genreNames}</Text>
        </Stack>
        <Divider m="10px 0" />
        {
            showButtons ? (<Box display={"flex"} justifyContent="space-around">
          <Button
            colorScheme="cyan"
            onClick={() => handleAddToWatchlist(movie.id)}
          >
            Watchlist
          </Button>
          <Button
            colorScheme="cyan"
            onClick={() => handleAddToFavorites(movie.id)}
          >
            Favorite
          </Button>
        </Box>):""
        }
        
      </CardBody>
    </Card>
  );
}

export default MovieCard;
