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
import { createWorkshop } from "../api/workshops";

const CreateWorkshopModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        try {
            await createWorkshop(formData);
            alert("Workshop created successfully!");
            onClose(); // Close modal
            setTitle(""); // Reset form
            setDescription("");
            setImage(null);
        } catch (error) {
            console.error("Failed to create workshop:", error);
            alert("Error creating workshop.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Workshop</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter workshop title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Enter workshop description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

export default CreateWorkshopModal;
