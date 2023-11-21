import { ChatEngine } from 'react-chat-engine';
import { Box } from '@chakra-ui/react';

const ChatComponent = () => {
  return (
    <Box
      width="100%"  // Make the Box 100% width
      height="100vh"  // Adjust the height as needed
      bg="gray.100"  // Background color
      p="4"  // Padding
    >
      <ChatEngine
        height="300%"  // Set ChatEngine to 100% height
        projectID="6c2a2145-69d7-47d8-8cf1-7db368c6be13"
        userName="tanjim"
        userSecret="abc"
      />
    </Box>
  );
}

export default ChatComponent;
