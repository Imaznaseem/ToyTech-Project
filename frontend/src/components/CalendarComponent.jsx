import React, { useState } from "react";
import { Box, Heading, VStack, Text, Button, Grid } from "@chakra-ui/react";

const CalendarComponent = ({ workshops, confirmedBookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleMonthChange = (offset) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset
    );
    setCurrentDate(newDate);
  };

  const handleYearChange = (offset) => {
    const newDate = new Date(currentDate.getFullYear() + offset, currentDate.getMonth());
    setCurrentDate(newDate);
  };

  const isConfirmedBooking = (date) => {
    return confirmedBookings.some(
      (booking) =>
        new Date(booking.workshop_date).toDateString() === date.toDateString()
    );
  };

  const renderDateCell = (date) => {
    const workshopsForDate = workshops.filter(
      (workshop) => new Date(workshop.date).toDateString() === date.toDateString()
    );
    const isToday = date.toDateString() === new Date().toDateString();
    const hasConfirmedBooking = isConfirmedBooking(date);
  
    return (
      <Box
        bg={
          hasConfirmedBooking
            ? "green.300"
            : workshopsForDate.length > 0
            ? "blue.300"
            : "gray.100"
        }
        border={isToday ? "2px solid teal" : "1px solid gray"}
        p={2}
        borderRadius="md"
        textAlign="center"
        minWidth={["35px", "50px", "60px"]} // Smaller for iPhone SE
        minHeight={["35px", "50px", "60px"]} // Smaller for iPhone SE
        fontSize={["xs", "sm", "md"]} // Smaller text for iPhone SE
      >
        <Text fontWeight="bold">{date.getDate()}</Text>
        {workshopsForDate.map((workshop) => (
          <Text fontSize="sm" key={workshop.id}>
            {workshop.contactPerson || "No contact"}
          </Text>
        ))}
      </Box>
    );
  };
  

  const renderCalendarGrid = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    const dates = [];
    for (let i = 0; i < startDay; i++) {
      dates.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const weeks = [];
    let week = [];
    dates.forEach((date, index) => {
      if (index % 7 === 0 && week.length > 0) {
        weeks.push(week);
        week = [];
      }
      week.push(date);
    });
    if (week.length > 0) {
      weeks.push(week);
    }

    return (
<Box mt={4}>
      <Grid
        templateColumns={["repeat(7, 1fr)"]} // Always 7 columns
        gap={[1, 2, 4]} // Smaller gaps for smaller screens
      >
        {["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"].map((day) => (
          <Box textAlign="center" fontWeight="bold" key={day} fontSize={["xs", "sm", "md"]}>
            {day}
          </Box>
        ))}
        </Grid>
        {weeks.map((week, weekIndex) => {
          const firstDateInWeek = week.find((date) => date !== null);
          return (
            <Grid templateColumns="repeat(8, 1fr)" gap={4} key={weekIndex}>
              <Box textAlign="center" fontWeight="bold" borderRadius="md" p={2}>
                {firstDateInWeek ? Math.ceil((firstDateInWeek - new Date(firstDateInWeek.getFullYear(), 0, 1)) / 86400000 / 7) : ""}
              </Box>
              {week.map((date, index) =>
                date ? (
                  <Box key={index} onClick={() => setSelectedDate(date)} p={2}>
                    {renderDateCell(date)}
                  </Box>
                ) : (
                  <Box key={index} />
                )
              )}
            </Grid>
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="teal.600">
        Workshop Kalender
      </Heading>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Button size="sm" onClick={() => handleYearChange(-1)}>
          &laquo;
        </Button>
        <Button size="sm" mx={2} onClick={() => handleMonthChange(-1)}>
          &lt;
        </Button>
        <Text fontWeight="bold" mx={4}>
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </Text>
        <Button size="sm" mx={2} onClick={() => handleMonthChange(1)}>
          &gt;
        </Button>
        <Button size="sm" onClick={() => handleYearChange(1)}>
          &raquo;
        </Button>
      </Box>
      {renderCalendarGrid()}
    </Box>
  );
};

export default CalendarComponent;
