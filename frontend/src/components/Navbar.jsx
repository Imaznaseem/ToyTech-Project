import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../assets/logo1.png';

const Navbar = () => {
  return (
    <Box
      as="nav"
      bg="rgba(0, 0, 35, 0.8)"
      color="#010E4A"
      p={4}
      position="fixed"
      width="100%"
      top={0}
      zIndex={1000}
    >
      <Flex alignItems="center" justifyContent="center" maxW="1200px" mx="auto">
        {/* Logo and text */}
        <Flex align="center" flex="1">
          <RouterLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src={logo} alt="ToyTech Logo" height="60px" borderRadius="30px" />
            <span style={{ marginLeft: '10px', fontSize: '1.5rem', fontWeight: 'bold', color: 'WHITE' }}>
              ToyTech
            </span>
          </RouterLink>
        </Flex>

        {/* Centered Links with Increased Gap */}
        <Flex gap={30} justifyContent="center" flex="2">
          <ScrollLink to="home" smooth={true} duration={500} offset={-70}>
            <Button
              bg="#0F3986"
              color="white"
              _hover={{ bg: "#104470" }}
              borderRadius="md"
              px={4}
            >
              Home
            </Button>
          </ScrollLink>

          <ScrollLink to="workshops-section" smooth={true} duration={500}>
            <Button 
            bg="#0F3986"
            color="white"
            _hover={{ bg: "#104470" }}
            borderRadius="md"
            px={4}
            >
              Workshops
            </Button>
          </ScrollLink>

          <ScrollLink to="about-us" smooth={true} duration={500} offset={-70}>
            <Button
              bg="#0F3986"
              color="white"
              _hover={{ bg: "#104470" }}
              borderRadius="md"
              px={4}
            >
              Om oss
            </Button>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
            <Button
              bg="#0F3986"
              color="white"
              _hover={{ bg: "#104470" }}
              borderRadius="md"
              px={4}
            >
              Contact
            </Button>
          </ScrollLink>
        </Flex>

        {/* Placeholder flex to keep buttons centered */}
        <Flex flex="1" />
      </Flex>
    </Box>
  );
};

export default Navbar;
