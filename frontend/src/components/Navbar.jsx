import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Button, Image } from '@chakra-ui/react';
import { Link as ScrollLink } from 'react-scroll';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <Box
      as="nav"
      bg="linear-gradient(90deg, rgba(21, 66, 104, 1) 0%, rgba(31, 71, 107, 1) 100%)"
      color="white"
      p={4}
      position="fixed"
      width="100%"
      top={0}
      zIndex={1000}
    >
      <Flex alignItems="center" justifyContent="center" maxW="1200px" mx="auto">
        {/* Logo with Rounded Corners */}
        <Flex align="center" flex="1">
          <RouterLink to="/">
            <Image src={logo} alt="ToyTech Logo" height="40px" borderRadius="20px" />
          </RouterLink>
        </Flex>

        {/* Centered Links with Increased Gap */}
        <Flex gap={30} justifyContent="center" flex="2">
          <ScrollLink to="home" smooth={true} duration={500} offset={-70}>
            <Button
              bg="#185F99"
              color="white"
              _hover={{ bg: "#104470" }}
              borderRadius="md"
              px={4}
            >
              Home
            </Button>
          </ScrollLink>
          <ScrollLink to="about-us" smooth={true} duration={500} offset={-70}>
            <Button
              bg="#185F99"
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
              bg="#185F99"
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
