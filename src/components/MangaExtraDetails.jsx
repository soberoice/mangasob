import { Box, Stack, Tag, Text } from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router";

export default function MangaExtraDetails({ data }) {
  dayjs.extend(relativeTime);
  const creationDate = data?.attributes?.createdAt;
  const date = new Date(creationDate);
  const formatted = date.toLocaleDateString();
  const isoString = data?.attributes?.updatedAt;
  const formattedDate = dayjs(isoString).fromNow();
  const navigat = useNavigate();
  const handleClick = (name, id) => {
    navigat(`/tag/${name}/${id}`);
  };
  return (
    <Box
      px="4"
      py="8"
      textAlign="left"
      gap={4}
      justifyContent="center"
      display="flex"
      flexDir="column"
    >
      {/* <Stack direction={"row"} gap={2} textAlign="left">
        {" "}
        {data?.infoX[1].japanese}
      </Stack> */}
      {/* <Stack direction={"row"} gap={2} textAlign="left">
        <Text fontWeight={"bold"}>Mal Score:</Text> {data?.infoX[1].malscore}
      </Stack> */}

      {data && (
        <Stack direction={"row"}>
          <Text fontWeight={"bold"}>Genre:</Text>
          <Stack direction="row" gap="1" px="4" wrap={"wrap"}>
            {data?.attributes?.tags?.map((tag) => (
              <Tag.Root
                onClick={() => handleClick(tag?.attributes?.name?.en, tag.id)}
                colorPalette={"white"}
                key={tag?.id}
                cursor={"pointer"}
              >
                <Tag.Label>{tag?.attributes?.name?.en}</Tag.Label>
              </Tag.Root>
            ))}
          </Stack>
        </Stack>
      )}

      {data && (
        <Stack direction={"row"} gap={2} textAlign="left">
          <Text fontWeight={"bold"}>Relesed:</Text> {formatted}
        </Stack>
      )}

      {data && (
        <Stack direction={"row"} gap={2} textAlign="left">
          <Text fontWeight={"bold"}>Status:</Text> {data?.attributes?.status}
        </Stack>
      )}
      {data && (
        <Stack direction={"row"} gap={2} textAlign="left">
          <Text fontWeight={"bold"}>Last Updated:</Text> {formattedDate}
        </Stack>
      )}
    </Box>
  );
}
