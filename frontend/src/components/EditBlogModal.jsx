import React, { useState, useEffect } from "react";
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
import { updateBlogPost, deleteBlogPost } from "../api/blogposts";

const EditBlogModal = ({ isOpen, onClose, blog, onRefresh }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        }
    }, [blog]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await updateBlogPost(blog.id, { title, content });
            alert("Blog post updated successfully!");
            onClose();
            onRefresh(); // Refresh the list
        } catch (error) {
            console.error("Failed to update blog post:", error);
            alert("Error updating blog post.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog post?")) return;
        setDeleting(true);
        try {
            await deleteBlogPost(blog.id); // Call API to delete blog post
            alert("Blog post deleted successfully!");
            onClose();
            onRefresh(); // Refresh the list after deletion
        } catch (error) {
            console.error("Failed to delete blog post:", error);
            alert("Error deleting blog post.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Blog Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Blog Post Title"
                        />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                        <FormLabel>Content</FormLabel>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Blog Post Content"
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        onClick={handleUpdate}
                        isLoading={loading}
                    >
                        Save Changes
                    </Button>
                    <Button
                        colorScheme="red"
                        onClick={handleDelete}
                        isLoading={deleting}
                        ml={3}
                    >
                        Delete
                    </Button>
                    <Button variant="ghost" onClick={onClose} ml={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditBlogModal;
