import React, { useState } from "react";
import { Box, Heading, Text, Button, Grid, useMediaQuery } from "@chakra-ui/react";

const CalendarComponent = ({ workshops, confirmedBookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [isSmallScreen] = useMediaQuery("(max-width: 480px)");
  const [isMediumScreen] = useMediaQuery("(min-width: 481px) and (max-width: 1410px)");

  const handleMonthChange = (offset) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset);
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
    const isToday = date.toDateString() === new Date().toDateString();
    const hasConfirmedBooking = isConfirmedBooking(date);

    return (
      <Box
        bg={
          hasConfirmedBooking
            ? "green.300"
            : "gray.100"
        }
        border={isToday ? "2px solid teal" : "1px solid gray"}
        p={2}
        borderRadius="md"
        textAlign="center"
        minWidth={isSmallScreen ? "40px" : isMediumScreen ? "50px" : "60px"}
        minHeight={isSmallScreen ? "40px" : isMediumScreen ? "50px" : "60px"}
        fontSize={isSmallScreen ? "xs" : isMediumScreen ? "sm" : "md"}
        onClick={() => setSelectedDate(date)}
        cursor="pointer"
        _hover={{ bg: "teal.100" }}
      >
        <Text fontWeight="bold">{date.getDate()}</Text>
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
          templateColumns={isSmallScreen ? "repeat(7, 1fr)" : "repeat(7, 1fr)"}
          gap={isSmallScreen ? 1 : isMediumScreen ? 2 : 4}
        >
          {["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"].map((day) => (
            <Text key={day} textAlign="center" fontWeight="bold" fontSize={isSmallScreen ? "xs" : "sm"}>
              {day}
            </Text>
          ))}
        </Grid>
        {weeks.map((week, weekIndex) => (
          <Grid
            templateColumns="repeat(7, 1fr)"
            gap={isSmallScreen ? 1 : isMediumScreen ? 2 : 4}
            key={weekIndex}
          >
            {week.map((date, index) =>
              date ? (
                <Box key={index}>{renderDateCell(date)}</Box>
              ) : (
                <Box key={index}></Box>
              )
            )}
          </Grid>
        ))}
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
