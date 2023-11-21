import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
  maxWidth?: string;
  children: React.ReactNode;
}

// Assumes array of two children are passed
const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "960px"}>
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && (Array.isArray(children) ? children[0] : children)}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {children && Array.isArray(children) && children[1]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
