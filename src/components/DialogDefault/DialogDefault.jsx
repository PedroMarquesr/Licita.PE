"use client"

import { Flex, Dialog, Text, Button } from "@chakra-ui/react"

export default function DialogDefault({ open, message, onClose }) {
  return (
    <Dialog.Root open={open} onClose={onClose} size={"md"}>
      <Dialog.Backdrop bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
      <Dialog.Positioner>
        <Dialog.Content
          bg="gray.800"
          borderRadius="xl"
          boxShadow="2xl"
          border="1px solid"
          borderColor="gray.700"
          p={2}
        >
          <Dialog.Body>
            <Flex
              direction="column"
              align="center"
              justify="center"
              minH="120px"
              px={6}
              py={4}
            >
              <Text
                fontSize="lg"
                textAlign="center"
                color="gray.100"
                fontWeight="medium"
                lineHeight="tall"
              >
                {message}
              </Text>
            </Flex>
          </Dialog.Body>

          <Dialog.Footer justifyContent="center" pt={2} pb={4}>
            <Button
              onClick={onClose}
              bg="blue.500"
              color="white"
              px={8}
              py={6}
              fontSize="md"
              fontWeight="medium"
              borderRadius="lg"
              _hover={{
                bg: "blue.600",
              }}
              w="50px"
            >
              OK
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
