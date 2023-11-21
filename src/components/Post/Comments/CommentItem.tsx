import React, { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import { BiUserVoice } from "react-icons/bi";
import { TbUserExclamation } from "react-icons/tb";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export type Comment = {
  id?: string;
  creatorId: string;
  creatorDisplayText: string;
  creatorPhotoURL: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt?: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  isLoading: boolean;
  userId?: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  isLoading,
  userId,
}) => {
  // const [loading, setLoading] = useState(false);

  // const handleDelete = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     const success = await onDeleteComment(comment);

  //     if (!success) {
  //       throw new Error("Error deleting comment");
  //     }
  //   } catch (error: any) {
  //     console.log(error.message);
  //     // setError
  //     setLoading(false);
  //   }
  // }, [setLoading]);

  return (
    <Flex>
      <Box mr={3}>
        <Icon as={BiUserVoice} fontSize={55} color="Green" />
      </Box>
      <Stack spacing={1}>
        <Stack direction="row" align="center" spacing={2} >
          <Text
            fontFamily="Body Font Name" 
            fontSize="18pt"
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment.creatorDisplayText}
          </Text > 
          {comment.createdAt?.seconds && (
            <Text color="Blue" fontSize="12pt" fontFamily="Raleway', sans-serif" >
              Time : {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          )}
          {isLoading && <Spinner size="sm" />}
        </Stack>
        <Text fontSize="18pt" >{comment.text}</Text>
        <Stack
          direction="row"
          align="center"
          cursor="pointer"
          fontWeight={600}
          color="gray.500"
        >
          {/* <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} /> */}
          {userId === comment.creatorId && (
            <>
              {/* <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text> */}
              <Icon as={TbUserExclamation} fontSize={25} color="Red" />
              <Text
                fontSize="12pt"
                _hover={{ color: "Red" }}
                onClick={() => onDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
