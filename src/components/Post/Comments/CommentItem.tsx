import React, { useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import moment from "moment";
import { BiUserVoice } from "react-icons/bi";
import { TbUserExclamation } from "react-icons/tb";
import {
  IoArrowUpCircleOutline,
} from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from '../../../firebase/clientApp'; // Import your Firebase config
import { TbFileLike } from "react-icons/tb";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  creatorPhotoURL: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  commentVotes?: number;
  createdAt?: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  onUpdateComment: (commentId: string, newText: string) => void;
  isLoading: boolean;
  userId?: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  onUpdateComment,
  isLoading,
  userId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [votes, setVotes] = useState(comment.commentVotes || 0);
  const [userVoted, setUserVoted] = useState(false);

  const handleVote = async () => {
    if (!userVoted && votes < 3) {
      // Increment votes locally
      setVotes((prevVotes) => prevVotes + 1);
      // Mark user as voted
      setUserVoted(true);

      try {
        // Reference to a specific comment document
        const commentDocRef = doc(collection(firestore, 'comments'), comment.id);

        // Update the document with the new vote count
        await updateDoc(commentDocRef, {
          commentVotes: votes + 1,
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateComment(comment.id, editedText);
    setIsEditing(false);
  };

  return (
    <Flex>
      <Flex>
        {comment.creatorPhotoURL ? (
          <Avatar src={comment.creatorPhotoURL} size="xl" boxSize={16} mr={3} marginTop={4} border="4px"
            borderColor="black" borderRadius="0" />
        ) : (
          <Box mr={3}>
            <Icon as={BiUserVoice} fontSize={55} color="Green" />
          </Box>
        )}
      </Flex>

      <Stack spacing={1}>
        <Stack direction="row" align="center" spacing={2}>
          <Text
            fontFamily="Body Font Name"
            fontSize="18pt"
            fontWeight={700}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {comment.creatorDisplayText}
          </Text>
          {comment.createdAt?.seconds && (
            <Text color="Blue" fontSize="12pt" fontFamily="Raleway', sans-serif">
              Time: {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          )}
          {isLoading && <Spinner size="sm" />}
        </Stack>
        {isEditing ? (
          <Stack direction="row" align="center" spacing={2}>
            <Input
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <Button onClick={handleSaveClick} colorScheme="teal">
              Save
            </Button>
          </Stack>
        ) : (
          <Text fontSize="18pt">{comment.text}</Text>
        )}
        <Stack direction="row" align="center" cursor="pointer" fontWeight={600} color="gray.500">
          <Icon as={TbFileLike} fontSize={25} color="Blue" onClick={handleVote} />
          <Text fontSize="18pt" ml={1}>{votes}</Text>
          {userId === comment.creatorId && (
            <>
              {!isEditing && (
                <>
                  <Icon as={TiEdit} fontSize={25} color="Green" onClick={handleEditClick} />
                  <Text fontSize="12pt" _hover={{ color: "blue" }} onClick={handleEditClick}>
                    Edit
                  </Text>
                </>
              )}
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
