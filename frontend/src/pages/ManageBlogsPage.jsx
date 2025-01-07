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
import EditBlogModal from "../components/EditBlogModal";
import CreateBlogModal from "../components/CreateBlogModal";

const ManageBlogsPage = ({ blogs, onRefresh }) => {
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const [selectedBlog, setSelectedBlog] = React.useState(null);

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    onEditOpen();
  };

  return (
    <Box
      bg="#111839"
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
        {/* Header */}
        <Heading
          as="h2"
          size="xl"
          fontWeight="bold"
          mb={8}
          textAlign="center"
          fontSize={["2xl", "3xl", "4xl"]}
        >
          Manage Blogs
        </Heading>

        {/* Blogs Grid */}
        <Flex
          gap={8}
          wrap="wrap"
          justify="center"
          maxW="1240px"
        >
          {blogs.map((blog, index) => (
            <Box
              key={index}
              bg="white"
              color="black"
              w={["100%", "300px"]}
              shadow="xl"
              rounded="lg"
              p={6}
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            >
              {/* Blog Image */}
              <Image
                src={blog.image || "/placeholder.png"}
                alt={blog.title}
                w="80px"
                h="80px"
                mx="auto"
                mt={-12}
                bg="white"
                borderRadius="full"
              />

              {/* Blog Title */}
              <Heading as="h3" size="md" textAlign="center" py={4}>
                {blog.title}
              </Heading>

              {/* Blog Content Preview */}
              <Text textAlign="center" fontSize="sm" fontWeight="medium" mb={6}>
                {blog.content.substring(0, 100)}...
              </Text>

              {/* Edit Button */}
              <Button
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                w="100%"
                rounded="md"
                fontWeight="medium"
                onClick={() => handleEdit(blog)}
              >
                Edit
              </Button>
            </Box>
          ))}
        </Flex>

        {/* Create New Blog */}
        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "green.600" }}
          size="lg"
          mt={8}
          onClick={onCreateOpen}
        >
          Create New Blog
        </Button>
      </Flex>

      {/* Modals */}
      <CreateBlogModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onRefresh={onRefresh}
      />
      <EditBlogModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        blog={selectedBlog}
        onRefresh={onRefresh}
      />
    </Box>
  );
};

export default ManageBlogsPage;