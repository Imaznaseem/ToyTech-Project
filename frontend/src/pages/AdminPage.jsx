import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  Divider,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { fetchWorkshops } from "../api/workshops";
import CreateWorkshopModal from "../components/CreateWorkshopModal";
import EditWorkshopModal from "../components/EditWorkshopModal";
import LogoutButton from '../components/Logout'; // Adjust the path if needed
import BookingList from "../components/BookingList";

const AdminPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  // Fetch workshops from server
  const refreshWorkshops = async () => {
    setLoading(true);
    try {
      const data = await fetchWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error("Failed to fetch workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshWorkshops();
  }, []);

  const handleEdit = (workshop) => {
    setSelectedWorkshop(workshop);
    onEditOpen();
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex
      direction={["column", "row"]}
      bg="gray.100"
      minH="100vh"
      p={4}
      gap={6}
      w="100vw" // Ensure it spans the full viewport width
      overflow="hidden" // Prevent horizontal scrolling
    >

      {/* Left Section */}
      <Box
        flex="2"
        bg="white"
        p={6}
        shadow="md"
        borderRadius="md"
        boxSizing="border-box"
        maxW="100%" // Prevent content overflow
      >
        {/* Header Section */}
        <Flex
          bg="white"
          p={4}
          shadow="md"
          borderRadius="md"
          align="center"
        >
          <LogoutButton />
        </Flex>

        <Heading size="md" mb={4} color="teal.600">
          Booking Requests
        </Heading>
        <VStack align="stretch" spacing={4} mb={8}>
          {/* Booking Requests */}
          <Box bg="white" p={6} shadow="md" borderRadius="md">
            <BookingList title="Booking Requests" isConfirmed={false} />
          </Box>
        </VStack>

        <Divider />

        <Heading size="md" mt={8} mb={4} color="teal.600">
          Upcoming Workshops
        </Heading>
        <VStack align="stretch" spacing={4}>
          {/* Upcoming Workshops */}
          <Box bg="white" p={6} shadow="md" borderRadius="md">
            <BookingList title="Upcoming Workshops" isConfirmed={true} />
          </Box>
        </VStack>
      </Box>

      {/* Right Section */}
      <Box
        flex="3"
        bg="white"
        p={6}
        shadow="md"
        borderRadius="md"
        boxSizing="border-box"
        maxW="100%" // Prevent content overflow
      >
        <Heading size="md" mb={4} color="teal.600">
          Edit Workshops
        </Heading>
        <VStack align="stretch" spacing={4} mb={8}>
          {workshops.map((workshop) => (
            <Box
              key={workshop.id}
              bg="gray.50"
              p={4}
              shadow="sm"
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              <Flex justify="space-between" align="center">
                <Box>
                  <Heading size="sm">{workshop.title}</Heading>
                  <Text>{workshop.description}</Text>
                </Box>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => handleEdit(workshop)}
                >
                  Edit
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>

        <Button colorScheme="green" onClick={onCreateOpen} mt={4}>
          Create New Workshop
        </Button>
      </Box>

      {/* Modals */}
      <CreateWorkshopModal isOpen={isCreateOpen} onClose={onCreateClose} />
      <EditWorkshopModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        workshop={selectedWorkshop}
      />
    </Flex>
  );
};

export default AdminPage;
