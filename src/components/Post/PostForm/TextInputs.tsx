import React, { useState, useEffect } from "react";
import { Stack, Input, Textarea, Flex, Button, Box, Text } from "@chakra-ui/react";
import axios from 'axios';

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const localProfanityList = [
  "fuck", "bitch", "shit", "son of a bitch", "bugger",
  "pissed", "damn", "jesus christ", "bloody hell", "cunt", "bastard", "fuckface",
  "jerk", "nerd", "bimbo", "show off", "creepy", "loser", "suck",
  "magi", "sala", "foinni", "kutta", "besha", "khanki", "bolod"
];

const hasLocalProfanity = (text: string): boolean => {
  const lowerCaseText = text.toLowerCase();
  return localProfanityList.some((word) => lowerCaseText.includes(word));
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  const [isLocalProfanity, setIsLocalProfanity] = useState(false);
  const [isApiProfanity, setIsApiProfanity] = useState(false);

  useEffect(() => {
    const checkLocalProfanity = () => {
      const isProfanity = hasLocalProfanity(`${textInputs.title} ${textInputs.body}`);
      setIsLocalProfanity(isProfanity);
    };

    checkLocalProfanity();
  }, [textInputs]);

  useEffect(() => {
    const checkApiProfanity = async () => {
      try {

        // Using TextRazor Api To modirate words
        
        const response = await axios.post('https://api.textrazor.com/v1/check', {
          text: `${textInputs.title} ${textInputs.body}`,
          extractors: ["profanity"]
        }, {
          headers: {
            'x-textrazor-key': '7d1d7433844d7872d0c5c94682b818aacb75cfeca8ef27b46390b6c7',
            'Content-Type': 'application/json'
          }
        });

        const isProfanity = response.data.response.entities.profanity.length > 0;
        setIsApiProfanity(isProfanity);
      } catch (error) {
        console.error('Error checking profanity:', error);
      }
    };

    checkApiProfanity();
  }, [textInputs]);

  const isProfanity = isLocalProfanity || isApiProfanity;

  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        fontSize="15pt"
        borderRadius={4}
        placeholder="Title"
      />
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="15pt"
        placeholder="Text Here"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        height="100px"
      />
      {isProfanity && (
        <Box>
          <Text color="red">Warning: Inappropriate words detected!!! . You Cannot post that.</Text>
        </Box>
      )}
      <Flex justify="flex-end">
        <Button
          height="54px"
          width="154px"
          padding="0px 30px"
          isDisabled={isProfanity}
          isLoading={loading}
          onClick={handleCreatePost}
          style={{ fontSize: '18px' }} 
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
