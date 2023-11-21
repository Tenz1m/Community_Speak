import React, { useState } from "react";
import { Flex, InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { User } from "firebase/auth";
import { useRouter } from "next/router"; // Import useRouter hook

type SearchInputProps = {
  user: User;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter(); // Use useRouter hook

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    router.push(`/r/${searchInput}`); // Use router.push to navigate
  };

  return (
    <Flex
      flexGrow={1}
      maxWidth={user ? "auto" : "600px"}
      mr={2}
      alignItems="center"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.400">
          <SearchIcon mb={2} />
        </InputLeftElement>
        <Input
          placeholder="Search Community"
          fontSize="10pt"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
          value={searchInput}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </InputGroup>
      <Button
        ml={2}
        onClick={handleSearch}
        disabled={!searchInput}
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchInput;
