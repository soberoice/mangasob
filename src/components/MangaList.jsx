import {
  Card,
  Center,
  Flex,
  Image,
  Text,
  Skeleton,
  GridItem,
  Grid,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router";

export default function MangaList({ data }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/manga/${id}`);
  };

  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <Center display={"flex"} flexDir={"column"} w={"100%"}>
      {/* {console.log(data)} */}

      <Box>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)", // 2 columns on small screens (mobile)
            sm: "repeat(3, 1fr)", // 3 columns on small devices
            md: "repeat(3, 1fr)", // 4 columns on tablets
            lg: "repeat(4, 1fr)", // 5 columns on large screens
            xl: "repeat(5, 1fr)", // 6 columns on extra-large screens
          }}
          gap={2}
          backgroundColor="transparent"
        >
          {data?.length
            ? data?.map((manga, index) => (
                <GridItem
                  key={index}
                  onClick={() => {
                    handleClick(manga?.id);
                  }}
                >
                  <Card.Root
                    cursor="pointer"
                    border="none"
                    maxHeight={450}
                    maxWidth={{ base: "170px", sm: "200px", lg: "200px" }}
                    overflow="hidden"
                  >
                    <Image
                      aspectRatio={3 / 4}
                      src={manga?.coverUrl}
                      alt={manga?.title}
                    />
                    <Card.Body p="4">
                      <Text truncate>{manga?.title}</Text>
                      <Flex justify="space-between" fontWeight="light">
                        <Text fontWeight="lighter" fontSize="xs">
                          {manga?.attributes?.year}
                        </Text>
                        <Text fontWeight="lighter" fontSize="xs">
                          {manga?.attributes?.status}
                        </Text>
                      </Flex>
                    </Card.Body>
                  </Card.Root>
                </GridItem>
              ))
            : numbers.map((num) => (
                <Card.Root
                  cursor="pointer"
                  key={num}
                  border="none"
                  maxWidth={{ base: "170px", lg: "200px" }}
                  overflow="hidden"
                >
                  <Skeleton
                    key={num}
                    aspectRatio={3 / 4}
                    maxH="450px"
                    minW="200px"
                    borderRadius="md"
                  />
                </Card.Root>
              ))}
        </Grid>
      </Box>
    </Center>
  );
}
