import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Image,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/logo1.png";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Aktivera efter att användaren scrollat
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <Box
      as="nav"
      bg={isScrolled ? "transparent" : "#000033"} // Helt genomskinlig vid scroll
      color="white"
      p={4}
      position="fixed"
      width="100%"
      top={0}
      zIndex={1000}
      shadow={!isScrolled ? "lg" : "none"} // Ta bort skugga vid scroll
      transition="background-color 0.3s ease, box-shadow 0.3s ease"
    >
      <Flex alignItems="center" justifyContent="space-between" maxW="1240px" mx="auto">
        {/* Logo Section */}
        <Flex align="center">
          <RouterLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} alt="ToyTech Logo" height="60px" borderRadius="30px" />
            <Text ml={2} fontSize="1.5rem" fontWeight="bold" color="white">
              ToyTech
            </Text>
          </RouterLink>
        </Flex>

        {/* Desktop Menu */}
        {!isScrolled && (
          <Flex
            as="ul"
            display={["none", "none", "flex"]}
            gap="30px"
          >
            {["Home", "Workshops", "Om oss", "Contact"].map((item, index) => (
              <ScrollLink
                key={index}
                to={item.toLowerCase().replace(" ", "-")}
                smooth
                duration={500}
                offset={-70}
                onClick={() => setActive(item)}
              >
                <Button
                  bg={active === item ? "#104470" : "transparent"}
                  color="white"
                  _hover={{ bg: "#104470" }}
                  borderRadius="md"
                  px={4}
                >
                  {item}
                </Button>
              </ScrollLink>
            ))}
          </Flex>
        )}

        {/* Hamburger Icon */}
        {isScrolled && (
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            color="white"
            onClick={toggleDrawer}
            display={{ base: "flex", lg: "flex" }}
            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            fontSize="1.5rem"
            position="absolute"
            right="1rem"
          />
        )}

        {/* Drawer */}
        <Drawer isOpen={isDrawerOpen} placement="right" onClose={toggleDrawer}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold" color="white">
                  Meny
                </Text>
                <CloseButton onClick={toggleDrawer} />
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Flex direction="column" gap={4}>
                {["Home", "Workshops", "Om oss", "Contact"].map((item, index) => (
                  <ScrollLink
                    key={index}
                    to={item.toLowerCase().replace(" ", "-")}
                    smooth
                    duration={500}
                    offset={-70}
                    onClick={toggleDrawer}
                  >
                    <Button
                      bg="transparent"
                      color="black"
                      _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                      justifyContent="flex-start"
                      width="full"
                    >
                      {item}
                    </Button>
                  </ScrollLink>
                ))}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default Navbar;
