import React, { useEffect } from "react";
import { useManga } from "./contexts/MangaProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaBookOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function PopularManga() {
  const { getPopularManga, popularMangaList } = useManga();

  const navigat = useNavigate();
  const handleclick = (id) => {
    navigat(`/manga/${id}`);
  };
  useEffect(() => {
    getPopularManga(0, 5);
  }, []);
  // Custom arrows
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        position="absolute"
        right="10px"
        top="95%"
        transform="translateY(-50%)"
        zIndex="2"
        colorScheme="teal"
        aria-label="Next"
      >
        <FaChevronRight />
      </IconButton>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <IconButton
        onClick={onClick}
        position="absolute"
        right="70px"
        top="95%"
        transform="translateY(-50%)"
        zIndex="2"
        colorScheme="teal"
        aria-label="Previous"
      >
        <FaChevronLeft />
      </IconButton>
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      w="full"
      maxW="full"
      mx="auto"
      overflow="visible"
      pb={10}
      position="relative"
    >
      {popularMangaList ? (
        <Slider {...settings}>
          {popularMangaList.map((manga) => (
            <Stack
              flexDir={"row"}
              key={manga.id}
              bgImage={manga.coverUrl}
              h={"500px"}
              position="relative"
              w={"full"}
            >
              <Image
                src={manga.coverUrl}
                alt={manga.title}
                h="500px"
                w={"full"}
                zIndex="-1"
                position="relative"
              />
              <Box
                w="100%"
                color="white"
                flexDir="column"
                mt={"-200px"}
                px={4}
                zIndex="1"
                bgGradient="to-t"
                gradientFrom="black"
                gradientTo="transparent"
              >
                <Heading
                  truncate
                  w={{ base: "100%", lg: "50%" }}
                  fontSize="2xl"
                >
                  {manga.title}
                </Heading>
                <Text
                  lineClamp={3}
                  w={{ base: "100%", lg: "50%" }}
                  fontSize="lg"
                  mt={2}
                >
                  {manga.description}...
                </Text>
                <Button
                  mt={4}
                  colorScheme="teal"
                  size="lg"
                  onClick={() => handleclick(manga.id)}
                >
                  <FaBookOpen />
                  Read now
                </Button>
              </Box>
            </Stack>
          ))}
        </Slider>
      ) : (
        <Skeleton height="500px" width="100%" />
      )}
    </Box>
  );
}
