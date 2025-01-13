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
import InstagramLogo from "../assets/Instagram.png";
import LinkedinLogo from "../assets/Linkedin10.png";
import OwerrLogo from "../assets/Owerr.png";
import PJKLogo from "../assets/PJK.png";
import HorizonLogo from "../assets/Horizon.png";
import LatchLogo from "../assets/Latch.png";
import HomeBgImage from "../assets/HomeBild.png";
import { fetchBlogPosts } from "../api/blogposts";



const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
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

useEffect(() => {
  const loadBlogs = async () => {
    try {
      const data = await fetchBlogPosts();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    }
  };
  loadBlogs();
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
<Flex
  id="home"
  direction="column"
  align="center"
  justify="center"
  bgImage={HomeBgImage} // Lägg in din bild-URL här
  bgSize="cover"
  bgPosition="center"
  bgRepeat="no-repeat"
  color="white"
  minH="100vh"
  px={8}
  py={16}
>
  {/* Rubrik */}
  <Heading
    as="h1"
    size="2xl"
    fontWeight="bold"
    textAlign="center"
    textShadow="1px 1px 8px rgba(0, 0, 0, 0.7)"
    mb={4}
  >
    STEM workshops för barn
  </Heading>

  {/* Underrubrik */}
  <Text
    fontSize="xl"
    textAlign="center"
    textShadow="1px 1px 5px rgba(0, 0, 0, 0.7)"
    mb={8}
  >
    INSPIRE. CREATE. PLAY.
  </Text>

  {/* Knapp */}
  <Flex gap={4}>
    <Button
      bg="rgba(10, 158, 226, 0.8)"
      color="white"
      _hover={{ bg: "rgba(10, 158, 226, 1)" }}
      size="lg"
      onClick={() => console.log("Boka workshop klickad")}
    >
      Boka workshop
    </Button>

  </Flex>
</Flex>

<Flex
  id="partners"
  direction="column"
  align="center"
  justify="center"
  bg="white" // #0047FF Bakgrundsgradientlinear-gradient(180deg, #104470 0%, #D3D3D3 100%)
  color="black"
  py={16}
  px={8}
>
  {/* Rubrik */}
  <Heading
    as="h2"
    size="lg"
    fontWeight="bold"
    textAlign="center"
    mb={8}
    fontSize="2xl"
  >
    Partners
  </Heading>

  {/* Divider */}
  <Box
    w="80px"
    h="4px"
    bg="black"
    mb={12}
  />

  {/* Logotyper */}
  <Flex
    wrap="wrap"
    justify="center"
    gap={8}
  >
    <Image
      src={LatchLogo} // Byt ut med din partners logotyp
      alt="Partner 1"
      w="129px"
      h="129px"
      objectFit="cover"
    />
    <Image
      src={HorizonLogo} // Byt ut med din partners logotyp
      alt="Partner 2"
      w="129px"
      h="129px"
      objectFit="cover"
    />
    <Image
      src={PJKLogo} // Byt ut med din partners logotyp
      alt="Partner 3"
      w="129px"
      h="129px"
      objectFit="cover"
    />
    <Image
      src={OwerrLogo} // Byt ut med din partners logotyp
      alt="Partner 4"
      w="129px"
      h="129px"
      objectFit="cover"
    />
  </Flex>
</Flex>




{/* Workshops Section */}
<Box
  id="workshops"
  bg="rgba(0, 0, 35, 0.8)" // Same color as navbar and other sections
  py={[10, 16]}
  px={[4, 8]}
  color="white"
>
  <Flex
    maxW="1240px"
    mx="auto"
    direction="column"
    align="center"
    gap={6}
  >
    {/* Heading */}
    <Heading
      as="h2"
      size="xl"
      fontWeight="bold"
      mb={8}
      textAlign="center"
      fontSize={["2xl", "3xl", "4xl"]}
    >
      Explore Our Workshops
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

          {/* Booking Button */}
          <Button
            bg="rgba(0, 0, 35, 0.8)"
            color="white"
            _hover={{ bg: "#104470" }}
            w="200px"
            rounded="md"
            fontWeight="medium"
            my={6}
            mx="auto"
            display="block"
            onClick={() => handleBook(workshop)} // Call your booking function
          >
            Book Now
          </Button>
        </Box>
      ))}
    </Flex>
  </Flex>
</Box>



      {/* Booking Modal */}
      {selectedWorkshop && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          workshopId={selectedWorkshop.id}
        />
      )}

{/* About Us Section */}
<Box
  id="about-us"
  bg="linear-gradient(180deg, rgba(0, 0, 35, 0.8), #104470)"
  py={[12, 16]}
  px={[4, 8]}
  color="white"
>
  <Flex
    maxW="1240px"
    mx="auto"
    gap={8}
    alignItems="center"
    direction={["column", "row"]}
  >
    {/* Blog Posts Section */}
    <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
      <Heading
        as="h2"
        size="lg"
        fontWeight="bold"
        mb={4}
        fontSize={["2xl", "3xl", "4xl"]}
      >
        Latest Blog Posts
      </Heading>
      <Flex gap={4} wrap="wrap">
  {blogs.slice(0, 2).map((blog) => (
    <Box
      key={blog.id} // Use id field as the unique key
      border="1px solid #ddd"
      p={4}
      borderRadius="md"
      bg="white"
      color="black"
    >
      <Heading as="h3" size="sm" mb={2}>
        {blog.title}
      </Heading>
      <Text>{blog.content.substring(0, 100)}...</Text>
    </Box>
  ))}
</Flex>

    </Box>
  </Flex>
</Box>





{/* Contact Section */}
<Box
  id="contact"
  py="16"
  px={[4, 8]}
  bg="white" // White background
  color="black"
>
  <Flex
    maxW="1240px"
    mx="auto"
    gap={8}
    direction={["column", "row"]}
    justify="space-between"
    align="flex-start"
  >
    {/* Left Side: Contact Us */}
    <Box flex="1" textAlign="left">
      {/* Contact Us Heading */}
      <Heading
        as="h2"
        size="lg"
        fontWeight="bold"
        mb="6"
        color="#0A9EE2"
      >
        Contact Us
      </Heading>

      {/* Email */}
      <Text fontSize="md" mb="2" color="gray.700">
        Email:{" "}
        <Link
          href="mailto:Ridwan@toytech.se"
          color="#0A9EE2"
          fontWeight="bold"
        >
          Ridwan@toytech.se
        </Link>
      </Text>

      {/* Phone Number */}
      <Text fontSize="md" mb="2" color="gray.700">
        Telephone:{" "}
        <Text as="span" fontWeight="medium" color="#0A9EE2">
          0760089180
        </Text>
      </Text>

      {/* Organisation Number */}
      <Text fontSize="md" mb="2" color="gray.700">
        Organisation Number:{" "}
        <Text as="span" fontWeight="medium" color="#0A9EE2">
          (Write here later)
        </Text>
      </Text>
    </Box>

    {/* Right Side: Our Education */}
    <Box flex="1" textAlign="left">
      {/* Our Education Heading */}
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        mb="6"
        color="#0A9EE2"
      >
        Our Education
      </Heading>

      {/* Education List */}
      <Text fontSize="md" lineHeight="2" color="gray.700">
        <strong style={{ color: "#0A9EE2" }}>→</strong> Science <br />
        <strong style={{ color: "#0A9EE2" }}>→</strong> Technology <br />
        <strong style={{ color: "#0A9EE2" }}>→</strong> Engineering <br />
        <strong style={{ color: "#0A9EE2" }}>→</strong> Mathematics
      </Text>

      
    </Box>
  </Flex>

  {/* Blue Line and Social Logos */}
  <Box borderBottom="2px solid #0A9EE2" my="12" position="relative">
    <Flex
      justify="center"
      gap={6}
      position="absolute"
      top="-20px"
      left="50%"
      transform="translateX(-50%)"
      bg="white"
      px={4}
    >
      <Link
        href="https://www.instagram.com/toytech__/"
        isExternal
        _hover={{ textDecoration: "none" }}
      >
        <Image
          src={InstagramLogo} // Replace with the Instagram logo
          alt="Instagram"
          boxSize="40px"
        />
      </Link>
      <Link
        href="https://linkedin.com/company/toytech"
        isExternal
        _hover={{ textDecoration: "none" }}
      >
        <Image
          src={LinkedinLogo} // Replace with the LinkedIn logo
          alt="LinkedIn"
          boxSize="40px"
        />
      </Link>
    </Flex>
  </Box>
</Box>




    </Box>
    
  );
};

export default Dashboard;


