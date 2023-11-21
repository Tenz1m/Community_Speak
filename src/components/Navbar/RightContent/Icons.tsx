/* eslint-disable react-hooks/rules-of-hooks */
import IconItem from "@/components/atoms/Icon";
import useCallCreatePost from "@/hooks/useCallCreatePost";
import { Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { GrAdd } from "react-icons/gr";
import { BsChatSquareDots } from "react-icons/bs";
import { PiLockLaminatedBold } from "react-icons/pi";
import { FaBusAlt } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";
import { TbMessage2Question } from "react-icons/tb";
import { HiCode } from "react-icons/hi";
import { LiaBookSolid } from "react-icons/lia";
/**
 * Displays icons in the right side of the navbar:
 *  - Github icon for the source code (not visible on mobile screen sizes)
 *  - Add icon for creating a new post (always visible)
 * @returns React.FC - icons in the right side of the navbar
 */
const icons: React.FC = () => {
  const router = useRouter();
  const { onClick } = useCallCreatePost();

  return (
    <Flex>
      <Flex
        // Not visible on mobile screen sizes
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="red"
      >


        {/* NewsPaper for recent news around the World */}
       <IconItem
          iconColor="red"
          icon={BsNewspaper}
          fontSize={30}
          onClick={() => {
            router.push("/news");
          }}
        />

          {/* Ai Based Quize on Different Topics */}
        <IconItem
          iconColor="green"
          icon={TbMessage2Question}
          fontSize={25}
          onClick={() => {
            router.push("/Quize/location");
          }}
        />



        {/* Programming Questions For Practice */}
      <IconItem
          iconColor="blue"
          icon={HiCode}
          fontSize={25}
          onClick={() => {
            router.push("/programming");
          }}
        />


        {/* Chat Application */}
      {/* <IconItem
          iconColor="#F79B0D"
          icon={BsChatSquareDots}
          fontSize={25}
          onClick={() => {
            router.push("/chat/ai");
          }}
        /> */}



        {/* Dash board to all the community and edit */}
        <IconItem
          iconColor="#AE0FF3"
          icon={PiLockLaminatedBold}
          fontSize={25}
          onClick={() => {
            router.push("/dashboard");
          }}
        />


         {/* Bus Location Tracker */}
      <IconItem
          iconColor="red"
          icon={FaBusAlt}
          fontSize={25}
          onClick={() => {
            router.push("/Bus/location");
          }}
        />


      <IconItem
          iconColor="#f0dd0a"
          icon={LiaBookSolid}
          fontSize={30}
          onClick={() => {
            router.push("/books");
          }}
        />
      </Flex>
      <>
        {/* Always visible */}
        <IconItem icon={GrAdd} fontSize={25} onClick={onClick} />
      </>
    </Flex>
  );
};
export default icons;
