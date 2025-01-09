import React from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  Image,
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
    <Box
      bg="#111839" // Gradient bakgrund
      minH="100vh"
      w="100vw"
      overflowX="hidden"
      py={10}
      px={6}
      color="white"
    >
      <Flex
        maxW="1240px"
        mx="auto"
        direction="column"
        align="center"
        gap={6}
      >
        {/* Rubrik */}
        <Heading
          as="h2"
          size="xl"
          fontWeight="bold"
          mb={8}
          textAlign="center"
          fontSize={["2xl", "3xl", "4xl"]}
        >
          Hantera Workshops
        </Heading>

        {/* Workshops Grid */}
        <Flex
          gap={8}
          wrap="wrap"
          justify="center"
          maxW="1240px"
        >
          {workshops.map((workshop, index) => (
        <Box
          key={index}
          bg="#23ACE6"
          color="black"
          w={["100%", "300px"]}
          shadow="xl"
          rounded="lg"
          p={6}
          transition="transform 0.3s ease-in-out"
          _hover={{ transform: "scale(1.05)" }}
        >


          {/* Workshop Title */}
          <Heading as="h3" size="md" textAlign="center" py={4}>
            {workshop.title}
          </Heading>

          {/* Workshop Description */}
          <Text textAlign="center" fontSize="sm" fontWeight="medium" mb={6}>
            {workshop.description}
          </Text>

          {/* Additional Picture */}
          <Image
            src={workshop.secondaryImage} // Replace with the secondary image path
            alt={`${workshop.title} details`}
            w="100%"
            h="150px"
            objectFit="cover"
            borderRadius="md"
            mb={4}
          />
              {/* Edit Button */}
              <Button
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                w="100%"
                rounded="md"
                fontWeight="medium"
                onClick={() => handleEdit(workshop)}
              >
                Edit
              </Button>
            </Box>
          ))}
        </Flex>

        {/* Skapa Ny Workshop */}
        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "green.600" }}
          size="lg"
          mt={8}
          onClick={onCreateOpen}
        >
          Skapa Ny Workshop
        </Button>
      </Flex>

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
  );
};

export default ManageWorkshopsPage;
