import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Heading, SimpleGrid, Select, Center, Text } from "@chakra-ui/react";
import axios from "axios";
import BookItem from "../books/item"; // Assuming BookItem is in a separate file

const imageStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '10px',
  position: 'fixed',
  marginLeft: '15px',
  top: '100px',
  right: '50px',

};


interface Book {
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    };
    previewLink: string;
  };
}

const BooksComponent: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [category, setCategory] = useState<string>("fiction"); // Default category
  const [language, setLanguage] = useState<string>("en"); // Default language
  const apiKey = "AIzaSyBvBMWfwdSllB-99IipLODwCUy8e_oZi5c"; // Replace with your Google Books API key

  useEffect(() => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${category}&langRestrict=${language}&key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setBooks(response.data.items || []);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [category, language]);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="md">
      <img src="/images/Face.png" alt="Dashboard" style={imageStyle} />
      <Center>
      <Heading as="h2" size="lg" mb={4} >
        <Text fontFamily="Raleway', sans-serif">
        Top {category.charAt(0).toUpperCase() + category.slice(1)} Books in {language.toUpperCase()}
        </Text>
      </Heading>
      </Center>
      <Select
        value={category}
        onChange={handleCategoryChange}
        mb={4}
        maxW="350px"
        maxH="80px"
        bg="tomato"
        ml={20}
      >
        <option value="fiction" style={{ backgroundColor: "#6495ED" }}>Fiction</option>
        <option value="nonfiction" style={{ backgroundColor: "#6495ED" }}>Non-Fiction</option>
        <option value="mystery" style={{ backgroundColor: "#87CEEB" }}>Mystery</option>
        <option value="fantasy" style={{ backgroundColor: "#87CEEB" }}>Fantasy</option>
        <option value="science-fiction" style={{ backgroundColor: "#ADD8E6" }}>Science Fiction</option>
        <option value="biography" style={{ backgroundColor: "#B0E0E6" }}>Biography</option>
        <option value="history" style={{ backgroundColor: "#AFEEEE" }}>History</option>
        <option value="self-help" style={{ backgroundColor: "#E0FFFF" }}>Self-Help</option>
        {/* Add more category options as needed */}
      </Select>
      <Select
        value={language}
        onChange={handleLanguageChange}
        mb={4}
        maxW="400px"
        maxH="80px"
        bg="tomato"
        ml={20}
      >
      <option value="en" style={{ backgroundColor: "#4CAF50" }}>English</option>
      <option value="es" style={{ backgroundColor: "#66BB6A" }}>Spanish</option>
      <option value="bn" style={{ backgroundColor: "#66BB6A" }}>Bangla</option>
      <option value="fr" style={{ backgroundColor: "#81C784" }}>French</option>
      <option value="de" style={{ backgroundColor: "#A5D6A7" }}>German</option>
      <option value="it" style={{ backgroundColor: "#C8E6C9" }}>Italian</option>
      <option value="ja" style={{ backgroundColor: "#C8E6C9" }}>Japanese</option>
      <option value="ko" style={{ backgroundColor: "#E8F5E9" }}>Korean</option>
        {/* Add more language options as needed */}
      </Select>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {books.map((book, index) => (
          <BookItem
            key={index}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors}
            imageUrl={book.volumeInfo.imageLinks.thumbnail}
            previewLink={book.volumeInfo.previewLink}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BooksComponent;
