import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Divider,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { fetchWorkshops } from "../api/workshops";
import { fetchBookings } from "../api/bookings";
import CreateWorkshopModal from "../components/CreateWorkshopModal";
import EditWorkshopModal from "../components/EditWorkshopModal";
import LogoutButton from "../components/AdminHamburger"; // Kontrollera sökvägen
import BookingList from "../components/BookingList";
import CalendarComponent from "../components/CalendarComponent";

const AdminPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

  // Funktion för att hämta workshops
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

  // Funktion för att hämta bekräftade bokningar
  const refreshConfirmedBookings = async () => {
    try {
      const bookings = await fetchBookings();
      const confirmed = bookings.filter((b) => b.is_confirmed);
      setConfirmedBookings(confirmed);
    } catch (error) {
      console.error("Failed to fetch confirmed bookings:", error);
    }
  };

  useEffect(() => {
    refreshWorkshops();
    refreshConfirmedBookings();
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
      w="100vw" // Säkerställ fullbredd
      overflow="hidden" // Förhindra horisontell scroll
    >
      {/* Vänster Sektion */}
      <Box
        flex="2"
        bg="white"
        p={6}
        shadow="md"
        borderRadius="md"
        boxSizing="border-box"
        maxW="100%" // Förhindra innehållsöverflöd
      >
        {/* Header */}
        <Box
          position="fixed"
          top="0"
          left="0"
          bg="white"
          zIndex="1000"
          p={4}
          boxShadow="lg"
          display="flex"
          alignItems="center"
        >
          <LogoutButton />
          <Text ml={4} fontWeight="bold" fontSize="lg" color="teal.700">
            Välkommen Admin!
          </Text>
        </Box>

        <Divider mt={12} />

        <Divider mt={12} />


        <Heading size="md" mb={4} color="teal.600">
          Bokningar
        </Heading>
        <VStack align="stretch" spacing={4} mb={8}>
          <Box bg="white" p={6} shadow="md" borderRadius="md">
            <BookingList title="Bokningsförfrågningar" isConfirmed={false} />
          </Box>
        </VStack>

        <Divider />

        <Heading size="md" mt={8} mb={4} color="teal.600">
          Kommande Workshops
        </Heading>
        <VStack align="stretch" spacing={4}>
          <Box bg="white" p={6} shadow="md" borderRadius="md">
            <BookingList title="Upcoming Workshops" isConfirmed={true} />
          </Box>
        </VStack>
      </Box>

      {/* Höger Sektion */}
      <Box
        flex="3"
        bg="white"
        p={6}
        shadow="md"
        borderRadius="md"
        boxSizing="border-box"
        maxW="100%" // Förhindra innehållsöverflöd
      >
        {/* Kalenderkomponent */}
        <CalendarComponent workshops={workshops} confirmedBookings={confirmedBookings} />
      </Box>

      {/* Modaler */}
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
