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
import { updateWorkshop } from "../api/workshops";

const EditWorkshopModal = ({ isOpen, onClose, workshop }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (workshop) {
            setTitle(workshop.title);
            setDescription(workshop.description);
        }
    }, [workshop]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await updateWorkshop(workshop.id, JSON.stringify({ title, description }));
            alert("Workshop updated successfully!");
            onClose();
        } catch (error) {
            console.error("Failed to update workshop:", error);
            alert("Error updating workshop.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Workshop</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Workshop Title"
                        />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Workshop Description"
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
                    <Button variant="ghost" onClick={onClose} ml={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditWorkshopModal;
