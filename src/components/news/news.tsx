import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Select, Center } from "@chakra-ui/react";
import axios from "axios";
import NewsItem from "../news/item"; // Assuming NewsItem is in a separate file

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
}

const imageStyle: React.CSSProperties = {
  width: '120px',
  height: '120px',
  borderRadius: '10px',
  position: 'fixed',
  marginLeft: '15px',
  top: '100px',
  right: '50px',
};

const NewsComponent: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [category, setCategory] = useState<string>("business"); // Default category
  const [country, setCountry] = useState<string>("us"); // Default country
  const apiKey = "e3684bd3343042cbb5db705eaaf88484";

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, [country, category]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  return (
    <Box p={4} bg="white" boxShadow="md" borderRadius="md">
      <img src="/images/Face.png" alt="Dashboard" style={imageStyle} />
      <Center>
        <Heading as="h2" size="lg" mb={4}>
          Top {category.charAt(0).toUpperCase() + category.slice(1)} News from {country.toUpperCase()}
        </Heading>
      </Center> 
      <Select
        value={category}
        onChange={handleCategoryChange}
        mb={2}
        maxW="200px"
      >
        <option value="business">Business</option>
        <option value="entertainment">Entertainment</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
      </Select>
      <Select
        value={country}
        onChange={handleCountryChange}
        mb={4}
        maxW="200px"
      >
        <option value="us">United States</option>
        <option value="gb">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="in">Bangladesh</option>
        <option value="pk">Pakistan</option>
        <option value="ru">Russia</option>
        {/* Add more country options as needed */}
      </Select>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {news.map((article, index) => (
          <NewsItem
            key={index}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            newsUrl={article.url}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default NewsComponent;
