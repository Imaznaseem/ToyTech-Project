import React from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Link,
  Button,
  Divider,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import MisionImage from "../assets/mision.png";
import VisionImage from "../assets/vision.png";

const OmOssPage = () => {
  return (
    <Box
            bg="#DDE7FE"
            minH="100vh"
            w="100vw"
            overflowX="hidden"
            pt="64px" // Ensure content starts below the navbar
          >
    <Navbar />
    <Divider />
{/* Om oss Sektion */}
<Box textAlign="center" py={16}>
  <Heading as="h1" size="2xl" color="#104470" mb={4}>
    Om oss
  </Heading>
  <Divider mx="auto" mb={8} />
  <Heading as="h2" size="lg" color="#104470" mb={6}>
    En investering i framtidens kompetens och innovation
  </Heading>
  <Text fontSize="lg" color="#104470" maxWidth="1000px" mx="auto">
    Toytech är ett unikt initiativ som kombinerar lärande, kreativitet och teknik för att inspirera nästa
    generation av innovatörer. Vi erbjuder interaktiva STEM-workshops (Science, Technology,
    Engineering, Mathematics) som är utformade för att möta framtidens behov av teknisk kompetens och
    problemlösning.
    I en tid där bristen på teknisk arbetskraft växer och hållbar innovation är avgörande, ger Toytech barn
    och unga de färdigheter de behöver för att möta morgondagens utmaningar. Våra workshops är
    designade för att vara inkluderande och engagerande, och vi använder våra egenutvecklade produkter
    för att säkerställa en högkvalitativ och praktisk lärandeupplevelse.
    Genom att samarbeta med Toytech bidrar ni till att stärka lokalsamhället, främja jämlik utbildning och
    skapa en hållbar framtid fylld av möjligheter.
  </Text>
</Box>

      {/* Mision Sektion */}
      <Flex
        direction={["column", "row"]}
        align="center"
        justify="space-around"
        py={16}
        px={8}
        gap={8}
      >
        <Box flex="1">
          <Image
            src={MisionImage}
            alt="Mision bild"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
        <Box flex="1" textAlign="center">
          <Heading as="h2" size="lg" color="#104470" mb={4}>
            Vår Mission
          </Heading>
          <Text fontSize="md" color="#333">
          Toytechs uppdrag är att minska klyftorna i tillgången till teknisk utbildning och samtidigt inspirera
        barn och unga att utforska teknikens värld. Vi arbetar för att säkerställa att alla, oavsett bakgrund, har
        möjlighet att utveckla tekniska färdigheter och kreativt tänkande. Genom praktiska workshops och
        egenutvecklade produkter vill vi forma framtidens ingenjörer, problemlösare och innovatörer – och
        bidra till att Sverige förblir en ledande nation inom teknik och hållbarhet.
          </Text>
        </Box>
      </Flex>

      {/* Vision Sektion */}
      <Flex
        direction={["column", "row"]}
        align="center"
        justify="space-around"
        py={16}
        px={8}
        gap={8}
      >
        <Box flex="1" textAlign="center">
          <Heading as="h2" size="lg" color="#104470" mb={4}>
            Vår Vision
          </Heading>
          <Text fontSize="md" color="#333">
          Toytechs vision är att revolutionera hur teknik lärs ut till barn och unga genom att skapa inkluderande
          och praktiska utbildningsmöjligheter. Vi ser en framtid där STEM är en naturlig och spännande del av
          varje barns utbildning, och där Sverige är ett föregångsland för teknisk innovation och hållbar
          utveckling.
          Genom att möta dagens behov av teknisk kompetens och hållbart tänkande skapar vi tillsammans en
          bättre framtid – där alla barn och unga har möjlighet att drömma stort och skapa något fantastiskt.
          </Text>
        </Box>
        <Box flex="1">
          <Image
            src={VisionImage}
            alt="Vision bild"
            borderRadius="md"
            boxShadow="md"
          />
        </Box>
      </Flex>

      {/* Kontakt Sektion */}
      <Box textAlign="center" py={16} bg="white" borderRadius="md" shadow="md">
        <Heading as="h2" size="lg" color="#104470" mb={4}>
          Kontakta oss
        </Heading>
        <Text fontSize="md" color="#333" mb={4}>
          Har du frågor eller funderingar? Hör av dig!
        </Text>
        <VStack spacing={4}>
          <Text>Email: ridwan@toytech.se</Text>
          <Text>Telefon: +46 760089180</Text>
          <Link
            href="mailto:info@dittforetag.se"
            _hover={{ textDecoration: "none" }}
          >
            <Button colorScheme="blue">Skicka e-post</Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default OmOssPage;
