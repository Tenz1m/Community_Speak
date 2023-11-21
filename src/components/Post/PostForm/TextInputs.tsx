import React from "react";
import { Stack, Input, Textarea, Flex, Button } from "@chakra-ui/react";

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

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
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
      <Flex justify="flex-end">
        <Button
          height="54px"
          width="154px"
          padding="0px 30px"
          disabled={!textInputs.title}
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
