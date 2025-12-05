"use client"

import {
  Flex,
  Text,
  Box,
  VStack,
  Button,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react"
import { IoTrendingUpSharp } from "react-icons/io5"
import { BiTimeFive } from "react-icons/bi"
import { GrDocumentText } from "react-icons/gr"
import { motion } from "framer-motion"

const AnimatedContainer = ({ children, delay = 0, animation = "none" }) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (isMobile) {
    return <div>{children}</div>
  }

  switch (animation) {
    case "slideLeft":
      return (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      )
    case "floatUp":
      return (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      )
    case "scaleIn":
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      )
    default:
      return <div>{children}</div>
  }
}

export default function HeroHeader() {
  return (
    <Box
      bg="linear-gradient(135deg, #0b3d5e 0%, #016dc3 50%, #349e70 100%)"
      mx={{ base: "0", md: "5%", lg: "10%" }}
      mt={"2"}
      borderRadius={{ base: "none", lg: "xl" }}
      boxShadow="xl"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-50%"
        right="-50%"
        w="200%"
        h="200%"
        bg="radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)"
        opacity="0.6"
      />
      <Flex
        p={{ base: 6, md: 8, lg: 12 }}
        alignItems="center"
        justifyContent="center"
        maxW="1400px"
        mx="auto"
        position="relative"
        zIndex="1"
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: 8, lg: 16 }}
      >
        <AnimatedContainer animation="slideLeft">
          <VStack
            flex="1"
            align="flex-start"
            spacing={6}
            color="white"
            maxW={{ base: "100%", lg: "600px" }}
          >
            <Text
              fontWeight="black"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              lineHeight="1.2"
              textShadow="0 2px 4px rgba(0,0,0,0.3)"
            >
              Modernize a Gestão de Licitações da sua Empresa
            </Text>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              opacity="0.9"
              fontStyle="italic"
              lineHeight="1.6"
            >
              Plataforma completa e inteligente para gerenciar processos
              licitatórios com eficiência, transparência e total conformidade
              legal.
            </Text>

            <Box
              w="100px"
              h="4px"
              bg="white"
              opacity="0.5"
              borderRadius="full"
            />
            <Flex gap={"2"}>
              <Button>
                <Text>Começar agora</Text>
              </Button>
              <Button>
                <Text>Demonstração</Text>
              </Button>
            </Flex>
          </VStack>
        </AnimatedContainer>

        <AnimatedContainer animation="floatUp" delay={0.3}>
          <Box display={{ base: "none", lg: "block" }} flex="1" maxW="500px">
            <VStack spacing={6} align="stretch">
              <AnimatedContainer animation="scaleIn" delay={0.5}>
                <Box
                  bg="white"
                  borderRadius="2xl"
                  p={6}
                  boxShadow="2xl"
                  backdropFilter="blur(10px)"
                  border="1px solid"
                  borderColor="whiteAlpha.300"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "3xl",
                  }}
                >
                  <HStack spacing={4} align="center">
                    <Box
                      bg="linear-gradient(135deg, #0b3d5e 0%, #016dc3 50%, #349e70 100%)"
                      color="white"
                      p={3}
                      borderRadius="xl"
                      fontSize="2xl"
                      boxShadow="md"
                    >
                      <GrDocumentText />
                    </Box>
                    <VStack align="flex-start" spacing={1} flex="1">
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color="gray.700"
                      >
                        Licitação PE-001/2025
                      </Text>
                      <Text
                        fontSize="md"
                        fontWeight="bold"
                        color="green.500"
                        bg="green.50"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        Em andamento
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </AnimatedContainer>

              <AnimatedContainer animation="floatUp" delay={0.7}>
                <HStack spacing={4} align="stretch">
                  <Box
                    flex="1"
                    bg="white"
                    borderRadius="xl"
                    p={4}
                    boxShadow="lg"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "xl",
                    }}
                  >
                    <HStack spacing={3} align="center">
                      <Box
                        fontSize="2xl"
                        color="green.500"
                        bg="green.50"
                        p={2}
                        borderRadius="lg"
                      >
                        <IoTrendingUpSharp />
                      </Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">
                        Mais economia
                      </Text>
                    </HStack>
                  </Box>

                  <Box
                    flex="1"
                    bg="white"
                    borderRadius="xl"
                    p={4}
                    boxShadow="lg"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "xl",
                    }}
                  >
                    <HStack spacing={3} align="center">
                      <Box
                        fontSize="2xl"
                        color="blue.500"
                        bg="blue.50"
                        p={2}
                        borderRadius="lg"
                      >
                        <BiTimeFive />
                      </Box>
                      <Text fontSize="sm" fontWeight="medium" color="gray.700">
                        Mais rapidez
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </AnimatedContainer>
            </VStack>
          </Box>
        </AnimatedContainer>
      </Flex>
    </Box>
  )
}
