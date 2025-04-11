import { IconButton, Input, Stack } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { LuSearch } from "react-icons/lu";
import TagsContainer from "./tagsContainer";
import SearchDropDown from "./SearchDropDown";
import { useManga } from "./contexts/MangaProvider";

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
export default function NavSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchResults, search } = useManga();
  const navigate = useNavigate();

  const debouncedSearch = useRef(
    debounce((searchTerm) => {
      search(0, 10, searchTerm);
    }, 500)
  ).current;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm(""); // Clear the search input after navigating
    }
  };
  return (
    <Stack>
      <form className="gap-2" onSubmit={handleSubmit}>
        <TagsContainer />
        <Input
          placeholder="Search Something "
          bg="white"
          color="black"
          w={{ base: "200px", lg: "500px" }}
          mx="10px"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />

        <IconButton type="submit" aria-label="Search database">
          <LuSearch />
        </IconButton>
      </form>
      {searchTerm && (
        <SearchDropDown data={searchResults} setSearchTerm={setSearchTerm} />
      )}
    </Stack>
  );
}
