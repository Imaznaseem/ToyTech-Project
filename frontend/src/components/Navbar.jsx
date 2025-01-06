import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/logo1.png"; // Keep the same logo

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <Box
      as="nav"
      bg="#000033" // Fully opaque dark blue
      color="white"
      p={4}
      pt={6} // Increased padding to make it taller
      pb={6}
      position="fixed"
      width="100%"
      top={0}
      zIndex={1000}
      shadow="lg" // Optional shadow for slight depth
    >
      <Flex alignItems="center" justifyContent="space-between" maxW="1240px" mx="auto">
        {/* Logo Section */}
        <Flex align="center">
          <RouterLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} alt="ToyTech Logo" height="60px" borderRadius="30px" />
            <span
              style={{
                marginLeft: "10px",
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              ToyTech
            </span>
          </RouterLink>
        </Flex>

        {/* Desktop Menu */}
        <Flex
          as="ul"
          className="list-none"
          display={["none", "none", "flex"]} // Only show on desktop
          justifyContent="center"
          gap="30px"
        >
          {["Home", "Workshops", "Om oss", "Contact"].map((item, index) => (
            <ScrollLink
              key={index}
              to={item.toLowerCase().replace(" ", "-")}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={() => setActive(item)}
            >
              <Button
                bg={active === item ? "#104470" : "#0F3986"} // Keep the button colors consistent
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

        {/* Mobile Menu Toggle */}
        <Box display={["flex", "flex", "none"]} alignItems="center">
          <Button
            bg="transparent"
            color="white"
            onClick={() => setToggle(!toggle)}
            _hover={{ bg: "transparent" }}
          >
            {toggle ? "Close" : "Menu"}
          </Button>
        </Box>

        {/* Mobile Menu */}
        {toggle && (
          <Box
            bg="#000033" // Fully opaque dark blue for mobile menu
            position="absolute"
            top="100%"
            right="0"
            width="100%"
            zIndex={999}
            p={4}
            display={["block", "block", "none"]}
          >
            <Flex as="ul" direction="column" gap="15px">
              {["Home", "Workshops", "Om oss", "Contact"].map((item, index) => (
                <ScrollLink
                  key={index}
                  to={item.toLowerCase().replace(" ", "-")}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => {
                    setActive(item);
                    setToggle(false);
                  }}
                >
                  <Button
                    bg={active === item ? "#104470" : "#0F3986"}
                    color="white"
                    _hover={{ bg: "#104470" }}
                    borderRadius="md"
                    px={4}
                    w="100%"
                    textAlign="left"
                  >
                    {item}
                  </Button>
                </ScrollLink>
              ))}
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;



