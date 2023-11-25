import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Image,
  Spinner,
  Center,
  Input,   // Add Input import for editing the description
  Textarea, // Add Textarea import for editing the description
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../firebase/clientApp";
import { Community, communityState } from "../../atoms/communitiesAtom";
import moment from "moment";
import {useSetRecoilState } from "recoil";

import { ImMakeGroup } from "react-icons/im";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

// ... (previous imports)
  const imageStyle = {
    width: '280px',
    height: '320px',
    borderRadius: '10px',
    // position: 'fixed',
    marginLeft: '15px',

  };
type AboutProps = {
  communityData: Community;
  pt?: number;
  onCreatePage?: boolean;
  loading?: boolean;
};

const About: React.FC<AboutProps> = ({
  communityData,
  pt,
  onCreatePage,
  loading,
}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const setCommunityStateValue = useSetRecoilState(communityState);

  const [selectedFile, setSelectedFile] = useState<string>();
  const [imageLoading, setImageLoading] = useState(false);
  const [newDescription, setNewDescription] = useState<string>(communityData.description);
  const [newName, setNewName] = useState<string>(communityData.id);

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  const updateImage = async () => {
    if (!selectedFile) return;
    setImageLoading(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        },
      }));
    } catch (error: any) {
      console.log("updateImage error", error.message);
    }

    setImageLoading(false);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(event.target.value);
  };

  const updateDescription = async () => {
    try {
      await updateDoc(doc(firestore, "communities", communityData.id), {
        description: newDescription,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          description: newDescription,
        },
      }));
      window.location.reload();
    } catch (error: any) {
      console.log("updateDescription error", error.message);
    }
  };





        // Name Change Logic
        const onNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setNewName(event.target.value);
        };

        const updateName = async () => {
          try {
            await updateDoc(doc(firestore, "communities", communityData.id), {
              
             name: newName,
            });
          
                setCommunityStateValue((prev) => ({
                  ...prev,
                  currentCommunity: {
                    ...prev.currentCommunity,
                    name: newName,
                  },
                }));
                window.location.reload();
              } catch (error: any) {
                console.log("updateName error", error.message);
              }
            };
            
      // Name Change Logic
            const deleteCommunity = async () => {
              try {
                // Add your logic to delete the community
                // For example, you can use the deleteDoc function from Firestore
                await deleteDoc(doc(firestore, "communities", communityData.id));
          
                // After deleting, redirect to the homepage or any other page
                router.push("/");
              } catch (error: any) {
                console.log("deleteCommunity error", error.message);
              }
            };
          
      
  return (
    <Box pt={pt} position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.400"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="15pt" fontWeight={800} mr={4}>
        {communityData.name ? communityData.name : communityData.id}
        </Text>
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        {loading ? (
          <Stack mt={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="10px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            {user?.uid === communityData?.creatorId && (
              <Box
                bg="gray.100"
                width="100%"
                p={2}
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="15pt" fontWeight={900}>
                  Welcome to [{communityData.name ? communityData.name : communityData.id}] community!
                </Text>
              </Box>
            )}

            <Divider />

            <Box
              bg="gray.100"
              width="100%"
              p={2}
              borderRadius={4}
              border="1px solid"
              borderColor="gray.300"
              cursor="pointer"
            >
              <Text fontSize="15pt" fontWeight={900}>
                Description
              </Text>
              {user?.uid === communityData?.creatorId ? (
                <>
                  <Textarea
                    value={newDescription}
                    onChange={onDescriptionChange}
                    placeholder="Edit description..."
                  />
                  <Divider />
                  <Button
                    mt={3}
                    height="30px"
                    fontSize="10pt"
                    onClick={updateDescription}
                  >
                    Save Description
                  </Button>
                </>
              ) : (
                <Text fontSize="15pt" fontWeight={900}>
                  {communityData.description}
                </Text>
              )}
            </Box>

            <Divider />
            
            {/* Change Community Name */}

            <Divider />

            <Box
              bg="gray.100"
              width="100%"
              p={2}
              borderRadius={4}
              border="1px solid"
              borderColor="gray.300"
              cursor="pointer"
            >
              
              {user?.uid === communityData?.creatorId ? (
                <>
                <Text fontSize="15pt" fontWeight={900}>
                Change Name
              </Text>
                  <Textarea
                    value={newName}
                    onChange={onNameChange}
                    placeholder="Edit Community Name..."
                  />
                  <Divider />
                  <Button
                    mt={3}
                    height="30px"
                    fontSize="10pt"
                    onClick={updateName}
                  >
                    Save Name
                  </Button>
                </>
              ) : (
                <Text fontSize="15pt" fontWeight={900}>
                  {communityData.name ? communityData.name : communityData.id}
                </Text>
              )}
            </Box>

            <Divider />
            <Divider />

      {/* Delete Community Button */}
      {user?.uid === communityData?.creatorId && (
  <Box
    bg="blue.200"
    width="100%"
    p={4}
    borderRadius={8}
    boxShadow="lg"
    cursor="pointer"
    _hover={{ bg: "blue.300" }}
  >
    <Text fontSize="18px" fontWeight={900} color="white">
      Delete Community
    </Text>
    <Divider my={2} />
    <Button
      mt={3}
      height="40px"
      fontSize="14px"
      colorScheme="red"
      variant="solid"
      onClick={deleteCommunity}
    >
      Delete
    </Button>
  </Box>
)}

            <Divider />
            <Divider />


            <Stack spacing={2}>
  <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
    <Flex direction="column" flexGrow={1}>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">
          {communityData?.numberOfMembers?.toLocaleString()}
        </Text>
      </Center>
      <Center>
        <Text>Members</Text>
      </Center>
    </Flex>
    <Flex direction="column" flexGrow={1}>
      <Center>
        <Text fontSize="2xl" fontWeight="bold">{communityData.privacyType}</Text>
      </Center>
      <Center>
        <Text>Type</Text>
      </Center>
    </Flex>
  </Flex>
  <Divider />
  <center>
    <Flex
      align="center"
      justify="center"
      width="100%"
      p={1}
      fontWeight={500}
      fontSize="10pt"
    >
      <center>
        <Icon as={RiCakeLine} mr={2} fontSize={18} />

        {communityData?.createdAt && (
          <center>
            <Text  fontSize="13pt" fontWeight="bold" textAlign="center">
              Created{" "}
              {moment(
                new Date(communityData.createdAt!.seconds * 1000)
              ).format("MMM DD, YYYY")}
            </Text>
          </center>
        )}
      </center>
    </Flex>
  </center>
               <Center>
                <Text fontSize="15pt" fontWeight={900}>
                {communityData.name ? communityData.name : communityData.id}
                </Text>
               </Center>
               <Center>
                <Text fontSize="15pt" fontWeight={900}>
                  {communityData.description}
                </Text>
               </Center>
               
              {!onCreatePage && (
                <Link href={`/r/${router.query.community}/submit`}>
                  <center>
                    <Button mt={3} height="30px" fontSize="10pt">
                      Create Post
                    </Button>
                  </center>
                </Link>
              )}

              {user?.uid === communityData?.creatorId && (
                <>
                  <Divider />
                  <Stack fontSize="14pt" spacing={1}>
                    <Text fontWeight={"bold"} align="center">Admin</Text>
                    <Flex align="center" justify="space-between">
                      <Text
                        align="center"
                        color="Dark"
                        as='cite'
                        fontWeight="bold"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        Change Image
                      </Text>
                      {communityData?.imageURL || selectedFile ? (
                        <Image
                          borderRadius="full"
                          boxSize="70px"
                          src={selectedFile || communityData?.imageURL}
                          alt="Community Image"
                        />
                      ) : (
                        <Icon
                          as={ImMakeGroup}
                          fontSize={40}
                          color="brand.100"
                          mr={2}
                        />
                      )}
                    </Flex>
                    {selectedFile &&
                      (imageLoading ? (
                        <Spinner />
                      ) : (
                        <Text
                          cursor="pointer"
                          _hover={{ textDecoration: "underline" }}
                          as='cite'
                          fontWeight={600}
                          fontSize="14pt"
                          onClick={updateImage}
                        >
                          Save Changes
                        </Text>
                      ))}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      hidden
                      ref={selectFileRef}
                      onChange={onSelectImage}
                    />
                  </Stack>
                  
                </>
              )}
              <Box  position="relative" top="20px">
              <img src="/images/Face.png" alt="Dashboard" style={imageStyle} />
            </Box>
            </Stack>
          </>
        )}
      </Flex>
    </Box>
    
  );
                                   
};

export default About;
