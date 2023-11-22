import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../firebase/clientApp';
import { Img, Text } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
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

interface DataItem {
  id: string;
  name: string;
  description: string;
  numberOfMembers: string;
  privacyType: string;
}

const CrudTable: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCollection = await getDocs(collection(firestore, 'communities'));
        const dataArray: DataItem[] = dataCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as DataItem,
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
    const communityToEdit = data.find((item) => item.id === id);
    if (communityToEdit) {
      setEditedName(communityToEdit.numberOfMembers);
      setEditedDescription(communityToEdit.description);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedName('');
    setEditedDescription('');
  };

  const handleSaveEdit = async () => {
    try {
      if (!editingId) {
        console.error('No item is being edited.');
        return;
      }

      const communityDocRef = doc(firestore, 'communities', editingId);
      await updateDoc(communityDocRef, {
        numberOfMembers: editedName,
        description: editedDescription,
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.id === editingId
            ? { ...item, numberOfMembers: editedName, description: editedDescription }
            : item
        )
      );

      setEditingId(null);
      setEditedName('');
      setEditedDescription('');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'communities', id));

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
        width: '1280px', // Set the desired width
        height: 'auto', // Set the desired height
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20211118/pngtree-modern-technology-dashboard-image_908914.jpg')`, // Replace with your background image URL
        backgroundSize: 'cover',
      }}
    >
      <Center>
        <h1 style={{ fontWeight: 'bold', fontSize: '28px', color: '#daf542' }}>Community Table</h1>
      </Center>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>Name</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>Type</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>No.Member</Th>
            <Th style={{ fontWeight: 'bold', fontSize: '20px', color: '#daf542' }}>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.id}</Td>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.privacyType}</Td>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.numberOfMembers}</Td>
              <Td style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{item.description}</Td>
              <Td>
                {editingId === item.id ? (
                  <Input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    variant="filled"
                    bg="white"
                    color="red"
                  />
                ) : (
                  <Text style={{ color: "yellow" }}>
                    {item.numberOfMembers}
                  </Text>
                )}
              </Td>
              <Td>
                {editingId === item.id ? (
                  <Input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    variant="filled"
                    bg="white"
                    color="red"
                  />
                ) : (
                  <Text style={{ color: "yellow" }}>
                    {item.description}
                  </Text>
                )}
              </Td>
              <Td>
                {editingId === item.id ? (
                  <>
                    <Button
                      onClick={handleSaveEdit}
                      size="sm"
                      colorScheme="teal" // Color for the "Save" button
                    >
                      Save
                    </Button>
                    <br />
                    <br />
                    <Button
                      onClick={handleCancelEdit}
                      size="sm"
                      colorScheme="red" // Color for the "Cancel" button
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEdit(item.id)}
                      size="md"
                      colorScheme="blue" // Color for the "Edit" button
                      mr={2}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      size="md"
                      colorScheme="red" // Color for the "Delete" button
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

export default CrudTable;
