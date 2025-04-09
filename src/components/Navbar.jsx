import { Link, Stack } from "@chakra-ui/react";
import React from "react";
import NavSearch from "./NavSearch";
import TagsContainer from "./tagsContainer";

export default function Navbar() {
  return (
    <Stack
      direction="row"
      position="sticky"
      bg="black"
      p={2}
      top={0}
      justifyContent="space-between"
      zIndex="10"
    >
      <Link href="/">MS</Link>
      <NavSearch />
    </Stack>
  );
}
