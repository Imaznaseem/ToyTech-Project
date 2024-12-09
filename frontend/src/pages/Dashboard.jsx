import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Spinner,
  List,
  ListItem,
  Link,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { fetchWorkshops } from "../api/workshops";
import BookingModal from "../components/BookingModal";

const Dashboard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  // Fetch workshops from the database
  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await fetchWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error("Failed to fetch workshops:", error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  // Open Booking Modal
  const handleBook = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg="gray.100">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box
      bg="linear-gradient(180deg, #104470 0%, #D3D3D3 100%)"
      minH="100vh"
      w="100vw"
      overflowX="hidden"
      pt="64px" // Ensure content starts below the navbar
    >
      <Navbar />

      {/* Home Section */}
      <Flex direction="column" align="center" py="8" px="4">
        <Text
          fontSize="xl"
          textAlign="center"
          maxW="600px"
          color="white"
          mb="8"
        >
          Upptäck våra interaktiva STEM-workshops som inspirerar barn att utforska teknik och kreativitet genom lek!
        </Text>
      </Flex>

      {/* Workshops Section */}
      <Flex
        wrap="wrap"
        justify="center"
        align="center"
        gap="6"
        px="4"
        py="8"
        w="100%"
      >
        {workshops.map((workshop, index) => (
          <Box
            key={workshop.id}
            w="260px"
            h="450px"
            bg="blue.200"
            p="6"
            borderRadius="md"
            shadow="md"
            position="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            transform={hoveredIndex === index ? "scale(1.05)" : "scale(1)"}
            boxShadow={
              hoveredIndex === index
                ? "0px 8px 16px rgba(0, 0, 0, 0.2)"
                : "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }
          >
            <Image
              src={workshop.image}
              alt={`${workshop.title} Workshop`}
              objectFit="cover"
              w="100%"
              h="150px"
              borderRadius="md"
              mb="4"
            />
            <Heading size="md" color="blue.700" mb="2">
              {workshop.title}
            </Heading>
            <Text fontSize="sm" color="gray.600" mb="4">
              {workshop.description}
            </Text>
            {hoveredIndex === index && (
              <Button
                colorScheme="blue"
                size="sm"
                position="absolute"
                bottom="4"
                left="50%"
                transform="translateX(-50%)"
                onClick={() => handleBook(workshop)}
              >
                Boka
              </Button>
            )}
          </Box>
        ))}
      </Flex>

      {/* Booking Modal */}
      {selectedWorkshop && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          workshopId={selectedWorkshop.id}
        />
      )}

      {/* About Us Section */}
      <Box id="about-us" py="8" px="6" textAlign="center" bg="transparent">
        <Heading size="lg" mb="4" color="blue.700">
          Om oss
        </Heading>
        <Text fontSize="lg" color="gray.700" maxW="800px" mx="auto" mb="8">
          Vi är passionerade läkar- och ingenjörsstudenter som erbjuder interaktiva workshops för att inspirera unga att
          utforska teknikens värld. Genom praktiska och engagerande aktiviteter väcker vi intresse för vetenskap, teknik,
          ingenjörskonst och matematik (STEM). Välkommen till ToyTech, där vi tillsammans formar en framtid av innovatörer!
        </Text>
      </Box>

      {/* Contact Section */}
      <Box id="contact" py="8" px="6" textAlign="center" bg="transparent">
        <Heading size="lg" mb="4" color="blue.700">
          Kontakt
        </Heading>
        <VStack spacing="4">
          <Text fontSize="lg" color="gray.700">
            Telefon: +46 734 438 006
          </Text>
          <Text fontSize="lg" color="gray.700">
            E-post: kontakt@toytech.com
          </Text>
          <Text fontSize="lg" color="gray.700">
            <Link href="https://instagram.com/toytech" isExternal color="blue.500">
              Instagram
            </Link>{" "}
            {" | "}
            <Link href="https://linkedin.com/company/toytech" isExternal color="blue.500">
              LinkedIn
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;


