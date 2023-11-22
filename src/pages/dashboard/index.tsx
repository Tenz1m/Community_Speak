import { CSSProperties } from "react";
import { useState } from "react";
import { NextPage } from "next";
import { Box, Input, Button, Center, Image } from "@chakra-ui/react";

const CreateCommunityPostPage: NextPage = () => {
  const [accessCode, setAccessCode] = useState("");
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const checkAccessCode = () => {
    if (accessCode === "Admin") {
      setIsAccessGranted(true);
    } else {
      alert("Incorrect access code. Please try again.");
    }
  };

  const pageStyle: CSSProperties = {
    backgroundImage: 'url("https://wso2.com/files/fullsizeoutput_247.jpeg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  if (!isAccessGranted) {
    return (
      <div style={pageStyle}>
        <Box mb="8">
          <Image src="/images/lock.jpg" alt="Background Image" boxSize="350px" objectFit="cover" borderRadius="md" />
        </Box>
        <Box>
          <Input
            placeholder="Enter access code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            mb="4"
            size="lg"
            bg="white"
            color="red"
          />
          <Center>
            <Button colorScheme="teal" size="lg" onClick={checkAccessCode}>
              Submit
            </Button>
          </Center>
        </Box>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Box w="1280px" h="190px" mb="38">
          <Center>
            <Image src="/images/dashboard.jpg" alt="Dashboard" />
          </Center>
        </Box>
        <br /><br />
        <Center>
          {/* <CrudTable /> */}
        </Center>
        <br />
        <center>
          {/* <PostTable/> */}
        </center>
      </div>
    </div>
  );
};

export default CreateCommunityPostPage;
