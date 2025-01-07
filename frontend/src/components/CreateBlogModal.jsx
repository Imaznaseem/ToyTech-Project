import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/react";
import { createBlogPost } from "../api/blogposts";

const CreateBlogModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        try {
            await createBlogPost(formData);
            alert("Blog post created successfully!");
            onClose(); // Close modal
            setTitle(""); // Reset form
            setContent("");
            setImage(null);
        } catch (error) {
            console.error("Failed to create blog post:", error);
            alert("Error creating blog post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Blog Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter blog title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                        <FormLabel>Content</FormLabel>
                        <Textarea
                            placeholder="Enter blog content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Image</FormLabel>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleCreate} isLoading={loading}>
                        Create
                    </Button>
                    <Button variant="ghost" onClick={onClose} ml={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateBlogModal;