import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Image, Text, Heading, VStack, Flex, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';


const Dashboard = () => {
  const [workshops, setWorkshops] = useState([]);

  // Fetch workshops dynamically
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/workshops/');
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <Box bgGradient="linear(to-b, #104470, white)" minHeight="100vh" pb={8}>
      <Navbar />
      <Box textAlign="center" pt={10} pb={6}>
        <Heading as="h1" size="2xl" color="white">
          Upptäck våra interaktiva STEM-workshops
        </Heading>
        <Text fontSize="lg" mt={4} color="white">
          Inspirerar barn att utforska teknik och kreativitet genom lek!
        </Text>
      </Box>
      <Flex
        wrap="wrap"
        justify="center"
        gap={6}
        px={6}
        py={8}
      >
        {workshops.map((workshop) => (
          <VStack
            key={workshop.id}
            w="250px"
            bg="blue.50"
            borderRadius="md"
            boxShadow="md"
            overflow="hidden"
            spacing={4}
            p={4}
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: 'lg',
            }}
          >
            <Image
              src={workshop.image_url}
              alt={workshop.title}
              borderRadius="md"
              objectFit="cover"
              h="150px"
              w="full"
            />
            <Heading as="h3" size="md" color="blue.700">
              {workshop.title}
            </Heading>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              {workshop.description}
            </Text>
            <Button colorScheme="blue" size="sm">
              Läs mer
            </Button>
          </VStack>
        ))}
      </Flex>
    </Box>
  );
};

export default Dashboard;
