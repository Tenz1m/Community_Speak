import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import {
  defaultMenuItem,
  directoryMenuState,
} from "../../atoms/directoryMenuAtom";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import router from "next/router";
import useDirectory from "../../hooks/useDirectory";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      bg="white"
      height="64px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "50px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/Face.png" 
        height="55px" 
        width="55px" 
        alt="LOGO"
        m="3" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/text.png"
          height="63px"
          width="220px"
          alt="NAME"
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user as User} />
      <RightContent user={user as User} />
    </Flex>
  );
};
export default Navbar;
