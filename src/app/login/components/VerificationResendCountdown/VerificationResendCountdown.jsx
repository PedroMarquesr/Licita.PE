"use client"
import { Flex, Box, Text, Link } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { HiOutlineMail } from "react-icons/hi"
import { MdAccessTime } from "react-icons/md"

export default function VerificationResendCountdown({ resendEmail, interval }) {
  const [intervalSeconds, setIntervalSeconds] = useState(interval)
  const [showSeconds, setShowSeconds] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setIntervalSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          setShowSeconds(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(id)
  }, [])

  const minutes = Math.floor(intervalSeconds / 60)
  const seconds = intervalSeconds % 60
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`

  return (
    <Flex
      flexDir={"column"}
      w={"100%"}
      fontSize={14}
      bg="gray.50"
      p={4}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Flex alignItems="center" mb={2} color="gray.700">
        <Box as={HiOutlineMail} mr={2} fontSize="18px" color="blue.500" />
        <Text fontWeight="medium" fontSize={14}>
          Verificação de E-mail
        </Text>
      </Flex>
      <Flex
        direction={{ base: "column", sm: "row" }}
        alignItems={{ base: "flex-start", sm: "center" }}
        gap={10}
      >
        <Text color="gray.600" fontSize={11}>
          Nova solicitação de reenvio em 2 minutos
        </Text>

        <Flex
          alignItems="center"
          bg={showSeconds ? "blue.50" : "transparent"}
          p={showSeconds ? 2 : 0}
          borderRadius="md"
          ml={{ base: 0, sm: 0 }}
        >
          {showSeconds ? (
            <>
              <Box as={MdAccessTime} mr={1} color="blue.600" />
              <Text fontWeight="semibold" color="blue.700" fontSize={13}>
                {formattedTime}
              </Text>
            </>
          ) : (
            <Link
              color="blue.600"
              fontWeight="semibold"
              _hover={{
                color: "blue.800",
                textDecoration: "none",
                transform: "translateY(-1px)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
              display="inline-flex"
              alignItems="center"
              fontSize={12}
              as={"button"}
              onClick={() => resendEmail}
            >
              Reenviar
            </Link>
          )}
        </Flex>
      </Flex>
      <Text fontSize="xs" color="red.500" mt={2} ml={1}>
        Verifique sua caixa de entrada e spam
      </Text>
    </Flex>
  )
}
