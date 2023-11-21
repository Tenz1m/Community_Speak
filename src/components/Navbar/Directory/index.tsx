import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

const Directory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      {({ isOpen }) => (
        <>
          <MenuButton
            cursor="pointer"
            padding="0px 6px"
            borderRadius="4px"
            _hover={{ outline: "1px solid", outlineColor: "gray.400" }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={toggleMenuOpen}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width={{ base: "auto", lg: "250px" }}
            >
              <Flex alignItems="center">
                <>
                  {directoryState.selectedMenuItem.imageURL ? (
                    <Image
                      borderRadius="full"
                      boxSize="34px"
                      src={directoryState.selectedMenuItem.imageURL}
                      mr={2}
                      alt=""
                    />
                  ) : (
                    <Icon
                      fontSize={34}
                      mr={{ base: 1, md: 2 }}
                      color={directoryState.selectedMenuItem.iconColor}
                      as={directoryState.selectedMenuItem.icon}
                    />
                  )}
                  <Box
                    display={{ base: "none", lg: "flex" }}
                    flexDirection="column"
                    fontSize="13pt"
                  >
                    <Text fontWeight={800}>
                      {directoryState.selectedMenuItem.displayText}
                    </Text>
                  </Box>
                </>
              </Flex>
              <ChevronDownIcon color="gray.500" />
            </Flex>
          </MenuButton>
          <MenuList maxHeight="330px" overflow="scroll" overflowX="hidden">
            <Communities menuOpen={isOpen} />
          </MenuList>
        </>
      )}
    </Menu>
  );
};
export default Directory;
