import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Link, SimpleGrid, Center, Icon } from '@chakra-ui/react';
import { LiaQuestionSolid } from "react-icons/lia";

interface Problem {
  name: string;
  contestId: number;
  index: string;
  // Add other properties as needed
}

interface CodeforcesApiResponse {
  result: {
    problems: Problem[];
  };
  // Add other properties as needed
}

interface CodingQuestionsProps {
  // Add any additional props if needed
}

const CodingQuestions: React.FC<CodingQuestionsProps> = () => {
  const [questions, setQuestions] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CodeforcesApiResponse>('https://codeforces.com/api/problemset.problems');
        setQuestions(response.data.result.problems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const borderColors = ['#FF5733', '#3371FF', '#33FF57', '#FF33DC', '#FFC833'];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * borderColors.length);
    return borderColors[randomIndex];
  };

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
              borderColor={getRandomColor()}
              _hover={{
                borderColor: 'blue.500',
                bg: '#F3EE35',
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
