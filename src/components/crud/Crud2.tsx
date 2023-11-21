import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/clientApp';
import { Text } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Center,
} from '@chakra-ui/react';

interface PostItem {
  id: string;
  title: string;
  content: string;
  body: string;
  creatorUsername: string;
  voteStatus: string;
}

const PostTable: React.FC = () => {
  const [data, setData] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedContent, setEditedContent] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCollection = await getDocs(collection(firestore, 'posts'));
        const dataArray: PostItem[] = dataCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as PostItem,
        }));
        setData(dataArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: string) => {
    setEditingId(id);
    const postToEdit = data.find((item) => item.id === id);
    if (postToEdit) {
      setEditedTitle(postToEdit.voteStatus);
      setEditedContent(postToEdit.body);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle('');
    setEditedContent('');
  };

  const handleSaveEdit = async () => {
    try {
      if (!editingId) {
        console.error('No item is being edited.');
        return;
      }

      const postDocRef = doc(firestore, 'posts', editingId);
      await updateDoc(postDocRef, {
        voteStatus: editedTitle,
        body: editedContent,
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingId
            ? { ...item, voteStatus: editedTitle, body: editedContent }
            : item
        )
      );

      setEditingId(null);
      setEditedTitle('');
      setEditedContent('');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'posts', id));

      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: '1280px',
        height: 'auto',
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20211118/pngtree-modern-technology-dashboard-image_908914.jpg')`,
        backgroundSize: 'cover',
      }}
    >
       <Center>
          <h1 style={{ fontWeight: 'bold', fontSize: '28px', color: '#daf542' }}>Posts Table</h1>
        </Center>      
        <Table variant="simple">
        <Thead>
          <Tr>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>ID</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>Body</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>CraetorName</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>Vote</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>Edit</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.id}</Td>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.body}</Td>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.creatorUsername}</Td>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.voteStatus}</Td>
              <Td>
                {editingId === item.id ? (
                  <Input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    variant="filled"
                    bg="white" 
                    color="red"
                  />
                ) : (
                  <Text style={{ color: "yellow" }}>
                  {item.voteStatus}
                </Text>
                )}
              </Td>
              <Td>
                {editingId === item.id ? (
                  <Input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    variant="filled"
                    bg="white" 
                    color="red"
                  />
                ) : (
                  <Text style={{ color: "yellow" }}>
                  {item.body}
                </Text>
                )}
              </Td>
              <Td>
                {editingId === item.id ? (
                  <>
                    <Button
                      onClick={handleSaveEdit}
                      size="sm"
                      colorScheme="teal"
                    >
                      Save
                    </Button>
                    <br />
                    <br />
                    <Button
                      onClick={handleCancelEdit}
                      size="sm"
                      colorScheme="red"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEdit(item.id)}
                      size="md"
                      colorScheme="blue"
                      mr={2}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      size="md"
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default PostTable;
