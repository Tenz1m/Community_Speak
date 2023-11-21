import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Link, SimpleGrid, Center, Icon } from '@chakra-ui/react';
import { LiaQuestionSolid } from "react-icons/lia";

// Define an array of border colors
const borderColors = ['#FF5733', '#3371FF', '#33FF57', '#FF33DC', '#FFC833'];

const getRandomColor = () => {
  // Generate a random index within the range of the borderColors array
  const randomIndex = Math.floor(Math.random() * borderColors.length);
  // Return the color at the random index
  return borderColors[randomIndex];
};

const CodingQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://codeforces.com/api/problemset.problems');
        setQuestions(response.data.result.problems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
<Heading as="h1" size="2xl" mb={5} textAlign="center" mx="auto" fontWeight="bold" fontFamily="unique-font">
  Coding Questions
  <Icon as={LiaQuestionSolid} mr={2} />
</Heading>
      {loading ? (
        <Center h="100vh">
          <p>Loading questions...</p>
          <p>Please Wait</p>
        </Center>
      ) : (
        <SimpleGrid columns={5} spacing={4}>
          {questions.map((question, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              borderColor={getRandomColor()} // Assign a random border color
              _hover={{
                borderColor: 'blue.500', // Change border color on hover
                bg: '#F3EE35', // Change background color on hover
              }}
            >
              <Heading as="h2" size="md" mb={2}>
                <Link href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`} target="_blank" rel="noopener noreferrer">
                  {question.name}
                </Link>
              </Heading>
              <Text>Contest ID: {question.contestId}</Text>
              <Text>Index: {question.index}</Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default CodingQuestions;
