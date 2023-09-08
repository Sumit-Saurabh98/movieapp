import React from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  Heading,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  Button,
  useToast
} from "@chakra-ui/react";

function MovieDetailsCard({ movie }) {
const toast = useToast()
  const { title, backdrop_path, overview, release_date, genres, vote_average } =
    movie;

  const posterBaseUrl = "https://image.tmdb.org/t/p/original";
  const backdropUrl = posterBaseUrl + backdrop_path;

  return (
    <Box
      display="flex"
    //   flexDirection={{ base: "column", md: "row" }}
    flexDirection={"column"}
      justifyContent="start"
      alignItems="center"
      boxShadow="md"
      borderRadius="md"
      p={4}
      m={4}
    >
      <Image
        src={backdropUrl}
        alt={title}
        borderRadius={{ base: "md", md: "none" }}
        maxH={{ base: "auto", md: "300px" }}
        mx={4}
      />
      <Button onClick={()=>{
        toast({
        title: "Movie is Playing.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
      }} mt={"20px"}>Play</Button>
      <VStack align="start" mx={4} mt={{ base: 4, md: 0 }}>
        <Heading size="lg">{title}</Heading>
        <Text fontSize="lg" fontWeight="bold" color="gray.600">
          Release Date: {release_date}
        </Text>
        <Badge colorScheme="teal" variant="outline" fontSize="md" mt={2}>
          Genres: {genres.map((genre) => genre.name).join(", ")}
        </Badge>
        <Text fontSize="md" mt={4}>
          {overview}
        </Text>
        <CircularProgress
          value={parseFloat(vote_average * 10).toFixed(1)}
          color="teal"
          size="120px"
          thickness="8px"
        >
          <CircularProgressLabel>
            {parseFloat(vote_average).toFixed(1)}
          </CircularProgressLabel>
        </CircularProgress>
      </VStack>
    </Box>
  );
}

export default MovieDetailsCard;
