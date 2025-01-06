import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { createBooking } from "../api/bookings"; // Import API function

const BookingModal = ({ isOpen, onClose, workshopId }) => {
  const toast = useToast();

  // Form state
  const [contactName, setContactName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfAttendees, setNumberOfAttendees] = useState("");
  const [workshopDate, setWorkshopDate] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      workshop: workshopId,
      contact_name: contactName,
      organization_name: organizationName,
      organization_type: organizationType,
      email,
      phone_number: phoneNumber,
      number_of_attendees: numberOfAttendees,
      workshop_date: workshopDate,
      additional_message: additionalMessage,
    };

    try {
        await createBooking(data);
        alert("Booking created successfully!");
        onClose(); // Close the modal if applicable
    } catch (error) {
        console.error("Error creating booking:", error.message);
        alert(error.message);
    }
};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Workshop</ModalHeader>
        <ModalBody>
          <FormControl isRequired mb="4">
            <FormLabel>Contact Name</FormLabel>
            <Input
              placeholder="Enter your name"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Organization Name</FormLabel>
            <Input
              placeholder="Enter organization name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="4">
            <FormLabel>Organization Type</FormLabel>
            <Select
              placeholder="Select type"
              value={organizationType}
              onChange={(e) => setOrganizationType(e.target.value)}
            >
              <option value="school">School</option>
              <option value="company">Company</option>
              <option value="private">Private Individual</option>
            </Select>
          </FormControl>

          <FormControl isRequired mb="4">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="4">
            <FormLabel>Phone Number</FormLabel>
            <Input
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="4">
            <FormLabel>Number of Attendees</FormLabel>
            <Input
              type="number"
              placeholder="Enter number of attendees"
              value={numberOfAttendees}
              onChange={(e) => setNumberOfAttendees(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="4">
            <FormLabel>Workshop Date</FormLabel>
            <Input
              type="datetime-local"
              value={workshopDate}
              onChange={(e) => setWorkshopDate(e.target.value)}
            />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Additional Message</FormLabel>
            <Textarea
              placeholder="Add any additional information"
              value={additionalMessage}
              onChange={(e) => setAdditionalMessage(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr="3" onClick={handleSubmit} isLoading={loading}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookingModal;
