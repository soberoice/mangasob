import { Link, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import NavSearch from "./NavSearch";
import { useManga } from "./contexts/MangaProvider";

export default function Navbar() {
  const { getPages, pages } = useManga();
  useEffect(() => {
    getPages();
  }, []);
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
      {console.log(pages)}
      <Link href="/">mangasob</Link>
      <NavSearch />
    </Stack>
  );
}
