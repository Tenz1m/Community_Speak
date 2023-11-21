import React from "react";
import { Flex, Icon, Text, Stack, Button, Center } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";
import { PiBusDuotone } from "react-icons/pi";
import Link from "next/link";

const Premium: React.FC = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      p="12px"
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex mb={2}>
        <Icon as={PiBusDuotone} fontSize={26} color="brand.100" mt={2} />
        <Stack spacing={1} fontSize="9pt" pl={2}>
          <Text fontWeight={600}>Official</Text>
          <Text>AnyTime Bus</Text>
        </Stack>
      </Flex>
      <Link href="/Bus/location">
      <Center>
      <Button height="40px" width="160px" bg="Green" >
        Try Now
      </Button>
      </Center>
      </Link>
    </Flex>
  );
};
export default Premium;
