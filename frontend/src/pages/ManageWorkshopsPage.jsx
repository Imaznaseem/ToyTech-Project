import React from "react";
import {
  Box,
  Heading,
  VStack,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import EditWorkshopModal from "../components/EditWorkshopModal";
import CreateWorkshopModal from "../components/CreateWorkshopModal";

const ManageWorkshopsPage = ({ workshops, onRefresh }) => {
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [selectedWorkshop, setSelectedWorkshop] = React.useState(null);

  const handleEdit = (workshop) => {
    setSelectedWorkshop(workshop);
    onEditOpen();
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      bg="gray.100"
      p={6}
    >
      <Box
        bg="white"
        p={8}
        shadow="lg"
        borderRadius="md"
        maxW="600px"
        w="100%"
        textAlign="center"
      >
        {/* Centrera rubriken */}
        <Heading size="lg" mb={6} color="teal.600">
          Hantera Workshops
        </Heading>

        {/* Centrera listan av workshops */}
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
                <Box textAlign="left">
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

        {/* Centrera knappen */}
        <Button colorScheme="green" onClick={onCreateOpen}>
          Skapa Ny Workshop
        </Button>

        {/* Modaler */}
        <CreateWorkshopModal
          isOpen={isCreateOpen}
          onClose={onCreateClose}
          onRefresh={onRefresh}
        />
        <EditWorkshopModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          workshop={selectedWorkshop}
          onRefresh={onRefresh}
        />
      </Box>
    </Flex>
  );
};

export default ManageWorkshopsPage;