import React, { useEffect, useState } from "react";
import { Box, Button, VStack, Text, Heading, Spinner, Flex } from "@chakra-ui/react";
import { fetchBookings, updateBooking } from "../api/bookings";
import BookingModal from "./BookingModal";
const BookingList = ({ title, isConfirmed }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loadBookings = async () => {
        try {
            setLoading(true);
            const allBookings = await fetchBookings();
            console.log("Fetched Bookings:", allBookings); // Debugga hämtade bokningar
            const filteredBookings = allBookings.filter(b => b.is_confirmed === isConfirmed);
            console.log("Filtered Bookings:", filteredBookings); // Kontrollera filtrering
            setBookings(filteredBookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleConfirm = async (id) => {
        try {
            // 1. Hämta befintlig bokning från servern
            const allBookings = await fetchBookings();
            const existingBooking = allBookings.find((booking) => booking.id === id);

            if (!existingBooking) {
                throw new Error("Booking not found");
            }

            // 2. Uppdatera is_confirmed
            const updatedBooking = { ...existingBooking, is_confirmed: true };

            // 3. Skicka PUT-anrop med komplett objekt
            await updateBooking(id, updatedBooking);
            loadBookings(); // Ladda om bokningslistan
        } catch (error) {
            console.error("Error confirming booking:", error);
        }
    };
    const openEditModal = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };
    const handleUpdateBooking = async (id, updatedData) => {
        try {
            await updateBooking(id, updatedData);
            loadBookings();
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };
    useEffect(() => {
        loadBookings();
    }, [isConfirmed]);
    if (loading) return <Spinner size="xl" />;
    return (
        <VStack align="stretch" spacing={4} mb={8}>
            <Heading size="md" mb={4}>{title}</Heading>
            {bookings.length > 0 ? (
                bookings.map(booking => {
                    // Formatera datumet i önskat format
                    const formattedDate = new Date(booking.workshop_date).toLocaleString("sv-SE", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    return (
                        <Box
                            key={booking.id}
                            bg="gray.50"
                            p={4}
                            shadow="sm"
                            borderRadius="md"
                            cursor="pointer"
                            onClick={() => openEditModal(booking)}
                        >
                            <Text fontWeight="bold" color="teal.700">
                                Workshop Datum: {formattedDate}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                {booking.contact_name} - {booking.email}
                            </Text>
                            {!isConfirmed && (
                                <Button
                                    mt={2}
                                    colorScheme="teal"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleConfirm(booking.id);
                                    }}
                                >
                                    Confirm
                                </Button>
                            )}
                        </Box>
                    );
                })
            ) : (
                <Text>No {isConfirmed ? "confirmed" : "unconfirmed"} bookings available</Text>
            )}
            {isModalOpen && (
                <BookingModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    bookingData={selectedBooking}
                    onUpdate={handleUpdateBooking}
                />
            )}
        </VStack>
    );
};
export default BookingList;