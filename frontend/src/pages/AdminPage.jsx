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
            <Flex justify="center" align="center" minH="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
      <Flex bg="gray.100" minH="100vh" w="100%" p={8} gap={6}>
          {/* Left Section */}
          <Box flex="2" bg="white" p={6} shadow="md" borderRadius="md">
              <Heading size="md" mb={4} color="teal.600">
                  Booking Requests
              </Heading>
              <VStack align="stretch" spacing={4} mb={8}>
                  <Box bg="gray.50" p={4} shadow="sm" borderRadius="md">
                      <Text>Request 1</Text>
                  </Box>
                  <Box bg="gray.50" p={4} shadow="sm" borderRadius="md">
                      <Text>Request 2</Text>
                  </Box>
              </VStack>

              <Divider />

              <Heading size="md" mt={8} mb={4} color="teal.600">
                  Upcoming Workshops
              </Heading>
              <VStack align="stretch" spacing={4}>
                  <Box bg="gray.50" p={4} shadow="sm" borderRadius="md">
                      <Text>Workshop 1</Text>
                  </Box>
                  <Box bg="gray.50" p={4} shadow="sm" borderRadius="md">
                      <Text>Workshop 2</Text>
                  </Box>
              </VStack>
          </Box>

          {/* Right Section */}
          <Box flex="3" bg="white" p={6} shadow="md" borderRadius="md">
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