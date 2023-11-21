import React, { useState } from "react";
import {
  Center,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { NextRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FcLike} from "react-icons/fc";
import { FaReddit } from "react-icons/fa";
import { FcDeleteColumn } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { MdOutlinePostAdd } from "react-icons/md";
import { BiDislike,BiLike } from "react-icons/bi";
import { AiTwotoneDislike,AiTwotoneLike } from "react-icons/ai";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Post } from "../../../atoms/postsAtom";
import Link from "next/link";

export type PostItemContentProps = {
  post: Post;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string,
    postIdx?: number
  ) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  userIsCreator: boolean;
  onSelectPost?: (value: Post, postIdx: number) => void;
  router?: NextRouter;
  postIdx?: number;
  userVoteValue?: number;
  homePage?: boolean;
};

const PostItem: React.FC<PostItemContentProps> = ({
  post,
  postIdx,
  onVote,
  onSelectPost,
  router,
  onDeletePost,
  userVoteValue,
  userIsCreator,
  homePage,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostView = !onSelectPost; // function not passed to [pid]

  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) throw new Error("Failed to delete post");

      console.log("Post successfully deleted");

      // Could proably move this logic to onDeletePost function
      if (router) router.back();
    } catch (error: any) {
      console.log("Error deleting post", error.message);
      /**
       * Don't need to setLoading false if no error
       * as item will be removed from DOM
       */
      setLoadingDelete(false);
      // setError
    }
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostView ? "white" : "gray.300"}
      borderRadius={singlePostView ? "4px 4px 0px 0px" : 4}
      cursor={singlePostView ? "unset" : "pointer"}
      _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
      onClick={() => onSelectPost && post && onSelectPost(post, postIdx!)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostView ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? AiTwotoneLike : BiLike
          }
          color={userVoteValue === 1 ? "#24A1E8" : "gray.400"}
          fontSize={35}
          cursor="pointer"
          onClick={(event) => onVote(event, post, 1, post.communityId)}
        />
        <Text fontSize="15pt" fontWeight={600}>
          {post.voteStatus}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? AiTwotoneDislike
              : BiDislike
          }
          color={userVoteValue === -1 ? "red" : "gray.400"}
          fontSize={35}
          cursor="pointer"
          onClick={(event) => onVote(event, post, -1, post.communityId)}
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px 10px">
          {post.createdAt && (
            <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
              {homePage && (
                <>
                  {post.communityImageURL ? (
                    <Image
                      borderRadius="md"
                      boxSize="38px"
                      src={post.communityImageURL}
                      mr={2}
                      alt=""
                    />
                  ) : (
                    <Icon as={MdOutlinePostAdd} fontSize={18} mr={1} color="blue.500" />
                  )}
                  <Link href={`r/${post.communityId}`}>
                    <Text
                      as='b'
                      fontWeight={900}
                      _hover={{ textDecoration: "underline" }}
                      fontSize="lg"
                      onClick={(event) => event.stopPropagation()}
                    >{`[ ${post.communityId} ]`}</Text>
                  </Link>
                  <Icon as={BsDot} color="gray.500" fontSize={10} />
                </>
              )}
              {/* <Text as='mark' color="Blue" fontSize="12pt" fontWeight={600}> */}
              <Text as='b' textTransform="uppercase" color="Green" fontSize="18pt" fontWeight={600}>
                Posted by {post.userDisplayText} /
               ({post.creatorUsername})
                {/* {moment(new Date(post.createdAt.seconds * 1000)).fromNow()} */}
              </Text>
            </Stack>
          )}
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="15pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                // width="80%"
                // maxWidth="500px"
                maxHeight="460px"
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.300" }}
            cursor="pointer"
          >
            <Icon as={FcComments} mr={4} style={{ fontSize: '40px' }} />
            <Text marginTop="2" fontWeight="bold" fontSize="25pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.300" }}
            cursor="pointer"
          >
            <Icon as={FcLike} mr={4} style={{ fontSize: '40px' }} />
            <Text marginTop="2" fontWeight="bold" fontSize="25pt">{post.voteStatus}</Text>
          </Flex>
          {/* Share component */}
          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share (Working On It)</Text>
          </Flex> */}
          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex> */}
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={FcDeleteColumn} mr={4} style={{ fontSize: '35px', color: 'Green' }} />
                  <Text marginTop="2" fontWeight="bold" fontSize="20pt">Delete</Text>
                </>
              )}
            </Flex>
            

            
          )}
          <Flex justify="flex-end" >
          {post.createdAt && (
        <Text as='b' textTransform="uppercase" color="Blue" ml="3" fontSize="14pt" fontWeight={600}>
          {/* Posted by {post.userDisplayText}  */}
          {/* ({post.creatorUsername}) / */}
          <Center>
        <Text>Posted <br /></Text>
        </Center>
          {post.createdAt?.seconds &&
            moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
        </Text>
           )}
           </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
