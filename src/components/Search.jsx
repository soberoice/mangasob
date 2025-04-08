import { IconButton, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LuSearch } from "react-icons/lu";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState(""); // Corrected destructuring
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      console.log(searchTerm);
      setSearchTerm(""); // Clear the search input after navigating
    }
  };

  return (
    <form className="gap-2" onSubmit={handleSubmit}>
      <Input
        placeholder="Search Something "
        bg="white"
        color="black"
        w={{ base: "200px", lg: "500px" }}
        mx="10px"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton type="submit" aria-label="Search database">
        <LuSearch />
      </IconButton>
    </form>
  );
}
