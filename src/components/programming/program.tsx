import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Center } from '@chakra-ui/react';

interface Question {
  contestId: number;
  index: string;
  name: string;
  // Add other properties as needed
}

const CodingQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let page = 1;
        let allQuestions: Question[] = [];

        // Loop to fetch all pages of problems
        while (true) {
          const response = await axios.get(`https://codeforces.com/api/problemset.problems?tags=implementation&page=${page}`);
          if (response.data.status === 'OK' && response.data.result.problems.length > 0) {
            allQuestions = allQuestions.concat(response.data.result.problems);
            page++;
          } else {
            break; // No more questions
          }
        }

        setQuestions(allQuestions);
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
      {loading ? (
        <Center h="100vh">
          <p>Loading questions...</p>
        </Center>
      ) : (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <a href={`https://codeforces.com/problemset/problem/${question.contestId}/${question.index}`} target="_blank" rel="noopener noreferrer">
                {question.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CodingQuestions;
